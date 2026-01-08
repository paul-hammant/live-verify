// Copyright (C) 2025, Paul Hammant
// SPDX-License-Identifier: AGPL-3.0-or-later

import SwiftUI
import UIKit

/// Simple logging utility with timestamp and build info
/// Also writes to a file for debugging via devicectl
enum Log {
    private static let dateFormatter: DateFormatter = {
        let df = DateFormatter()
        df.dateFormat = "HH:mm:ss.SSS"
        return df
    }()

    private static let buildInfo: String = {
        let version = Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String ?? "?"
        let build = Bundle.main.infoDictionary?["CFBundleVersion"] as? String ?? "?"
        return "v\(version)(\(build))"
    }()

    private static let logFileURL: URL? = {
        guard let docs = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first else {
            return nil
        }
        return docs.appendingPathComponent("debug.log")
    }()

    private static let logQueue = DispatchQueue(label: "com.liveverify.log", qos: .utility)

    static func d(_ tag: String, _ message: String) {
        let timestamp = dateFormatter.string(from: Date())
        let line = "\(timestamp) [\(buildInfo)] [\(tag)] \(message)"
        print(line)

        // Also write to file
        logQueue.async {
            guard let url = logFileURL else { return }
            let lineWithNewline = line + "\n"
            if let data = lineWithNewline.data(using: .utf8) {
                if FileManager.default.fileExists(atPath: url.path) {
                    if let handle = try? FileHandle(forWritingTo: url) {
                        handle.seekToEndOfFile()
                        handle.write(data)
                        handle.closeFile()
                    }
                } else {
                    try? data.write(to: url)
                }
            }
        }
    }

    /// Clear the log file (call on app start)
    static func clear() {
        logQueue.async {
            guard let url = logFileURL else { return }
            try? FileManager.default.removeItem(at: url)
        }
    }
}

@main
struct LiveVerifyApp: App {
    init() {
        Log.clear()  // Fresh log each launch
        Log.d("App", "LiveVerify started")
        // Enable device orientation updates for camera orientation handling
        UIDevice.current.beginGeneratingDeviceOrientationNotifications()
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
