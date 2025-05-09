// import React from "react";
// import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
// import { FontAwesome5, Ionicons } from "@expo/vector-icons";
// import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
// import Gold_bar from "../Home Page/Gold_bar";
// import { useResponsive } from "../../hooks/useresponsive";
// import { vs } from "@/utils/responsive";

// const HealthStatsScreen = () => {
//   const navigation: NavigationProp<ParamListBase> = useNavigation();
//   const { scale, vs, ms } = useResponsive();

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <Gold_bar />
//       <ScrollView contentContainerStyle={{ padding: scale(25), marginTop: vs(15) }}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: scale(5) }}>
//             <Ionicons name="arrow-back" size={ms(24)} color="#004080" />
//           </TouchableOpacity>
//           <Text style={{ fontSize: ms(22), fontWeight: "bold", color: "#063247", marginLeft: scale(10) }}>
//             My Health
//           </Text>
//         </View>

//         <View style={styles.row}>
//           <StatisticCard title="Blood Pressure" value="120 / 80 mm/Hg" icon="heartbeat" scale={scale} ms={ms} />
//           <StatisticCard title="Blood Sugar" value="125 / 72 mg/dL" icon="tint" scale={scale} ms={ms} />
//         </View>

//         <StatisticPill title="Sleep" value="7.5 hr/day" icon="bed" style={{ marginTop: vs(20) }} scale={scale} ms={ms} />
//         <StatisticPill title="Calories Burn" value="1,598 kcal" icon="fire" style={{ marginTop: vs(10) }} scale={scale} ms={ms} />
//         <StatisticPill title="Oxygen" value="96 SpO2" icon="leaf" scale={scale} ms={ms} />
//         <StatisticPill title="Cholesterol" value="200 mg/dL" icon="medkit" scale={scale} ms={ms} />
//         <StatisticPill title="Blood Group" value="AB +ve" icon="tint" scale={scale} ms={ms} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const StatisticCard = ({ title, value, icon, scale, ms }: any) => (
//   <View style={[styles.statCard, { borderRadius: scale(15), paddingVertical: vs(20), paddingHorizontal: scale(25), width: "48%" }]}>
//     <FontAwesome5 name={icon} size={ms(30)} color="#004080" />
//     <Text style={{ fontSize: ms(14), fontWeight: "bold", color: "#063247", marginTop: vs(5) }}>{title}</Text>
//     <Text style={{ fontSize: ms(18), color: "#063247", fontWeight: "bold", marginTop: vs(5) }}>{value}</Text>
//   </View>
// );

// const StatisticPill = ({ title, value, icon, style, scale, ms }: any) => (
//   <View style={StyleSheet.flatten([styles.pillCard, style, { borderRadius: scale(25), padding: scale(16), paddingHorizontal: scale(20) }])}>
//     <FontAwesome5 name={icon} size={ms(22)} color="#004080" style={{ marginRight: scale(12) }} />
//     <Text style={{ fontSize: ms(16), fontWeight: "bold", color: "#063247", flex: 1 }}>{title}</Text>
//     <Text style={{ fontSize: ms(16), color: "#063247", fontWeight: "bold" }}>{value}</Text>
//   </View>
// );

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
//   header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
//   row: { flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" },
//   statCard: {
//     backgroundColor: "#D6EBFF",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 3,
//     marginTop: 16,
//   },
//   pillCard: {
//     flexDirection: "row",
//     backgroundColor: "#D6EBFF",
//     alignItems: "center",
//     marginBottom: 15,
//     justifyContent: "space-between",
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 3,
//   },
// });

// export default HealthStatsScreen;


import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Gold_bar from "../Home Page/Gold_bar";
import { useResponsive } from "../../hooks/useresponsive";

const HealthStatsScreen = () => {
  const navigation = useNavigation();
  const { scale, vs, ms } = useResponsive();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Gold_bar />
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: scale(20) }}>
        {/* Header */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: vs(20) }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ padding: scale(5) }}
          >
            <Ionicons name="arrow-back" size={ms(24)} color="#004080" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: ms(22),
              fontWeight: "bold",
              color: "#063247",
              marginLeft: scale(10),
            }}
          >
            My Health
          </Text>
        </View>

        {/* Two-Column Layout */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: vs(30) }}>
          <StatisticCard title="Blood Pressure" value="120 / 80 mm/Hg" icon="heartbeat" delay={0} />
          <StatisticCard title="Blood Sugar" value="125 / 72 mg/dL" icon="tint" delay={100} />
        </View>

        {/* Pills */}
        <StatisticPill title="Sleep" value="7.5 hr/day" icon="bed" delay={200} />
        <StatisticPill title="Calories Burn" value="1,598 kcal" icon="fire" delay={300} />
        <StatisticPill title="Oxygen" value="96 SpO2" icon="leaf" delay={400} />
        <StatisticPill title="Cholesterol" value="200 mg/dL" icon="medkit" delay={500} />
        <StatisticPill title="Blood Group" value="AB +ve" icon="tint" delay={600} />
      </ScrollView>
    </SafeAreaView>
  );
};

// StatisticCard Component
const StatisticCard = ({ title, value, icon, delay }: any) => {
  const { scale, ms, vs } = useResponsive();
  const translateY = useRef(new Animated.Value(20)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, { toValue: 0, duration: 400, delay, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 400, delay, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        backgroundColor: "#D6EBFF",
        borderRadius: scale(15),
        paddingVertical: vs(20),
        paddingHorizontal: scale(25),
        alignItems: "center",
        width: "48%",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: scale(2) },
        elevation: 3,
        marginTop: vs(16),
        opacity,
        transform: [{ translateY }],
      }}
    >
      <FontAwesome5 name={icon} size={ms(30)} color="#004080" />
      <Text style={{ fontSize: ms(14), fontWeight: "bold", color: "#063247", marginTop: vs(5) }}>
        {title}
      </Text>
      <Text style={{ fontSize: ms(18), fontWeight: "bold", color: "#063247", marginTop: vs(5) }}>
        {value}
      </Text>
    </Animated.View>
  );
};

// StatisticPill Component
const StatisticPill = ({ title, value, icon, delay }: any) => {
  const { scale, ms, vs } = useResponsive();
  const translateY = useRef(new Animated.Value(20)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, { toValue: 0, duration: 400, delay, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 400, delay, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        flexDirection: "row",
        backgroundColor: "#D6EBFF",
        borderRadius: scale(25),
        paddingVertical: vs(16),
        paddingHorizontal: scale(20),
        alignItems: "center",
        marginBottom: vs(15),
        marginTop: vs(10),
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: scale(2) },
        elevation: 3,
        opacity,
        transform: [{ translateY }],
      }}
    >
      <FontAwesome5 name={icon} size={ms(22)} color="#004080" style={{ marginRight: scale(12) }} />
      <Text style={{ fontSize: ms(16), fontWeight: "bold", color: "#063247", flex: 1 }}>
        {title}
      </Text>
      <Text style={{ fontSize: ms(16), fontWeight: "bold", color: "#063247" }}>{value}</Text>
    </Animated.View>
  );
};

export default HealthStatsScreen;

