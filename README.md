# Emojis

A simple emoji picker for the Light Phone III.

Browse all Android 14 emoji organized by category. Tap to add emoji to your selection, tap COPY to copy them to your clipboard, and CLEAR to start over.

Built with [vandamd's light-template](https://github.com/vandamd/light-template) — a community-made Expo template for building LightOS-style apps for the Light Phone III.

---

## Features

- Full Android 14 emoji set organized by category
- Tap any emoji to add it to your selection
- Tap the same emoji multiple times to add it more than once
- COPY copies your selection to the clipboard
- CLEAR resets your selection
- Respects LightOS theme (black/white mode)
- Haptic feedback on every tap

---

## Building

This project uses [Expo](https://expo.dev) and [EAS Build](https://docs.expo.dev/build/introduction/).

### Prerequisites

- [Bun](https://bun.sh)
- [EAS CLI](https://docs.expo.dev/build/setup/)
- An Expo account

### Steps

```bash
bun install
eas login
eas build --platform android --profile preview
```

EAS will build the APK in the cloud and provide a download link.

---

## Installing on Light Phone III

1. Download the APK from the latest [GitHub Release](../../releases)
2. On your Light Phone III, enable installing from unknown sources
3. Transfer and install the APK, or use [Obtainium](https://github.com/ImranR98/Obtainium) to manage updates automatically

---

## Credits

- [vandamd](https://github.com/vandamd) — [light-template](https://github.com/vandamd/light-template), the community Expo template this app is built on
- [The Light Phone](https://www.thelightphone.com) — for building a phone worth making apps for
