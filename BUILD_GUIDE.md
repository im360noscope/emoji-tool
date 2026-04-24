# Emojis — LightOS-style APK

A minimal emoji picker built to match the LightOS aesthetic: black background,
white monospaced text, hairline borders, wide letter-spacing. No color.

## What it does

- Opens to a full scrollable grid of all Android 14 emoji, grouped by category
- Tap any emoji to select it (white border + dot indicator)
- Tap again to deselect
- Selected emoji appear in a single line at the top with a ⎘ clipboard icon
- Tap the clipboard icon → emoji copied → toast says "COPIED"
- CLEAR button resets the selection

---

## How to build the APK

### Option A — Android Studio (easiest, no command line)

1. Install Android Studio: https://developer.android.com/studio
2. Open Android Studio → "Open an existing project" → select the `EmojiApp/` folder
3. Wait for Gradle sync to finish (takes a few minutes first time)
4. In the top menu: Build → Generate Signed Bundle / APK → APK
5. Create a keystore (or use an existing one), fill in details, click Finish
6. APK will be in `android/app/release/app-release.apk`

### Option B — Command line (if you have Android Studio installed)

```bash
# Install JS dependencies first
cd EmojiApp
npm install

# Build debug APK (no signing needed, works for sideloading)
cd android
./gradlew assembleDebug

# APK will be at:
# android/app/build/outputs/apk/debug/app-debug.apk
```

### Option C — EAS Build (cloud, no Android Studio needed)

```bash
npm install -g eas-cli
npm install
eas login          # create free account at expo.dev if needed
eas build --platform android --profile preview
# Download the .apk from the link it gives you
```

---

## Installing on Light Phone III

1. On the Light Phone III: Settings → Privacy & Security → Install unknown apps
2. Enable "Allow from this source" for your file manager or ADB
3. Transfer the APK via USB or ADB:
   ```bash
   adb install app-debug.apk
   ```
4. The app will appear as "Emojis" in your app list

---

## Notes

- The app uses React Native 0.76.5 with the new architecture enabled
- Clipboard API uses the built-in RN Clipboard (no extra package needed)
- No internet permission required — fully offline
- Target SDK: Android 14 (API 34)
