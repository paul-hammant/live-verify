#!/usr/bin/env bash
set -euo pipefail
set -x

step() { echo "\n====> $*"; }

# Cleanup function to stop server on exit
cleanup() {
  if [[ -n "${SERVER_PID:-}" ]] && kill -0 "${SERVER_PID}" 2>/dev/null; then
    echo "Cleaning up: stopping server (PID: ${SERVER_PID})"
    kill "${SERVER_PID}" 2>/dev/null || true
  fi
}
trap cleanup EXIT INT TERM

step "Installing npm dependencies"
if [[ "${CI:-0}" == "1" ]]; then
  npm ci --foreground-scripts --loglevel=notice
else
  npm install --foreground-scripts --loglevel=notice
fi

step "Installing Playwright browsers"
npx playwright install --with-deps

step "Running unit tests (Jest)"
npm run test:unit

step "Starting local server for e2e tests"
cd public
python3 -m http.server 8000 &
SERVER_PID=$!
echo "Server started with PID: ${SERVER_PID}"
cd ..
sleep 2

step "Running e2e tests (Playwright)"
npm run test:e2e

step "All done (cleanup trap will stop server)"
