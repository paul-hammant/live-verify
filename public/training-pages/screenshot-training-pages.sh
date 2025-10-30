#!/bin/bash

# Screenshot training pages using Firefox headless mode
# Usage: ./screenshot-training-pages.sh

set -e

PAGES_DIR="$(cd "$(dirname "$0")" && pwd)"
SCREENSHOTS_DIR="${PAGES_DIR}/../../test/fixtures/screenshots"

# Create screenshots directory if it doesn't exist
mkdir -p "${SCREENSHOTS_DIR}"

# Function to take a screenshot of a training page
screenshot_page() {
    local html_file="$1"
    local output_name="$2"

    echo "📸 Screenshotting: ${html_file} -> ${output_name}.png"

    cd "${SCREENSHOTS_DIR}"
    # Use 4K resolution (3840x2160) with 3x device scaling for better OCR quality
    # This effectively gives us 11520x6480 rendering quality for crisp text
    firefox -headless --window-size=3840,2160 --force-device-scale-factor=3 -screenshot "file://${PAGES_DIR}/${html_file}"

    # Trim whitespace and add 20px border
    convert screenshot.png -trim -bordercolor white -border 20 "${output_name}.png"
    rm screenshot.png

    echo "✅ Saved: ${SCREENSHOTS_DIR}/${output_name}.png"

    # Create rotated versions (85, 175, 265 degrees - off by 5° from 90°, 180°, 270°)
    echo "🔄 Rotating: ${output_name}.png -> ${output_name}-rotated-85.png (85° - off 90°)"
    convert "${output_name}.png" -rotate 85 "${output_name}-rotated-85.png"
    echo "✅ Saved: ${SCREENSHOTS_DIR}/${output_name}-rotated-85.png"

    echo "🔄 Rotating: ${output_name}.png -> ${output_name}-rotated-175.png (175° - off 180°)"
    convert "${output_name}.png" -rotate 175 "${output_name}-rotated-175.png"
    echo "✅ Saved: ${SCREENSHOTS_DIR}/${output_name}-rotated-175.png"

    echo "🔄 Rotating: ${output_name}.png -> ${output_name}-rotated-265.png (265° - off 270°)"
    convert "${output_name}.png" -rotate 265 "${output_name}-rotated-265.png"
    echo "✅ Saved: ${SCREENSHOTS_DIR}/${output_name}-rotated-265.png"
}

echo "Starting screenshot generation..."
echo ""

# Screenshot each training page (explicit calls, no loops)
screenshot_page "bachelor-thaumatology.html" "bachelor-thaumatology"
screenshot_page "bachelor-thaumatology-square.html" "bachelor-thaumatology-square"
screenshot_page "master-applied-anthropics.html" "master-applied-anthropics"
screenshot_page "doctorate-high-energy-magic.html" "doctorate-high-energy-magic"
screenshot_page "medical-license-revoked.html" "medical-license-revoked"
# screenshot_page "Harold_Finch_CV.html" "harold-finch-cv" = needs interactivity
screenshot_page "driving-license-nordia-svg.html" "driving-license-nordia-svg"
screenshot_page "hotel-receipt-scheidegg.html" "hotel-receipt-scheidegg"
screenshot_page "uk-coffee-shop.html" "uk-coffee-shop"
screenshot_page "uk-electronics-store.html" "uk-electronics-store"
screenshot_page "us-burrito-shop.html" "us-burrito-shop"
screenshot_page "us-home-improvement.html" "us-home-improvement"

echo ""
echo "✅ All screenshots generated in: ${SCREENSHOTS_DIR}"
echo ""
ls -lh "${SCREENSHOTS_DIR}"/*.png
