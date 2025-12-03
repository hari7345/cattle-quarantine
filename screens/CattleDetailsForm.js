import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  SafeAreaView,
  Animated,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function CattleDetailsForm({ route, navigation }) {
  const { rfidData } = route.params || {};
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // Form state - pre-filled with mock data from RFID
  const [formData, setFormData] = useState({
    rfidTag: rfidData || "RFID-2024-001",
    breed: "Holstein Friesian",
    ageYears: "3",
    ageMonths: "6",
    gender: "Female",
    colour: "Black and White",
    weight: "450",
    height: "145",
    distinguishingMarks: "Small white patch on left shoulder",
    shedNumber: "A-12",
    arrivalDate: "2024-12-01",
    arrivalTime: "10:30 AM",
    vaccinationStatus: "Up to date",
    dewormingDate: "2024-11-15",
    temperature: "38.5",
    lastCheckupDate: "2024-11-20",
    behavior: "Calm",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [activeField, setActiveField] = useState(null);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Here you would save the data to your backend/database
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      navigation.navigate("Dashboard");
    }, 2000);
  };

  const renderInput = (label, field, placeholder, icon, options = {}) => {
    const { keyboardType = "default", multiline = false, maxLength } = options;

    return (
      <Animated.View
        style={[
          styles.inputContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.labelContainer}>
          <Text style={styles.icon}>{icon}</Text>
          <Text style={styles.label}>{label}</Text>
        </View>
        <TextInput
          style={[
            styles.input,
            multiline && styles.textArea,
            activeField === field && styles.inputActive,
          ]}
          value={formData[field]}
          onChangeText={(value) => handleInputChange(field, value)}
          placeholder={placeholder}
          placeholderTextColor="#a0a0a0"
          keyboardType={keyboardType}
          multiline={multiline}
          maxLength={maxLength}
          onFocus={() => setActiveField(field)}
          onBlur={() => setActiveField(null)}
        />
      </Animated.View>
    );
  };

  const renderPicker = (label, field, options, icon) => {
    return (
      <Animated.View
        style={[
          styles.inputContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.labelContainer}>
          <Text style={styles.icon}>{icon}</Text>
          <Text style={styles.label}>{label}</Text>
        </View>
        <View style={styles.pickerContainer}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.pickerOption,
                formData[field] === option && styles.pickerOptionActive,
              ]}
              onPress={() => handleInputChange(field, option)}
            >
              <Text
                style={[
                  styles.pickerOptionText,
                  formData[field] === option && styles.pickerOptionTextActive,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    );
  };

  const renderAgeInputs = () => {
    return (
      <Animated.View
        style={[
          styles.inputContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.labelContainer}>
          <Text style={styles.icon}>📅</Text>
          <Text style={styles.label}>Age</Text>
        </View>
        <View style={styles.doubleInputContainer}>
          <View style={styles.halfInput}>
            <Text style={styles.subLabel}>Years</Text>
            <TextInput
              style={[
                styles.input,
                activeField === "ageYears" && styles.inputActive,
              ]}
              value={formData.ageYears}
              onChangeText={(value) => handleInputChange("ageYears", value)}
              placeholder="0"
              placeholderTextColor="#a0a0a0"
              keyboardType="numeric"
              maxLength={2}
              onFocus={() => setActiveField("ageYears")}
              onBlur={() => setActiveField(null)}
            />
          </View>
          <View style={styles.halfInput}>
            <Text style={styles.subLabel}>Months</Text>
            <TextInput
              style={[
                styles.input,
                activeField === "ageMonths" && styles.inputActive,
              ]}
              value={formData.ageMonths}
              onChangeText={(value) => handleInputChange("ageMonths", value)}
              placeholder="0"
              placeholderTextColor="#a0a0a0"
              keyboardType="numeric"
              maxLength={2}
              onFocus={() => setActiveField("ageMonths")}
              onBlur={() => setActiveField(null)}
            />
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        {/* Header */}
        <LinearGradient
          colors={["#1a5f3a", "#2d7a4f", "#3d8f5f"]}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>Cattle Details</Text>
              <Text style={styles.headerSubtitle}>
                RFID: {formData.rfidTag}
              </Text>
            </View>
            <View style={styles.backButton} />
          </View>
        </LinearGradient>

        {/* Form Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>
            {/* RFID Fetch Indicator */}
            <Animated.View
              style={[
                styles.rfidBadge,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <LinearGradient
                colors={["#16a085", "#1abc9c", "#2ecc71"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.rfidBadgeGradient}
              >
                <Text style={styles.rfidBadgeIcon}>✓</Text>
                <View style={styles.rfidBadgeTextContainer}>
                  <Text style={styles.rfidBadgeTitle}>
                    Data Fetched from RFID
                  </Text>
                  <Text style={styles.rfidBadgeSubtitle}>
                    Review and edit the details below
                  </Text>
                </View>
              </LinearGradient>
            </Animated.View>
            {/* Section: Basic Information */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionHeaderLine} />
                <Text style={styles.sectionTitle}>Basic Information</Text>
                <View style={styles.sectionHeaderLine} />
              </View>

              {renderInput("Breed", "breed", "Enter breed", "🐄")}
              {renderAgeInputs()}
              {renderPicker("Gender", "gender", ["Male", "Female"], "⚥")}
              {renderInput("Colour", "colour", "Enter colour", "🎨")}
            </View>

            {/* Section: Physical Attributes */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionHeaderLine} />
                <Text style={styles.sectionTitle}>Physical Attributes</Text>
                <View style={styles.sectionHeaderLine} />
              </View>

              {renderInput("Weight (kg)", "weight", "Enter weight", "⚖️", {
                keyboardType: "numeric",
              })}
              {renderInput("Height (cm)", "height", "Enter height", "📏", {
                keyboardType: "numeric",
              })}
              {renderInput(
                "Distinguishing Marks",
                "distinguishingMarks",
                "Enter any distinguishing marks",
                "✨",
                { multiline: true }
              )}
            </View>

            {/* Section: Location & Arrival */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionHeaderLine} />
                <Text style={styles.sectionTitle}>Location & Arrival</Text>
                <View style={styles.sectionHeaderLine} />
              </View>

              {renderInput(
                "Shed/Batch Number",
                "shedNumber",
                "Enter shed or batch number",
                "🏠"
              )}
              {renderInput("Arrival Date", "arrivalDate", "YYYY-MM-DD", "📆")}
              {renderInput("Arrival Time", "arrivalTime", "HH:MM AM/PM", "🕐")}
            </View>

            {/* Section: Health Records */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionHeaderLine} />
                <Text style={styles.sectionTitle}>Health Records</Text>
                <View style={styles.sectionHeaderLine} />
              </View>

              {renderInput(
                "Vaccination Status",
                "vaccinationStatus",
                "Enter vaccination status",
                "💉"
              )}
              {renderInput(
                "Deworming Date",
                "dewormingDate",
                "YYYY-MM-DD",
                "🔬"
              )}
              {renderInput(
                "Temperature (°C)",
                "temperature",
                "Enter temperature",
                "🌡️",
                { keyboardType: "decimal-pad" }
              )}
              {renderInput(
                "Last Checkup Date",
                "lastCheckupDate",
                "YYYY-MM-DD",
                "🩺"
              )}
            </View>

            {/* Section: Behavior */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionHeaderLine} />
                <Text style={styles.sectionTitle}>Behavior</Text>
                <View style={styles.sectionHeaderLine} />
              </View>

              {renderPicker(
                "General Behavior",
                "behavior",
                ["Calm", "Aggressive", "Active"],
                "🎭"
              )}
            </View>
          </View>
        </ScrollView>

        {/* Bottom Action Buttons */}
        <View style={styles.bottomActions}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.navigate("Dashboard")}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#16a085", "#1abc9c", "#2ecc71"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.saveButtonGradient}
            >
              <Text style={styles.saveButtonText}>Save Cattle Details</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Success Modal */}
        <Modal
          transparent
          visible={showSuccessModal}
          animationType="fade"
          onRequestClose={() => setShowSuccessModal(false)}
        >
          <View style={styles.successOverlay}>
            <Animated.View style={styles.successCard}>
              <LinearGradient
                colors={["#16a085", "#1abc9c", "#2ecc71"]}
                style={styles.successGradient}
              >
                <View style={styles.successIconContainer}>
                  <Text style={styles.successIcon}>✓</Text>
                </View>
                <Text style={styles.successTitle}>Success!</Text>
                <Text style={styles.successSubtitle}>
                  Cattle details saved successfully
                </Text>
              </LinearGradient>
            </Animated.View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
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
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  backButtonText: {
    fontSize: 24,
    color: "#ffffff",
    fontWeight: "600",
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  rfidBadge: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#16a085",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  rfidBadgeGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  rfidBadgeIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  rfidBadgeTextContainer: {
    flex: 1,
  },
  rfidBadgeTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 2,
  },
  rfidBadgeSubtitle: {
    fontSize: 11,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.9)",
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionHeaderLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e0e0e0",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1a5f3a",
    marginHorizontal: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2d3436",
  },
  subLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#636e72",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#2d3436",
    borderWidth: 2,
    borderColor: "#e0e0e0",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  inputActive: {
    borderColor: "#1a5f3a",
    elevation: 3,
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  doubleInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  pickerContainer: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  pickerOption: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  pickerOptionActive: {
    backgroundColor: "#1a5f3a",
    borderColor: "#1a5f3a",
    elevation: 3,
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  pickerOptionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#636e72",
  },
  pickerOptionTextActive: {
    color: "#ffffff",
  },
  bottomActions: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    gap: 12,
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e0e0e0",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#636e72",
  },
  saveButton: {
    flex: 2,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#16a085",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  saveButtonGradient: {
    paddingVertical: 16,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
  },
  successOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
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
    padding: 40,
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
    textAlign: "center",
  },
});
