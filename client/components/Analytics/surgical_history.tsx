// import React, { useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
// import { Ionicons } from "@expo/vector-icons"; // Make sure you have @expo/vector-icons installed

// // --- Reusable Surgery Card Component ---
// interface SurgeryCardProps {
//   surgeryType: string;
//   doctorName: string;
//   location: string;
//   onPressIcon?: () => void; // Optional: function for icon press
// }

// const SurgeryCard: React.FC<SurgeryCardProps> = ({
//   surgeryType,
//   doctorName,
//   location,
//   onPressIcon,
// }) => {
//   return (
//     <View style={styles.cardContainer}>
     
//       <View style={styles.cardHeader}>
//         <Text style={styles.surgeryType}>{surgeryType}</Text>
//         <TouchableOpacity onPress={onPressIcon} style={styles.iconButton}>
   
//           <Ionicons name="eye-outline" size={24} color="#333" />
//         </TouchableOpacity>
//       </View>

   
//       <View style={styles.divider} />

     
//       <Text style={styles.doctorName}>{doctorName}</Text>

    
//       <View style={styles.locationContainer}>
   
//         <Ionicons
//           name="location-outline"
//           size={16}
//           color="#666"
//           style={styles.locationIcon}
//         />
//         <Text style={styles.locationText}>{location}</Text>
//       </View>
//     </View>
//   );
// };

// // --- Med Band Component ---
// const MedBand: React.FC = () => {
//   // Example state for the switch
//   const [isConnected, setIsConnected] = useState(true);

//   return (
//     <View style={[styles.cardContainer, styles.medBandContainer]}>
//       <Text style={styles.medBandLabel}>Med Band</Text>
//       <View style={styles.switchContainer}>
//         <Switch
//           trackColor={{ false: "#767577", true: "#81b0ff" }}
//           thumbColor={isConnected ? "#007AFF" : "#f4f3f4"}
//           ios_backgroundColor="#3e3e3e"
//           onValueChange={() =>
//             setIsConnected((previousState) => !previousState)
//           }
//           value={isConnected}
//           style={styles.switch}
//         />
//         <Text style={styles.connectedText}>Connected</Text>
//       </View>
//       <View style={styles.percentageContainer}>
//         <Text style={styles.percentageText}>70%</Text>
//       </View>
//     </View>
//   );
// };

// // --- Main Surgical History Section Component ---
// const SurgicalHistory: React.FC = () => {
//   // Sample data - replace with actual data source later
//   const historyData = [
//     {
//       id: "1",
//       type: "Cardiothoracic surgery",
//       doctor: "Dr. David Patel",
//       location: "Sagar Hospital, Jayanagar, India",
//     },
//     {
//       id: "2",
//       type: "Vascular surgery",
//       doctor: "Dr. Jessica Turner",
//       location: "RMV Hospital, Sanjaynagar, India",
//     },
//     {
//       id: "3",
//       type: "Lung surgery",
//       doctor: "Dr. Michael Johnson",
//       location: "MS Ramaiah Hospital, New Bel Road, India",
//     },
//   ];

//   const handleIconPress = (id: string) => {
//     console.log(`Icon pressed for surgery ID: ${id}`);
//     // Add navigation or other action here
//   };

//   return (
//     <View style={styles.sectionContainer}>
//       <Text style={styles.sectionTitle}>Surgical History</Text>
//       {historyData.map((item) => (
//         <SurgeryCard
//           key={item.id}
//           surgeryType={item.type}
//           doctorName={item.doctor}
//           location={item.location}
//           onPressIcon={() => handleIconPress(item.id)}
//         />
//       ))}
//       <MedBand />
//     </View>
//   );
// };

// // --- Styles ---
// const styles = StyleSheet.create({
//   sectionContainer: {
//     paddingHorizontal: 20, // Add horizontal padding to the section
//     marginTop: 20, // Add space above the section title
//     marginBottom: 20, // Add space below the whole section
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 15,
//   },
//   cardContainer: {
//     backgroundColor: "#f0f4f7", // Light grey background
//     borderRadius: 15,
//     padding: 15,
//     marginBottom: 15, // Space between cards
//     shadowColor: "#000", // Optional shadow for depth
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   cardHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   surgeryType: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#2c3e50", // Darker text color
//     flex: 1, // Allow text to take space but wrap if needed
//     marginRight: 10, // Space before icon
//   },
//   iconButton: {
//     padding: 5, // Add padding for easier tapping
//   },
//   divider: {
//     height: 1,
//     backgroundColor: "#e0e0e0", // Light grey divider
//     marginVertical: 10,
//   },
//   doctorName: {
//     fontSize: 15,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 8,
//   },
//   locationContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   locationIcon: {
//     marginRight: 5,
//   },
//   locationText: {
//     fontSize: 14,
//     color: "#666", // Grey color for location
//     flex: 1, // Allow text wrapping
//   },
//   // MedBand specific styles
//   medBandContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingVertical: 10, // Adjust vertical padding for MedBand
//   },
//   medBandLabel: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#2c3e50",
//     flex: 1.5, // Give label more space
//   },
//   switchContainer: {
//     alignItems: "center",
//     marginHorizontal: 10,
//     flex: 1, // Allow switch area to take some space
//   },
//   switch: {
//     // Scale down the switch slightly if needed on specific platforms
//     // transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
//   },
//   connectedText: {
//     fontSize: 10,
//     color: "#666",
//     marginTop: 2,
//   },
//   percentageContainer: {
//     backgroundColor: "#0A2F5B", // Dark blue background
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     borderRadius: 8,
//     minWidth: 60, // Ensure minimum width
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   percentageText: {
//     color: "#FFFFFF", // White text
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default SurgicalHistory; // Export the main section component

import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useResponsive } from "../../hooks/useresponsive";
import { scale } from "@/utils/responsive";

interface SurgeryCardProps {
  surgeryType: string;
  doctorName: string;
  location: string;
  onPressIcon?: () => void;
}

const SurgeryCard: React.FC<SurgeryCardProps> = ({
  surgeryType,
  doctorName,
  location,
  onPressIcon,
}) => {
  const { scale, vs, ms } = useResponsive();

  return (
    <View style={[styles.cardContainer, { padding: vs(15), borderRadius: scale(15), marginBottom: vs(15) }]}>
      <View style={styles.cardHeader}>
        <Text style={[styles.surgeryType, { fontSize: ms(16), marginRight: scale(10) }]}>{surgeryType}</Text>
        <TouchableOpacity onPress={onPressIcon} style={styles.iconButton}>
          <Ionicons name="eye-outline" size={scale(24)} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={[styles.divider, { marginVertical: vs(10) }]} />

      <Text style={[styles.doctorName, { fontSize: ms(15), marginBottom: vs(8) }]}>{doctorName}</Text>

      <View style={styles.locationContainer}>
        <Ionicons name="location-outline" size={scale(16)} color="#666" style={{ marginRight: scale(5) }} />
        <Text style={[styles.locationText, { fontSize: ms(14) }]}>{location}</Text>
      </View>
    </View>
  );
};

const MedBand: React.FC = () => {
  const [isConnected, setIsConnected] = useState(true);
  const { scale, vs, ms } = useResponsive();

  return (
    <View style={[styles.cardContainer, styles.medBandContainer, { paddingVertical: vs(10), borderRadius: scale(8) }]}>
      <Text style={[styles.medBandLabel, { fontSize: ms(16), paddingLeft: scale(10) }]}>Med Band</Text>
      <View style={styles.switchContainer}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isConnected ? "#007AFF" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setIsConnected((prev) => !prev)}
          value={isConnected}
        />
        <Text style={[styles.connectedText, { fontSize: ms(10), marginTop: vs(2) }]}>Connected</Text>
      </View>
      <View style={[styles.percentageContainer, { paddingVertical: vs(8), paddingHorizontal: scale(15), borderRadius: scale(8), minWidth: scale(60), marginRight: scale(10) }]}>
        <Text style={[styles.percentageText, { fontSize: ms(16)}]}>70%</Text>
      </View>
    </View>
  );
};

const SurgicalHistory: React.FC = () => {
  const { vs, ms } = useResponsive();
  const historyData = [
    { id: "1", type: "Cardiothoracic surgery", doctor: "Dr. David Patel", location: "Sagar Hospital, Jayanagar, India" },
    { id: "2", type: "Vascular surgery", doctor: "Dr. Jessica Turner", location: "RMV Hospital, Sanjaynagar, India" },
    { id: "3", type: "Lung surgery", doctor: "Dr. Michael Johnson", location: "MS Ramaiah Hospital, New Bel Road, India" },
  ];

  return (
    <View style={[styles.sectionContainer, { paddingHorizontal: scale(20), marginTop: vs(20), marginBottom: vs(20) }]}>
      <Text style={[styles.sectionTitle, { fontSize: ms(18), marginBottom: vs(15) }]}>Surgical History</Text>
      {historyData.map((item) => (
        <SurgeryCard
          key={item.id}
          surgeryType={item.type}
          doctorName={item.doctor}
          location={item.location}
          onPressIcon={() => console.log(`Icon pressed for surgery ID: ${item.id}`)}
        />
      ))}
      <MedBand />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: { },
  sectionTitle: {
    fontWeight: "bold",
    color: "#333",
  },
  cardContainer: {
    backgroundColor: "#f0f4f7",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  surgeryType: {
    fontWeight: "bold",
    color: "#2c3e50",
    flex: 1,
  },
  iconButton: { padding: 5 },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
  },
  doctorName: {
    fontWeight: "bold",
    color: "#333",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    color: "#666",
    flex: 1,
  },
  medBandContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  medBandLabel: {
    color: "#2c3e50",
    flex: 1.5,
    fontWeight: "bold",
  },
  switchContainer: {
    alignItems: "center",
    marginHorizontal: 10,
    flex: 1,
  },
  connectedText: { color: "#666" },
  percentageContainer: {
    backgroundColor: "#0A2F5B",
    alignItems: "center",
    justifyContent: "center",
  },
  percentageText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default SurgicalHistory;
