SMART STOP — INSTALLABLE PWA STARTER

What this is:
- A small installable web-app starter for iPhone and Android.
- Includes sample Dubai destinations, GPS location monitoring while open, distance display, and an in-app sound/vibration alert when within the chosen radius.
- It is a prototype, not a production-ready transit app.

Important limitations:
- The sample stop coordinates are approximate and must be verified before real travel use.
- No official RTA data, route matching, station platform data, backend, or server notifications are included.
- Browser geolocation checks only while the app is active in this prototype. Do not rely on it to wake you when the phone is locked or the app is closed.
- PWA installation requires hosting these files on an HTTPS website. Opening index.html directly from the ZIP is not enough to install it as an app.

Simple deployment option:
1. Create a GitHub account and a new public repository named smart-stop.
2. Upload all files from this folder to the repository root.
3. In repository Settings > Pages, select Deploy from a branch, choose main and /(root), then Save.
4. Wait for GitHub Pages to publish the HTTPS site.
5. Open the published URL on your phone.

Install on iPhone:
1. Open the published HTTPS URL in Safari.
2. Tap Share.
3. Choose Add to Home Screen.
4. Enable Open as Web App if shown, then tap Add.

Install on Android:
1. Open the published HTTPS URL in Chrome.
2. Tap the menu (three dots).
3. Choose Install app (or Add to Home screen), then confirm.

Before public launch:
- Replace sample stop coordinates with verified data.
- Confirm permission and access to RTA route/stop data.
- Test GPS, battery use, and alarm behavior across iOS and Android.
- For reliable locked-screen alerts, consider a native app or platform-specific background-location implementation and test thoroughly.
