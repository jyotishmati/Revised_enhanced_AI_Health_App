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

// const FitnessScreen: React.FC = () => {
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
//         <Text style={styles.headerTitle}>Fitness</Text>
//       </TouchableOpacity>

//       {/* Workout Section */}
//       <Text style={styles.sectionTitle}>Workout</Text>
//       <View style={styles.boxContainer}>
//         {workoutData.map((item, index) => (
//           <TouchableOpacity key={index} style={styles.listItem}>
//             <View style={styles.iconWrapper}>
//               <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={20} color="#000" />
//             </View>
//             <Text style={styles.itemText}>{item.name}</Text>
//             <Ionicons name="chevron-forward" size={20} color="#000" />
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Diet Section */}
//       <Text style={styles.sectionTitle}>Diet</Text>
//       <View style={styles.boxContainer}>
//         {dietData.map((item, index) => (
//           <TouchableOpacity key={index} style={styles.listItem}>
//             <View style={styles.iconWrapper}>
//               <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={20} color="#000" />
//             </View>
//             <Text style={styles.itemText}>{item.name}</Text>
//             <Ionicons name="chevron-forward" size={20} color="#000" />
//           </TouchableOpacity>
//         ))}
//       </View>
//     </ScrollView>
//   </SafeAreaView>
//   );
// };

// export default FitnessScreen;

// const workoutData = [
//   { name: "Weight Loss", icon: "body-outline" },
//   { name: "Muscle Gain", icon: "barbell-outline" },
//   { name: "Home Workout", icon: "home-outline" },
//   { name: "Yoga", icon: "accessibility-outline" },
// ];

// const dietData = [
//   { name: "Vegetarian Diet", icon: "restaurant-outline" },
//   { name: "Vegan Diet", icon: "leaf-outline" },
//   { name: "Muscle Gain Diet", icon: "nutrition-outline" },
// ];

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     paddingHorizontal: 24,
//     paddingTop: 25,
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
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#063247",
//     marginBottom: 10,
//   },
//   boxContainer: {
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

const FitnessScreen: React.FC = () => {
  const navigation = useNavigation();
  const { scale, vs, ms } = useResponsive();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        <Gold_bar />
      </View>
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={[styles.backButton, { paddingVertical: vs(8) }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={ms(22)} color="#000" />
          <Text style={[styles.headerTitle, { fontSize: ms(22) }]}>Fitness</Text>
        </TouchableOpacity>

        <Text style={[styles.sectionTitle, { fontSize: ms(18) }]}>Workout</Text>
        <View style={styles.boxContainer}>
          {workoutData.map((item, index) => (
            <AnimatedListItem
              key={index}
              item={item}
              delay={index * 100}
              ms={ms}
              scale={scale}
            />
          ))}
        </View>

        <Text style={[styles.sectionTitle, { fontSize: ms(18) }]}>Diet</Text>
        <View style={styles.boxContainer}>
          {dietData.map((item, index) => (
            <AnimatedListItem
              key={index}
              item={item}
              delay={index * 100 + 400}
              ms={ms}
              scale={scale}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const AnimatedListItem = ({ item, delay, ms, scale }: any) => {
  const translateY = useRef(new Animated.Value(20)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[styles.listItem, { opacity, transform: [{ translateY }] }]}
    >
      <View style={[styles.iconWrapper, { width: scale(36), height: scale(36), borderRadius: scale(18) }]}> 
        <Ionicons
          name={item.icon as keyof typeof Ionicons.glyphMap}
          size={ms(20)}
          color="#000"
        />
      </View>
      <Text style={[styles.itemText, { fontSize: ms(18) }]}>{item.name}</Text>
      <Ionicons name="chevron-forward" size={ms(20)} color="#000" />
    </Animated.View>
  );
};

export default FitnessScreen;

const workoutData = [
  { name: "Weight Loss", icon: "body-outline" },
  { name: "Muscle Gain", icon: "barbell-outline" },
  { name: "Home Workout", icon: "home-outline" },
  { name: "Yoga", icon: "accessibility-outline" },
];

const dietData = [
  { name: "Vegetarian Diet", icon: "restaurant-outline" },
  { name: "Vegan Diet", icon: "leaf-outline" },
  { name: "Muscle Gain Diet", icon: "nutrition-outline" },
];

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 25,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontWeight: "bold",
    marginLeft: 8,
    color: "#063247",
  },
  sectionTitle: {
    fontWeight: "bold",
    color: "#063247",
    marginBottom: 10,
  },
  boxContainer: {
    marginBottom: 14,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#B3E5FC",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 15,
    marginBottom: 10,
  },
  iconWrapper: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  itemText: {
    color: "#063247",
    flex: 1,
  },
});
