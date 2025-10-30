#!/bin/bash

# Test script: Generate screenshots and run E2E verification tests
# Copyright (C) 2025, Paul Hammant - AGPL-3.0-or-later

set -e

echo "============================================"
echo "Screenshot Verification Test Suite"
echo "============================================"
echo ""

# Check for ImageMagick
if ! command -v convert &> /dev/null; then
    echo "❌ ERROR: ImageMagick 'convert' command not found"
    echo ""
    echo "Please install ImageMagick:"
    echo "  Ubuntu/Debian: sudo apt install imagemagick"
    echo "  macOS: brew install imagemagick"
    echo ""
    exit 1
fi

# Check for Firefox (used by screenshot script)
if ! command -v firefox &> /dev/null; then
    echo "❌ ERROR: Firefox not found"
    echo ""
    echo "Please install Firefox for screenshot generation"
    echo ""
    exit 1
fi

echo "✅ Prerequisites met"
echo ""

# Generate screenshots
echo "📸 Generating screenshots from training pages..."
echo ""
cd public/training-pages
./screenshot-training-pages.sh
cd ../..

echo ""
echo "============================================"
echo "🚀 Starting local server on port 8000..."
echo "============================================"
echo ""

# Start local server in background
cd public
python3 -m http.server 8000 > /dev/null 2>&1 &
SERVER_PID=$!
cd ..

# Give server time to start
sleep 2

# Check if server is running
if ! curl -s http://localhost:8000/ > /dev/null; then
    echo "❌ ERROR: Server failed to start on port 8000"
    kill $SERVER_PID 2>/dev/null
    exit 1
fi

echo "✅ Server running on http://localhost:8000 (PID: $SERVER_PID)"
echo ""

echo "============================================"
echo "🧪 Running E2E screenshot verification tests..."
echo "============================================"
echo ""

# Run Playwright tests for screenshot verification
npm run test:e2e -- screenshot-verification
TEST_EXIT_CODE=$?

echo ""
echo "============================================"
echo "🛑 Stopping local server..."
echo "============================================"
echo ""

# Stop the server
kill $SERVER_PID 2>/dev/null
wait $SERVER_PID 2>/dev/null

if [ $TEST_EXIT_CODE -eq 0 ]; then
    echo "============================================"
    echo "✅ Screenshot verification tests complete!"
    echo "============================================"
else
    echo "============================================"
    echo "❌ Some tests failed (exit code: $TEST_EXIT_CODE)"
    echo "============================================"
    exit $TEST_EXIT_CODE
fi
