import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Animated,
  Image,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import * as ExpoLocation from "expo-location";
import LocationIcon from "../assets/images/location.png";
import Home from "../assets/icons/home.png";
import HomeActive from "../assets/icons/homefilled.png";
import Profile from "../assets/icons/profile.png";
import ProfileActive from "../assets/icons/profilefilled.png";
import Scanner from "../assets/icons/scanner.png";
import Statistic from "../assets/icons/statistics.png";
import StatisticActive from "../assets/icons/statisticsfilled.png";
const { width, height } = Dimensions.get("window");

export default function Dashboard({ navigation }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.9));
  const [selectedTab, setSelectedTab] = useState("Home");
  const [locationName, setLocationName] = useState("Fetching location...");
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  // Reset selected tab to Home when Dashboard comes into focus
  useFocusEffect(
    useCallback(() => {
      setSelectedTab("Home");
    }, [])
  );

  // Fetch device location
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        // Request permission
        const { status } =
          await ExpoLocation.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setLocationName("Location permission denied");
          setIsLoadingLocation(false);
          return;
        }

        // Get current position
        const location = await ExpoLocation.getCurrentPositionAsync({
          accuracy: ExpoLocation.Accuracy.Balanced,
        });

        // Reverse geocode to get address
        const [address] = await ExpoLocation.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        if (address) {
          // Build a readable location string
          const parts = [];
          if (address.city) parts.push(address.city);
          else if (address.subregion) parts.push(address.subregion);
          if (address.region) parts.push(address.region);

          const locationStr =
            parts.length > 0
              ? `Farm Weather - ${parts.join(", ")}`
              : "Farm Weather - Your Location";

          setLocationName(locationStr);
        } else {
          setLocationName("Farm Weather - Your Location");
        }
      } catch (error) {
        console.log("Location error:", error);
        setLocationName("Unable to fetch location");
      } finally {
        setIsLoadingLocation(false);
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const formatDate = (date) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${days[date.getDay()]}, ${date.getDate()} ${
      months[date.getMonth()]
    } ${date.getFullYear()}`;
  };

  const getGreeting = () => {
    const hour = currentDate.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const navigationCards = [
    { title: "View Registry", icon: "🐄", route: "CattleLists" },
    { title: "Health & Medical Record", icon: "🩺", route: "HealthRecords" },
    {
      title: "Under Observation Live Stocks",
      icon: "👁️",
      route: "UnderObservation",
    },
  ];

  const handleCardPress = (route) => {
    console.log(`Navigating to ${route}`);
    navigation.navigate(route);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Green Background Section */}
          <LinearGradient
            colors={["#1a5f3a", "#2d7a4f", "#3d8f5f"]}
            style={styles.topSection}
          >
            {/* Decorative Background Patterns */}
            <View style={styles.bgPatternContainer}>
              {/* Large organic blob shapes */}
              <View style={styles.bgBlob1} />
              <View style={styles.bgBlob2} />
              <View style={styles.bgBlob3} />

              {/* Dotted pattern grid */}
              <View style={styles.dotsPattern}>
                {[...Array(5)].map((_, rowIdx) => (
                  <View key={rowIdx} style={styles.dotRow}>
                    {[...Array(8)].map((_, colIdx) => (
                      <View key={colIdx} style={styles.dot} />
                    ))}
                  </View>
                ))}
              </View>

              {/* Curved decorative lines */}
              <View style={styles.curvedLine1} />
              <View style={styles.curvedLine2} />

              {/* Floating hexagon shapes */}
              <View style={styles.hexShape1} />
              <View style={styles.hexShape2} />
              <View style={styles.hexShape3} />

              {/* Diamond accents */}
              <View style={styles.diamond1} />
              <View style={styles.diamond2} />
            </View>

            {/* Header Section */}
            <View style={styles.header}>
              <View>
                <Text style={styles.greeting}>Hello, {getGreeting()}</Text>
                <Text style={styles.date}>{formatDate(currentDate)}</Text>
              </View>
            </View>
          </LinearGradient>

          {/* Weather Widget - Floating between sections */}
          <Animated.View
            style={[
              styles.weatherCard,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <View style={styles.weatherContent}>
              <View style={styles.weatherHeader}>
                <Image source={LocationIcon} style={styles.locationIcon} />
                {isLoadingLocation ? (
                  <View style={styles.locationLoading}>
                    <ActivityIndicator size="small" color="#1a5f3a" />
                    <Text style={styles.locationText}>
                      Fetching location...
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.locationText} numberOfLines={1}>
                    {locationName}
                  </Text>
                )}
              </View>

              <View style={styles.weatherMain}>
                <View style={styles.temperatureSection}>
                  <Text style={styles.temperature}>+28°C</Text>
                  <View style={styles.tempRange}>
                    <Text style={styles.tempLabel}>H:25°</Text>
                    <Text style={styles.tempLabel}>L:15°</Text>
                  </View>
                </View>
                <View style={styles.weatherIconContainer}>
                  <Text style={styles.weatherEmoji}>🌤️</Text>
                </View>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.weatherDetailsBubbles}
                contentContainerStyle={styles.weatherBubblesContainer}
              >
                <View style={styles.weatherBubble}>
                  <Text style={styles.bubbleLabel}>💧 Humidity</Text>
                  <Text style={styles.bubbleValue}>40%</Text>
                </View>
                <View style={styles.weatherBubble}>
                  <Text style={styles.bubbleLabel}>🌧️ Precipitation</Text>
                  <Text style={styles.bubbleValue}>5.1 ml</Text>
                </View>
                <View style={styles.weatherBubble}>
                  <Text style={styles.bubbleLabel}>🔽 Pressure</Text>
                  <Text style={styles.bubbleValue}>450 hpa</Text>
                </View>
                <View style={styles.weatherBubble}>
                  <Text style={styles.bubbleLabel}>💨 Wind</Text>
                  <Text style={styles.bubbleValue}>23m/s</Text>
                </View>
              </ScrollView>
            </View>
          </Animated.View>

          {/* White Background Section */}
          <View style={styles.whiteSection}>
            {/* Decorative Pattern Elements */}
            <View style={styles.patternCircle1} />
            <View style={styles.patternCircle2} />
            <View style={styles.patternCircle3} />
            <View style={styles.patternCircle4} />

            {/* Additional organic patterns */}
            <View style={styles.patternRing1} />
            <View style={styles.patternRing2} />
            <View style={styles.patternDiamond1} />
            <View style={styles.patternDiamond2} />

            {/* Subtle dot grid */}
            <View style={styles.whiteSectionDots}>
              {[...Array(3)].map((_, rowIdx) => (
                <View key={rowIdx} style={styles.whiteDotRow}>
                  {[...Array(6)].map((_, colIdx) => (
                    <View key={colIdx} style={styles.whiteDot} />
                  ))}
                </View>
              ))}
            </View>
            {/* Navigation Cards Grid */}
            <View style={styles.cardsGrid}>
              {navigationCards.map((card, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.navCard}
                  onPress={() => handleCardPress(card.route)}
                  activeOpacity={0.8}
                >
                  <View style={styles.navCardContent}>
                    <View style={styles.navCardIconBg}>
                      <Text style={styles.navCardIcon}>{card.icon}</Text>
                    </View>
                    <Text style={styles.navCardTitle}>{card.title}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.cardsGrid2}>
              {navigationCards.map((card, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.navCard}
                  onPress={() => handleCardPress(card.route)}
                  activeOpacity={0.8}
                >
                  <View style={styles.navCardContent}>
                    <View style={styles.navCardIconBg}>
                      <Text style={styles.navCardIcon}>{card.icon}</Text>
                    </View>
                    <Text style={styles.navCardTitle}>{card.title}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Alert Banner */}
            <TouchableOpacity
              style={styles.alertBanner}
              activeOpacity={0.9}
              onPress={() => navigation.navigate("RFIDScanner")}
            >
              <LinearGradient
                colors={["#16a085", "#1abc9c", "#2ecc71"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.alertGradient}
              >
                {/* Decorative circles for background effect */}
                <View style={styles.alertDecorCircle1} />
                <View style={styles.alertDecorCircle2} />
                <View style={styles.alertDecorCircle3} />

                <View style={styles.alertContent}>
                  <View style={styles.alertIconContainer}>
                    <Text style={styles.alertIconText}>🐄</Text>
                  </View>
                  <View style={styles.alertTextContainer}>
                    <Text style={styles.alertTitle}>Add Your Live Stock</Text>
                    <Text style={styles.alertSubtitle}>
                      Start tracking your herd
                    </Text>
                  </View>
                  <View style={styles.alertArrowContainer}>
                    <Text style={styles.alertArrow}>→</Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => setSelectedTab("Home")}
          >
            <Image
              source={selectedTab === "Home" ? HomeActive : Home}
              style={[
                styles.navIcon,
                selectedTab !== "Home" && styles.navIconInactive,
              ]}
            />
            <Text
              style={
                selectedTab === "Home"
                  ? styles.navItemLabelActive
                  : styles.navItemLabel
              }
            >
              Home
            </Text>
            {selectedTab === "Home" && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => setSelectedTab("Statistic")}
          >
            <Image
              source={selectedTab === "Statistic" ? StatisticActive : Statistic}
              style={[
                styles.navIcon,
                selectedTab !== "Statistic" && styles.navIconInactive,
              ]}
            />
            <Text
              style={
                selectedTab === "Statistic"
                  ? styles.navItemLabelActive
                  : styles.navItemLabel
              }
            >
              Statistic
            </Text>
            {selectedTab === "Statistic" && (
              <View style={styles.activeIndicator} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => {
              setSelectedTab("Scanner");
              navigation.navigate("RFIDScanner");
            }}
          >
            <Image
              source={Scanner}
              style={[
                styles.navIcon,
                selectedTab !== "Scanner" && styles.navIconInactive,
              ]}
            />
            <Text
              style={
                selectedTab === "Scanner"
                  ? styles.navItemLabelActive
                  : styles.navItemLabel
              }
            >
              Scanner
            </Text>
            {selectedTab === "Scanner" && (
              <View style={styles.activeIndicator} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => {
              setSelectedTab("Profile");
              navigation.navigate("Profile");
            }}
          >
            <Image
              source={selectedTab === "Profile" ? ProfileActive : Profile}
              style={[
                styles.navIcon,
                selectedTab !== "Profile" && styles.navIconInactive,
              ]}
            />
            <Text
              style={
                selectedTab === "Profile"
                  ? styles.navItemLabelActive
                  : styles.navItemLabel
              }
            >
              My Profile
            </Text>
            {selectedTab === "Profile" && (
              <View style={styles.activeIndicator} />
            )}
          </TouchableOpacity>
        </View>
      </View>
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
    backgroundColor: "#f5f6fa",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
    position: "relative",
  },
  topSection: {
    height: height * 0.3,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
  },
  bgPatternContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
  },
  // Organic blob shapes
  bgBlob1: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    top: -80,
    right: -60,
  },
  bgBlob2: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    top: 40,
    left: -50,
  },
  bgBlob3: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    bottom: 20,
    right: 80,
  },
  // Dotted pattern
  dotsPattern: {
    position: "absolute",
    top: 30,
    right: 20,
    opacity: 0.3,
  },
  dotRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    marginHorizontal: 8,
  },
  // Curved decorative lines
  curvedLine1: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderStyle: "dashed",
    top: -150,
    left: -100,
  },
  curvedLine2: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    bottom: -100,
    right: -80,
  },
  // Hexagon-like shapes (using rotated squares)
  hexShape1: {
    position: "absolute",
    width: 30,
    height: 30,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    top: 80,
    right: 40,
    transform: [{ rotate: "45deg" }],
    borderRadius: 6,
  },
  hexShape2: {
    position: "absolute",
    width: 20,
    height: 20,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    top: 30,
    left: 80,
    transform: [{ rotate: "45deg" }],
    borderRadius: 4,
  },
  hexShape3: {
    position: "absolute",
    width: 25,
    height: 25,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    bottom: 40,
    left: 120,
    transform: [{ rotate: "45deg" }],
    borderRadius: 5,
  },
  // Diamond accents
  diamond1: {
    position: "absolute",
    width: 16,
    height: 16,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.15)",
    top: 60,
    right: 120,
    transform: [{ rotate: "45deg" }],
  },
  diamond2: {
    position: "absolute",
    width: 12,
    height: 12,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.12)",
    bottom: 60,
    left: 60,
    transform: [{ rotate: "45deg" }],
  },
  whiteSection: {
    backgroundColor: "#f5f6fa",
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    position: "relative",
    overflow: "hidden",
  },
  patternCircle1: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(26, 95, 58, 0.03)",
    top: 100,
    right: -50,
  },
  patternCircle2: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(26, 95, 58, 0.04)",
    bottom: 200,
    left: -30,
  },
  patternCircle3: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(26, 95, 58, 0.02)",
    top: 400,
    left: 40,
  },
  patternCircle4: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(26, 95, 58, 0.03)",
    bottom: 50,
    right: 30,
  },
  // Ring patterns
  patternRing1: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 2,
    borderColor: "rgba(26, 95, 58, 0.05)",
    borderStyle: "dashed",
    top: 250,
    right: -60,
  },
  patternRing2: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1.5,
    borderColor: "rgba(26, 95, 58, 0.04)",
    bottom: 150,
    left: -40,
  },
  // Diamond patterns in white section
  patternDiamond1: {
    position: "absolute",
    width: 24,
    height: 24,
    backgroundColor: "rgba(26, 95, 58, 0.04)",
    top: 180,
    left: 30,
    transform: [{ rotate: "45deg" }],
    borderRadius: 4,
  },
  patternDiamond2: {
    position: "absolute",
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: "rgba(26, 95, 58, 0.06)",
    bottom: 280,
    right: 50,
    transform: [{ rotate: "45deg" }],
  },
  // Dot grid for white section
  whiteSectionDots: {
    position: "absolute",
    bottom: 100,
    left: 20,
    opacity: 0.5,
  },
  whiteDotRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  whiteDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "rgba(26, 95, 58, 0.1)",
    marginHorizontal: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 4,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  date: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "500",
  },
  notificationButton: {
    position: "relative",
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
  },
  notificationIcon: {
    fontSize: 24,
  },
  notificationBadge: {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: "#ff3b30",
    borderRadius: 10,
    width: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    borderWidth: 2,
    borderColor: "#1a5f3a",
  },
  notificationCount: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "800",
  },
  weatherCard: {
    position: "absolute",
    top: height * 0.1,
    left: 20,
    right: 20,
    zIndex: 10,
    borderRadius: 32,
    overflow: "hidden",
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
  },
  weatherContent: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 20,
  },
  weatherHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    // backgroundColor: "rgba(144, 238, 144, 0.25)", // Light green with more transparency
    // padding: 8,
    // borderRadius: 25, // More rounded for bubble effect
    // borderWidth: 1.5,
    // borderColor: "rgba(144, 238, 144, 0.4)", // Softer border
    shadowColor: "rgba(34, 139, 34, 0.3)",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 15, // Larger, softer shadow
    elevation: 5,
    backdropFilter: "blur(10px)", // Adds blur effect (works on web)
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
  locationText: {
    fontSize: 13,
    color: "#2d3436",
    fontWeight: "600",
    flex: 1,
  },
  locationLoading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  weatherMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1a5f3a40",
  },
  temperatureSection: {
    flex: 1,
  },
  temperature: {
    fontSize: 48,
    fontWeight: "700",
    color: "#2d3436",
    marginBottom: 4,
  },
  tempRange: {
    flexDirection: "row",
    gap: 8,
  },
  tempLabel: {
    fontSize: 14,
    color: "#636e72",
    fontWeight: "500",
    marginRight: 8,
  },
  weatherIconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  weatherEmoji: {
    fontSize: 64,
  },
  weatherDetailsBubbles: {
    marginBottom: 16,
    // paddingBottom: 16,
  },
  weatherBubblesContainer: {
    paddingRight: 20,
  },
  weatherBubble: {
    backgroundColor: "rgba(144, 238, 144, 0.2)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "rgba(144, 238, 144, 0.4)",
    alignItems: "center",
    minWidth: 90,
    shadowColor: "rgba(34, 139, 34, 0.2)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  bubbleLabel: {
    fontSize: 10,
    color: "#636e72",
    marginBottom: 3,
    fontWeight: "500",
  },
  bubbleValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1a5f3a",
  },
  sunTimes: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sunTimeItem: {
    alignItems: "center",
  },
  sunTimeValue: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2d3436",
    marginBottom: 2,
  },
  sunTimeLabel: {
    fontSize: 10,
    color: "#636e72",
    fontWeight: "500",
  },
  sunPath: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    position: "relative",
  },
  sunPathArc: {
    width: "100%",
    height: 40,
    borderTopWidth: 2,
    borderColor: "#f0f0f0",
    borderStyle: "dashed",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  sunIcon: {
    fontSize: 20,
  },
  cardsGrid: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 80,
    zIndex: 1,
  },
  cardsGrid2: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    marginBottom: 20,
    zIndex: 1,
  },
  navCard: {
    width: (width - 52) / 3,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    position: "relative",
  },
  activeIndicatorCard: {
    position: "absolute",
    top: 8,
    left: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#1a5f3a",
    zIndex: 1,
  },
  navCardContent: {
    padding: 12,
    alignItems: "center",
    minHeight: 100,
    justifyContent: "center",
  },
  navCardIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  navCardIcon: {
    fontSize: 32,
  },
  navCardTitle: {
    fontSize: 9,
    fontWeight: "600",
    color: "#2d3436",
    textAlign: "center",
    lineHeight: 12,
  },
  alertBanner: {
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#16a085",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    marginBottom: 20,
    zIndex: 1,
  },
  alertGradient: {
    position: "relative",
    overflow: "hidden",
  },
  alertDecorCircle1: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    top: -30,
    right: -20,
  },
  alertDecorCircle2: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    bottom: -20,
    left: 40,
  },
  alertDecorCircle3: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    top: 20,
    left: -10,
  },
  alertContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    position: "relative",
    zIndex: 1,
  },
  alertIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  alertIconText: {
    fontSize: 24,
  },
  alertTextContainer: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 2,
    letterSpacing: 0.3,
  },
  alertSubtitle: {
    fontSize: 11,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.9)",
  },
  alertArrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  alertArrow: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "700",
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    position: "relative",
  },
  navIcon: {
    width: 26,
    height: 26,
    marginBottom: 4,
  },
  navIconInactive: {
    opacity: 0.4,
  },
  navItemIcon: {
    fontSize: 26,
    marginBottom: 4,
    opacity: 0.4,
  },
  navItemIconActive: {
    fontSize: 26,
    marginBottom: 4,
  },
  navItemLabel: {
    fontSize: 11,
    color: "#636e72",
    fontWeight: "500",
  },
  navItemLabelActive: {
    fontSize: 11,
    color: "#1a5f3a",
    fontWeight: "700",
  },
  activeIndicator: {
    position: "absolute",
    bottom: 2,
    width: 32,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#1a5f3a",
  },
});
