// import React from "react";
// import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
// import { FontAwesome5, Ionicons } from "@expo/vector-icons";
// import { AnimatedCircularProgress } from "react-native-circular-progress";
// import { useNavigation } from "@react-navigation/native";
// import Gold_bar from "../Home Page/Gold_bar";

// const MentalHealthScreen = () => {
//   const navigation = useNavigation();

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <view>
//         <Gold_bar />
//       </view>
//       <ScrollView contentContainerStyle={styles.container}>
//         {/* Header with Back Navigation */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Ionicons name="arrow-back" size={24} color="#002B44" style={styles.backIcon} />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Mental Health</Text>
//         </View>

//         {/* Health Cards */}
//         <HealthCard title="Stress Level" value={63} icon="brain" />
//         <HealthCard title="Sleep Quality" value={72} icon="bed" />
//         <HealthCard title="Anxiety" value={42} icon="bolt" />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// // Component for each health stat card
// const HealthCard = ({ title, value, icon }: { title: string, value: number, icon: string }) => (
//   <View style={styles.card}>
//     <View style={styles.cardContent}>
//       <FontAwesome5 name={icon} size={20} color="#002B44" style={styles.cardIcon} />
//       <Text style={styles.cardTitle}>{title}</Text>
//     </View>
    
//     {/* Circular Progress with Centered Text */}
//     <View style={styles.progressContainer}>
//       <AnimatedCircularProgress
//         size={50}
//         width={5}
//         fill={value}
//         tintColor="#002B44"
//         backgroundColor="#A5D3E8"
//       >
//         {() => <Text style={styles.progressText}>{value}</Text>}
//       </AnimatedCircularProgress>
//     </View>
//   </View>
// );

// // Styles
// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//   },
//   container: {
//     flexGrow: 1,
//     padding: 25,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   backIcon: {
//     marginRight: 10,
//   },
//   headerTitle: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#063247",
//   },
//   card: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#D3ECFB",
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//   },
//   cardContent: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   cardIcon: {
//     marginRight: 10,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#063247",
//   },
//   progressContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   progressText: {
//     position: "absolute",
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#063247",
//     textAlign: "center",
//     width: 50, // Same as progress circle size
//     height: 50,
//     lineHeight: 50, // Ensures vertical centering
//   },
// });

// export default MentalHealthScreen;

import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useNavigation } from "@react-navigation/native";
import Gold_bar from "../Home Page/Gold_bar";
import { useResponsive } from "../../hooks/useresponsive";
import { vs } from "@/utils/responsive";

const MentalHealthScreen = () => {
  const navigation = useNavigation();
  const { scale, vs, ms } = useResponsive();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        <Gold_bar />
      </View>
      <ScrollView contentContainerStyle={{ ...styles.container, padding: scale(25) }}>
        {/* Header */}
        <View style={{ ...styles.header, marginBottom: vs(20) }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={ms(24)} color="#002B44" style={{ marginRight: scale(10) }} />
          </TouchableOpacity>
          <Text style={{ ...styles.headerTitle, fontSize: ms(22) }}>Mental Health</Text>
        </View>

        {/* Health Cards */}
        <HealthCard title="Stress Level" value={63} icon="brain" delay={0} />
        <HealthCard title="Sleep Quality" value={72} icon="bed" delay={100} />
        <HealthCard title="Anxiety" value={42} icon="bolt" delay={200} />
      </ScrollView>
    </SafeAreaView>
  );
};

// Health Card Component with Animation
const HealthCard = ({ title, value, icon, delay }: { title: string; value: number; icon: string; delay: number }) => {
  const translateY = useRef(new Animated.Value(20)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const { scale, ms } = useResponsive();

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
    <Animated.View
      style={[
        styles.card,
        {
          opacity,
          transform: [{ translateY }],
          borderRadius: scale(12),
          padding: scale(16),
          marginBottom: vs(12),
        },
      ]}
    >
      <View style={styles.cardContent}>
        <FontAwesome5 name={icon} size={ms(20)} color="#002B44" style={{ marginRight: scale(10) }} />
        <Text style={{ ...styles.cardTitle, fontSize: ms(18) }}>{title}</Text>
      </View>

      <View style={styles.progressContainer}>
        <AnimatedCircularProgress
          size={scale(50)}
          width={scale(5)}
          fill={value}
          tintColor="#002B44"
          backgroundColor="#A5D3E8"
        >
          {() => (
            <Text
              style={{
                position: "absolute",
                fontSize: ms(16),
                fontWeight: "bold",
                color: "#063247",
                textAlign: "center",
                width: scale(50),
                height: scale(50),
                lineHeight: scale(50),
              }}
            >
              {value}
            </Text>
          )}
        </AnimatedCircularProgress>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontWeight: "bold",
    color: "#063247",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#D3ECFB",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitle: {
    fontWeight: "bold",
    color: "#063247",
  },
  progressContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MentalHealthScreen;
