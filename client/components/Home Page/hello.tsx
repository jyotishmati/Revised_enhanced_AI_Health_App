// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { Svg, Circle, Text as SvgText } from "react-native-svg";

// const HealthCard = () => {
//   const healthScore = 63;
//   const radius = 40; // Circle size
//   const strokeWidth = 6;
//   const circumference = 2 * Math.PI * radius;
//   const progress = (healthScore / 100) * circumference;

//   return (
//     <View style={styles.container}>
//       {/* Left Section */}
//       <View style={styles.leftSection}>
//         <View style={styles.greetingContainer}>
//           <Text style={styles.greetingText}>Hello Nandan!</Text>
//           <Text style={styles.waveEmoji}>👋</Text>
//         </View>

//         <Text style={styles.subtitle}>You have 2 appointments today!</Text>

//         <Text style={styles.sectionTitle}>Health Score</Text>
//         <Text style={styles.infoText}>
//           Blood Type: <Text style={styles.boldText}>B +ve</Text>
//         </Text>
//         <Text style={styles.infoText}>
//           Age: <Text style={styles.boldText}>23</Text>
//         </Text>
//       </View>

//       {/* Right Section - Bigger Circular Progress */}
//       <View style={styles.rightSection}>
//         <Text style={styles.healthScoreLabel}>Your Health Score</Text>
//         <Svg width={125} height={125} viewBox="0 0 100 100">
//           {/* Background Circle */}
//           <Circle cx="50" cy="50" r={radius} stroke="#E5E7EB" strokeWidth={strokeWidth} fill="none" />
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
//           <SvgText x="50" y="48" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0F3D59">
//             {healthScore}
//           </SvgText>
//           {/* "Out of 100" Text Below */}
//           <SvgText x="50" y="65" textAnchor="middle" fontSize="10" fill="#6B7280">
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
//     paddingVertical: 10, // Reduced vertical padding
//     paddingHorizontal: 15, // Kept horizontal padding
//     // borderRadius: 12,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   leftSection: {
//     flex: 1,
//   },
//   greetingText: {
//     fontSize: 22, // Slightly smaller
//     fontWeight: "bold",
//     color: "#063247",
//   },
//   greetingContainer: {
//         flexDirection: "row",
//         alignItems: "center",
//       },
//   waveEmoji: {
//     fontSize: 18,
//     marginLeft: 5,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: "#7D8A95",
//     marginTop: 2,
//   },
//   sectionTitle: {
//     fontSize: 18, // Reduced size
//     fontWeight: "bold",
//     color: "#063247",
//     marginTop: 6,
//   },
//   boldText: {
//         fontWeight: "bold",
//         color: "#1F2937",
//         fontFamily: "Poppins",
//       },
//   infoText: {
//     fontSize: 13, // Reduced for better fit
//     color: "#6B7280",
//     marginTop: 2,
//   },
//   rightSection: {
//     alignItems: "center",
//     marginTop: 10,
//   },
//   healthScoreLabel: {
//     fontSize: 14, // Slightly smaller
//     fontWeight: "bold",
//     color: "#063247",
//   },
//   noteText: {
//     fontSize: 9, // Reduced for better spacing
//     color: "#9CA3AF",
//     fontStyle: "italic",
//     marginTop: 2,
//   },
// });

// export default HealthCard;


// import { loadUserData } from "@/api/IndexDB";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Svg, Circle, Text as SvgText } from "react-native-svg";

const { width } = Dimensions.get("window");
import { navigate } from "expo-router/build/global-state/routing";
const scale = (size: number) => (width / 375) * size;

const HealthCard = () => {
  const healthScore = 63;
  const radius = 40; 
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  const progress = (healthScore / 100) * circumference;
  const [userData, setUserData] = useState<any>(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const userDetails = await loadUserData(); 
  //       if(!userDetails){
  //         navigation.navigate("Profile" as never);
  //       }
  //       console.log("User details:", userDetails);
  //       setUserData(userDetails);
  //     } catch (error) {
  //       console.error("Failed to load user data:", error);
  //     } finally {
  //       setLoading(false); 
  //     }
  //   };

  //   fetchData();
  // }, [navigation]);

  // if (loading) {
  //   return (
  //     <View>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }
  
  return (
    <View style={styles.container}>
      {/* Left Section */}
      <View style={styles.leftSection}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}> Hello {userData?.name || "Amaresh"}!</Text>
          <Text style={styles.waveEmoji}>👋</Text>
        </View>

        <Text style={styles.subtitle}>You have 0 appointments today!</Text>

        <Text style={styles.sectionTitle}>Health Score</Text>
        <Text style={styles.infoText}>
          Blood Type: <Text style={styles.boldText}>{userData?.bloodType || "A+"}</Text>
        </Text>
        <Text style={styles.infoText}>
          Age: <Text style={styles.boldText}>{userData?.age || "24"}</Text>
        </Text>
      </View>

      {/* Right Section - Bigger Circular Progress */}
      <View style={styles.rightSection}>
        <Text style={styles.healthScoreLabel}>Your Health Score</Text>
        <Svg width={scale(125)} height={scale(125)} viewBox="0 0 100 100">
          {/* Background Circle */}
          <Circle cx="50" cy="50" r={radius} stroke="#E5E7EB" strokeWidth={strokeWidth} fill="none" />
          {/* Progress Circle */}
          <Circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#0F3D59"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            fill="none"
          />
          {/* Score Number */}
          <SvgText x="50" y="48" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0F3D59">
            {healthScore}
          </SvgText>
          {/* "Out of 100" Text Below */}
          <SvgText x="50" y="65" textAnchor="middle" fontSize="10" fill="#6B7280">
            Out of 100
          </SvgText>
        </Svg>
        <Text style={styles.noteText}>*Calculated from test report</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F3F4F6",
    // paddingVertical: scale(10),
    paddingHorizontal: scale(15),
    // borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: scale(2) },
    shadowRadius: scale(4),
    elevation: 3,
    paddingBottom: 12,
  },
  leftSection: {
    // flex: 1,
    marginTop:8
  },
  greetingText: {
    fontSize: scale(22),
    fontWeight: "bold",
    color: "#063247",
  },
  greetingContainer: {
    flexDirection: "row",
    marginLeft: -6
    // alignItems: "center",
  },
  waveEmoji: {
    fontSize: scale(18),
    marginLeft: scale(5),
  },
  subtitle: {
    fontSize: scale(12),
  // marginLeft: 6,
    // textAlign: "center",
    color: "#7D8A95",
    marginTop: scale(2),
  },
  sectionTitle: {
    fontSize: scale(14),
    fontWeight: "normal",
    color: "#063247",
    marginTop: scale(14),
  },
  boldText: {
    fontWeight: "bold",
    color: "#1F2937",
    fontFamily: "Poppins",
  },
  infoText: {
    fontSize: scale(13),
    color: "#6B7280",
    marginTop: scale(2),
  },
  rightSection: {
    alignItems: "center",
    marginTop: scale(10),
  },
  healthScoreLabel: {
    fontSize: scale(14),
    fontWeight: "bold",
    color: "#063247",
  },
  noteText: {
    fontSize: scale(9),
    color: "#9CA3AF",
    fontStyle: "italic",
    marginTop: scale(2),
  },
});

export default HealthCard;