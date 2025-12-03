# Setup Instructions

## The App is Ready! 🎉

Your Expo React Native app has been created with a welcome screen matching your design.

## What's Included

✅ Complete Expo React Native app structure
✅ Welcome screen with:

- "Everything Your Farm Needs in One App" title
- Subtitle text about keeping herd healthy
- Green "Get Started" button with gradient
- Background pattern with subtle circles
- Farm illustration placeholder (cow, farmer, bucket emojis)

✅ All dependencies installed
✅ Modern, responsive design
✅ Cross-platform support (iOS, Android, Web)

## How to Run the App

### Option 1: Using Expo Go (Recommended for Quick Testing)

1. Install Expo Go on your phone:

   - iOS: Download from App Store
   - Android: Download from Play Store

2. Start the development server:

   ```bash
   npm start
   ```

3. Scan the QR code:
   - iOS: Use Camera app
   - Android: Use Expo Go app

### Option 2: Using Simulators/Emulators

**iOS Simulator (Mac only):**

```bash
npm run ios
```

**Android Emulator:**

```bash
npm run android
```

**Web Browser:**

```bash
npm run web
```

## Fixing the Metro Error

If you encounter the "Cannot find module 'metro/src/lib/TerminalReporter'" error:

1. Clear the Expo cache:

   ```bash
   npx expo start --clear
   ```

2. Or reinstall metro:

   ```bash
   npm install metro --save-dev
   ```

3. If issues persist, try:
   ```bash
   rm -rf node_modules
   npm install
   npx expo start --clear
   ```

## Customizing the App

### Add Your Own Farm Illustration

Replace the emoji placeholders with a real image:

1. Add your illustration image to `assets/farm-illustration.png`
2. Update `App.js` to use the image instead of placeholders:

```javascript
// Replace the illustrationPlaceholder View with:
<Image
  source={require("./assets/farm-illustration.png")}
  style={styles.illustration}
  resizeMode="contain"
/>
```

### Customize Colors

In `App.js`, find the `styles` section and modify:

```javascript
// Button gradient colors
colors={['#1a5f3a', '#165231']}  // Change these hex values

// Background color
backgroundColor: '#f5f5f0',  // Change this

// Text colors
color: '#2d3436',  // Title color
color: '#636e72',  // Subtitle color
```

### Add Navigation

To add more screens, install React Navigation:

```bash
npm install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
```

## Project Structure

```
cattle-quarantine-app/
├── App.js                    # Main app component
├── app.json                  # Expo configuration
├── package.json              # Dependencies
├── babel.config.js           # Babel config
├── assets/                   # Images and resources
│   └── ASSETS_README.txt     # Asset requirements
├── node_modules/             # Dependencies (auto-generated)
└── README.md                 # Project documentation
```

## Next Steps

1. ✅ App is created and dependencies are installed
2. 🚀 Run `npm start` to launch the app
3. 📱 Test on your device or simulator
4. 🎨 Add your custom farm illustration
5. 🔧 Customize colors and styling
6. ➕ Add more screens and features

## Troubleshooting

### Port Already in Use

If port 8081 is busy, Expo will ask to use another port (like 8082). Just accept it.

### Cache Issues

```bash
npx expo start --clear
```

### Module Not Found Errors

```bash
npm install
```

### Need Help?

Check the Expo documentation: https://docs.expo.dev/

## Features to Add Next

- User authentication
- Cattle registration and tracking
- Health records management
- Quarantine period tracking
- Notifications and reminders
- Data synchronization
- Offline support

Enjoy building your farm management app! 🐄👨‍🌾
