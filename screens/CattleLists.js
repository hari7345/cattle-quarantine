import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function CattleLists({ navigation }) {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);

  // Sample cattle data with all form fields
  const cattleData = [
    {
      id: "#890",
      name: "Twilight",
      type: "Calf",
      description: "Lorem ipsum dolor sit amet consectetur. Et sit",
      image: require("../assets/images/initial.png"),
      status: "healthy",
      price: "1.2 Lakhs",
      rating: 4.9,
      reviews: 146,
      // Basic Information
      rfidTag: "RFID-2024-001",
      breed: "Australian",
      ageYears: "0",
      ageMonths: "8",
      gender: "Male",
      colour: "Brown and White",
      // Physical Attributes
      weight: "145 Kg",
      height: "95 cm",
      distinguishingMarks: "Small white patch on forehead",
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
      reproductiveStatus: "Not applicable - Calf",
      note: "Healthy calf with good appetite. Growing well.",
    },
    {
      id: "#891",
      name: "Bella",
      type: "Cow",
      description: "Lorem ipsum dolor sit amet consectetur. Et sit",
      image: require("../assets/images/initial.png"),
      status: "healthy",
      price: "2.5 Lakhs",
      rating: 4.7,
      reviews: 89,
      // Basic Information
      rfidTag: "RFID-2024-002",
      breed: "Holstein Friesian",
      ageYears: "4",
      ageMonths: "2",
      gender: "Female",
      colour: "Black and White",
      // Physical Attributes
      weight: "450 Kg",
      height: "142 cm",
      distinguishingMarks: "Black patch near left eye",
      // Location & Arrival
      shedNumber: "B-05",
      arrivalDate: "2022-01-10",
      arrivalTime: "09:00 AM",
      // Health Records
      vaccinationStatus: "Up to date",
      dewormingDate: "2024-10-20",
      temperature: "38.2°C",
      lastCheckupDate: "2024-11-25",
      behavior: "Calm",
      // Additional
      reproductiveStatus: "Pregnant - 6 months",
      note: "High milk yielding cow. Regular health checkups done.",
    },
    {
      id: "#892",
      name: "Thunder",
      type: "Bull",
      description: "Lorem ipsum dolor sit amet consectetur. Et sit",
      image: require("../assets/images/initial.png"),
      status: "healthy",
      price: "3.8 Lakhs",
      rating: 4.8,
      reviews: 210,
      // Basic Information
      rfidTag: "RFID-2024-003",
      breed: "Angus",
      ageYears: "5",
      ageMonths: "9",
      gender: "Male",
      colour: "Solid Black",
      // Physical Attributes
      weight: "680 Kg",
      height: "165 cm",
      distinguishingMarks: "Muscular build, curly forehead",
      // Location & Arrival
      shedNumber: "C-01",
      arrivalDate: "2021-06-15",
      arrivalTime: "11:45 AM",
      // Health Records
      vaccinationStatus: "Up to date",
      dewormingDate: "2024-09-10",
      temperature: "38.6°C",
      lastCheckupDate: "2024-11-18",
      behavior: "Active",
      // Additional
      reproductiveStatus: "Active breeding",
      note: "Premium breeding bull with excellent genetics.",
    },
    {
      id: "#893",
      name: "Daisy",
      type: "Cow",
      description: "Lorem ipsum dolor sit amet consectetur. Et sit",
      image: require("../assets/images/initial.png"),
      status: "healthy",
      price: "1.8 Lakhs",
      rating: 4.5,
      reviews: 56,
      // Basic Information
      rfidTag: "RFID-2024-004",
      breed: "Jersey",
      ageYears: "2",
      ageMonths: "5",
      gender: "Female",
      colour: "Light Brown",
      // Physical Attributes
      weight: "280 Kg",
      height: "125 cm",
      distinguishingMarks: "White star on chest",
      // Location & Arrival
      shedNumber: "B-08",
      arrivalDate: "2023-07-22",
      arrivalTime: "08:30 AM",
      // Health Records
      vaccinationStatus: "Pending booster",
      dewormingDate: "2024-11-01",
      temperature: "38.4°C",
      lastCheckupDate: "2024-11-28",
      behavior: "Calm",
      // Additional
      reproductiveStatus: "Not yet bred",
      note: "Young heifer, ready for breeding in 3 months.",
    },
    {
      id: "#894",
      name: "Rocky",
      type: "Bull",
      description: "Lorem ipsum dolor sit amet consectetur. Et sit",
      image: require("../assets/images/initial.png"),
      status: "healthy",
      price: "2.2 Lakhs",
      rating: 4.6,
      reviews: 78,
      // Basic Information
      rfidTag: "RFID-2024-005",
      breed: "Hereford",
      ageYears: "3",
      ageMonths: "1",
      gender: "Male",
      colour: "Red and White Face",
      // Physical Attributes
      weight: "520 Kg",
      height: "152 cm",
      distinguishingMarks: "Distinctive white face pattern",
      // Location & Arrival
      shedNumber: "C-03",
      arrivalDate: "2023-03-01",
      arrivalTime: "02:15 PM",
      // Health Records
      vaccinationStatus: "Up to date",
      dewormingDate: "2024-10-05",
      temperature: "38.3°C",
      lastCheckupDate: "2024-11-22",
      behavior: "Calm",
      // Additional
      reproductiveStatus: "Active breeding",
      note: "Strong and healthy bull with good temperament.",
    },
  ];

  const filters = ["All", "Cow", "Bull", "Calf"];

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const filteredCattle = cattleData.filter((cattle) => {
    const matchesFilter =
      selectedFilter === "All" || cattle.type === selectedFilter;
    const matchesSearch =
      searchQuery === "" ||
      cattle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cattle.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Select Cattle</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                selectedFilter === filter && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter && styles.filterTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by Name or ID Tag..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Cattle List */}
        <ScrollView
          style={styles.listContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        >
          {filteredCattle.map((cattle) => (
            <TouchableOpacity
              key={cattle.id}
              style={styles.cattleCard}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("CattleDetails", { cattle })}
            >
              {/* Status Indicator */}
              <View style={styles.statusIndicator} />

              {/* Cattle Image */}
              <Image source={cattle.image} style={styles.cattleImage} />

              {/* Cattle Info */}
              <View style={styles.cattleInfo}>
                <Text style={styles.cattleName}>ID: {cattle.id}</Text>
                {/* <Text style={styles.cattleId}>ID: {cattle.id}</Text> */}
                <Text style={styles.cattleDescription} numberOfLines={2}>
                  <Text style={styles.descriptionLabel}>Description: </Text>
                  {cattle.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
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
    backgroundColor: "#f5f6fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f6fa",
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    fontSize: 24,
    color: "#2d3436",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2d3436",
  },
  placeholder: {
    width: 40,
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#ffffff",
    gap: 10,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#f5f6fa",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  filterButtonActive: {
    backgroundColor: "#1a5f3a",
    borderColor: "#1a5f3a",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#636e72",
  },
  filterTextActive: {
    color: "#ffffff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#2d3436",
    padding: 0,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cattleCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginBottom: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    position: "relative",
  },
  statusIndicator: {
    width: 6,
    backgroundColor: "#1a5f3a",
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
  },
  cattleImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    margin: 12,
    marginLeft: 16,
    backgroundColor: "#f5f6fa",
  },
  cattleInfo: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 12,
    justifyContent: "center",
  },
  cattleName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2d3436",
    marginBottom: 4,
  },
  cattleId: {
    fontSize: 12,
    color: "#636e72",
    marginBottom: 6,
  },
  cattleDescription: {
    fontSize: 11,
    color: "#636e72",
    lineHeight: 16,
  },
  descriptionLabel: {
    fontWeight: "600",
    color: "#2d3436",
  },
  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f5f6fa",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  favoriteIcon: {
    fontSize: 20,
  },
});
