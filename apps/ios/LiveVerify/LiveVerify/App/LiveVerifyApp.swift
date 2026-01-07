// Copyright (C) 2025, Paul Hammant
// SPDX-License-Identifier: AGPL-3.0-or-later

import SwiftUI
import UIKit

/// Simple logging utility with timestamp and build info
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

    static func d(_ tag: String, _ message: String) {
        let timestamp = dateFormatter.string(from: Date())
        print("\(timestamp) [\(buildInfo)] [\(tag)] \(message)")
    }
}

@main
struct LiveVerifyApp: App {
    init() {
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
