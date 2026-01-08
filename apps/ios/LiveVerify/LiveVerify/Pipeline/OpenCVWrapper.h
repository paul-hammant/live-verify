// Copyright (C) 2025, Paul Hammant
// SPDX-License-Identifier: AGPL-3.0-or-later

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

/// Result of registration mark detection
@interface DetectionResult : NSObject
@property (nonatomic, assign) BOOL success;
@property (nonatomic, strong, nullable) NSArray<NSValue *> *corners;  // 4 CGPoints in TL, TR, BR, BL order
@property (nonatomic, assign) double score;
@property (nonatomic, strong, nullable) NSString *error;
@end

/// OpenCV-based registration mark detector
/// Ports the exact logic from public/cv/detectSquares.js and geometry.js
@interface OpenCVWrapper : NSObject

/// Detect registration rectangle in image
/// Returns corners in image coordinates (TL, TR, BR, BL order)
+ (DetectionResult *)detectRegistrationRect:(UIImage *)image;

/// Crop and perspective-correct image to the detected rectangle
+ (nullable UIImage *)cropToRect:(UIImage *)image corners:(NSArray<NSValue *> *)corners;

@end

NS_ASSUME_NONNULL_END
