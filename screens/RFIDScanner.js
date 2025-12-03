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
  Alert,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function RFIDScanner({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [rfidData, setRfidData] = useState("");

  // Animation values
  const scanLineAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const cornerAnim = useRef(new Animated.Value(0)).current;
  const successAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Scanning line animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Pulse animation for corners
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Corner highlight animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(cornerAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(cornerAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

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

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <LinearGradient
          colors={["#1a5f3a", "#2d7a4f", "#3d8f5f"]}
          style={styles.permissionContainer}
        >
          <View style={styles.permissionContent}>
            <Text style={styles.permissionIcon}>📸</Text>
            <Text style={styles.permissionTitle}>Camera Access Required</Text>
            <Text style={styles.permissionText}>
              We need camera access to scan RFID tags on your cattle
            </Text>
            <TouchableOpacity
              style={styles.permissionButton}
              onPress={requestPermission}
            >
              <LinearGradient
                colors={["#16a085", "#1abc9c", "#2ecc71"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.permissionButtonGradient}
              >
                <Text style={styles.permissionButtonText}>
                  Grant Permission
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  const handleBarCodeScanned = ({ type, data }) => {
    if (!scanned) {
      setScanned(true);
      setRfidData(data);
      setShowSuccess(true);

      // Navigate to form after showing success message
      setTimeout(() => {
        setShowSuccess(false);
        navigation.navigate("CattleDetailsForm", { rfidData: data });
      }, 1500);
    }
  };

  const scanLineTranslateY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 250],
  });

  const cornerOpacity = cornerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        {/* Camera View */}
        <CameraView
          style={styles.camera}
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: [
              "qr",
              "ean13",
              "ean8",
              "code128",
              "code39",
              "pdf417",
              "aztec",
            ],
          }}
        >
          {/* Top Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.headerButtonText}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Scan RFID Tag</Text>
            <View style={styles.headerButton} />
          </View>

          {/* Scanning Frame */}
          <View style={styles.scanningArea}>
            <View style={styles.overlay}>
              {/* Instructions */}
              <View style={styles.instructionContainer}>
                <Text style={styles.instructionText}>
                  Position the RFID tag within the frame
                </Text>
                <View style={styles.statusBadge}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>Scanning...</Text>
                </View>
              </View>

              {/* Scanning Frame */}
              <View style={styles.frameContainer}>
                {/* Corner decorations */}
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

                {/* Scanning Line */}
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

                {/* Center Icon */}
                <View style={styles.centerIconContainer}>
                  <LinearGradient
                    colors={[
                      "rgba(22, 160, 133, 0.8)",
                      "rgba(46, 204, 113, 0.8)",
                    ]}
                    style={styles.centerIconBg}
                  >
                    <Text style={styles.centerIcon}>🏷️</Text>
                  </LinearGradient>
                </View>
              </View>

              {/* Bottom Info */}
              <View style={styles.infoContainer}>
                <View style={styles.infoCard}>
                  <Text style={styles.infoTitle}>📱 How to Scan</Text>
                  <Text style={styles.infoText}>
                    Hold your device steady and align the RFID tag with the
                    scanning frame
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </CameraView>

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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000000",
  },
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  camera: {
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
    fontSize: 40,
  },
  infoContainer: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  infoCard: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    maxWidth: 340,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    lineHeight: 18,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  permissionContent: {
    alignItems: "center",
    paddingHorizontal: 40,
  },
  permissionIcon: {
    fontSize: 80,
    marginBottom: 24,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 12,
    textAlign: "center",
  },
  permissionText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  permissionButton: {
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
  },
  permissionButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
  },
  permissionButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
  },
  backButton: {
    paddingVertical: 12,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.8)",
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
