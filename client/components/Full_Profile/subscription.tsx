// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import Gold_bar from "../Home Page/Gold_bar";
// import { useResponsive } from "../../hooks/useresponsive";

// const SubscriptionScreen = () => {
//   const navigation = useNavigation();
//   const { scale, vs, ms } = useResponsive();

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <Gold_bar />
//       <ScrollView contentContainerStyle={styles.container}>
//         <View style={styles.header}>
//           <Ionicons
//             name="arrow-back"
//             size={ms(24)}
//             color="#004080"
//             style={{ marginRight: scale(10) }}
//             onPress={() => navigation.goBack()}
//           />
//           <Text style={[styles.headerTitle, { fontSize: ms(22) }]}>Subscription</Text>
//         </View>

//         <SubscriptionCard
//           title="FREE"
//           price="₹0"
//           features={["Chatbot", "Health Analysis"]}
//           buttonText="Current"
//           isCurrent
//         />

//         <SubscriptionCard
//           title="PREMIUM"
//           price="₹99"
//           features={["Chatbot", "Health Report"]}
//           buttonText="Buy Now"
//           isCurrent={false}
//         />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const SubscriptionCard = ({
//   title,
//   price,
//   features,
//   buttonText,
//   isCurrent,
// }: {
//   title: string;
//   price: string;
//   features: string[];
//   buttonText: string;
//   isCurrent: boolean;
// }) => {
//   const { scale, ms, vs } = useResponsive();

//   return (
//     <View style={[styles.card, { padding: scale(20), borderRadius: scale(12), marginBottom: vs(15) }]}>
//       <Text style={[styles.planTitle, { fontSize: ms(18) }]}>{title}</Text>
//       <Text style={[styles.price, { fontSize: ms(22) }]}>
//         {price}
//         <Text style={[styles.perMonth, { fontSize: ms(14) }]}>/month</Text>
//       </Text>
//       {features.map((feature, index) => (
//         <Text key={index} style={[styles.featureText, { fontSize: ms(16) }]}>
//           • {feature}
//         </Text>
//       ))}
//       <TouchableOpacity
//         style={[
//           isCurrent ? styles.currentButton : styles.buyNowButton,
//           { paddingVertical: vs(10), borderRadius: scale(6), marginTop: vs(10) },
//         ]}
//       >
//         <Text style={[styles.buttonText, { fontSize: ms(16) }]}>{buttonText}</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//   },
//   container: {
//     flexGrow: 1,
//     padding: 30,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   headerTitle: {
//     fontWeight: "bold",
//     color: "#063247",
//   },
//   card: {
//     backgroundColor: "#CDEEFF",
//   },
//   planTitle: {
//     fontWeight: "bold",
//     color: "#063247",
//     marginBottom: 5,
//   },
//   price: {
//     fontWeight: "bold",
//     color: "#063247",
//   },
//   perMonth: {
//     fontWeight: "normal",
//     color: "#063247",
//   },
//   featureText: {
//     color: "#063247",
//     marginTop: 5,
//   },
//   currentButton: {
//     backgroundColor: "#002B44",
//     alignItems: "center",
//   },
//   buyNowButton: {
//     backgroundColor: "#002B44",
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#FFFFFF",
//     fontWeight: "bold",
//   },
// });

// export default SubscriptionScreen;


import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Gold_bar from "../Home Page/Gold_bar";

const SubscriptionScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Gold_bar />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="#004080"
            style={styles.backIcon}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Subscription</Text>
        </View>

        <AnimatedSubscriptionCard 
          title="FREE" 
          price="₹0" 
          features={["Chatbot", "Health analysis"]}
          buttonText="Current"
          isCurrent={true} 
          delay={0}
        />
        
        <AnimatedSubscriptionCard 
          title="PREMIUM" 
          price="₹99" 
          features={["Chatbot", "Health Report"]}
          buttonText="Buy Now"
          isCurrent={false} 
          delay={200}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const AnimatedSubscriptionCard = ({ title, price, features, buttonText, isCurrent, delay }: {
  title: string;
  price: string;
  features: string[];
  buttonText: string;
  isCurrent: boolean;
  delay: number;
}) => {
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
    <Animated.View style={[styles.card, { opacity, transform: [{ translateY }] }]}>
      <Text style={styles.planTitle}>{title}</Text>
      <Text style={styles.price}>
        {price}
        <Text style={styles.perMonth}>/month</Text>
      </Text>
      {features.map((feature, index) => (
        <Text key={index} style={styles.featureText}>• {feature}</Text>
      ))}
      <TouchableOpacity style={isCurrent ? styles.currentButton : styles.buyNowButton}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Styles remain unchanged from your provided code
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  container: { flexGrow: 1, padding: 30 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  backIcon: { marginRight: 10 },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#063247" },
  card: {
    backgroundColor: "#CDEEFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  planTitle: { fontSize: 18, fontWeight: "bold", color: "#063247", marginBottom: 5 },
  price: { fontSize: 22, fontWeight: "bold", color: "#063247" },
  perMonth: { fontSize: 14, fontWeight: "normal", color: "#063247" },
  featureText: { fontSize: 16, color: "#063247", marginTop: 5 },
  currentButton: {
    backgroundColor: "#002B44",
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buyNowButton: {
    backgroundColor: "#002B44",
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
});

export default SubscriptionScreen;
