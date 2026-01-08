// Copyright (C) 2025, Paul Hammant
// SPDX-License-Identifier: AGPL-3.0-or-later

import Foundation

/// Verification outcome from the issuer's endpoint
enum VerificationOutcome {
    case affirming(domain: String, status: String)
    case denying(domain: String, reason: String)
    case networkError(Error)
    case noVerifyURL
    case error(String)
}

/// Errors that can occur during verification
enum VerificationError: Error, LocalizedError {
    case invalidURL(String)
    case networkError(Error)
    case httpError(Int)
    case invalidResponse

    var errorDescription: String? {
        switch self {
        case .invalidURL(let url):
            return "Invalid verification URL: \(url)"
        case .networkError(let error):
            return "Network error: \(error.localizedDescription)"
        case .httpError(let code):
            return "HTTP error: \(code)"
        case .invalidResponse:
            return "Invalid response from verification endpoint"
        }
    }
}

/// Client for fetching verification-meta.json and verifying hashes
class VerificationClient {
    private let session: URLSession

    init(session: URLSession = .shared) {
        self.session = session
    }

    /// Fetch verification-meta.json from the issuer's domain
    /// - Parameter baseURL: Base URL (e.g., "verify:example.com/c" or "https://example.com/c")
    /// - Returns: Parsed JSON dictionary or nil if not found
    func fetchVerificationMeta(baseURL: String) async -> [String: Any]? {
        let httpsBase = convertToHTTPS(baseURL)
        let metaURLString = "\(httpsBase)/verification-meta.json"
        Log.d("Verify", "Fetching meta from: \(metaURLString)")

        guard let metaURL = URL(string: metaURLString) else {
            Log.d("Verify", "Invalid meta URL: \(metaURLString)")
            return nil
        }

        do {
            Log.d("Verify", "Starting network request...")
            let (data, response) = try await session.data(from: metaURL)
            Log.d("Verify", "Network request completed")

            guard let httpResponse = response as? HTTPURLResponse else {
                Log.d("Verify", "Not an HTTP response")
                return nil
            }

            Log.d("Verify", "HTTP status: \(httpResponse.statusCode)")

            guard httpResponse.statusCode == 200 else {
                return nil
            }

            let json = try JSONSerialization.jsonObject(with: data) as? [String: Any]
            Log.d("Verify", "Meta parsed: \(json != nil ? "success" : "nil")")
            return json
        } catch {
            Log.d("Verify", "Failed to fetch meta: \(error)")
            return nil
        }
    }

    /// Verify a hash against the issuer's endpoint
    /// - Parameters:
    ///   - verificationURL: Full verification URL (https://domain.com/path/hash)
    ///   - meta: Optional verification-meta.json for response type interpretation
    /// - Returns: Verification outcome
    func verify(verificationURL: String, meta: [String: Any]?) async -> VerificationOutcome {
        guard let url = URL(string: verificationURL) else {
            return .denying(domain: "unknown", reason: "Invalid URL")
        }

        let domain = url.host ?? "unknown"

        do {
            let (data, response) = try await session.data(from: url)

            guard let httpResponse = response as? HTTPURLResponse else {
                return .denying(domain: domain, reason: "Invalid response")
            }

            // Check for 2xx status codes
            guard (200...299).contains(httpResponse.statusCode) else {
                if httpResponse.statusCode == 404 {
                    return .denying(domain: domain, reason: "Hash not found")
                }
                return .denying(domain: domain, reason: "HTTP \(httpResponse.statusCode)")
            }

            // Parse response body
            let bodyText = String(data: data, encoding: .utf8)?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""

            // Check for simple "OK" response
            if bodyText == "OK" {
                return .affirming(domain: domain, status: "VERIFIED")
            }

            // Try to parse as JSON
            if let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
               let status = json["status"] as? String {
                let upperStatus = status.uppercased()
                if upperStatus == "OK" || upperStatus == "VERIFIED" {
                    return .affirming(domain: domain, status: "VERIFIED")
                }

                // Check responseTypes from meta for custom status interpretation
                if let responseTypes = meta?["responseTypes"] as? [String: Any],
                   let typeInfo = responseTypes[upperStatus] as? [String: Any],
                   let typeClass = typeInfo["class"] as? String {
                    if typeClass == "affirming" {
                        return .affirming(domain: domain, status: upperStatus)
                    } else {
                        let text = typeInfo["text"] as? String ?? upperStatus
                        return .denying(domain: domain, reason: text)
                    }
                }

                // Default: treat non-OK/VERIFIED as denying
                return .denying(domain: domain, reason: upperStatus)
            }

            // Check responseTypes from meta for plain text responses
            if let responseTypes = meta?["responseTypes"] as? [String: Any] {
                let upperBody = bodyText.uppercased()
                if let typeInfo = responseTypes[upperBody] as? [String: Any],
                   let typeClass = typeInfo["class"] as? String {
                    if typeClass == "affirming" {
                        return .affirming(domain: domain, status: upperBody)
                    } else {
                        let text = typeInfo["text"] as? String ?? upperBody
                        return .denying(domain: domain, reason: text)
                    }
                }
            }

            // Default for non-OK body
            if !bodyText.isEmpty {
                return .denying(domain: domain, reason: bodyText.prefix(50).description)
            }

            return .denying(domain: domain, reason: "Empty response")

        } catch {
            return .networkError(error)
        }
    }

    /// Convert verify: or vfy: URL to https://
    private func convertToHTTPS(_ url: String) -> String {
        let lower = url.lowercased()
        if lower.hasPrefix("verify:") {
            return "https://" + String(url.dropFirst(7))
        } else if lower.hasPrefix("vfy:") {
            return "https://" + String(url.dropFirst(4))
        } else if lower.hasPrefix("https://") {
            return url
        } else {
            return "https://" + url
        }
    }
}
