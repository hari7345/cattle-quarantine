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

export default function LiveStockDetailsForm({ route, navigation }) {
  const { rfidData } = route.params || {};
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // Form state - pre-filled with mock data from RFID
  const [formData, setFormData] = useState({
    // A. Basic Cattle Info
    cattleId: rfidData || "CATTLE-2024-001",
    breed: "Holstein Friesian",
    gender: "Female",
    ageYears: "3",
    ageMonths: "6",
    colour: "Black and White",
    distinguishingMarks: "Small white patch on left shoulder",
    weight: "450",
    height: "145",
    shedNumber: "A-12",
    registeredBy: "Dr. John Smith",
    dateOfEntry: "2024-12-01",
    dateOfDischarge: "",
    exportCountry: "UAE",
    status: "Quarantine",
    ownerId: "OWN-2024-0045",

    // B. Health Information
    vaccinationStatus: "Up to date",
    dewormingDate: "2024-11-15",
    latestVetCheckupDate: "2024-11-20",
    healthConditionSummary: "Healthy, no visible signs of illness",
    temperature: "38.5",
    behavior: "Calm",

    // C. Medical Reports (file references)
    bloodTestReport: null,
    stoolTestReport: null,
    pregnancyTest: null,
    otherDiagnosticReport: null,
  });

  // Cattle photos state
  const [cattlePhotos, setCattlePhotos] = useState({
    front: null,
    left: null,
    right: null,
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

  const handlePhotoUpload = (viewType) => {
    // Photo upload logic for cattle photos (front, left, right)
    console.log(`Open camera for ${viewType} view photo`);
    // In a real app, this would open the camera/gallery picker
    // and set the photo URI like:
    // setCattlePhotos(prev => ({ ...prev, [viewType]: imageUri }));
  };

  const handleReportUpload = (reportType) => {
    // Report upload logic for medical reports
    console.log(`Upload ${reportType}`);
    // In a real app, this would open a document picker
    // For demo, we'll just toggle the uploaded state
    setFormData((prev) => ({
      ...prev,
      [reportType]: prev[reportType] ? null : `${reportType}_file.pdf`,
    }));
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
      const dropdownOptions = {
        gender: ["Male", "Female"],
        behavior: ["Calm", "Active", "Aggressive"],
        status: ["Quarantine", "Cleared", "Under Observation", "Rejected"],
        vaccinationStatus: [
          "Up to date",
          "Pending",
          "Overdue",
          "Not Vaccinated",
        ],
      };

      const options = dropdownOptions[field];
      if (options) {
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
          <Text style={styles.headerTitle}>Live Stock Details</Text>
          <TouchableOpacity style={styles.headerButton}>
            {/* <View style={styles.headerIconCircle}>
              <Text style={styles.headerIcon}>↗</Text>
            </View> */}
          </TouchableOpacity>
        </View>

        {/* Form Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>
            {/* Section A: Basic Cattle Info */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionBadge}>
                  <Text style={styles.sectionBadgeText}>A</Text>
                </View>
                <Text style={styles.sectionTitle}>Basic Cattle Info</Text>
              </View>

              {renderInput("Cattle ID*", "cattleId", "Enter Cattle ID", {
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
                {renderInput("Age (Months)", "ageMonths", "Months", {
                  halfWidth: true,
                  keyboardType: "numeric",
                })}
              </View>

              {renderInput("Colour", "colour", "Enter colour")}

              {renderInput(
                "Distinguishing Marks",
                "distinguishingMarks",
                "Enter any distinguishing marks",
                {
                  multiline: true,
                  showClearIcon: true,
                }
              )}

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

              {/* Cattle Photos */}
              <Text style={styles.subSectionTitle}>Cattle Photos</Text>
              <View style={styles.photoGrid}>
                <TouchableOpacity
                  style={styles.photoBox}
                  onPress={() => handlePhotoUpload("front")}
                >
                  {cattlePhotos.front ? (
                    <Image
                      source={{ uri: cattlePhotos.front }}
                      style={styles.photoImage}
                    />
                  ) : (
                    <>
                      <Text style={styles.photoIcon}>📷</Text>
                      <Text style={styles.photoLabel}>Front View</Text>
                    </>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.photoBox}
                  onPress={() => handlePhotoUpload("left")}
                >
                  {cattlePhotos.left ? (
                    <Image
                      source={{ uri: cattlePhotos.left }}
                      style={styles.photoImage}
                    />
                  ) : (
                    <>
                      <Text style={styles.photoIcon}>📷</Text>
                      <Text style={styles.photoLabel}>Left View</Text>
                    </>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.photoBox}
                  onPress={() => handlePhotoUpload("right")}
                >
                  {cattlePhotos.right ? (
                    <Image
                      source={{ uri: cattlePhotos.right }}
                      style={styles.photoImage}
                    />
                  ) : (
                    <>
                      <Text style={styles.photoIcon}>📷</Text>
                      <Text style={styles.photoLabel}>Right View</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>

              {renderInput(
                "Shed Number",
                "shedNumber",
                "Enter shed or batch number"
              )}

              {renderInput(
                "Registered By*",
                "registeredBy",
                "Enter registrar name"
              )}

              <View style={styles.row}>
                {renderInput("Date of Entry*", "dateOfEntry", "YYYY-MM-DD", {
                  halfWidth: true,
                })}
                {renderInput(
                  "Date of Discharge",
                  "dateOfDischarge",
                  "YYYY-MM-DD",
                  {
                    halfWidth: true,
                  }
                )}
              </View>

              {renderInput(
                "Country for Export",
                "exportCountry",
                "Enter destination country"
              )}

              <View style={styles.row}>
                {renderDropdown("Status*", "status", "Select status", true)}
                {renderInput("Owner ID", "ownerId", "Enter owner ID", {
                  halfWidth: true,
                })}
              </View>
            </View>

            {/* Section B: Health Information */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionBadge}>
                  <Text style={styles.sectionBadgeText}>B</Text>
                </View>
                <Text style={styles.sectionTitle}>Health Information</Text>
              </View>

              {renderDropdown(
                "Vaccination Status*",
                "vaccinationStatus",
                "Select status"
              )}

              <View style={styles.row}>
                {renderInput("Deworming Date", "dewormingDate", "YYYY-MM-DD", {
                  halfWidth: true,
                })}
                {renderInput(
                  "Latest Vet Checkup",
                  "latestVetCheckupDate",
                  "YYYY-MM-DD",
                  {
                    halfWidth: true,
                  }
                )}
              </View>

              {renderInput(
                "Summary of Health Condition",
                "healthConditionSummary",
                "Enter summary of health condition",
                {
                  multiline: true,
                  showClearIcon: true,
                }
              )}

              <View style={styles.row}>
                {renderInput(
                  "Temperature (°C)",
                  "temperature",
                  "Enter temperature",
                  {
                    halfWidth: true,
                    keyboardType: "decimal-pad",
                  }
                )}
                {renderDropdown(
                  "General Behaviour",
                  "behavior",
                  "Select",
                  true
                )}
              </View>
            </View>

            {/* Section C: Medical Reports */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionBadge}>
                  <Text style={styles.sectionBadgeText}>C</Text>
                </View>
                <Text style={styles.sectionTitle}>Medical Reports</Text>
              </View>

              {/* Blood Test Report */}
              <View style={styles.reportUploadItem}>
                <View style={styles.reportInfo}>
                  <Text style={styles.reportIcon}>🩸</Text>
                  <View style={styles.reportTextContainer}>
                    <Text style={styles.reportLabel}>Blood Test Report</Text>
                    <Text style={styles.reportSubtext}>PDF or Image</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.uploadBtn}
                  onPress={() => handleReportUpload("bloodTestReport")}
                >
                  <Text style={styles.uploadBtnText}>
                    {formData.bloodTestReport ? "✓ Uploaded" : "Upload"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Stool Test Report */}
              <View style={styles.reportUploadItem}>
                <View style={styles.reportInfo}>
                  <Text style={styles.reportIcon}>🧪</Text>
                  <View style={styles.reportTextContainer}>
                    <Text style={styles.reportLabel}>Stool Test Report</Text>
                    <Text style={styles.reportSubtext}>PDF or Image</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.uploadBtn}
                  onPress={() => handleReportUpload("stoolTestReport")}
                >
                  <Text style={styles.uploadBtnText}>
                    {formData.stoolTestReport ? "✓ Uploaded" : "Upload"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Pregnancy Test */}
              <View style={styles.reportUploadItem}>
                <View style={styles.reportInfo}>
                  <Text style={styles.reportIcon}>🤰</Text>
                  <View style={styles.reportTextContainer}>
                    <Text style={styles.reportLabel}>Pregnancy Test</Text>
                    <Text style={styles.reportSubtext}>If applicable</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.uploadBtn}
                  onPress={() => handleReportUpload("pregnancyTest")}
                >
                  <Text style={styles.uploadBtnText}>
                    {formData.pregnancyTest ? "✓ Uploaded" : "Upload"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Other Diagnostic Report */}
              <View style={styles.reportUploadItem}>
                <View style={styles.reportInfo}>
                  <Text style={styles.reportIcon}>📋</Text>
                  <View style={styles.reportTextContainer}>
                    <Text style={styles.reportLabel}>
                      Other Diagnostic Report
                    </Text>
                    <Text style={styles.reportSubtext}>Any other reports</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.uploadBtn}
                  onPress={() => handleReportUpload("otherDiagnosticReport")}
                >
                  <Text style={styles.uploadBtnText}>
                    {formData.otherDiagnosticReport ? "✓ Uploaded" : "Upload"}
                  </Text>
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
                <Text style={styles.saveButtonText}>
                  Save Live Stock Details
                </Text>
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
                  Live Stock details saved successfully
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
    marginBottom: 28,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8e8",
  },
  sectionBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#1a5f3a",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  sectionBadgeText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#ffffff",
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#2c3e50",
  },
  subSectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#5a6c7d",
    marginTop: 8,
    marginBottom: 12,
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
  // Photo Grid Styles
  photoGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 10,
  },
  photoBox: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: "#f5f6fa",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  photoIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  photoLabel: {
    fontSize: 10,
    fontWeight: "500",
    color: "#8e9aaa",
    textAlign: "center",
  },
  photoImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  // Report Upload Styles
  reportUploadItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e8e8e8",
  },
  reportInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  reportIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  reportTextContainer: {
    flex: 1,
  },
  reportLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 2,
  },
  reportSubtext: {
    fontSize: 11,
    color: "#8e9aaa",
  },
  uploadBtn: {
    backgroundColor: "#1a5f3a",
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  uploadBtnText: {
    fontSize: 12,
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
