import XCTest
@testable import LiveVerifyPrototype

final class SHA256HasherTests: XCTestCase {
    func testSha256Hello() {
        XCTAssertEqual(
            SHA256Hasher.hashHex("hello"),
            "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
        )
    }

    func testSha256HelloWorld() {
        XCTAssertEqual(
            SHA256Hasher.hashHex("hello world"),
            "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9"
        )
    }
}

