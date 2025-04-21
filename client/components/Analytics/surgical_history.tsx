import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Make sure you have @expo/vector-icons installed

// --- Reusable Surgery Card Component ---
interface SurgeryCardProps {
  surgeryType: string;
  doctorName: string;
  location: string;
  onPressIcon?: () => void; // Optional: function for icon press
}

const SurgeryCard: React.FC<SurgeryCardProps> = ({
  surgeryType,
  doctorName,
  location,
  onPressIcon,
}) => {
  return (
    <View style={styles.cardContainer}>
     
      <View style={styles.cardHeader}>
        <Text style={styles.surgeryType}>{surgeryType}</Text>
        <TouchableOpacity onPress={onPressIcon} style={styles.iconButton}>
   
          <Ionicons name="eye-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

   
      <View style={styles.divider} />

     
      <Text style={styles.doctorName}>{doctorName}</Text>

    
      <View style={styles.locationContainer}>
   
        <Ionicons
          name="location-outline"
          size={16}
          color="#666"
          style={styles.locationIcon}
        />
        <Text style={styles.locationText}>{location}</Text>
      </View>
    </View>
  );
};

// --- Med Band Component ---
const MedBand: React.FC = () => {
  // Example state for the switch
  const [isConnected, setIsConnected] = useState(true);

  return (
    <View style={[styles.cardContainer, styles.medBandContainer]}>
      <Text style={styles.medBandLabel}>Med Band</Text>
      <View style={styles.switchContainer}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isConnected ? "#007AFF" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() =>
            setIsConnected((previousState) => !previousState)
          }
          value={isConnected}
          style={styles.switch}
        />
        <Text style={styles.connectedText}>Connected</Text>
      </View>
      <View style={styles.percentageContainer}>
        <Text style={styles.percentageText}>70%</Text>
      </View>
    </View>
  );
};

// --- Main Surgical History Section Component ---
const SurgicalHistory: React.FC = () => {
  // Sample data - replace with actual data source later
  const historyData = [
    {
      id: "1",
      type: "Cardiothoracic surgery",
      doctor: "Dr. David Patel",
      location: "Sagar Hospital, Jayanagar, India",
    },
    {
      id: "2",
      type: "Vascular surgery",
      doctor: "Dr. Jessica Turner",
      location: "RMV Hospital, Sanjaynagar, India",
    },
    {
      id: "3",
      type: "Lung surgery",
      doctor: "Dr. Michael Johnson",
      location: "MS Ramaiah Hospital, New Bel Road, India",
    },
  ];

  const handleIconPress = (id: string) => {
    console.log(`Icon pressed for surgery ID: ${id}`);
    // Add navigation or other action here
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Surgical History</Text>
      {historyData.map((item) => (
        <SurgeryCard
          key={item.id}
          surgeryType={item.type}
          doctorName={item.doctor}
          location={item.location}
          onPressIcon={() => handleIconPress(item.id)}
        />
      ))}
      <MedBand />
    </View>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  sectionContainer: {
    paddingHorizontal: 20, // Add horizontal padding to the section
    marginTop: 20, // Add space above the section title
    marginBottom: 20, // Add space below the whole section
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  cardContainer: {
    backgroundColor: "#f0f4f7", // Light grey background
    borderRadius: 15,
    padding: 15,
    marginBottom: 15, // Space between cards
    shadowColor: "#000", // Optional shadow for depth
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  surgeryType: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50", // Darker text color
    flex: 1, // Allow text to take space but wrap if needed
    marginRight: 10, // Space before icon
  },
  iconButton: {
    padding: 5, // Add padding for easier tapping
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0", // Light grey divider
    marginVertical: 10,
  },
  doctorName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: {
    marginRight: 5,
  },
  locationText: {
    fontSize: 14,
    color: "#666", // Grey color for location
    flex: 1, // Allow text wrapping
  },
  // MedBand specific styles
  medBandContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10, // Adjust vertical padding for MedBand
  },
  medBandLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
    flex: 1.5, // Give label more space
  },
  switchContainer: {
    alignItems: "center",
    marginHorizontal: 10,
    flex: 1, // Allow switch area to take some space
  },
  switch: {
    // Scale down the switch slightly if needed on specific platforms
    // transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },
  connectedText: {
    fontSize: 10,
    color: "#666",
    marginTop: 2,
  },
  percentageContainer: {
    backgroundColor: "#0A2F5B", // Dark blue background
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    minWidth: 60, // Ensure minimum width
    alignItems: "center",
    justifyContent: "center",
  },
  percentageText: {
    color: "#FFFFFF", // White text
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SurgicalHistory; // Export the main section component
