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
  Image,
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
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleImageUpload = () => {
    // Image upload logic would go here
    console.log("Open camera for image upload");
  };

  const handleClearField = (field) => {
    setFormData((prev) => ({ ...prev, [field]: "" }));
  };

  const renderInput = (label, field, placeholder, options = {}) => {
    const {
      keyboardType = "default",
      multiline = false,
      halfWidth = false,
      showClearIcon = true,
      editable = true,
    } = options;

    return (
      <View
        style={[styles.inputContainer, halfWidth && styles.halfInputContainer]}
      >
        <Text style={styles.label}>{label}</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[
              styles.input,
              multiline && styles.textArea,
              activeField === field && styles.inputActive,
              !editable && styles.inputDisabled,
            ]}
            value={formData[field]}
            onChangeText={(value) => handleInputChange(field, value)}
            placeholder={placeholder}
            placeholderTextColor="#b0b0b0"
            keyboardType={keyboardType}
            multiline={multiline}
            editable={editable}
            onFocus={() => setActiveField(field)}
            onBlur={() => setActiveField(null)}
          />
          {showClearIcon && formData[field] && editable && (
            <TouchableOpacity
              style={styles.clearIcon}
              onPress={() => handleClearField(field)}
            >
              <Text style={styles.clearIconText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderDropdown = (label, field, placeholder, halfWidth = false) => {
    // Simple click handler to cycle through options (for demo purposes)
    const handleDropdownPress = () => {
      if (field === "gender") {
        const options = ["Male", "Female"];
        const currentIndex = options.indexOf(formData[field]);
        const nextIndex = (currentIndex + 1) % options.length;
        handleInputChange(field, options[nextIndex]);
      } else if (field === "behavior") {
        const options = ["Calm", "Aggressive", "Active"];
        const currentIndex = options.indexOf(formData[field]);
        const nextIndex = (currentIndex + 1) % options.length;
        handleInputChange(field, options[nextIndex]);
      }
    };

    return (
      <View
        style={[styles.inputContainer, halfWidth && styles.halfInputContainer]}
      >
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={handleDropdownPress}
        >
          <Text
            style={[
              styles.dropdownText,
              !formData[field] && styles.dropdownPlaceholder,
            ]}
          >
            {formData[field] || placeholder}
          </Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.goBack()}
          >
            <View style={styles.headerIconCircle}>
              <Text style={styles.headerIcon}>←</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cattle Details</Text>
          <TouchableOpacity style={styles.headerButton}>
            <View style={styles.headerIconCircle}>
              <Text style={styles.headerIcon}>↗</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Form Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>
            {/* Section: Basic Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Basic Information</Text>

              {renderInput("RFID Tag*", "rfidTag", "Enter RFID tag", {
                editable: false,
              })}

              <View style={styles.row}>
                {renderInput("Breed*", "breed", "Enter breed", {
                  halfWidth: true,
                })}
                {renderDropdown("Gender*", "gender", "Select", true)}
              </View>

              <View style={styles.row}>
                {renderInput("Age (Years)*", "ageYears", "Years", {
                  halfWidth: true,
                  keyboardType: "numeric",
                })}
                {renderInput("Age (Months)*", "ageMonths", "Months", {
                  halfWidth: true,
                  keyboardType: "numeric",
                })}
              </View>

              {renderInput("Colour", "colour", "Enter colour")}
            </View>

            {/* Section: Physical Attributes */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Physical Attributes</Text>

              <View style={styles.row}>
                {renderInput("Weight (kg)*", "weight", "Enter weight", {
                  halfWidth: true,
                  keyboardType: "numeric",
                })}
                {renderInput("Height (cm)", "height", "Enter height", {
                  halfWidth: true,
                  keyboardType: "numeric",
                })}
              </View>

              {renderInput(
                "Distinguishing Marks",
                "distinguishingMarks",
                "Enter any distinguishing marks",
                {
                  multiline: true,
                  showClearIcon: true,
                }
              )}
            </View>

            {/* Section: Location & Arrival */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Location & Arrival</Text>

              {renderInput(
                "Shed/Batch Number",
                "shedNumber",
                "Enter shed or batch number"
              )}

              <View style={styles.row}>
                {renderInput("Arrival Date*", "arrivalDate", "YYYY-MM-DD", {
                  halfWidth: true,
                })}
                {renderInput("Arrival Time", "arrivalTime", "HH:MM AM/PM", {
                  halfWidth: true,
                })}
              </View>
            </View>

            {/* Section: Health Records */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Health Records</Text>

              {renderInput(
                "Vaccination Status",
                "vaccinationStatus",
                "Enter vaccination status"
              )}

              <View style={styles.row}>
                {renderInput("Deworming Date", "dewormingDate", "YYYY-MM-DD", {
                  halfWidth: true,
                })}
                {renderInput(
                  "Temperature (°C)",
                  "temperature",
                  "Enter temperature",
                  {
                    halfWidth: true,
                    keyboardType: "decimal-pad",
                  }
                )}
              </View>

              {renderInput(
                "Last Checkup Date",
                "lastCheckupDate",
                "YYYY-MM-DD"
              )}

              {renderDropdown("Behavior", "behavior", "Select behavior")}
            </View>

            {/* Section: Upload Image */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Upload Image</Text>
              <View style={styles.uploadContainer}>
                <View style={styles.uploadIconContainer}>
                  <View style={styles.uploadIconCircle}>
                    <Text style={styles.uploadIcon}>📷</Text>
                  </View>
                  <Text style={styles.uploadText}>Tap to upload photo</Text>
                  <Text style={styles.uploadSubtext}>
                    JPG, PNG, or PDF (max 800x400px)
                  </Text>
                </View>
                <Text style={styles.uploadOr}>OR</Text>
                <TouchableOpacity
                  style={styles.cameraButton}
                  onPress={handleImageUpload}
                >
                  <Text style={styles.cameraButtonText}>Open Camera</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
                activeOpacity={0.8}
              >
                <Text style={styles.saveButtonText}>Save Cattle Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

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
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8e8",
  },
  headerButton: {
    width: 44,
    height: 44,
  },
  headerIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#1a5f3a",
    justifyContent: "center",
    alignItems: "center",
  },
  headerIcon: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  inputContainer: {
    marginBottom: 16,
  },
  halfInputContainer: {
    flex: 1,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: "#5a6c7d",
    marginBottom: 8,
  },
  inputWrapper: {
    position: "relative",
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#2c3e50",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  inputActive: {
    borderColor: "#6FCF97",
    borderWidth: 2,
    shadowColor: "#6FCF97",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  inputDisabled: {
    backgroundColor: "#f5f6fa",
    color: "#8e9aaa",
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  clearIcon: {
    position: "absolute",
    right: 12,
    top: 12,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#c8d0d9",
    justifyContent: "center",
    alignItems: "center",
  },
  clearIconText: {
    fontSize: 12,
    color: "#ffffff",
    fontWeight: "600",
  },
  dropdownButton: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownButtonActive: {
    borderColor: "#6FCF97",
    borderWidth: 2,
    shadowColor: "#6FCF97",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  dropdownText: {
    fontSize: 15,
    color: "#2c3e50",
  },
  dropdownPlaceholder: {
    color: "#b0b0b0",
  },
  dropdownIcon: {
    fontSize: 10,
    color: "#8e9aaa",
  },
  uploadContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 24,
    borderWidth: 2,
    borderColor: "#e8e8e8",
    borderStyle: "dashed",
    alignItems: "center",
  },
  uploadIconContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  uploadIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#e8f5e9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  uploadIcon: {
    fontSize: 28,
  },
  uploadText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 4,
  },
  uploadSubtext: {
    fontSize: 11,
    color: "#8e9aaa",
  },
  uploadOr: {
    fontSize: 12,
    color: "#8e9aaa",
    marginVertical: 8,
  },
  cameraButton: {
    backgroundColor: "#1a5f3a",
    borderRadius: 8,
    paddingHorizontal: 32,
    paddingVertical: 10,
  },
  cameraButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
    marginBottom: 16,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#636e72",
  },
  saveButton: {
    flex: 2,
    backgroundColor: "#1a5f3a",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: "600",
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
