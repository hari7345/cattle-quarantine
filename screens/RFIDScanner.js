import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Animated,
  Modal,
  Vibration,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import Rfid from "../assets/images/rfid.png";
const { width, height } = Dimensions.get("window");

export default function RFIDScanner({ navigation }) {
  const [isScanning, setIsScanning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [rfidData, setRfidData] = useState("");

  // Animation values
  const scanLineAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const cornerAnim = useRef(new Animated.Value(0)).current;
  const successAnim = useRef(new Animated.Value(0)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;
  const iconPulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Icon pulsating animation (always running)
    Animated.loop(
      Animated.sequence([
        Animated.timing(iconPulseAnim, {
          toValue: 1.15,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(iconPulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    if (isScanning) {
      // Scanning line animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanLineAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(scanLineAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Pulse animation for corners
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Corner highlight animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(cornerAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(cornerAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Wave animation for RFID signals
      Animated.loop(
        Animated.sequence([
          Animated.timing(waveAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(waveAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isScanning]);

  useEffect(() => {
    if (showSuccess) {
      Animated.spring(successAnim, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }).start();
    } else {
      successAnim.setValue(0);
    }
  }, [showSuccess]);

  const startScanning = () => {
    setIsScanning(true);

    // Simulate RFID detection after 2-3 seconds
    // In production, this would be replaced with actual RFID reader integration
    setTimeout(() => {
      handleRFIDDetected();
    }, 2500);
  };

  const handleRFIDDetected = () => {
    // Generate a simulated RFID tag (in production, this comes from RFID reader)
    const simulatedRFID = `RFID-${Date.now().toString().slice(-8)}`;

    setIsScanning(false);
    setRfidData(simulatedRFID);

    // Vibrate on successful scan (pattern: short-pause-short-pause-long)
    Vibration.vibrate([0, 100, 50, 100, 50, 200]);

    setShowSuccess(true);

    // Navigate to form after showing success message
    setTimeout(() => {
      setShowSuccess(false);
      navigation.navigate("CattleDetailsForm", { rfidData: simulatedRFID });
    }, 1800);
  };

  const cancelScanning = () => {
    setIsScanning(false);
  };

  const scanLineTranslateY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 250],
  });

  const cornerOpacity = cornerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  const waveScale = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2.5],
  });

  const waveOpacity = waveAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.8, 0.4, 0],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <LinearGradient
        colors={["#1a5f3a", "#2d7a4f", "#3d8f5f"]}
        style={styles.container}
      >
        {/* Top Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.headerButtonText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>RFID Scanner</Text>
          <View style={styles.headerButton} />
        </View>

        {/* Scanning Area */}
        <View style={styles.scanningArea}>
          <View style={styles.overlay}>
            {/* Instructions */}
            <View style={styles.instructionContainer}>
              <Text style={styles.instructionText}>
                {isScanning
                  ? "Hold device near RFID tag..."
                  : "Tap button below to scan RFID tag"}
              </Text>
              {isScanning && (
                <View style={styles.statusBadge}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>Scanning...</Text>
                </View>
              )}
            </View>

            {/* RFID Scanning Frame */}
            <View style={styles.frameContainer}>
              {/* Corner decorations */}
              {isScanning && (
                <>
                  <Animated.View
                    style={[
                      styles.corner,
                      styles.cornerTopLeft,
                      {
                        opacity: cornerOpacity,
                        transform: [{ scale: pulseAnim }],
                      },
                    ]}
                  />
                  <Animated.View
                    style={[
                      styles.corner,
                      styles.cornerTopRight,
                      {
                        opacity: cornerOpacity,
                        transform: [{ scale: pulseAnim }],
                      },
                    ]}
                  />
                  <Animated.View
                    style={[
                      styles.corner,
                      styles.cornerBottomLeft,
                      {
                        opacity: cornerOpacity,
                        transform: [{ scale: pulseAnim }],
                      },
                    ]}
                  />
                  <Animated.View
                    style={[
                      styles.corner,
                      styles.cornerBottomRight,
                      {
                        opacity: cornerOpacity,
                        transform: [{ scale: pulseAnim }],
                      },
                    ]}
                  />
                </>
              )}

              {/* RFID Wave Animations */}
              {isScanning && (
                <>
                  <Animated.View
                    style={[
                      styles.rfidWave,
                      {
                        transform: [{ scale: waveScale }],
                        opacity: waveOpacity,
                      },
                    ]}
                  />
                  <Animated.View
                    style={[
                      styles.rfidWave,
                      styles.rfidWaveDelay,
                      {
                        transform: [{ scale: waveScale }],
                        opacity: waveOpacity,
                      },
                    ]}
                  />
                </>
              )}

              {/* Scanning Line */}
              {isScanning && (
                <Animated.View
                  style={[
                    styles.scanLine,
                    {
                      transform: [{ translateY: scanLineTranslateY }],
                    },
                  ]}
                >
                  <LinearGradient
                    colors={[
                      "transparent",
                      "rgba(46, 204, 113, 0.8)",
                      "transparent",
                    ]}
                    style={styles.scanLineGradient}
                  />
                </Animated.View>
              )}

              {/* Center Icon */}
              <View style={styles.centerIconContainer}>
                <LinearGradient
                  colors={
                    isScanning
                      ? ["rgba(22, 160, 133, 0.9)", "rgba(46, 204, 113, 0.9)"]
                      : ["rgba(22, 160, 133, 0.5)", "rgba(46, 204, 113, 0.5)"]
                  }
                  style={styles.centerIconBg}
                >
                  {/* <Text style={styles.centerIcon}>📡</Text> */}
                  <Animated.Image
                    source={Rfid}
                    style={[
                      styles.centerIcon,
                      {
                        transform: [{ scale: iconPulseAnim }],
                      },
                    ]}
                    resizeMode="contain"
                  />
                </LinearGradient>
              </View>
            </View>

            {/* Bottom Info and Button */}
            <View style={styles.infoContainer}>
              <View style={styles.infoCard}>
                {/* <Text style={styles.infoTitle}>📡 RFID Technology</Text> */}
                <Text style={styles.infoText}>
                  Hold your device close to the RFID tag.
                </Text>
              </View>

              {/* Scan Button */}
              {!isScanning ? (
                <TouchableOpacity
                  style={styles.scanButton}
                  onPress={startScanning}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={["#16a085", "#1abc9c", "#2ecc71"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.scanButtonGradient}
                  >
                    <Text style={styles.scanButtonText}>Start Scanning</Text>
                    {/* <Text style={styles.scanButtonIcon}>📡</Text> */}
                  </LinearGradient>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={cancelScanning}
                  activeOpacity={0.8}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        {/* Success Modal */}
        <Modal
          transparent
          visible={showSuccess}
          animationType="none"
          onRequestClose={() => setShowSuccess(false)}
        >
          <View style={styles.successOverlay}>
            <Animated.View
              style={[
                styles.successCard,
                {
                  transform: [
                    { scale: successAnim },
                    {
                      translateY: successAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0],
                      }),
                    },
                  ],
                  opacity: successAnim,
                },
              ]}
            >
              <LinearGradient
                colors={["#16a085", "#1abc9c", "#2ecc71"]}
                style={styles.successGradient}
              >
                <View style={styles.successIconContainer}>
                  <Text style={styles.successIcon}>✓</Text>
                </View>
                <Text style={styles.successTitle}>Scan Successful!</Text>
                <Text style={styles.successSubtitle}>RFID Tag Detected</Text>
                <View style={styles.successDataContainer}>
                  <Text style={styles.successDataLabel}>Tag ID:</Text>
                  <Text style={styles.successDataValue}>{rfidData}</Text>
                </View>
              </LinearGradient>
            </Animated.View>
          </View>
        </Modal>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1a5f3a",
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  headerButtonText: {
    fontSize: 24,
    color: "#ffffff",
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  scanningArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    paddingVertical: 40,
  },
  instructionContainer: {
    alignItems: "center",
    paddingHorizontal: 40,
  },
  instructionText: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 16,
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(46, 204, 113, 0.9)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ffffff",
    marginRight: 8,
  },
  statusText: {
    fontSize: 13,
    color: "#ffffff",
    fontWeight: "700",
  },
  frameContainer: {
    width: 280,
    height: 280,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  corner: {
    position: "absolute",
    width: 40,
    height: 40,
    borderColor: "#2ecc71",
    borderWidth: 4,
  },
  cornerTopLeft: {
    top: 0,
    left: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderTopLeftRadius: 8,
  },
  cornerTopRight: {
    top: 0,
    right: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderTopRightRadius: 8,
  },
  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomLeftRadius: 8,
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
  },
  scanLine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
  },
  scanLineGradient: {
    flex: 1,
  },
  centerIconContainer: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  centerIconBg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  centerIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  infoContainer: {
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 20,
  },
  infoCard: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    maxWidth: 340,
    width: "100%",
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: 20,
    textAlign: "center",
  },
  rfidWave: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 3,
    borderColor: "rgba(46, 204, 113, 0.6)",
  },
  rfidWaveDelay: {
    borderColor: "rgba(26, 188, 156, 0.6)",
  },
  scanButton: {
    width: "100%",
    maxWidth: 340,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#2ecc71",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  scanButtonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  scanButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
  },
  scanButtonIcon: {
    fontSize: 24,
  },
  cancelButton: {
    width: "100%",
    maxWidth: 340,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    backgroundColor: "rgba(231, 76, 60, 0.9)",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
  },
  successOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  successCard: {
    width: width - 80,
    borderRadius: 24,
    overflow: "hidden",
    elevation: 10,
    shadowColor: "#2ecc71",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
  },
  successGradient: {
    padding: 32,
    alignItems: "center",
  },
  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 4,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  successIcon: {
    fontSize: 48,
    color: "#ffffff",
    fontWeight: "700",
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 24,
  },
  successDataContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  successDataLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 4,
  },
  successDataValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
  },
});
