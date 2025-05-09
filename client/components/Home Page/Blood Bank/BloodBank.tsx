// import React from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
// } from "react-native";
// import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";

// const { width } = Dimensions.get("window");
// const scale = (size: number) => (width / 375) * size;

// const BloodBankCard = () => {
//   const navigation = useNavigation();
//   return (
//     <View style={styles.container}>
//       {/* Header Section */}
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Blood Bank</Text>
//         <TouchableOpacity
//           style={styles.expandIcon}
//           onPress={() => navigation.navigate("ExpandBB" as never)}
//         >
//           <FontAwesome name="expand" size={scale(12)} color="#FFFFFF" />
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
//             <Text style={styles.bold}>Emergency B+ Blood Needed</Text>
//           </Text>

//           <View style={styles.infoRow}>
//             <MaterialIcons
//               name="location-on"
//               size={scale(16)}
//               color="#6B7280"
//             />
//             <Text style={styles.infoText}>MS Ramaiah Hospital</Text>
//           </View>

//           <View style={styles.infoRow}>
//             <MaterialIcons name="event" size={scale(16)} color="#6B7280" />
//             <Text style={styles.infoText}>08 Nov 2023</Text>
//           </View>

//           <View style={styles.infoRow}>
//             <MaterialIcons name="schedule" size={scale(16)} color="#6B7280" />
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
//           <FontAwesome name="search" size={scale(20)} color="#0E3A5F" />
//           <Text style={styles.text}>Find Donor</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.button}>
//           <FontAwesome5 name="tint" size={scale(20)} color="#0E3A5F" />
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
//     padding: scale(20),
//     marginTop: scale(-1),
//     maxHeight: scale(300),
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: scale(10),
//   },
//   headerText: {
//     fontSize: scale(16),
//     fontWeight: "bold",
//     color: "#063247",
//   },
//   expandIcon: {
//     width: scale(24),
//     height: scale(24),
//     borderRadius: scale(14),
//     backgroundColor: "#063247",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   card: {
//     flexDirection: "row",
//     backgroundColor: "#F5F7FA",
//     borderRadius: scale(15),
//     overflow: "hidden",
//     elevation: 2,
//   },
//   image: {
//     width: scale(120),
//     height: scale(132),
//     borderTopLeftRadius: scale(10),
//     borderBottomLeftRadius: scale(10),
//   },
//   details: {
//     flex: 1,
//     padding: scale(10),
//   },
//   title: {
//     fontSize: scale(16),
//     fontWeight: "500",
//     marginBottom: scale(5),
//     color: "#1F2937",
//   },
//   bold: {
//     fontWeight: "500",
//     color: "#063247",
//   },
//   infoRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: scale(3),
//   },
//   infoText: {
//     fontSize: scale(12),
//     color: "#7D8A95",
//     marginLeft: scale(5),
//   },
//   pagination: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: scale(10),
//   },
//   dot: {
//     width: scale(8),
//     height: scale(8),
//     borderRadius: scale(4),
//     backgroundColor: "#E5E7EB",
//     marginHorizontal: scale(4),
//   },
//   activeDot: {
//     backgroundColor: "#063247",
//     width: scale(35),
//   },
//   actionsContainer: {
//     marginTop: scale(18),
//     flexDirection: "row",
//     justifyContent: "center",
//     gap: scale(20),
//     alignItems: "center",
//   },
//   button: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F1F1F1",
//     paddingVertical: scale(18),
//     paddingHorizontal: scale(24),
//     borderRadius: scale(20),
//     minWidth: scale(160),
//     justifyContent: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: scale(2) },
//     shadowOpacity: 0.1,
//     shadowRadius: scale(4),
//     elevation: 3,
//   },
//   text: {
//     textAlign: "center",
//     marginLeft: scale(8),
//     fontSize: scale(14),
//     fontWeight: "bold",
//     color: "#063247",
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
} from "react-native";
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useResponsive } from "../../../hooks/useresponsive";

const BloodBankCard = () => {
  const navigation = useNavigation();
  const { scale, ms, vs } = useResponsive();

  return (
    <View style={[styles.container, { padding: scale(20), maxHeight: vs(290), marginTop: vs(-1)}]}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={[styles.headerText, { fontSize: ms(16) }]}>Blood Bank</Text>
        <TouchableOpacity
          style={[
            styles.expandIcon,
            { width: scale(24), height: scale(24), borderRadius: scale(12) },
          ]}
          onPress={() => navigation.navigate("ExpandBB" as never)}
        >
          <FontAwesome name="expand" size={ms(12)} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Card Section */}
      <View style={styles.card}>
        <Image
          source={require("../../../assets/images/bloodbank.jpg")}
          style={[styles.image, { width: scale(120), height: vs(132) }]}
        />

        <View style={styles.details}>
          <Text style={[styles.title, { fontSize: ms(16) }]}>
            <Text style={styles.bold}>Emergency B+ Blood Needed</Text>
          </Text>

          {[
            { icon: "location-on", text: "MS Ramaiah Hospital" },
            { icon: "event", text: "08 Nov 2023" },
            { icon: "schedule", text: "02:00 PM" },
          ].map((item, idx) => (
            <View key={idx} style={styles.infoRow}>
              <MaterialIcons name={item.icon as any} size={ms(16)} color="#6B7280" />
              <Text style={[styles.infoText, { fontSize: ms(12) }]}>{item.text}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {[0, 1, 2, 3].map((_, idx) => (
          <View
            key={idx}
            style={[
              styles.dot,
              idx === 0 && styles.activeDot,
              { width: idx === 0 ? scale(35) : scale(8), height: scale(8) },
            ]}
          />
        ))}
      </View>

      {/* Actions Section */}
      <View style={styles.actionsContainer}>
        {[
          { icon: "search", label: "Find Donor" },
          { icon: "tint", label: "Campaign" },
        ].map((action, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.button,
              {
                paddingVertical: vs(14),
                paddingHorizontal: vs(24),
                borderRadius: scale(20),
                minWidth: scale(150),
              },
            ]}
          >
            {action.icon === "search" ? (
              <FontAwesome name={action.icon} size={ms(20)} color="#0E3A5F" />
            ) : (
              <FontAwesome5 name={action.icon} size={ms(20)} color="#0E3A5F" />
            )}
            <Text style={[styles.text, { fontSize: ms(14) }]}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    fontWeight: "bold",
    color: "#063247",
  },
  expandIcon: {
    backgroundColor: "#063247",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#F5F7FA",
    borderRadius: 15,
    overflow: "hidden",
    elevation: 2,
  },
  image: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  details: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontWeight: "500",
    marginBottom: 5,
    color: "#1F2937",
  },
  bold: {
    fontWeight: "600",
    color: "#063247",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
  infoText: {
    color: "#7D8A95",
    marginLeft: 5,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    borderRadius: 4,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#063247",
  },
  actionsContainer: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    alignItems: "center",
    
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    textAlign: "center",
    marginLeft: 8,
    fontWeight: "bold",
    color: "#063247",
  },
});

export default BloodBankCard;
