import XCTest
@testable import LiveVerifyPrototype

final class VerificationResponseInterpreterTests: XCTestCase {
    func testOkIsAffirmingWithoutMeta() {
        let url = URL(string: "https://issuer.example.com/claims/abc")!
        let outcome = VerificationResponseInterpreter.interpret(httpStatus: 200, body: "OK", verificationURL: url, meta: nil)
        XCTAssertEqual(outcome.classification, .affirming)
        XCTAssertEqual(outcome.displayText, "Claim Verified")
    }

    func testAffirmingStatusFromMetaIsAffirming() throws {
        let json = """
        {
          "responseTypes": {
            "GRADUATED": { "class": "affirming", "text": "Awarded degree" },
            "REVOKED": { "class": "denying", "text": "Revoked" }
          }
        }
        """
        let meta = try JSONDecoder().decode(VerificationMeta.self, from: Data(json.utf8))
        let url = URL(string: "https://issuer.example.com/claims/abc")!

        let outcome = VerificationResponseInterpreter.interpret(httpStatus: 200, body: "GRADUATED", verificationURL: url, meta: meta)
        XCTAssertEqual(outcome.classification, .affirming)
        XCTAssertEqual(outcome.displayText, "Awarded degree")
    }

    func testNon200IsDenying() {
        let url = URL(string: "https://issuer.example.com/claims/abc")!
        let outcome = VerificationResponseInterpreter.interpret(httpStatus: 404, body: "", verificationURL: url, meta: nil)
        XCTAssertEqual(outcome.classification, .denying)
        XCTAssertEqual(outcome.httpStatus, 404)
    }

    func testJsonStatusOkIsAffirming() {
        let url = URL(string: "https://issuer.example.com/claims/abc")!
        let outcome = VerificationResponseInterpreter.interpret(httpStatus: 200, body: "{\"status\":\"OK\"}", verificationURL: url, meta: nil)
        XCTAssertEqual(outcome.classification, .affirming)
    }
}

