import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function CattleDetails({ navigation, route }) {
  // Check if in read-only mode (user not logged in)
  const readOnly = route?.params?.readOnly || false;

  // Get cattle data from route params or use default sample data
  const initialCattleData = route?.params?.cattle || {
    id: "#890",
    image: require("../assets/images/initial.png"),

    // A. Basic Cattle Info
    cattleId: "CATTLE-2024-001",
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

    // C. Medical Reports
    bloodTestReport: "blood_test_report.pdf",
    stoolTestReport: null,
    pregnancyTest: null,
    otherDiagnosticReport: null,

    // Additional
    note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus elementum ultrices.",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [cattleData, setCattleData] = useState(initialCattleData);
  const [editedData, setEditedData] = useState(initialCattleData);

  const handleEdit = () => {
    setEditedData({ ...cattleData });
    setIsEditing(true);
  };

  const handleSave = () => {
    setCattleData({ ...editedData });
    setIsEditing(false);
    Alert.alert("Success", "Cattle details updated successfully!");
  };

  const handleCancel = () => {
    setEditedData({ ...cattleData });
    setIsEditing(false);
  };

  const updateField = (field, value) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const InfoRow = ({ label, value, field, editable = true }) => (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      {isEditing && editable ? (
        <TextInput
          style={styles.infoInput}
          value={editedData[field]}
          onChangeText={(text) => updateField(field, text)}
          placeholder={label}
          placeholderTextColor="#9ca3af"
        />
      ) : (
        <Text style={styles.infoValue}>
          {isEditing ? editedData[field] : value}
        </Text>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar style="light" translucent backgroundColor="transparent" />

      {/* Header Image Section - Full Width Edge to Edge */}
      <View style={styles.imageContainer}>
        <Image source={cattleData.image} style={styles.cattleImage} />

        {/* Overlay Header Buttons */}
        <SafeAreaView style={styles.headerOverlaySafeArea}>
          <View style={styles.headerOverlay}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.headerButtonText}>←</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      {/* Content Card */}
      <View style={styles.contentCard}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Cattle ID & Status Header */}
          <View style={styles.titleSection}>
            <View style={styles.titleLeft}>
              <View style={styles.nameRow}>
                <Text style={styles.cattleName}>{cattleData.cattleId}</Text>
              </View>
            </View>
            <View style={styles.statusPill}>
              <Text style={styles.statusPillText}>{cattleData.status}</Text>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Section A: Basic Cattle Info */}
          <View style={styles.sectionHeader}>
            <View style={styles.sectionBadge}>
              <Text style={styles.sectionBadgeText}>A</Text>
            </View>
            <Text style={styles.sectionTitle}>Basic Cattle Info</Text>
          </View>

          <View style={styles.infoGrid}>
            <View style={styles.infoGridRow}>
              <InfoRow label="Breed" value={cattleData.breed} field="breed" />
              <InfoRow
                label="Gender"
                value={cattleData.gender}
                field="gender"
              />
            </View>

            <View style={styles.gridDivider} />

            <View style={styles.infoGridRow}>
              <InfoRow
                label="Age (Years)"
                value={cattleData.ageYears}
                field="ageYears"
              />
              <InfoRow
                label="Age (Months)"
                value={cattleData.ageMonths}
                field="ageMonths"
              />
            </View>

            <View style={styles.gridDivider} />

            <View style={styles.infoGridRow}>
              <InfoRow
                label="Colour"
                value={cattleData.colour}
                field="colour"
              />
              <View style={styles.infoRow} />
            </View>

            <View style={styles.gridDivider} />

            <View style={styles.fullWidthRow}>
              <Text style={styles.infoLabel}>Distinguishing Marks</Text>
              {isEditing ? (
                <TextInput
                  style={styles.infoInputFull}
                  value={editedData.distinguishingMarks}
                  onChangeText={(text) =>
                    updateField("distinguishingMarks", text)
                  }
                  placeholder="Distinguishing Marks"
                  placeholderTextColor="#9ca3af"
                  multiline
                />
              ) : (
                <Text style={styles.infoValue}>
                  {cattleData.distinguishingMarks}
                </Text>
              )}
            </View>

            <View style={styles.gridDivider} />

            <View style={styles.infoGridRow}>
              <InfoRow
                label="Weight (kg)"
                value={cattleData.weight}
                field="weight"
              />
              <InfoRow
                label="Height (cm)"
                value={cattleData.height}
                field="height"
              />
            </View>

            <View style={styles.gridDivider} />

            <View style={styles.infoGridRow}>
              <InfoRow
                label="Shed Number"
                value={cattleData.shedNumber}
                field="shedNumber"
              />
              <InfoRow
                label="Registered By"
                value={cattleData.registeredBy}
                field="registeredBy"
              />
            </View>

            <View style={styles.gridDivider} />

            <View style={styles.infoGridRow}>
              <InfoRow
                label="Date of Entry"
                value={cattleData.dateOfEntry}
                field="dateOfEntry"
              />
              <InfoRow
                label="Date of Discharge"
                value={cattleData.dateOfDischarge || "—"}
                field="dateOfDischarge"
              />
            </View>

            <View style={styles.gridDivider} />

            <View style={styles.infoGridRow}>
              <InfoRow
                label="Country for Export"
                value={cattleData.exportCountry}
                field="exportCountry"
              />
              <InfoRow
                label="Owner ID"
                value={cattleData.ownerId}
                field="ownerId"
              />
            </View>
          </View>

          {/* Section B: Health Information */}
          <View style={styles.sectionHeader}>
            <View style={styles.sectionBadge}>
              <Text style={styles.sectionBadgeText}>B</Text>
            </View>
            <Text style={styles.sectionTitle}>Health Information</Text>
          </View>

          <View style={styles.infoGrid}>
            <View style={styles.fullWidthRow}>
              <Text style={styles.infoLabel}>Vaccination Status</Text>
              {isEditing ? (
                <TextInput
                  style={styles.infoInputFull}
                  value={editedData.vaccinationStatus}
                  onChangeText={(text) =>
                    updateField("vaccinationStatus", text)
                  }
                  placeholder="Vaccination Status"
                  placeholderTextColor="#9ca3af"
                />
              ) : (
                <View style={styles.statusBadge}>
                  <Text style={styles.statusBadgeText}>
                    {cattleData.vaccinationStatus}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.gridDivider} />

            <View style={styles.infoGridRow}>
              <InfoRow
                label="Deworming Date"
                value={cattleData.dewormingDate}
                field="dewormingDate"
              />
              <InfoRow
                label="Latest Vet Checkup"
                value={cattleData.latestVetCheckupDate}
                field="latestVetCheckupDate"
              />
            </View>

            <View style={styles.gridDivider} />

            <View style={styles.fullWidthRow}>
              <Text style={styles.infoLabel}>Summary of Health Condition</Text>
              {isEditing ? (
                <TextInput
                  style={styles.infoInputFull}
                  value={editedData.healthConditionSummary}
                  onChangeText={(text) =>
                    updateField("healthConditionSummary", text)
                  }
                  placeholder="Health Condition Summary"
                  placeholderTextColor="#9ca3af"
                  multiline
                />
              ) : (
                <Text style={styles.infoValue}>
                  {cattleData.healthConditionSummary}
                </Text>
              )}
            </View>

            <View style={styles.gridDivider} />

            <View style={styles.infoGridRow}>
              <InfoRow
                label="Temperature (°C)"
                value={cattleData.temperature}
                field="temperature"
              />
              <InfoRow
                label="General Behaviour"
                value={cattleData.behavior}
                field="behavior"
              />
            </View>
          </View>

          {/* Section C: Medical Reports */}
          <View style={styles.sectionHeader}>
            <View style={styles.sectionBadge}>
              <Text style={styles.sectionBadgeText}>C</Text>
            </View>
            <Text style={styles.sectionTitle}>Medical Reports</Text>
          </View>

          <View style={styles.infoGrid}>
            <View style={styles.reportRow}>
              <View style={styles.reportInfo}>
                <Text style={styles.reportIcon}>🩸</Text>
                <Text style={styles.reportLabel}>Blood Test Report</Text>
              </View>
              <View
                style={
                  cattleData.bloodTestReport
                    ? styles.reportStatusUploaded
                    : styles.reportStatusPending
                }
              >
                <Text
                  style={
                    cattleData.bloodTestReport
                      ? styles.reportStatusTextUploaded
                      : styles.reportStatusTextPending
                  }
                >
                  {cattleData.bloodTestReport ? "Uploaded" : "Not Uploaded"}
                </Text>
              </View>
            </View>

            <View style={styles.gridDivider} />

            <View style={styles.reportRow}>
              <View style={styles.reportInfo}>
                <Text style={styles.reportIcon}>🧪</Text>
                <Text style={styles.reportLabel}>Stool Test Report</Text>
              </View>
              <View
                style={
                  cattleData.stoolTestReport
                    ? styles.reportStatusUploaded
                    : styles.reportStatusPending
                }
              >
                <Text
                  style={
                    cattleData.stoolTestReport
                      ? styles.reportStatusTextUploaded
                      : styles.reportStatusTextPending
                  }
                >
                  {cattleData.stoolTestReport ? "Uploaded" : "Not Uploaded"}
                </Text>
              </View>
            </View>

            <View style={styles.gridDivider} />

            <View style={styles.reportRow}>
              <View style={styles.reportInfo}>
                <Text style={styles.reportIcon}>🤰</Text>
                <Text style={styles.reportLabel}>Pregnancy Test</Text>
              </View>
              <View
                style={
                  cattleData.pregnancyTest
                    ? styles.reportStatusUploaded
                    : styles.reportStatusPending
                }
              >
                <Text
                  style={
                    cattleData.pregnancyTest
                      ? styles.reportStatusTextUploaded
                      : styles.reportStatusTextPending
                  }
                >
                  {cattleData.pregnancyTest ? "Uploaded" : "N/A"}
                </Text>
              </View>
            </View>

            <View style={styles.gridDivider} />

            <View style={styles.reportRow}>
              <View style={styles.reportInfo}>
                <Text style={styles.reportIcon}>📋</Text>
                <Text style={styles.reportLabel}>Other Diagnostic Report</Text>
              </View>
              <View
                style={
                  cattleData.otherDiagnosticReport
                    ? styles.reportStatusUploaded
                    : styles.reportStatusPending
                }
              >
                <Text
                  style={
                    cattleData.otherDiagnosticReport
                      ? styles.reportStatusTextUploaded
                      : styles.reportStatusTextPending
                  }
                >
                  {cattleData.otherDiagnosticReport
                    ? "Uploaded"
                    : "Not Uploaded"}
                </Text>
              </View>
            </View>
          </View>

          {/* Main Divider */}
          <View style={styles.mainDivider} />

          {/* Note Section */}
          <View style={styles.noteSection}>
            <Text style={styles.noteTitle}>Note</Text>
            {isEditing ? (
              <TextInput
                style={styles.noteInput}
                value={editedData.note}
                onChangeText={(text) => updateField("note", text)}
                placeholder="Add a note..."
                placeholderTextColor="#9ca3af"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            ) : (
              <View style={styles.noteCard}>
                <Text style={styles.noteText}>{cattleData.note}</Text>
              </View>
            )}
          </View>

          {/* Bottom spacing for button */}
          {!readOnly && <View style={{ height: 80 }} />}
        </ScrollView>

        {/* Edit/Save Button - Only show when logged in (not readOnly) */}
        {!readOnly && (
          <View style={styles.bottomButtonContainer}>
            {isEditing ? (
              <View style={styles.editButtonRow}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleCancel}
                  activeOpacity={0.8}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSave}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={["#1a5f3a", "#2d7a4f"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.saveButtonGradient}
                  >
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.editButton}
                onPress={handleEdit}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["#1a5f3a", "#2d7a4f"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.editButtonGradient}
                >
                  <Text style={styles.editButtonText}>Edit Details</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },
  imageContainer: {
    width: width,
    height: 320,
    position: "relative",
  },
  cattleImage: {
    width: width,
    height: 320,
    resizeMode: "cover",
  },
  headerOverlaySafeArea: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  headerOverlay: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#1a5f3a",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  headerButtonText: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "600",
  },
  contentCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingTop: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  titleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  titleLeft: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
  },
  cattleName: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2d3436",
    letterSpacing: -0.5,
  },
  cattleId: {
    fontSize: 16,
    color: "#636e72",
    fontWeight: "500",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    gap: 4,
  },
  starIcon: {
    color: "#f4b400",
    fontSize: 16,
  },
  ratingText: {
    fontSize: 14,
    color: "#636e72",
    fontWeight: "500",
  },
  priceText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2d3436",
  },
  divider: {
    height: 1,
    backgroundColor: "#e8e8e8",
    marginBottom: 20,
  },
  rfidBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e8f5e9",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#c8e6c9",
  },
  rfidIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  rfidText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1a5f3a",
    letterSpacing: 0.5,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 8,
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
    fontSize: 18,
    fontWeight: "700",
    color: "#2d3436",
  },
  statusPill: {
    backgroundColor: "#fff3cd",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusPillText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#856404",
  },
  infoGrid: {
    backgroundColor: "#fafafa",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    marginBottom: 16,
  },
  infoGridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  infoRow: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#9ca3af",
    fontWeight: "500",
    marginBottom: 4,
    textTransform: "capitalize",
  },
  infoValue: {
    fontSize: 15,
    color: "#2d3436",
    fontWeight: "600",
  },
  gridDivider: {
    height: 1,
    backgroundColor: "#e8e8e8",
  },
  fullWidthRow: {
    paddingVertical: 12,
  },
  statusBadge: {
    backgroundColor: "#d4edda",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  statusBadgeText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#155724",
  },
  reportRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  reportInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  reportIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  reportLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2d3436",
  },
  reportStatusUploaded: {
    backgroundColor: "#d4edda",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  reportStatusTextUploaded: {
    fontSize: 12,
    fontWeight: "600",
    color: "#155724",
  },
  reportStatusPending: {
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  reportStatusTextPending: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6c757d",
  },
  mainDivider: {
    height: 1,
    backgroundColor: "#e8e8e8",
    marginVertical: 20,
  },
  statusSection: {
    marginBottom: 20,
  },
  statusLabel: {
    fontSize: 12,
    color: "#9ca3af",
    fontWeight: "500",
    marginBottom: 6,
  },
  statusValue: {
    fontSize: 16,
    color: "#2d3436",
    fontWeight: "600",
  },
  noteSection: {
    marginTop: 4,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2d3436",
    marginBottom: 12,
  },
  noteCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e8e8e8",
  },
  noteText: {
    fontSize: 14,
    color: "#4a5568",
    lineHeight: 22,
    fontStyle: "italic",
  },
  infoInput: {
    fontSize: 15,
    color: "#2d3436",
    fontWeight: "600",
    borderBottomWidth: 1,
    borderBottomColor: "#1a5f3a",
    paddingVertical: 4,
    paddingHorizontal: 0,
    marginTop: 2,
  },
  infoInputFull: {
    fontSize: 15,
    color: "#2d3436",
    fontWeight: "600",
    borderWidth: 1,
    borderColor: "#1a5f3a",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 4,
    backgroundColor: "#ffffff",
  },
  noteInput: {
    fontSize: 14,
    color: "#4a5568",
    lineHeight: 22,
    borderWidth: 1,
    borderColor: "#1a5f3a",
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#ffffff",
    minHeight: 100,
  },
  bottomButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  editButton: {
    borderRadius: 16,
    overflow: "hidden",
  },
  editButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  editButtonIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  editButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  editButtonRow: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    backgroundColor: "#ffffff",
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    color: "#636e72",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButton: {
    flex: 2,
    borderRadius: 16,
    overflow: "hidden",
  },
  saveButtonGradient: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
