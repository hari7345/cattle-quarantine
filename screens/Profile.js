import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import logout from "../assets/images/logout.png";
import key from "../assets/images/key.png";
import Home from "../assets/icons/home.png";
import HomeActive from "../assets/icons/homefilled.png";
import ProfileIcon from "../assets/icons/profile.png";
import ProfileIconActive from "../assets/icons/profilefilled.png";
import Scanner from "../assets/icons/scanner.png";
import Statistic from "../assets/icons/statistics.png";
import StatisticActive from "../assets/icons/statisticsfilled.png";
import ProfileImg from "../assets/images/profile.png";
export default function Profile({ navigation }) {
  const [selectedTab, setSelectedTab] = useState("Profile");

  // Reset selected tab to Profile when this screen comes into focus
  useFocusEffect(
    useCallback(() => {
      setSelectedTab("Profile");
    }, [])
  );
  const menuItems = [
    // {
    //   id: 1,
    //   title: "My registires",
    //   icon: <Image source={key} style={styles.keyIcon} />,
    //   iconBg: "#8B9DC3",
    //   route: "ChangePassword",
    // },
    {
      id: 1,
      title: "Logout",
      icon: <Image source={logout} style={styles.logoutIcon} />,
      iconBg: "#8B9DC3",
      route: "Logout",
    },
  ];

  const handleMenuPress = (route) => {
    if (route === "Logout") {
      // Reset navigation stack and go to Initial screen
      navigation.reset({
        index: 0,
        routes: [{ name: "Initial" }],
      });
    } else {
      navigation.navigate(route);
    }
  };

  const handleBack = () => {
    navigation.goBack();
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
          {/* Header Section with Gradient */}
          <LinearGradient
            colors={["#1a5f3a", "#2d7a4f", "#3d8f5f"]}
            style={styles.headerSection}
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

            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>

            {/* Profile Avatar */}
            <View style={styles.avatarContainer}>
              <View style={styles.avatarWrapper}>
                <LinearGradient
                  colors={["#2d7a4f", "#3d8f5f", "#4fa36e"]}
                  style={styles.avatarGradient}
                >
                  {/* Placeholder avatar - replace with actual image */}
                  <Image source={ProfileImg} style={styles.avatarImage} />
                </LinearGradient>
              </View>

              {/* User Info */}
              <Text style={styles.userName}>Lorem Ipsum</Text>
              <Text style={styles.userEmail}>Loremipsum123@gmail.com</Text>
            </View>
          </LinearGradient>

          {/* Menu Section */}
          <View style={styles.menuSection}>
            {/* Decorative Pattern Elements */}
            <View style={styles.patternCircle1} />
            <View style={styles.patternCircle2} />
            <View style={styles.patternRing1} />
            <View style={styles.patternDiamond1} />

            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuItem,
                  index === menuItems.length - 1 && styles.menuItemLast,
                ]}
                onPress={() => handleMenuPress(item.route)}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemLeft}>
                  <View
                    style={[
                      styles.menuIconContainer,
                      //   { backgroundColor: item.iconBg },
                    ]}
                  >
                    <Text style={styles.menuIcon}>{item.icon}</Text>
                  </View>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                </View>
                <Text style={styles.menuArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => {
              setSelectedTab("Home");
              navigation.navigate("Dashboard");
            }}
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
              navigation.navigate("RFIDScanner", { readOnly: false });
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
            onPress={() => setSelectedTab("Profile")}
          >
            <Image
              source={
                selectedTab === "Profile" ? ProfileIconActive : ProfileIcon
              }
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
  keyIcon: {
    width: 24,
    height: 24,
  },
  logoutIcon: {
    width: 20,
    height: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F6F8",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  headerSection: {
    paddingTop: 20,
    paddingBottom: 60,
    alignItems: "center",
    position: "relative",
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
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  backIcon: {
    fontSize: 24,
    color: "#ffffff",
    fontWeight: "bold",
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 16,
  },
  avatarGradient: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#ffffff",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  avatarEmoji: {
    fontSize: 56,
  },
  whatsappBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#25D366",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#ffffff",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  whatsappIcon: {
    fontSize: 18,
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 6,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "500",
  },
  menuSection: {
    marginTop: -40,
    marginHorizontal: 20,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingVertical: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    position: "relative",
    overflow: "hidden",
  },
  // Pattern elements for menu section
  patternCircle1: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(26, 95, 58, 0.03)",
    top: -20,
    right: -20,
  },
  patternCircle2: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(26, 95, 58, 0.04)",
    bottom: -15,
    left: -15,
  },
  patternRing1: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: "rgba(26, 95, 58, 0.05)",
    borderStyle: "dashed",
    bottom: -30,
    right: 40,
  },
  patternDiamond1: {
    position: "absolute",
    width: 16,
    height: 16,
    backgroundColor: "rgba(26, 95, 58, 0.04)",
    top: 50,
    left: 10,
    transform: [{ rotate: "45deg" }],
    borderRadius: 3,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  menuIcon: {
    fontSize: 20,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C3E50",
  },
  menuArrow: {
    fontSize: 28,
    color: "#BDC3C7",
    fontWeight: "300",
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
