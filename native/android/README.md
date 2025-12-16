# Live Verify (Android prototype)

Native Kotlin prototype of the web demo at `public/camera-app/index.html`.

Pipeline:

1. Capture photo (CameraX)
2. OCR (on-device, ML Kit Text Recognition)
3. Normalize text (mirrors the intent of `public/normalize.js`)
4. SHA-256
5. `GET` the issuer URL implied by the `verify:` line (plus optional `/.verification-meta.json`)
6. Show an affirming/denying result

## Privacy model (intent)

- OCR + normalization + hashing are performed on-device.
- The network call is a minimal `GET` to the issuer endpoint (and optionally `/.verification-meta.json` for issuer-defined response/normalization rules).
- This is a prototype; production camera-app integration would follow the same on-device model.

## Open in Android Studio

- Open `native/android/` as a project.
- Sync Gradle (it will download dependencies the first time).
- Run unit tests in `app/src/test/` (pure Kotlin logic tests).

## Build from CLI

- `cd native/android`
- List tasks: `./gradlew :app:tasks`
- Unit tests: `./gradlew :app:testDebugUnitTest`
- Debug APK: `./gradlew :app:assembleDebug`
- Install on device/emulator: `./gradlew :app:installDebug`
- Instrumented tests (device/emulator): `./gradlew :app:connectedDebugAndroidTest`

## Notes

- This first cut does **not** implement registration-mark detection + perspective correction (the web demo uses OpenCV for that).
- Domain “registrable authority” display uses the full host for now (no Public Suffix List integration yet).
