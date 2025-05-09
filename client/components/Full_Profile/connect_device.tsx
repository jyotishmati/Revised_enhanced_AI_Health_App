// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   SafeAreaView,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import Gold_bar from "../Home Page/Gold_bar";

// const ConnectDeviceScreen: React.FC = () => {
//   const navigation = useNavigation();

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <view>
//         <Gold_bar />
//       </view>
//     <ScrollView style={styles.container}>
//       {/* Back Button */}
//       <TouchableOpacity
//         style={styles.backButton}
//         onPress={() => navigation.goBack()}
//       >
//         <Ionicons name="arrow-back" size={22} color="#000" />
//         <Text style={styles.headerTitle}>Connect Device</Text>
//       </TouchableOpacity>

//       {/* Top Metrics (Grid Layout) */}
//       <View style={styles.metricsContainer}>
//         <View style={styles.metricBox}>
//           <Ionicons name="heart-outline" size={28} color="#000" />
//           <Text style={styles.metricTitle}>Blood Pressure</Text>
//           <Text style={styles.metricValue}>
//             120 / 80 <Text style={styles.metricUnit}>mm/hg</Text>
//           </Text>
//         </View>
//         <View style={styles.metricBox}>
//           <Ionicons name="pulse-outline" size={28} color="#000" />
//           <Text style={styles.metricTitle}>Heart Beat</Text>
//           <Text style={styles.metricValue}>
//             72 <Text style={styles.metricUnit}>beat/min</Text>
//           </Text>
//         </View>
//       </View>

//       {/* Other Health Data (List Format) */}
//       <View style={styles.listContainer}>
//         {healthData.map((item, index) => (
//           <TouchableOpacity key={index} style={styles.listItem}>
//             <View style={styles.iconWrapper}>
//               <Ionicons name={item.icon as "bed-outline" | "flame-outline" | "water-outline" | "walk-outline"} size={20} color="#000" />
//             </View>
//             <Text style={styles.itemText}>{item.name}</Text>
//             <Text style={styles.itemValue}>
//               {item.value} <Text style={styles.itemUnit}>{item.unit}</Text>
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </ScrollView>
//   </SafeAreaView>
//   );
// };

// export default ConnectDeviceScreen;

// // Data for List Items
// const healthData = [
//   { name: "Sleep", icon: "bed-outline", value: "7.5", unit: "hr/day" },
//   { name: "Calories Burn", icon: "flame-outline", value: "1,598", unit: "kcal" },
//   { name: "Oxygen", icon: "water-outline", value: "96", unit: "SpO₂" },
//   { name: "Steps", icon: "walk-outline", value: "10K", unit: "Steps" },
// ];

// // Styles
// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     paddingHorizontal: 24,
//     padding: 25,
//   },
//   backButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   headerTitle: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginLeft: 8,
//     color: "#063247",
//   },
//   metricsContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 22,
//     marginTop: 10,
//   },
//   metricBox: {
//     width: "48%",
//     backgroundColor: "#B3E5FC",
//     padding: 16,
//     borderRadius: 15,
//     alignItems: "center",
//   },
//   metricTitle: {
//     fontSize: 18,
//     color: "#063247",
//     marginTop: 5,
//   },
//   metricValue: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#063247",
//     marginTop: 4,
//   },
//   metricUnit: {
//     fontSize: 14,
//     color: "#555",
//   },
//   listContainer: {
//     marginBottom: 14,
//   },
//   listItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#B3E5FC",
//     paddingVertical: 14,
//     paddingHorizontal: 16,
//     borderRadius: 15,
//     marginBottom: 10,
//     justifyContent: "space-between",
//   },
//   iconWrapper: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: "#FFFFFF",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 14,
//   },
//   itemText: {
//     fontSize: 18,
//     color: "#063247",
//     flex: 1,
//   },
//   itemValue: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#063247",
//   },
//   itemUnit: {
//     fontSize: 14,
//     color: "#555",
//   },
// });

import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Gold_bar from "../Home Page/Gold_bar";
import { useResponsive } from "../../hooks/useresponsive";

const ConnectDeviceScreen: React.FC = () => {
  const navigation = useNavigation();
  const { scale, vs, ms } = useResponsive();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        <Gold_bar />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={[styles.backButton, { paddingVertical: vs(8) }]} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={ms(22)} color="#000" />
          <Text style={[styles.headerTitle, { fontSize: ms(22) }]}>Connect Device</Text>
        </TouchableOpacity>

        <View style={styles.metricsContainer}>
          {metricData.map((item, index) => (
            <AnimatedMetricBox key={index} {...item} delay={index * 100} />
          ))}
        </View>

        <View style={styles.listContainer}>
          {healthData.map((item, index) => (
            <AnimatedHealthItem key={index} {...item} delay={index * 150} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Animated Metric Box
const AnimatedMetricBox = ({ title, value, unit, icon, delay }: any) => {
  const translateY = useRef(new Animated.Value(20)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, { toValue: 0, duration: 400, delay, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 400, delay, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.metricBox, { opacity, transform: [{ translateY }] }]}>
      <Ionicons name={icon} size={28} color="#000" />
      <Text style={styles.metricTitle}>{title}</Text>
      <Text style={styles.metricValue}>
        {value} <Text style={styles.metricUnit}>{unit}</Text>
      </Text>
    </Animated.View>
  );
};

// Animated Health Item
const AnimatedHealthItem = ({ name, value, unit, icon, delay }: any) => {
  const translateY = useRef(new Animated.Value(20)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, { toValue: 0, duration: 400, delay, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 400, delay, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.listItem, { opacity, transform: [{ translateY }] }]}>
      <View style={styles.iconWrapper}>
        <Ionicons name={icon} size={20} color="#000" />
      </View>
      <Text style={styles.itemText}>{name}</Text>
      <Text style={styles.itemValue}>
        {value} <Text style={styles.itemUnit}>{unit}</Text>
      </Text>
    </Animated.View>
  );
};

export default ConnectDeviceScreen;

// Data Arrays
const metricData = [
  { title: "Blood Pressure", value: "120 / 80", unit: "mm/hg", icon: "heart-outline" },
  { title: "Heart Beat", value: "72", unit: "beat/min", icon: "pulse-outline" },
];

const healthData = [
  { name: "Sleep", icon: "bed-outline", value: "7.5", unit: "hr/day" },
  { name: "Calories Burn", icon: "flame-outline", value: "1,598", unit: "kcal" },
  { name: "Oxygen", icon: "water-outline", value: "96", unit: "SpO₂" },
  { name: "Steps", icon: "walk-outline", value: "10K", unit: "Steps" },
];

// Styles
const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flexGrow: 1, backgroundColor: "#FFFFFF", paddingHorizontal: 24, padding: 25 },
  backButton: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  headerTitle: { fontWeight: "bold", marginLeft: 8, color: "#063247" },
  metricsContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 22, marginTop: 10 },
  metricBox: {
    width: "48%",
    backgroundColor: "#B3E5FC",
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
  },
  metricTitle: { fontSize: 18, color: "#063247", marginTop: 5 },
  metricValue: { fontSize: 18, fontWeight: "bold", color: "#063247", marginTop: 4 },
  metricUnit: { fontSize: 14, color: "#555" },
  listContainer: { marginBottom: 14 },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#B3E5FC",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 15,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  itemText: { fontSize: 18, color: "#063247", flex: 1 },
  itemValue: { fontSize: 18, fontWeight: "bold", color: "#063247" },
  itemUnit: { fontSize: 14, color: "#555" },
});
