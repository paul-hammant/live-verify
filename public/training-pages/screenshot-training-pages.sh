#!/bin/bash

# Screenshot training pages using Firefox headless mode
# Usage: ./screenshot-training-pages.sh

set -e

PAGES_DIR="$(cd "$(dirname "$0")" && pwd)"
PUBLIC_SCREENSHOTS_DIR="${PAGES_DIR}/../screenshots"
TEST_SCREENSHOTS_DIR="${PAGES_DIR}/../../test/fixtures/screenshots"

# Create screenshots directories if they don't exist
mkdir -p "${PUBLIC_SCREENSHOTS_DIR}"
mkdir -p "${TEST_SCREENSHOTS_DIR}"

# Function to take a screenshot of a training page
screenshot_page() {
    local html_file="$1"
    local output_name="$2"

    echo "📸 Screenshotting: ${html_file} -> ${output_name}.png"

    cd "${PUBLIC_SCREENSHOTS_DIR}"
    # Use 4K resolution (3840x2160) with 3x device scaling for better OCR quality
    # This effectively gives us 11520x6480 rendering quality for crisp text
    firefox -headless --window-size=3840,2160 --force-device-scale-factor=3 -screenshot "file://${PAGES_DIR}/${html_file}"

    # Trim whitespace and add 20px border
    convert screenshot.png -trim -bordercolor white -border 20 "${output_name}.png"
    rm screenshot.png

    echo "✅ Saved: ${PUBLIC_SCREENSHOTS_DIR}/${output_name}.png"

    # Create rotated versions in test fixtures (test-specific, not for public demos)
    # Note: Base screenshots are in public/screenshots/, only rotated variants go here
    cd "${TEST_SCREENSHOTS_DIR}"
    echo "🔄 Rotating: ${output_name}.png -> ${output_name}-rotated-85.png (85° - off 90°)"
    convert "${PUBLIC_SCREENSHOTS_DIR}/${output_name}.png" -rotate 85 "${output_name}-rotated-85.png"
    echo "✅ Saved: ${TEST_SCREENSHOTS_DIR}/${output_name}-rotated-85.png"

    echo "🔄 Rotating: ${output_name}.png -> ${output_name}-rotated-175.png (175° - off 180°)"
    convert "${PUBLIC_SCREENSHOTS_DIR}/${output_name}.png" -rotate 175 "${output_name}-rotated-175.png"
    echo "✅ Saved: ${TEST_SCREENSHOTS_DIR}/${output_name}-rotated-175.png"

    echo "🔄 Rotating: ${output_name}.png -> ${output_name}-rotated-265.png (265° - off 270°)"
    convert "${PUBLIC_SCREENSHOTS_DIR}/${output_name}.png" -rotate 265 "${output_name}-rotated-265.png"
    echo "✅ Saved: ${TEST_SCREENSHOTS_DIR}/${output_name}-rotated-265.png"
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
screenshot_page "uk-corner-shop.html" "uk-corner-shop"
screenshot_page "uk-electronics-store.html" "uk-electronics-store"
screenshot_page "us-burrito-shop.html" "us-burrito-shop"
screenshot_page "us-home-improvement.html" "us-home-improvement"

echo ""
echo "✅ All screenshots generated!"
echo ""
echo "📁 Public screenshots (base images for docs/demos): ${PUBLIC_SCREENSHOTS_DIR}"
ls -lh "${PUBLIC_SCREENSHOTS_DIR}"/*.png
echo ""
echo "📁 Test screenshots (rotated variants only - base images in public/): ${TEST_SCREENSHOTS_DIR}"
ls -lh "${TEST_SCREENSHOTS_DIR}"/*.png | head -20
echo "... (total $(ls -1 "${TEST_SCREENSHOTS_DIR}"/*.png | wc -l) rotated variants)"
