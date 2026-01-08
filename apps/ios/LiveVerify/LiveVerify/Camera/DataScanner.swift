// Copyright (C) 2025, Paul Hammant
// SPDX-License-Identifier: AGPL-3.0-or-later

import SwiftUI
import UIKit
import VisionKit

/// DataScannerViewController wrapper for SwiftUI
/// Users tap on recognized text to select it for verification
struct DataScanner: UIViewControllerRepresentable {

    @Binding var isScanning: Bool
    @Binding var scannedText: String

    func makeUIViewController(context: Context) -> DataScannerViewController {
        let controller = DataScannerViewController(
            recognizedDataTypes: [.text()],
            qualityLevel: .accurate,
            recognizesMultipleItems: true,
            isHighFrameRateTrackingEnabled: true,
            isHighlightingEnabled: true
        )

        controller.delegate = context.coordinator

        return controller
    }

    func updateUIViewController(_ uiViewController: DataScannerViewController, context: Context) {
        if isScanning {
            if !uiViewController.isScanning {
                try? uiViewController.startScanning()
                Log.d("DataScanner", "Started scanning")
            }
        } else {
            if uiViewController.isScanning {
                uiViewController.stopScanning()
                Log.d("DataScanner", "Stopped scanning")
            }
        }
    }

    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }

    class Coordinator: NSObject, DataScannerViewControllerDelegate {
        var parent: DataScanner

        init(_ parent: DataScanner) {
            self.parent = parent
        }

        func dataScanner(_ dataScanner: DataScannerViewController, didTapOn item: RecognizedItem) {
            switch item {
            case .text(let text):
                Log.d("DataScanner", "Tapped text: \(text.transcript)")
                // Replace - each tap replaces previous selection
                parent.scannedText = text.transcript
            default:
                break
            }
        }

        func dataScanner(_ dataScanner: DataScannerViewController, didAdd addedItems: [RecognizedItem], allItems: [RecognizedItem]) {
            Log.d("DataScanner", "Detected \(allItems.count) items")
        }
    }
}

/// Check if DataScanner is available on this device
extension DataScanner {
    static var isSupported: Bool {
        DataScannerViewController.isSupported
    }

    static var isAvailable: Bool {
        DataScannerViewController.isAvailable
    }
}
