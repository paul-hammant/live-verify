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
    firefox -headless -screenshot "file://${PAGES_DIR}/${html_file}"

    # Trim whitespace and add 20px border
    convert screenshot.png -trim -bordercolor white -border 20 "${output_name}.png"
    rm screenshot.png

    echo "✅ Saved: ${SCREENSHOTS_DIR}/${output_name}.png"
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
