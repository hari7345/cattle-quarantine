import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import InitialBg from "../assets/images/initial.png";
const { width, height } = Dimensions.get("window");

export default function InitialPage({ navigation }) {
  const handleSignIn = () => {
    navigation.navigate("Login");
  };

  const handleScanQR = () => {
    console.log("Scan QR pressed");
    // Add QR scanning logic here
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Background pattern */}
      <View style={styles.backgroundPattern}>
        <View style={styles.patternCircle1} />
        <View style={styles.patternCircle2} />
        <View style={styles.patternCircle3} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Illustration Container */}
        <View style={styles.illustrationContainer}>
          {/* Decorative elements behind image */}
          <View style={styles.imageDecorativeCircle} />
          <View style={styles.imageBackdrop}>
            <Image
              source={InitialBg}
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>
          {/* Floating accent dots */}
          <View style={styles.floatingDot1} />
          <View style={styles.floatingDot2} />
          <View style={styles.floatingDot3} />
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Cattle Quarantine{"\n"}Management System
          </Text>
          <Text style={styles.subtitle}>
            Monitor and manage cattle quarantine protocols efficiently with
            comprehensive tracking and real-time health monitoring.
          </Text>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSignIn}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={["#1a5f3a", "#165231"]}
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>Officer Login</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Scan QR Code Button */}
        <TouchableOpacity
          style={[styles.button, styles.glassButton, { marginTop: 10 }]}
          onPress={handleScanQR}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={["rgba(26, 95, 58, 0.25)", "rgba(22, 82, 49, 0.35)"]}
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={[styles.buttonText, styles.glassButtonText]}>
              Scan RFID Tag
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f7f4",
  },
  backgroundPattern: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  patternCircle1: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(200, 200, 180, 0.1)",
    top: 100,
    left: -50,
  },
  patternCircle2: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(200, 200, 180, 0.08)",
    top: 200,
    right: -30,
  },
  patternCircle3: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(200, 200, 180, 0.06)",
    bottom: 250,
    left: width / 2 - 90,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 50,
    justifyContent: "space-between",
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    position: "relative",
  },
  imageDecorativeCircle: {
    position: "absolute",
    width: width * 0.75,
    height: width * 0.75,
    borderRadius: (width * 0.75) / 2,
    backgroundColor: "rgba(26, 95, 58, 0.08)",
    top: height * 0.15,
  },
  imageBackdrop: {
    backgroundColor: "#ffffff",
    borderRadius: 30,
    padding: 20,
    elevation: 8,
    shadowColor: "#1a5f3a",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    borderWidth: 3,
    borderColor: "rgba(26, 95, 58, 0.15)",
    transform: [{ rotate: "-2deg" }],
  },
  illustration: {
    width: width * 0.7,
    height: height * 0.35,
    transform: [{ rotate: "2deg" }],
  },
  floatingDot1: {
    position: "absolute",
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#1a5f3a",
    top: height * 0.1,
    left: width * 0.1,
    opacity: 0.6,
  },
  floatingDot2: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#165231",
    bottom: height * 0.25,
    right: width * 0.08,
    opacity: 0.5,
  },
  floatingDot3: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(26, 95, 58, 0.4)",
    top: height * 0.2,
    right: width * 0.15,
    opacity: 0.7,
  },
  textContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2d3436",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 15,
    color: "#636e72",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  button: {
    width: "100%",
    height: 56,
    borderRadius: 28,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  glassButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 2,
    borderColor: "rgba(26, 95, 58, 0.3)",
    shadowColor: "#1a5f3a",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  glassButtonText: {
    color: "#1a5f3a",
    fontWeight: "700",
  },
});
