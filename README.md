# Live Stock Quarantine App

A React Native mobile application built with Expo for farm management and Live Stock health tracking.

## Features

- Beautiful onboarding screen with farm illustration
- Modern UI with gradient buttons
- Cross-platform support (iOS, Android, Web)

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI
- Expo Go app on your mobile device (for testing)

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

3. Scan the QR code with Expo Go (Android) or Camera app (iOS)

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start on Android emulator
- `npm run ios` - Start on iOS simulator
- `npm run web` - Start in web browser

## Project Structure

```
Live Stock-quarantine-app/
├── App.js              # Main app component with welcome screen
├── assets/             # Images and static resources
├── app.json            # Expo configuration
├── package.json        # Dependencies and scripts
└── babel.config.js     # Babel configuration
```

## Customization

### Adding the Farm Illustration

Replace the placeholder image at `assets/farm-illustration.png` with your custom farm illustration showing a cow and farmers.

### Styling

All styles are defined in `App.js` using StyleSheet. You can customize:

- Colors in the gradient button
- Typography sizes and weights
- Spacing and layout
- Background patterns

## Next Steps

- Add navigation (React Navigation)
- Create additional screens for Live Stock management
- Implement authentication
- Add data persistence
- Connect to backend API

## License

Private
