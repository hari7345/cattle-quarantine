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
    name: "Twilight",
    price: "1.2 Lakhs",
    rating: 4.9,
    reviews: 146,
    image: require("../assets/images/initial.png"),
    // Basic Information
    rfidTag: "RFID-2024-001",
    breed: "Holstein Friesian",
    ageYears: "3",
    ageMonths: "6",
    gender: "Male",
    colour: "Black and White",
    // Physical Attributes
    weight: "450 Kg",
    height: "145 cm",
    distinguishingMarks: "Small white patch on left shoulder",
    // Location & Arrival
    shedNumber: "A-12",
    arrivalDate: "2024-12-01",
    arrivalTime: "10:30 AM",
    // Health Records
    vaccinationStatus: "Up to date",
    dewormingDate: "2024-11-15",
    temperature: "38.5°C",
    lastCheckupDate: "2024-11-20",
    behavior: "Calm",
    // Additional
    reproductiveStatus: "Lorem ipsum dolor sit amet",
    note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus elementum ultrices. Quisque elementum lacus et pretium molestie.",
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
          {/* Name, ID, Price & Rating */}
          <View style={styles.titleSection}>
            <View style={styles.titleLeft}>
              <View style={styles.nameRow}>
                <Text style={styles.cattleName}>{cattleData.rfidTag}</Text>
                {/* <Text style={styles.cattleId}>{cattleData.id}</Text> */}
              </View>
            </View>
            {/* <Text style={styles.priceText}>{cattleData.price}</Text> */}
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* RFID Tag Badge */}
          {/* <View style={styles.rfidBadge}>
            <Text style={styles.rfidIcon}>📡</Text>
            <Text style={styles.rfidText}>{cattleData.rfidTag}</Text>
          </View> */}

          {/* Basic Information Section */}
          <Text style={styles.sectionTitle}>Basic Information</Text>

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
          </View>

          {/* Physical Attributes Section */}
          <Text style={styles.sectionTitle}>Physical Attributes</Text>

          <View style={styles.infoGrid}>
            <View style={styles.infoGridRow}>
              <InfoRow
                label="Weight"
                value={cattleData.weight}
                field="weight"
              />
              <InfoRow
                label="Height"
                value={cattleData.height}
                field="height"
              />
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
          </View>

          {/* Location & Arrival Section */}
          <Text style={styles.sectionTitle}>Location & Arrival</Text>

          <View style={styles.infoGrid}>
            <View style={styles.infoGridRow}>
              <InfoRow
                label="Shed/Batch Number"
                value={cattleData.shedNumber}
                field="shedNumber"
              />
              <View style={styles.infoRow} />
            </View>

            <View style={styles.gridDivider} />

            <View style={styles.infoGridRow}>
              <InfoRow
                label="Arrival Date"
                value={cattleData.arrivalDate}
                field="arrivalDate"
              />
              <InfoRow
                label="Arrival Time"
                value={cattleData.arrivalTime}
                field="arrivalTime"
              />
            </View>
          </View>

          {/* Health Records Section */}
          <Text style={styles.sectionTitle}>Health Records</Text>

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
                label="Temperature"
                value={cattleData.temperature}
                field="temperature"
              />
            </View>

            <View style={styles.gridDivider} />

            <View style={styles.infoGridRow}>
              <InfoRow
                label="Last Checkup Date"
                value={cattleData.lastCheckupDate}
                field="lastCheckupDate"
              />
              <InfoRow
                label="Behavior"
                value={cattleData.behavior}
                field="behavior"
              />
            </View>
          </View>

          {/* Main Divider */}
          <View style={styles.mainDivider} />

          {/* Reproductive Status Section */}
          <View style={styles.statusSection}>
            <Text style={styles.statusLabel}>Reproductive Status</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInputFull}
                value={editedData.reproductiveStatus}
                onChangeText={(text) => updateField("reproductiveStatus", text)}
                placeholder="Reproductive Status"
                placeholderTextColor="#9ca3af"
                multiline
              />
            ) : (
              <Text style={styles.statusValue}>
                {cattleData.reproductiveStatus}
              </Text>
            )}
          </View>

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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2d3436",
    marginBottom: 16,
    marginTop: 8,
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
