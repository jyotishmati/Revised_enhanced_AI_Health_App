
// // import { loadUserData } from "@/api/IndexDB";
// import React, { useEffect, useState } from "react";
// import { useNavigation } from "@react-navigation/native";
// import { View, Text, StyleSheet, Dimensions } from "react-native";
// import { Svg, Circle, Text as SvgText } from "react-native-svg";

// import { navigate } from "expo-router/build/global-state/routing";
// const { width } = Dimensions.get("window");
// const scale = (size: number) => (width / 375) * size;

// const HealthCard = () => {
//   const healthScore = 63;
//   const radius = 40;
//   const strokeWidth = 6;
//   const circumference = 2 * Math.PI * radius;
//   const progress = (healthScore / 100) * circumference;
//   const [userData, setUserData] = useState<any>(null);
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const userDetails = await loadUserData();
//   //       if(!userDetails){
//   //         navigation.navigate("Profile" as never);
//   //       }
//   //       console.log("User details:", userDetails);
//   //       setUserData(userDetails);
//   //     } catch (error) {
//   //       console.error("Failed to load user data:", error);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchData();
//   // }, [navigation]);

//   // if (loading) {
//   //   return (
//   //     <View>
//   //       <Text>Loading...</Text>
//   //     </View>
//   //   );
//   // }

//   return (
//     <View style={styles.container}>
//       {/* Left Section */}
//       <View style={styles.leftSection}>
//         <View style={styles.greetingContainer}>
//           <Text style={styles.greetingText}>
//             {" "}
//             Hello {userData?.name || "Amaresh"}!
//           </Text>
//           <Text style={styles.waveEmoji}>👋</Text>
//         </View>

//         <Text style={styles.subtitle}>You have 0 appointments today!</Text>

//         <Text style={styles.sectionTitle}>Health Score</Text>
//         <Text style={styles.infoText}>
//           Blood Type:{" "}
//           <Text style={styles.boldText}>{userData?.bloodType || "A+"}</Text>
//         </Text>
//         <Text style={styles.infoText}>
//           Age: <Text style={styles.boldText}>{userData?.age || "24"}</Text>
//         </Text>
//       </View>

//       {/* Right Section - Bigger Circular Progress */}
//       <View style={styles.rightSection}>
//         <Text style={styles.healthScoreLabel}>Your Health Score</Text>
//         <Svg width={scale(125)} height={scale(125)} viewBox="0 0 100 100">
//           {/* Background Circle */}
//           <Circle
//             cx="50"
//             cy="50"
//             r={radius}
//             stroke="#E5E7EB"
//             strokeWidth={strokeWidth}
//             fill="none"
//           />
//           {/* Progress Circle */}
//           <Circle
//             cx="50"
//             cy="50"
//             r={radius}
//             stroke="#0F3D59"
//             strokeWidth={strokeWidth}
//             strokeDasharray={circumference}
//             strokeDashoffset={circumference - progress}
//             strokeLinecap="round"
//             fill="none"
//           />
//           {/* Score Number */}
//           <SvgText
//             x="50"
//             y="58"
//             textAnchor="middle"
//             fontSize="35"
//             fontWeight="bold"
//             fill="#0F3D59"
//           >
//             {healthScore}
//           </SvgText>
//           {/* "Out of 100" Text Below */}
//           <SvgText
//             x="50"
//             y="70"
//             textAnchor="middle"
//             fontSize="9"
//             fill="#6B7280"
//           >
//             Out of 100
//           </SvgText>
//         </Svg>
//         <Text style={styles.noteText}>*Calculated from test report</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     backgroundColor: "#F3F4F6",
//     // paddingVertical: scale(10),
//     padding: scale(15),
//     // borderRadius: 12,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: scale(2) },
//     shadowRadius: scale(4),
//     elevation: 3,
//     paddingBottom: 12,
//   },
//   leftSection: {
//     // flex: 1,
//     marginTop: 8,
//   },
//   greetingText: {
//     fontSize: scale(24),
//     fontWeight: "bold",
//     color: "#063247",
//   },
//   greetingContainer: {
//     flexDirection: "row",
//     marginLeft: -6,
//     // alignItems: "center",
//   },
//   waveEmoji: {
//     fontSize: scale(18),
//     marginLeft: scale(5),
//   },
//   subtitle: {
//     fontSize: scale(12),
//     // marginLeft: 6,
//     // textAlign: "center",
//     color: "#7D8A95",
//     marginTop: scale(2),
//   },
//   sectionTitle: {
//     fontSize: scale(14),
//     fontWeight: "normal",
//     color: "#063247",
//     marginTop: scale(14),
//   },
//   boldText: {
//     fontWeight: "bold",
//     color: "#1F2937",
//     fontFamily: "Poppins",
//   },
//   infoText: {
//     fontSize: scale(10),
//     color: "#6B7280",
//     marginTop: scale(2),
//   },
//   rightSection: {
//     alignItems: "center",
//     marginTop: scale(10),
//   },
//   healthScoreLabel: {
//     fontSize: scale(10),
//     fontWeight: "bold",
//     color: "#063247",
//   },
//   noteText: {
//     fontSize: scale(7),
//     color: "#9CA3AF",
//     // fontStyle: "italic",
//     marginTop: scale(2),
//   },
// });

// export default HealthCard;


import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Svg, Circle, Text as SvgText } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { useResponsive } from "../../hooks/useresponsive";

const HealthCard = () => {
  const healthScore = 63;
  const radius = 40;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;

  const animatedValue = useRef(new Animated.Value(0)).current;
  const [displayedScore, setDisplayedScore] = useState(0);

  const [userData] = useState<any>(null);
  const navigation = useNavigation();
  const { scale, vs, ms } = useResponsive();

  useEffect(() => {
    // Animate Health Score
    Animated.timing(animatedValue, {
      toValue: healthScore,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    const interval = setInterval(() => {
      setDisplayedScore((prev) => {
        if (prev < healthScore) return prev + 1;
        clearInterval(interval);
        return healthScore;
      });
    }, 15);

    return () => clearInterval(interval);
  }, []);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  return (
    <View style={[styles.container, { padding: scale(15) }]}>
      {/* Left Section */}
      <View style={{ flex: 1, marginTop: vs(8) }}>
        <View style={styles.greetingContainer}>
          <Text style={[styles.greetingText, { fontSize: ms(24) }]}>
            Hello {userData?.name || "Amaresh"}!
          </Text>
          <Text style={[styles.waveEmoji, { fontSize: ms(18) }]}>👋</Text>
        </View>

        <Text style={[styles.subtitle, { fontSize: ms(12), marginTop: vs(2) }]}>
          You have 0 appointments today!
        </Text>

        <Text style={[styles.sectionTitle, { fontSize: ms(14), marginTop: vs(14) }]}>
          Health Score
        </Text>
        <Text style={[styles.infoText, { fontSize: ms(10), marginTop: vs(2) }]}>
          Blood Type: <Text style={styles.boldText}>{userData?.bloodType || "A+"}</Text>
        </Text>
        <Text style={[styles.infoText, { fontSize: ms(10), marginTop: vs(2) }]}>
          Age: <Text style={styles.boldText}>{userData?.age || "24"}</Text>
        </Text>
      </View>

      {/* Right Section */}
      <View style={{ alignItems: "center", marginTop: vs(10) }}>
        <Text style={[styles.healthScoreLabel, { fontSize: ms(10) }]}>Your Health Score</Text>
        <Svg width={scale(125)} height={scale(125)} viewBox="0 0 100 100">
          {/* Background Circle */}
          <Circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress Circle */}
          <AnimatedCircle
            cx="50"
            cy="50"
            r={radius}
            stroke="#0F3D59"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
          />
          {/* Score Number */}
          <SvgText
            x="50"
            y="58"
            textAnchor="middle"
            fontSize="35"
            fontWeight="bold"
            fill="#0F3D59"
          >
            {displayedScore}
          </SvgText>
          <SvgText
            x="50"
            y="70"
            textAnchor="middle"
            fontSize="9"
            fill="#6B7280"
          >
            Out of 100
          </SvgText>
        </Svg>
        <Text style={[styles.noteText, { fontSize: ms(7), marginTop: vs(2) }]}>
          *Calculated from test report
        </Text>
      </View>
    </View>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  greetingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  greetingText: {
    fontWeight: "bold",
    color: "#063247",
  },
  waveEmoji: {
    marginLeft: 5,
  },
  subtitle: {
    color: "#7D8A95",
  },
  sectionTitle: {
    fontWeight: "600",
    color: "#063247",
  },
  boldText: {
    fontWeight: "bold",
    color: "#1F2937",
  },
  infoText: {
    color: "#6B7280",
  },
  healthScoreLabel: {
    fontWeight: "bold",
    color: "#063247",
  },
  noteText: {
    color: "#9CA3AF",
  },
});

export default HealthCard;
