# Troubleshooting Guide - Live Stock Quarantine App

## Common Issues and Solutions

### 1. ✅ FIXED: Cannot find module 'babel-preset-expo'

**Error:**

```
ERROR node_modules/expo/AppEntry.js: Cannot find module 'babel-preset-expo'
```

**Solution:**
This has been fixed by adding `babel-preset-expo` to devDependencies. If you encounter this again:

```bash
npm install --save-dev babel-preset-expo
```

**Why it happened:**
After upgrading to SDK 54, the babel preset needed to be explicitly installed as a dev dependency.

---

### 2. Port Already in Use

**Error:**

```
Port 8081 is running this app in another window
```

**Solution:**

**Option A - Let Expo use another port:**
When prompted, press 'y' to use port 8082 instead.

**Option B - Kill the existing process:**

```bash
# Kill Expo processes
pkill -f "expo start"

# Or kill specific port
lsof -ti:8081 | xargs kill -9
```

Then restart:

```bash
npm start
```

---

### 3. Metro Bundler Errors

**Error:**

```
Cannot find module 'metro/src/lib/TerminalReporter'
```

**Solution:**

```bash
# Clear cache and restart
npx expo start --clear

# If that doesn't work, reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npx expo start --clear
```

---

### 4. Module Not Found Errors

**Error:**

```
Cannot find module 'some-package'
```

**Solution:**

**Step 1 - Install missing package:**

```bash
npx expo install package-name
```

**Step 2 - If still issues, fix all dependencies:**

```bash
npx expo install --fix
```

**Step 3 - Nuclear option (clean reinstall):**

```bash
rm -rf node_modules package-lock.json
npm install
```

---

### 5. App Won't Load on Device

**Issue:** QR code scanned but app doesn't load

**Solutions:**

1. **Check WiFi:** Ensure phone and computer are on same network
2. **Update Expo Go:** Update to latest version from App Store/Play Store
3. **Restart server:**
   ```bash
   npx expo start --clear
   ```
4. **Try tunnel mode:**
   ```bash
   npx expo start --tunnel
   ```

---

### 6. Changes Not Appearing

**Issue:** Made code changes but app doesn't update

**Solutions:**

1. **Reload app:** Shake device → "Reload"
2. **Or press 'r' in terminal**
3. **Clear cache:**
   ```bash
   npx expo start --clear
   ```
4. **Check if file saved:** Ensure you saved the file (Cmd+S / Ctrl+S)

---

### 7. React 19 Compatibility Issues

**Issue:** Some packages may not be compatible with React 19 yet

**Solution:**

Check package compatibility:

```bash
npx expo-doctor
```

If a specific package is incompatible:

- Check for updated version
- Check package's GitHub issues
- Consider alternative package
- Or temporarily downgrade React (not recommended)

---

### 8. Build Errors

**Error:** Various build/compile errors

**Solution:**

**Step 1 - Clear all caches:**

```bash
# Clear Expo cache
npx expo start --clear

# Clear Metro cache
rm -rf .expo
rm -rf node_modules/.cache

# Clear watchman (if installed)
watchman watch-del-all
```

**Step 2 - Reinstall:**

```bash
rm -rf node_modules package-lock.json
npm install
```

**Step 3 - Restart computer** (sometimes needed for port/process issues)

---

### 9. Gradle/CocoaPods Errors (Native Builds)

**Issue:** Errors when building for iOS/Android

**Solution:**

**For iOS:**

```bash
cd ios
pod install
cd ..
npx expo run:ios
```

**For Android:**

```bash
cd android
./gradlew clean
cd ..
npx expo run:android
```

---

### 10. TypeScript Errors (if using TypeScript)

**Issue:** Type errors with React 19

**Solution:**

Update TypeScript and types:

```bash
npm install --save-dev typescript@latest
npm install --save-dev @types/react@latest @types/react-native@latest
```

---

## Diagnostic Commands

### Check Versions

```bash
# Expo version
npx expo --version

# Node version
node --version

# npm version
npm --version

# List installed packages
npm list --depth=0
```

### Run Diagnostics

```bash
# Full diagnostic
npx expo-doctor --verbose

# Check for outdated packages
npm outdated
```

### Clear Everything

```bash
# Nuclear option - clear everything and reinstall
rm -rf node_modules
rm -rf .expo
rm -rf package-lock.json
rm -rf yarn.lock
npm install
npx expo start --clear
```

---

## Getting Help

### 1. Check Documentation

- [Expo Docs](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [React 19 Docs](https://react.dev/)

### 2. Search Issues

- [Expo GitHub Issues](https://github.com/expo/expo/issues)
- [React Native GitHub Issues](https://github.com/facebook/react-native/issues)

### 3. Community Support

- [Expo Forums](https://forums.expo.dev/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/expo)
- [Reddit r/reactnative](https://reddit.com/r/reactnative)

### 4. Run Diagnostics

```bash
npx expo-doctor --verbose
```

---

## Prevention Tips

### 1. Keep Dependencies Updated

```bash
# Check for updates
npm outdated

# Update specific package
npx expo install package-name@latest
```

### 2. Use Version Control

```bash
# Initialize git if not already
git init
git add .
git commit -m "Working state"
```

### 3. Regular Cache Clearing

```bash
# Clear cache weekly or when issues arise
npx expo start --clear
```

### 4. Document Custom Changes

Keep notes of any custom configurations or workarounds.

---

## Quick Reference

### Start Development Server

```bash
npm start
```

### Clear Cache and Start

```bash
npx expo start --clear
```

### Reinstall Dependencies

```bash
rm -rf node_modules package-lock.json
npm install
```

### Fix Dependencies

```bash
npx expo install --fix
```

### Run Diagnostics

```bash
npx expo-doctor
```

---

## Current Setup (SDK 54)

**Working Configuration:**

- Expo: ~54.0.0
- React: 19.1.0
- React Native: 0.81.5
- babel-preset-expo: ^54.0.7 ✅
- expo-linear-gradient: ~15.0.7
- expo-status-bar: ~3.0.8

**Status:** ✅ All issues resolved, app running successfully

---

**Last Updated:** December 3, 2025
