// Copyright (C) 2025, Paul Hammant
// SPDX-License-Identifier: AGPL-3.0-or-later

import Foundation
import CryptoKit

/// SHA-256 hashing utility using native CryptoKit
/// Produces lowercase hex string output matching the web app
struct SHA256Hasher {
    /// Compute SHA-256 hash of text and return as lowercase hex string
    /// - Parameter text: Input text (will be UTF-8 encoded)
    /// - Returns: 64-character lowercase hex string
    static func hashHex(_ text: String) -> String {
        let data = Data(text.utf8)
        let digest = SHA256.hash(data: data)
        return digest.map { String(format: "%02x", $0) }.joined()
    }
}
