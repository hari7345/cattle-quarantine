# Quick Start Guide

## 🚀 Get Your App Running in 3 Steps

### Step 1: Start the Development Server

```bash
npm start
```

### Step 2: Open on Your Device

- Install **Expo Go** app on your phone
- Scan the QR code that appears in the terminal

### Step 3: See Your App!

Your welcome screen should now be visible on your device.

---

## 📱 Alternative Ways to Run

### On iOS Simulator (Mac only)

```bash
npm run ios
```

### On Android Emulator

```bash
npm run android
```

### In Web Browser

```bash
npm run web
```

---

## 🛠️ Common Commands

### Clear Cache and Restart

```bash
npx expo start --clear
```

### Install New Package

```bash
npx expo install package-name
```

### Check for Issues

```bash
npm run lint
```

---

## ❓ Troubleshooting

### "Cannot find module 'metro/src/lib/TerminalReporter'"

```bash
npx expo start --clear
```

### "Port 8081 already in use"

- Expo will automatically suggest using another port
- Just press 'y' to accept

### App Not Loading

1. Make sure your phone and computer are on the same WiFi
2. Try restarting the Expo server
3. Close and reopen Expo Go app

### Changes Not Appearing

- Save your files (Cmd+S / Ctrl+S)
- Shake your device and tap "Reload"
- Or press 'r' in the terminal

---

## 📂 Project Files

- **App.js** - Main app code (edit this to change the UI)
- **package.json** - Dependencies and scripts
- **app.json** - Expo configuration
- **assets/** - Images and resources

---

## 🎨 Quick Customizations

### Change Button Color

In `App.js`, find:

```javascript
colors={['#1a5f3a', '#165231']}
```

Replace with your preferred colors.

### Change Background Color

In `App.js`, find:

```javascript
backgroundColor: '#f5f5f0',
```

Replace with your preferred color.

### Change Text

In `App.js`, find the `<Text>` components and edit the content.

---

## 📚 Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [React Documentation](https://react.dev/)

---

## 🎯 What's Next?

1. **Add Your Logo/Illustration**

   - Place image in `assets/` folder
   - Update `App.js` to use it

2. **Add More Screens**

   - Install React Navigation
   - Create new screen components
   - Set up navigation structure

3. **Add Features**
   - User authentication
   - Data storage
   - API integration
   - Push notifications

---

## 💡 Tips

- **Auto-Reload**: Changes automatically reload in Expo Go
- **Console Logs**: Check terminal for `console.log()` output
- **Debugging**: Shake device → "Debug Remote JS"
- **Performance**: Use `React.memo()` for optimization

---

## 🆘 Need Help?

- Check `SETUP_INSTRUCTIONS.md` for detailed setup
- Check `APP_FEATURES.md` for design details
- Check `README.md` for project overview

---

**Happy Coding! 🐄👨‍🌾**
