// Copyright (C) 2025, Paul Hammant
// SPDX-License-Identifier: AGPL-3.0-or-later

import XCTest
import Vision
import CoreImage
import ImageIO
@testable import LiveVerify

final class SHA256HasherTests: XCTestCase {

    func testEmptyString() {
        let hash = SHA256Hasher.hashHex("")
        // SHA-256 of empty string
        XCTAssertEqual(hash, "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855")
    }

    func testSimpleString() {
        let hash = SHA256Hasher.hashHex("hello")
        XCTAssertEqual(hash, "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824")
    }

    func testUnicodeString() {
        let hash = SHA256Hasher.hashHex("héllo wörld")
        // Verify it produces a valid 64-char hex string
        XCTAssertEqual(hash.count, 64)
        XCTAssertTrue(hash.allSatisfy { $0.isHexDigit })
    }

    func testMultilineString() {
        let text = "Line 1\nLine 2\nLine 3"
        let hash = SHA256Hasher.hashHex(text)
        XCTAssertEqual(hash.count, 64)
    }

    func testConsistency() {
        let text = "Test consistency"
        let hash1 = SHA256Hasher.hashHex(text)
        let hash2 = SHA256Hasher.hashHex(text)
        XCTAssertEqual(hash1, hash2)
    }
}

final class VisionFixtureTests: XCTestCase {

    private func fixtureURL() throws -> URL {
        let base = URL(fileURLWithPath: #filePath)
            .deletingLastPathComponent() // LiveVerifyTests
            .deletingLastPathComponent() // LiveVerify
            .deletingLastPathComponent() // ios
            .deletingLastPathComponent() // apps
            .deletingLastPathComponent() // repo root
        let url = base.appendingPathComponent("foo.jpeg")
        XCTAssertTrue(FileManager.default.fileExists(atPath: url.path), "Missing fixture at \(url.path)")
        return url
    }

    private func loadCGImage() throws -> CGImage {
        let url = try fixtureURL()
        let data = try Data(contentsOf: url) as CFData
        guard let source = CGImageSourceCreateWithData(data, nil),
              let image = CGImageSourceCreateImageAtIndex(source, 0, nil) else {
            throw XCTSkip("Failed to load CGImage from \(url.path)")
        }
        return image
    }

    private func detectTopRectangle(in cgImage: CGImage) throws -> VNRectangleObservation {
        let request = VNDetectRectanglesRequest()
        request.minimumAspectRatio = 0.3
        request.maximumAspectRatio = 1.0
        request.minimumSize = 0.1
        request.maximumObservations = 5
        request.minimumConfidence = 0.5

        let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
        try handler.perform([request])
        guard let first = (request.results as? [VNRectangleObservation])?.sorted(by: { $0.confidence > $1.confidence }).first else {
            throw XCTSkip("No rectangle detected in fixture")
        }
        return first
    }

    private func perspectiveCorrect(cgImage: CGImage, rect: VNRectangleObservation) throws -> CGImage {
        let ciImage = CIImage(cgImage: cgImage)
        let extent = ciImage.extent

        let topLeft = CGPoint(x: rect.topLeft.x * extent.width, y: rect.topLeft.y * extent.height)
        let topRight = CGPoint(x: rect.topRight.x * extent.width, y: rect.topRight.y * extent.height)
        let bottomLeft = CGPoint(x: rect.bottomLeft.x * extent.width, y: rect.bottomLeft.y * extent.height)
        let bottomRight = CGPoint(x: rect.bottomRight.x * extent.width, y: rect.bottomRight.y * extent.height)

        guard let filter = CIFilter(name: "CIPerspectiveCorrection") else {
            throw XCTSkip("Missing CIPerspectiveCorrection filter")
        }
        filter.setValue(ciImage, forKey: kCIInputImageKey)
        filter.setValue(CIVector(cgPoint: topLeft), forKey: "inputTopLeft")
        filter.setValue(CIVector(cgPoint: topRight), forKey: "inputTopRight")
        filter.setValue(CIVector(cgPoint: bottomLeft), forKey: "inputBottomLeft")
        filter.setValue(CIVector(cgPoint: bottomRight), forKey: "inputBottomRight")

        guard let corrected = filter.outputImage else {
            throw XCTSkip("Perspective correction failed")
        }

        let context = CIContext()
        guard let correctedCG = context.createCGImage(corrected, from: corrected.extent) else {
            throw XCTSkip("Failed to render corrected image")
        }
        return correctedCG
    }

    private func recognizeText(from cgImage: CGImage) throws -> String {
        let request = VNRecognizeTextRequest()
        request.recognitionLevel = .accurate
        request.recognitionLanguages = ["en-US"]

        let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
        try handler.perform([request])
        guard let observations = request.results as? [VNRecognizedTextObservation], !observations.isEmpty else {
            return ""
        }
        return observations.compactMap { $0.topCandidates(1).first?.string }.joined(separator: "\n")
    }

    func testFullImageOCRReadsVerifyURL() throws {
        let cgImage = try loadCGImage()
        let text = try recognizeText(from: cgImage)
        XCTAssertFalse(text.isEmpty, "OCR returned empty text for full image")
        XCTAssertTrue(text.contains("verify:paulhammant.com/refs"), "OCR did not include verify URL. Text:\n\(text)")
    }

    func testCroppedOCRReadsVerifyURL() throws {
        let cgImage = try loadCGImage()
        let rect = try detectTopRectangle(in: cgImage)
        let corrected = try perspectiveCorrect(cgImage: cgImage, rect: rect)
        let text = try recognizeText(from: corrected)
        XCTAssertFalse(text.isEmpty, "OCR returned empty text for cropped image")
        XCTAssertTrue(text.contains("verify:paulhammant.com/refs"), "OCR did not include verify URL in crop. Text:\n\(text)")
    }
}

final class JSBridgeTests: XCTestCase {

    var jsBridge: JSBridge?

    override func setUpWithError() throws {
        // JSBridge requires JS files in bundle - skip if not available
        do {
            jsBridge = try JSBridge()
        } catch {
            throw XCTSkip("JS files not available in test bundle: \(error)")
        }
    }

    func testExtractVerificationURL_verifyPrefix() throws {
        let bridge = try XCTUnwrap(jsBridge)
        let text = "Some certificate text\nJohn Doe\nverify:example.com/c"

        let result = bridge.extractVerificationURL(from: text)

        XCTAssertNotNil(result)
        XCTAssertEqual(result?.url, "verify:example.com/c")
        XCTAssertEqual(result?.lineIndex, 2)
    }

    func testExtractVerificationURL_vfyPrefix() throws {
        let bridge = try XCTUnwrap(jsBridge)
        let text = "Certificate\nvfy:example.com/path"

        let result = bridge.extractVerificationURL(from: text)

        XCTAssertNotNil(result)
        XCTAssertEqual(result?.url, "vfy:example.com/path")
    }

    func testExtractVerificationURL_noURL() throws {
        let bridge = try XCTUnwrap(jsBridge)
        let text = "Just some plain text\nNo verify URL here"

        let result = bridge.extractVerificationURL(from: text)

        XCTAssertNil(result)
    }

    func testExtractCertText() throws {
        let bridge = try XCTUnwrap(jsBridge)
        let text = "University of Test\nJohn Doe\nFirst Class\nverify:example.com/c"

        let certText = bridge.extractCertText(from: text, urlLineIndex: 3)

        XCTAssertNotNil(certText)
        XCTAssertTrue(certText?.contains("University of Test") ?? false)
        XCTAssertTrue(certText?.contains("John Doe") ?? false)
        XCTAssertFalse(certText?.contains("verify:") ?? true)
    }

    func testBuildVerificationURL_verifyPrefix() throws {
        let bridge = try XCTUnwrap(jsBridge)

        let url = bridge.buildVerificationURL(baseURL: "verify:example.com/c", hash: "abc123", meta: nil)

        XCTAssertEqual(url, "https://example.com/c/abc123")
    }

    func testBuildVerificationURL_vfyPrefix() throws {
        let bridge = try XCTUnwrap(jsBridge)

        let url = bridge.buildVerificationURL(baseURL: "vfy:example.com/path", hash: "def456", meta: nil)

        XCTAssertEqual(url, "https://example.com/path/def456")
    }

    func testNormalizeText_basic() throws {
        let bridge = try XCTUnwrap(jsBridge)
        let text = "  Some text with   extra spaces  \n\n  Another line  "

        let normalized = bridge.normalizeText(text, metadata: nil)

        XCTAssertNotNil(normalized)
        // Should collapse spaces and remove blank lines
        XCTAssertFalse(normalized?.contains("  ") ?? true)
    }

    func testNormalizeText_unicodeQuotes() throws {
        let bridge = try XCTUnwrap(jsBridge)
        let text = "\"Hello\" and 'World'"

        let normalized = bridge.normalizeText(text, metadata: nil)

        XCTAssertNotNil(normalized)
        // Curly quotes should become straight quotes
        XCTAssertTrue(normalized?.contains("\"Hello\"") ?? false)
        XCTAssertTrue(normalized?.contains("'World'") ?? false)
    }
}

final class StringJSEscapedTests: XCTestCase {

    func testBasicString() {
        let str = "hello world"
        XCTAssertEqual(str.jsEscaped, "hello world")
    }

    func testStringWithQuotes() {
        let str = "it's a \"test\""
        XCTAssertEqual(str.jsEscaped, "it\\'s a \"test\"")
    }

    func testStringWithNewlines() {
        let str = "line1\nline2\rline3"
        XCTAssertEqual(str.jsEscaped, "line1\\nline2\\rline3")
    }

    func testStringWithBackslash() {
        let str = "path\\to\\file"
        XCTAssertEqual(str.jsEscaped, "path\\\\to\\\\file")
    }
}
