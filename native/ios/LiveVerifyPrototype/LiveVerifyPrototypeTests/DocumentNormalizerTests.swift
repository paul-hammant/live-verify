import XCTest
@testable import LiveVerifyPrototype

final class DocumentNormalizerTests: XCTestCase {
    func testNormalizesUnicodeQuotesDashesEllipsis() {
        let raw = "“Hello”—world…"
        let normalized = DocumentNormalizer.normalize(raw, meta: nil)
        XCTAssertEqual(normalized, "\"Hello\"-world...")
    }

    func testStripsBorderArtifactsAndWhitespace() {
        let raw = "   |  John   Doe  |   \n\n"
        let normalized = DocumentNormalizer.normalize(raw, meta: nil)
        XCTAssertEqual(normalized, "John Doe")
    }

    func testRemovesTrailingSingleLowercaseLetterArtifact() {
        let raw = "Company Name a\nAppendix A"
        let normalized = DocumentNormalizer.normalize(raw, meta: nil)
        XCTAssertEqual(normalized, "Company Name\nAppendix A")
    }

    func testAppliesCharNormalizationAndRegexRulesFromMeta() {
        let json = """
        {
          "charNormalization": "éèêë→e",
          "ocrNormalizationRules": [
            { "pattern": "CHF\\\\s+(\\\\d)", "replacement": "CHF$1" }
          ]
        }
        """
        let meta = try! JSONDecoder().decode(VerificationMeta.self, from: Data(json.utf8))

        let raw = "Hôtel CHF 1"
        let normalized = DocumentNormalizer.normalize(raw, meta: meta)
        XCTAssertEqual(normalized, "Hotel CHF1")
    }
}

