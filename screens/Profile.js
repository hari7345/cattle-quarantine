import React from "react";
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
import logout from "../assets/images/logout.png";
import key from "../assets/images/key.png";
export default function Profile({ navigation }) {
  const menuItems = [
    {
      id: 1,
      title: "Change Password",
      icon: <Image source={key} style={styles.keyIcon} />,
      iconBg: "#8B9DC3",
      route: "ChangePassword",
    },
    {
      id: 2,
      title: "Logout",
      icon: <Image source={logout} style={styles.logoutIcon} />,
      iconBg: "#8B9DC3",
      route: "Logout",
    },
  ];

  const handleMenuPress = (route) => {
    console.log(`Navigating to ${route}`);
    // navigation.navigate(route);
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
            colors={["#1a5f3a", "#2d7a4f"]}
            style={styles.headerSection}
          >
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>

            {/* Profile Avatar */}
            <View style={styles.avatarContainer}>
              <View style={styles.avatarWrapper}>
                <LinearGradient
                  colors={["#4A90E2", "#5CA3E8"]}
                  style={styles.avatarGradient}
                >
                  {/* Placeholder avatar - replace with actual image */}
                  <Text style={styles.avatarEmoji}>🐄</Text>
                </LinearGradient>
              </View>

              {/* User Info */}
              <Text style={styles.userName}>Lorem Ipsum</Text>
              <Text style={styles.userEmail}>Loremipsum123@gmail.com</Text>
            </View>
          </LinearGradient>

          {/* Menu Section */}
          <View style={styles.menuSection}>
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
            onPress={() => navigation.navigate("Dashboard")}
          >
            <Text style={styles.navItemIcon}>🏠</Text>
            <Text style={styles.navItemLabel}>Home</Text>
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
            <Text style={styles.navItemIconActive}>👤</Text>
            <Text style={styles.navItemLabelActive}>My Profile</Text>
            <View style={styles.activeIndicator} />
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
