import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Animated,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function Dashboard({ navigation }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.9));

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
    { title: "My Cattle", icon: "🐄", route: "MyCattle" },
    { title: "Health & Medical Record", icon: "🩺", route: "HealthRecords" },
    {
      title: "Under Observation Cattles",
      icon: "👁️",
      route: "UnderObservation",
    },
  ];

  const handleCardPress = (route) => {
    console.log(`Navigating to ${route}`);
    // navigation.navigate(route);
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
            {/* Header Section */}
            <View style={styles.header}>
              <View>
                <Text style={styles.greeting}>Hello, {getGreeting()}</Text>
                <Text style={styles.date}>{formatDate(currentDate)}</Text>
              </View>
              <TouchableOpacity style={styles.notificationButton}>
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationCount}>3</Text>
                </View>
                <Text style={styles.notificationIcon}>🔔</Text>
              </TouchableOpacity>
            </View>

            {/* Weather Widget */}
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
                  <Text style={styles.locationIcon}>📍</Text>
                  <Text style={styles.locationText}>
                    Farm Weather - Oakroot Ranch
                  </Text>
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

                <View style={styles.weatherDetails}>
                  <View style={styles.weatherDetailItem}>
                    <Text style={styles.weatherDetailLabel}>Humidity</Text>
                    <Text style={styles.weatherDetailValue}>40%</Text>
                  </View>
                  <View style={styles.weatherDetailItem}>
                    <Text style={styles.weatherDetailLabel}>Precipitation</Text>
                    <Text style={styles.weatherDetailValue}>5.1 ml</Text>
                  </View>
                  <View style={styles.weatherDetailItem}>
                    <Text style={styles.weatherDetailLabel}>Pressure</Text>
                    <Text style={styles.weatherDetailValue}>450 hpa</Text>
                  </View>
                  <View style={styles.weatherDetailItem}>
                    <Text style={styles.weatherDetailLabel}>Wind</Text>
                    <Text style={styles.weatherDetailValue}>23m/s</Text>
                  </View>
                </View>

                <View style={styles.sunTimes}>
                  <View style={styles.sunTimeItem}>
                    <Text style={styles.sunTimeValue}>5:25 am</Text>
                    <Text style={styles.sunTimeLabel}>Sunrise</Text>
                  </View>
                  <View style={styles.sunPath}>
                    <View style={styles.sunPathArc}>
                      <Text style={styles.sunIcon}>☀️</Text>
                    </View>
                  </View>
                  <View style={styles.sunTimeItem}>
                    <Text style={styles.sunTimeValue}>8:04 pm</Text>
                    <Text style={styles.sunTimeLabel}>Sunset</Text>
                  </View>
                </View>
              </View>
            </Animated.View>
          </LinearGradient>

          {/* White Background Section */}
          <View style={styles.whiteSection}>
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

            {/* Alert Banner */}
            <TouchableOpacity style={styles.alertBanner} activeOpacity={0.9}>
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
                    <Text style={styles.alertTitle}>Add Your Cattle</Text>
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
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navItemIconActive}>🏠</Text>
            <Text style={styles.navItemLabelActive}>Home</Text>
            <View style={styles.activeIndicator} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navItemIcon}>📋</Text>
            <Text style={styles.navItemLabel}>Tasks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navItemIcon}>📊</Text>
            <Text style={styles.navItemLabel}>Statistic</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navItemIcon}>👤</Text>
            <Text style={styles.navItemLabel}>My Profile</Text>
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
  },
  topSection: {
    paddingBottom: 100,
  },
  whiteSection: {
    backgroundColor: "#f5f6fa",
    marginTop: -80,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 4,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  date: {
    fontSize: 12,
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
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
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
  },
  locationIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  locationText: {
    fontSize: 13,
    color: "#2d3436",
    fontWeight: "600",
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
  weatherDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingBottom: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: "#1a5f3a40",
  },
  weatherDetailItem: {
    alignItems: "center",
    flex: 1,
  },
  weatherDetailLabel: {
    fontSize: 11,
    color: "#636e72",
    marginBottom: 4,
    fontWeight: "500",
  },
  weatherDetailValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2d3436",
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
    marginBottom: 20,
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
    padding: 16,
    alignItems: "center",
    minHeight: 140,
    justifyContent: "center",
  },
  navCardIconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  navCardIcon: {
    fontSize: 40,
  },
  navCardTitle: {
    fontSize: 10,
    fontWeight: "600",
    color: "#2d3436",
    textAlign: "center",
    lineHeight: 14,
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
