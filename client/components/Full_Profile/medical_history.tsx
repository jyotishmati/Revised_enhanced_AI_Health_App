// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   SafeAreaView
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import Gold_bar from "../Home Page/Gold_bar";

// const MedicalHistoryScreen: React.FC = () => {
//   const navigation = useNavigation();

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <view>
//       <Gold_bar />
//       </view>
//     <ScrollView style={styles.container}>
      
//       {/* Back Navigation */}
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//         <Ionicons name="arrow-back" size={20} color="#000" />
//         <Text style={styles.headerTitle}>Medical History</Text>
//       </TouchableOpacity>

//       {/* Medical Conditions */}
//       <Text style={styles.sectionTitle}>Medical Conditions</Text>
//       <View style={styles.boxContainer}>
//         <TouchableOpacity style={styles.listItem}>
//           <View style={styles.iconWrapper}>
//             <Ionicons name="water-outline" size={18} color="#000" />
//           </View>
//           <Text style={styles.itemText}>Diabetes</Text>
//           <Ionicons name="chevron-forward" size={18} color="#000" style={styles.arrowIcon} />
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.listItem}>
//           <View style={styles.iconWrapper}>
//             <Ionicons name="medkit-outline" size={18} color="#000" />
//           </View>
//           <Text style={styles.itemText}>Cholesterol</Text>
//           <Ionicons name="chevron-forward" size={18} color="#000" style={styles.arrowIcon} />
//         </TouchableOpacity>
//       </View>

//       {/* Allergies */}
//       <Text style={styles.sectionTitle}>Allergies</Text>
//       <View style={styles.allergyContainer}>
//         <TouchableOpacity style={styles.allergyItem}>
//           <Ionicons name="flower-outline" size={18} color="#000" />
//           <Text style={styles.allergyText}>Pollen</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.allergyItem}>
//           <Ionicons name="cube-outline" size={18} color="#000" />
//           <Text style={styles.allergyText}>Milk</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.allergyItem}>
//           <Ionicons name="cloud-outline" size={18} color="#000" />
//           <Text style={styles.allergyText}>Dust</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Surgeries */}
//       <Text style={styles.sectionTitle}>Surgeries</Text>
//       <View style={styles.boxContainer}>
//         <TouchableOpacity style={styles.listItem}>
//           <View style={styles.iconWrapper}>
//             <Ionicons name="walk-outline" size={18} color="#000" />
//           </View>
//           <Text style={styles.itemText}>Kidney Stone</Text>
//           <Ionicons name="chevron-forward" size={18} color="#000" style={styles.arrowIcon} />
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.listItem}>
//           <View style={styles.iconWrapper}>
//             <Ionicons name="body-outline" size={18} color="#000" />
//           </View>
//           <Text style={styles.itemText}>Ligament Tear</Text>
//           <Ionicons name="chevron-forward" size={18} color="#000" style={styles.arrowIcon} />
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default MedicalHistoryScreen;

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//   },
//     container: {
//       flex: 1,
//       backgroundColor: "#FFFFFF",
//       paddingHorizontal: 24, // Increased padding
//       paddingTop: 20,
//     },
//     backButton: {
//       flexDirection: "row",
//       alignItems: "center",
//       marginBottom: 16,
//     },
//     headerTitle: {
//       fontSize: 22,
//       fontWeight: "bold",
//       marginLeft: 8,
//       color: "#063247",
//     },
//     sectionTitle: {
//       fontSize: 18,
//       fontWeight: "bold",
//       color: "#063247",
//       marginBottom: 15,
//       marginTop: 10,
//     },
//     boxContainer: {
//       marginBottom: 16,
//     },
//     listItem: {
//       flexDirection: "row",
//       alignItems: "center",
//       backgroundColor: "#B3E5FC",
//       paddingVertical: 18, // Increased padding
//       paddingHorizontal: 16, // Increased padding
//       borderRadius: 15, // Slightly rounded corners
//       marginBottom: 12, // Increased spacing
//     },
//     iconWrapper: {
//       width: 40, // Increased size
//       height: 40,
//       borderRadius: 20,
//       backgroundColor: "#FFFFFF",
//       alignItems: "center",
//       justifyContent: "center",
//       marginRight: 16, // Increased spacing
//     },
//     itemText: {
//       fontSize: 18, // Slightly larger text
//       color: "#063247",
//       flex: 1,
//     },
//     arrowIcon: {
//       marginLeft: "auto",
//       fontSize: 20, // Slightly larger arrow
//     },
//     allergyContainer: {
//       flexDirection: "row",
//       justifyContent: "space-between",
//       marginBottom: 16,
//     },
//     allergyItem: {
//       width: 90, // Fixed width for proper spacing
//       height: 90, // Square shape
//       alignItems: "center",
//       justifyContent: "center",
//       backgroundColor: "#B3E5FC",
//       borderRadius: 12,
//     },
//     allergyText: {
//       fontSize: 18,
//       color: "#063247",
//       marginTop: 6, // Space between icon and text
//       textAlign: "center", // Center-aligned text
//     },
//   });
  

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

const MedicalHistoryScreen: React.FC = () => {
  const navigation = useNavigation();
  const { scale, vs, ms } = useResponsive();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Gold_bar />
      <ScrollView contentContainerStyle={styles.container}>
        <AnimatedHeader navigation={navigation} ms={ms} />

        <AnimatedSection title="Medical Conditions" delay={0}>
          <AnimatedListItem title="Diabetes" icon="water-outline" delay={100} />
          <AnimatedListItem title="Cholesterol" icon="medkit-outline" delay={200} />
        </AnimatedSection>

        <AnimatedSection title="Allergies" delay={300}>
          <AnimatedAllergyItem title="Pollen" icon="flower-outline" delay={400} />
          <AnimatedAllergyItem title="Milk" icon="cube-outline" delay={500} />
          <AnimatedAllergyItem title="Dust" icon="cloud-outline" delay={600} />
        </AnimatedSection>

        <AnimatedSection title="Surgeries" delay={700}>
          <AnimatedListItem title="Kidney Stone" icon="walk-outline" delay={800} />
          <AnimatedListItem title="Ligament Tear" icon="body-outline" delay={900} />
        </AnimatedSection>
      </ScrollView>
    </SafeAreaView>
  );
};

const AnimatedHeader = ({ navigation, ms }: any) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.backButton, { opacity: fadeAnim }]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name="arrow-back" size={ms(20)} color="#000" />
        <Text style={[styles.headerTitle, { fontSize: ms(22) }]}>Medical History</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const AnimatedSection = ({ title, children, delay }: any) => {
  const translateY = useRef(new Animated.Value(20)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 400,
      delay,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacity, {
      toValue: 1,
      duration: 400,
      delay,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={title === "Allergies" ? styles.allergyContainer : styles.boxContainer}>
        {children}
      </View>
    </Animated.View>
  );
};

const AnimatedListItem = ({ title, icon, delay }: any) => {
  const translateY = useRef(new Animated.Value(20)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 400,
      delay,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacity, {
      toValue: 1,
      duration: 400,
      delay,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.listItem, { opacity, transform: [{ translateY }] }]}>
      <View style={styles.iconWrapper}>
        <Ionicons name={icon} size={18} color="#000" />
      </View>
      <Text style={styles.itemText}>{title}</Text>
      <Ionicons name="chevron-forward" size={18} color="#000" style={styles.arrowIcon} />
    </Animated.View>
  );
};

const AnimatedAllergyItem = ({ title, icon, delay }: any) => {
  const translateY = useRef(new Animated.Value(20)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 400,
      delay,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacity, {
      toValue: 1,
      duration: 400,
      delay,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.allergyItem, { opacity, transform: [{ translateY }] }]}>
      <Ionicons name={icon} size={18} color="#000" />
      <Text style={styles.allergyText}>{title}</Text>
    </Animated.View>
  );
};

export default MedicalHistoryScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  container: { flexGrow: 1, backgroundColor: "#FFFFFF", paddingHorizontal: 24, paddingTop: 20 },
  backButton: { marginBottom: 16 },
  headerTitle: { fontWeight: "bold", marginLeft: 8, color: "#063247" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#063247", marginBottom: 15, marginTop: 10 },
  boxContainer: { marginBottom: 16 },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#B3E5FC",
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 15,
    marginBottom: 12,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  itemText: { fontSize: 18, color: "#063247", flex: 1 },
  arrowIcon: { marginLeft: "auto", fontSize: 20 },
  allergyContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
  allergyItem: {
    width: 90,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B3E5FC",
    borderRadius: 12,
  },
  allergyText: { fontSize: 18, color: "#063247", marginTop: 6, textAlign: "center" },
});
