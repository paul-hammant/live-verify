import XCTest
@testable import LiveVerifyPrototype

final class VerifyLineParserTests: XCTestCase {
    func testExtractVerificationURL_basicVerifyPrefix() {
        let raw = """
        Firstname Middlename Lastname has a degree.

        verify:issuer.example.com/claims
        """

        let extracted = VerifyLineParser.extractVerificationURL(from: raw)
        XCTAssertNotNil(extracted)
        XCTAssertEqual(extracted?.url, "verify:issuer.example.com/claims")
        XCTAssertEqual(extracted?.urlLineIndex, 2)
    }

    func testExtractVerificationURL_toleratesSpacesAndPrefixOCR() {
        let raw = """
        Something something
        ve r i f y : issuer.example.com/claims
        """

        let extracted = VerifyLineParser.extractVerificationURL(from: raw)
        XCTAssertEqual(extracted?.url, "verify:issuer.example.com/claims")
    }

    func testExtractVerificationURL_normalizesCorruptedPrefixToVfy() {
        let raw = """
        Certification text line
        veryfy:issuer.example.com/claims
        """

        let extracted = VerifyLineParser.extractVerificationURL(from: raw)
        XCTAssertEqual(extracted?.url, "vfy:issuer.example.com/claims")
    }

    func testExtractCertText_excludesVerifyLineAndTrailingBlanks() {
        let raw = """
        Line 1
        Line 2

        verify:issuer.example.com/claims
        """

        let extracted = VerifyLineParser.extractVerificationURL(from: raw)!
        let cert = VerifyLineParser.extractCertText(from: raw, urlLineIndex: extracted.urlLineIndex)
        XCTAssertEqual(cert, "Line 1\nLine 2")
    }

    func testBuildVerificationURL_appendsHash() throws {
        let url = try VerifyLineParser.buildVerificationURL(baseURL: "verify:issuer.example.com/claims", hash: "abc123")
        XCTAssertEqual(url.absoluteString, "https://issuer.example.com/claims/abc123")
    }
}

