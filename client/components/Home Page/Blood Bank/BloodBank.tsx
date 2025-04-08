// import React from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions
// } from "react-native";
// import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// const { width } = Dimensions.get("window");

// const BloodBankCard = () => {
//   const navigation = useNavigation();
//   return (
//     <View style={styles.container}>
//       {/* Header Section */}
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Blood Bank</Text>
//         <TouchableOpacity style={styles.expandIcon} onPress={() => navigation.navigate("ExpandBB")}>
//           <FontAwesome name="expand" size={14} color="#FFFFFF" />
//         </TouchableOpacity>
//       </View>

//       {/* Card Section */}
//       <View style={styles.card}>
//         {/* Left - Image */}
//         <Image
//           source={require("../../../assets/images/bloodbank.jpg")} 
//           style={styles.image}
//         />

//         {/* Right - Details */}
//         <View style={styles.details}>
//           <Text style={styles.title}>
//             Emergency <Text style={styles.bold}>B+ Blood Needed</Text>
//           </Text>

//           <View style={styles.infoRow}>
//             <MaterialIcons name="location-on" size={16} color="#6B7280" />
//             <Text style={styles.infoText}>MS Ramaiah Hospital</Text>
//           </View>

//           <View style={styles.infoRow}>
//             <MaterialIcons name="event" size={16} color="#6B7280" />
//             <Text style={styles.infoText}>08 Nov 2023</Text>
//           </View>

//           <View style={styles.infoRow}>
//             <MaterialIcons name="schedule" size={16} color="#6B7280" />
//             <Text style={styles.infoText}>02:00 PM</Text>
//           </View>
//         </View>
//       </View>

//       {/* Pagination Dots */}
//       <View style={styles.pagination}>
//         <View style={[styles.dot, styles.activeDot]} />
//         <View style={styles.dot} />
//         <View style={styles.dot} />
//         <View style={styles.dot} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 20,

//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   headerText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#0E3A5F",
//   },
//   expandIcon: {
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     backgroundColor: "#0E3A5F",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   card: {
//     flexDirection: "row",
//     backgroundColor: "#F5F7FA",
//     borderRadius: 10,
//     overflow: "hidden",
//     elevation: 2,
//   },
//   image: {
//     width: 120,
//     height: 132,
//     borderTopLeftRadius: 10,
//     borderBottomLeftRadius: 10,
//   },
//   details: {
//     flex: 1,
//     padding: 10,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "500",
//     marginBottom: 5,
//     color: "#1F2937",
//   },
//   bold: {
//     fontWeight: "bold",
//     color: "#1F2937",
//   },
//   infoRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 3,
//   },
//   infoText: {
//     fontSize: 14,
//     color: "#6B7280",
//     marginLeft: 5,
//   },
//   pagination: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: 10,
//   },
//   dot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: "#D1D5DB",
//     marginHorizontal: 4,
//   },
//   activeDot: {
//     backgroundColor: "#0E3A5F",
//     width: 35,
//   },
// });

// export default BloodBankCard;


// import React from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions
// } from "react-native";
// import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// const { width } = Dimensions.get("window");

// const BloodBankCard = () => {
//   const navigation = useNavigation();
//   return (
//     <View style={styles.container}>
//       {/* Header Section */}
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Blood Bank</Text>
//         <TouchableOpacity style={styles.expandIcon} onPress={() => navigation.navigate("ExpandBB")}>
//           <FontAwesome name="expand" size={14} color="#FFFFFF" />
//         </TouchableOpacity>
//       </View>

//       {/* Card Section */}
//       <View style={styles.card}>
//         {/* Left - Image */}
//         <Image
//           source={require("../../../assets/images/bloodbank.jpg")} 
//           style={styles.image}
//         />

//         {/* Right - Details */}
//         <View style={styles.details}>
//           <Text style={styles.title}>
//             Emergency <Text style={styles.bold}>B+ Blood Needed</Text>
//           </Text>

//           <View style={styles.infoRow}>
//             <MaterialIcons name="location-on" size={16} color="#6B7280" />
//             <Text style={styles.infoText}>MS Ramaiah Hospital</Text>
//           </View>

//           <View style={styles.infoRow}>
//             <MaterialIcons name="event" size={16} color="#6B7280" />
//             <Text style={styles.infoText}>08 Nov 2023</Text>
//           </View>

//           <View style={styles.infoRow}>
//             <MaterialIcons name="schedule" size={16} color="#6B7280" />
//             <Text style={styles.infoText}>02:00 PM</Text>
//           </View>
//         </View>
//       </View>

//       {/* Pagination Dots */}
//       <View style={styles.pagination}>
//         <View style={[styles.dot, styles.activeDot]} />
//         <View style={styles.dot} />
//         <View style={styles.dot} />
//         <View style={styles.dot} />
//       </View>

//       {/* Blood Bank Actions */}
//       <View style={styles.actionsContainer}>
//         <TouchableOpacity style={styles.button}>
//           <FontAwesome name="search" size={22} color="#0E3A5F" />
//           <Text style={styles.text}>Find Donor</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.button}>
//           <FontAwesome5 name="tint" size={22} color="#0E3A5F" />
//           <Text style={styles.text}>Campaign</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 20,
//     marginTop: -1,
//     maxHeight: 300,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   headerText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#0E3A5F",
//   },
//   expandIcon: {
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     backgroundColor: "#0E3A5F",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   card: {
//     flexDirection: "row",
//     backgroundColor: "#F5F7FA",
//     borderRadius: 15,
//     overflow: "hidden",
//     elevation: 2,
//   },
//   image: {
//     width: 120,
//     height: 132,
//     borderTopLeftRadius: 10,
//     borderBottomLeftRadius: 10,
//   },
//   details: {
//     flex: 1,
//     padding: 10,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "500",
//     marginBottom: 5,
//     color: "#1F2937",
//   },
//   bold: {
//     fontWeight: "bold",
//     color: "#1F2937",
//   },
//   infoRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 3,
//   },
//   infoText: {
//     fontSize: 14,
//     color: "#6B7280",
//     marginLeft: 5,
//   },
//   pagination: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: 10,
//   },
//   dot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: "#D1D5DB",
//     marginHorizontal: 4,
//   },
//   activeDot: {
//     backgroundColor: "#0E3A5F",
//     width: 35,
//   },
//   actionsContainer: {
//     marginTop: 18,
//     flexDirection: "row",
//     justifyContent: "center",
//     gap: 20,
//     alignItems: "center",
//   },
//   button: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F8F9FB",
//     paddingVertical: 18,
//     paddingHorizontal: 24,
//     borderRadius: 20,
//     minWidth: 160,
//     justifyContent: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   text: {
//     textAlign: "center",
//     marginLeft: 8,
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#0E3A5F",
//   },
// });

// export default BloodBankCard;


import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size;

const BloodBankCard = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Blood Bank</Text>
        <TouchableOpacity style={styles.expandIcon} onPress={() => navigation.navigate("ExpandBB" as never)}>
          <FontAwesome name="expand" size={scale(14)} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Card Section */}
      <View style={styles.card}>
        {/* Left - Image */}
        <Image
          source={require("../../../assets/images/bloodbank.jpg")}
          style={styles.image}
        />

        {/* Right - Details */}
        <View style={styles.details}>
          <Text style={styles.title}>
            Emergency <Text style={styles.bold}>B+ Blood Needed</Text>
          </Text>

          <View style={styles.infoRow}>
            <MaterialIcons name="location-on" size={scale(16)} color="#6B7280" />
            <Text style={styles.infoText}>MS Ramaiah Hospital</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="event" size={scale(16)} color="#6B7280" />
            <Text style={styles.infoText}>08 Nov 2023</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="schedule" size={scale(16)} color="#6B7280" />
            <Text style={styles.infoText}>02:00 PM</Text>
          </View>
        </View>
      </View>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      {/* Blood Bank Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.button}>
          <FontAwesome name="search" size={scale(20)} color="#0E3A5F" />
          <Text style={styles.text}>Find Donor</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <FontAwesome5 name="tint" size={scale(20)} color="#0E3A5F" />
          <Text style={styles.text}>Campaign</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: scale(20),
    marginTop: scale(-1),
    maxHeight: scale(300),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scale(10),
  },
  headerText: {
    fontSize: scale(18),
    fontWeight: "bold",
    color: "#0E3A5F",
  },
  expandIcon: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(14),
    backgroundColor: "#0E3A5F",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#F5F7FA",
    borderRadius: scale(15),
    overflow: "hidden",
    elevation: 2,
  },
  image: {
    width: scale(120),
    height: scale(132),
    borderTopLeftRadius: scale(10),
    borderBottomLeftRadius: scale(10),
  },
  details: {
    flex: 1,
    padding: scale(10),
  },
  title: {
    fontSize: scale(16),
    fontWeight: "500",
    marginBottom: scale(5),
    color: "#1F2937",
  },
  bold: {
    fontWeight: "bold",
    color: "#1F2937",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scale(3),
  },
  infoText: {
    fontSize: scale(14),
    color: "#6B7280",
    marginLeft: scale(5),
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: scale(10),
  },
  dot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: "#D1D5DB",
    marginHorizontal: scale(4),
  },
  activeDot: {
    backgroundColor: "#0E3A5F",
    width: scale(35),
  },
  actionsContainer: {
    marginTop: scale(18),
    flexDirection: "row",
    justifyContent: "center",
    gap: scale(20),
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FB",
    paddingVertical: scale(18),
    paddingHorizontal: scale(24),
    borderRadius: scale(20),
    minWidth: scale(160),
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.1,
    shadowRadius: scale(4),
    elevation: 3,
  },
  text: {
    textAlign: "center",
    marginLeft: scale(8),
    fontSize: scale(16),
    fontWeight: "bold",
    color: "#0E3A5F",
  },
});

export default BloodBankCard;