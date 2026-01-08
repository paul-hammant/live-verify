// Copyright (C) 2025, Paul Hammant
// SPDX-License-Identifier: AGPL-3.0-or-later

// IMPORTANT: OpenCV headers must come BEFORE UIKit to avoid BOOL conflict
#ifdef __cplusplus
#import <opencv2/opencv.hpp>
#import <opencv2/imgproc.hpp>
#import <opencv2/core.hpp>
#endif

#import "OpenCVWrapper.h"

@implementation DetectionResult
@end

@implementation OpenCVWrapper

#pragma mark - UIImage <-> cv::Mat conversion

+ (cv::Mat)cvMatFromUIImage:(UIImage *)image {
    CGColorSpaceRef colorSpace = CGImageGetColorSpace(image.CGImage);
    CGFloat cols = image.size.width;
    CGFloat rows = image.size.height;

    cv::Mat cvMat(rows, cols, CV_8UC4);

    CGContextRef contextRef = CGBitmapContextCreate(
        cvMat.data,
        cols,
        rows,
        8,
        cvMat.step[0],
        colorSpace,
        kCGImageAlphaNoneSkipLast | kCGBitmapByteOrderDefault
    );

    CGContextDrawImage(contextRef, CGRectMake(0, 0, cols, rows), image.CGImage);
    CGContextRelease(contextRef);

    return cvMat;
}

+ (UIImage *)UIImageFromCVMat:(cv::Mat)cvMat {
    NSData *data = [NSData dataWithBytes:cvMat.data length:cvMat.elemSize() * cvMat.total()];
    CGColorSpaceRef colorSpace;

    if (cvMat.elemSize() == 1) {
        colorSpace = CGColorSpaceCreateDeviceGray();
    } else {
        colorSpace = CGColorSpaceCreateDeviceRGB();
    }

    CGDataProviderRef provider = CGDataProviderCreateWithCFData((__bridge CFDataRef)data);

    CGImageRef imageRef = CGImageCreate(
        cvMat.cols,
        cvMat.rows,
        8,
        8 * cvMat.elemSize(),
        cvMat.step[0],
        colorSpace,
        kCGImageAlphaNone | kCGBitmapByteOrderDefault,
        provider,
        NULL,
        false,
        kCGRenderingIntentDefault
    );

    UIImage *finalImage = [UIImage imageWithCGImage:imageRef];
    CGImageRelease(imageRef);
    CGDataProviderRelease(provider);
    CGColorSpaceRelease(colorSpace);

    return finalImage;
}

#pragma mark - Geometry helpers (ported from geometry.js)

/// Order corners to TL, TR, BR, BL order
/// Ported from geometry.js orderCorners()
+ (std::vector<cv::Point2f>)orderCorners:(std::vector<cv::Point2f>)corners {
    if (corners.size() != 4) return corners;

    // Compute centroid
    float cx = 0, cy = 0;
    for (const auto& pt : corners) {
        cx += pt.x;
        cy += pt.y;
    }
    cx /= 4;
    cy /= 4;

    // Sort by angle from centroid (CCW)
    std::sort(corners.begin(), corners.end(), [cx, cy](const cv::Point2f& a, const cv::Point2f& b) {
        return atan2(a.y - cy, a.x - cx) < atan2(b.y - cy, b.x - cx);
    });

    // Find index of top-left (min x+y)
    int minIdx = 0;
    float minSum = FLT_MAX;
    for (int i = 0; i < 4; i++) {
        float sum = corners[i].x + corners[i].y;
        if (sum < minSum) {
            minSum = sum;
            minIdx = i;
        }
    }

    // Rotate array so TL is first
    std::vector<cv::Point2f> ordered;
    for (int i = 0; i < 4; i++) {
        ordered.push_back(corners[(minIdx + i) % 4]);
    }

    return ordered;
}

/// Score a candidate rectangle
/// Ported from geometry.js scoreSquareCandidate()
+ (double)scoreCandidate:(std::vector<cv::Point2f>)points imageWidth:(float)imgW imageHeight:(float)imgH {
    auto ordered = [self orderCorners:points];
    if (ordered.size() != 4) return 0;

    cv::Point2f tl = ordered[0], tr = ordered[1], br = ordered[2], bl = ordered[3];

    // Calculate width and height
    float w1 = hypot(tr.x - tl.x, tr.y - tl.y);
    float w2 = hypot(br.x - bl.x, br.y - bl.y);
    float h1 = hypot(bl.x - tl.x, bl.y - tl.y);
    float h2 = hypot(br.x - tr.x, br.y - tr.y);
    float w = (w1 + w2) / 2;
    float h = (h1 + h2) / 2;

    // Area score: prefer ~25% of image area
    float area = w * h;
    float ideal = pow(fmin(imgW, imgH) * 0.25, 2);
    double areaScore = exp(-fabs(area - ideal) / ideal);

    // Center score: prefer rectangles near image center
    float cx = (tl.x + tr.x + br.x + bl.x) / 4;
    float cy = (tl.y + tr.y + br.y + bl.y) / 4;
    float dx = (cx - imgW / 2) / (imgW / 2);
    float dy = (cy - imgH / 2) / (imgH / 2);
    double centerScore = exp(-(dx * dx + dy * dy));

    // Ratio score: prefer aspect ratio close to 1
    float ratio = w / h;
    double ratioScore = exp(-fabs(ratio - 1));

    return areaScore * centerScore * ratioScore;
}

#pragma mark - Square detection (ported from detectSquares.js)

/// Find square candidates in image
/// Ported from detectSquares.js findSquareCandidates()
+ (std::vector<std::pair<std::vector<cv::Point2f>, double>>)findSquareCandidates:(cv::Mat)src
                                                                     minAreaRatio:(double)minAreaRatio
                                                                     maxAreaRatio:(double)maxAreaRatio
                                                                      approxEpsilon:(double)approxEpsilon {
    int imgW = src.cols;
    int imgH = src.rows;
    double imgArea = imgW * imgH;

    std::vector<std::pair<std::vector<cv::Point2f>, double>> candidates;

    // Convert to grayscale
    cv::Mat gray;
    cv::cvtColor(src, gray, cv::COLOR_RGBA2GRAY);

    // Gaussian blur
    cv::Mat blur;
    cv::GaussianBlur(gray, blur, cv::Size(5, 5), 0);

    // Adaptive threshold (same as web app)
    cv::Mat bw;
    cv::adaptiveThreshold(blur, bw, 255, cv::ADAPTIVE_THRESH_GAUSSIAN_C, cv::THRESH_BINARY, 11, 2);

    // Find contours
    std::vector<std::vector<cv::Point>> contours;
    std::vector<cv::Vec4i> hierarchy;
    cv::findContours(bw, contours, hierarchy, cv::RETR_LIST, cv::CHAIN_APPROX_SIMPLE);

    for (const auto& contour : contours) {
        // Approximate polygon
        double peri = cv::arcLength(contour, true);
        std::vector<cv::Point> approx;
        cv::approxPolyDP(contour, approx, approxEpsilon * peri, true);

        // Must be 4-sided and convex
        if (approx.size() != 4) continue;
        if (!cv::isContourConvex(approx)) continue;

        // Check area ratio
        double area = cv::contourArea(approx);
        double areaRatio = area / imgArea;
        if (areaRatio < minAreaRatio || areaRatio > maxAreaRatio) continue;

        // Convert to Point2f
        std::vector<cv::Point2f> pts;
        for (const auto& pt : approx) {
            pts.push_back(cv::Point2f(pt.x, pt.y));
        }

        // Score this candidate
        double score = [self scoreCandidate:pts imageWidth:imgW imageHeight:imgH];
        candidates.push_back({pts, score});
    }

    return candidates;
}

#pragma mark - Public API

+ (DetectionResult *)detectRegistrationRect:(UIImage *)image {
    DetectionResult *result = [[DetectionResult alloc] init];

    if (!image) {
        result.success = NO;
        result.error = @"No image provided";
        return result;
    }

    cv::Mat src = [self cvMatFromUIImage:image];

    // Parameters matching web app defaults
    double minAreaRatio = 0.0005;
    double maxAreaRatio = 0.5;
    double approxEpsilon = 0.02;

    auto candidates = [self findSquareCandidates:src
                                    minAreaRatio:minAreaRatio
                                    maxAreaRatio:maxAreaRatio
                                   approxEpsilon:approxEpsilon];

    if (candidates.empty()) {
        result.success = NO;
        result.error = @"No registration rectangle detected";
        return result;
    }

    // Find best candidate by score
    auto best = std::max_element(candidates.begin(), candidates.end(),
                                  [](const auto& a, const auto& b) {
                                      return a.second < b.second;
                                  });

    auto orderedCorners = [self orderCorners:best->first];

    // Convert to NSArray of CGPoints
    NSMutableArray<NSValue *> *corners = [NSMutableArray arrayWithCapacity:4];
    for (const auto& pt : orderedCorners) {
        [corners addObject:[NSValue valueWithCGPoint:CGPointMake(pt.x, pt.y)]];
    }

    result.success = YES;
    result.corners = corners;
    result.score = best->second;

    return result;
}

+ (UIImage *)cropToRect:(UIImage *)image corners:(NSArray<NSValue *> *)corners {
    if (!image || corners.count != 4) return nil;

    cv::Mat src = [self cvMatFromUIImage:image];

    // Get corners in order: TL, TR, BR, BL
    CGPoint tl = corners[0].CGPointValue;
    CGPoint tr = corners[1].CGPointValue;
    CGPoint br = corners[2].CGPointValue;
    CGPoint bl = corners[3].CGPointValue;

    // Calculate output dimensions
    float widthA = hypot(br.x - bl.x, br.y - bl.y);
    float widthB = hypot(tr.x - tl.x, tr.y - tl.y);
    int maxW = (int)fmax(widthA, widthB);

    float heightA = hypot(tr.x - br.x, tr.y - br.y);
    float heightB = hypot(tl.x - bl.x, tl.y - bl.y);
    int maxH = (int)fmax(heightA, heightB);

    // Source points
    std::vector<cv::Point2f> srcPts = {
        cv::Point2f(tl.x, tl.y),
        cv::Point2f(tr.x, tr.y),
        cv::Point2f(br.x, br.y),
        cv::Point2f(bl.x, bl.y)
    };

    // Destination points
    std::vector<cv::Point2f> dstPts = {
        cv::Point2f(0, 0),
        cv::Point2f(maxW, 0),
        cv::Point2f(maxW, maxH),
        cv::Point2f(0, maxH)
    };

    // Get perspective transform matrix
    cv::Mat M = cv::getPerspectiveTransform(srcPts, dstPts);

    // Warp perspective
    cv::Mat dst;
    cv::warpPerspective(src, dst, M, cv::Size(maxW, maxH));

    // Convert back to UIImage
    cv::Mat rgbDst;
    cv::cvtColor(dst, rgbDst, cv::COLOR_RGBA2RGB);

    return [self UIImageFromCVMat:rgbDst];
}

@end
