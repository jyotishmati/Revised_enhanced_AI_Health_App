// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
// } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import Fontisto from "react-native-vector-icons/Fontisto"
// import { LinearGradient } from "expo-linear-gradient";
// import { Svg, Path } from "react-native-svg";
// import { useNavigation } from "@react-navigation/native";

// const { width } = Dimensions.get("window");
// const scale = (size: number) => (width / 375) * size;

// export default function VerificationScreen() {
//   const [otp, setOtp] = useState("");
//   const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       <LinearGradient
//         colors={[
//           "#B8860B", // Darker Golden Brown
//           "#C9A409", // Deep Gold
//           "#E6C200", // Rich Gold
//           "#FFD700", // Bright Gold
//         ]}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//         style={styles.goldButton}
//       >
//         <TouchableOpacity style={styles.goldButtonInner}>
//           <Text style={styles.goldText}>GOLD</Text>
//         </TouchableOpacity>
//       </LinearGradient>

//       {/* Icons Section */}
//       <View style={styles.iconContainer}>
//         <TouchableOpacity
//           style={styles.iconWrapper}
//           onPress={() => navigation.navigate("Chatbot" as never)}
//         >
//           {/* {chatIcon()} */}
//           <Ionicons name="chatbox-ellipses" size={22} color="#0E2A3A" />
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.iconWrapper}
//           onPress={() => navigation.navigate("Hash" as never)}
//         >
//           {/* {hashtagIcon()} */}
//           <Fontisto
//             name="hashtag"
//             size={18}
//             color="#0E2A3A"
//           />
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.iconWrapper}
//           onPress={() => console.log("Notification Icon Pressed")}
//         >
//           {/* {notificationIcon()} */}
//           <Ionicons name="notifications" size={22} color="#0E2A3A" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// // Icons (kept the same)
// const chatIcon = () => (
//   <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//     <Path
//       d="M4 19V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7l-3 3z"
//       stroke="#0E2A3A"
//       strokeWidth="1.8"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </Svg>
// );

// const hashtagIcon = () => (
//   <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//     <Path
//       d="M7 3L5 21"
//       stroke="#0E2A3A"
//       strokeWidth="1.8"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <Path
//       d="M19 3L17 21"
//       stroke="#0E2A3A"
//       strokeWidth="1.8"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <Path
//       d="M5 9H19"
//       stroke="#0E2A3A"
//       strokeWidth="1.8"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <Path
//       d="M5 15H19"
//       stroke="#0E2A3A"
//       strokeWidth="1.8"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </Svg>
// );

// const notificationIcon = () => (
//   <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//     <Path
//       d="M18 8a6 6 0 0 0-12 0c0 7-3 8-3 8h18s-3-1-3-8z"
//       stroke="#0E2A3A"
//       strokeWidth="1.8"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <Path
//       d="M13.73 21a2 2 0 0 1-3.46 0"
//       stroke="#0E2A3A"
//       strokeWidth="1.8"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </Svg>
// );

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#0E2A3A",
//     paddingHorizontal: scale(16),
//     paddingVertical: scale(10),
//     height: scale(78),
//     paddingTop: scale(40),
//     paddingBottom: scale(40),
//   },
//   goldButton: {
//     width: scale(95),
//     height: scale(45),
//     borderRadius: scale(20),
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   goldButtonInner: {
//     width: "100%",
//     height: "100%",
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: scale(20),
//   },
//   overlay: {
//     borderRadius: 10,
//     padding: 10,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   goldText: {
//     fontSize: scale(14),
//     fontWeight: "bold",
//     color: "#0E2A3A",
//   },
//   iconContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: scale(12),
//     marginLeft: scale(100), // Moved icons slightly to the right
//   },
//   iconWrapper: {
//     width: scale(42),
//     height: scale(42),
//     borderRadius: scale(20),
//     backgroundColor: "white",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });


import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useResponsive } from "../../hooks/useresponsive"; // Assuming you have this hook

export default function VerificationScreen() {
  const [otp, setOtp] = useState("");
  const navigation = useNavigation();
  const { scale, vs, ms } = useResponsive();

  return (
    <SafeAreaView style={[styles.container, { paddingVertical: vs(20) }]}>
      {/* Gold Button */}
      <LinearGradient
        colors={["#B8860B", "#C9A409", "#E6C200", "#FFD700"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.goldButton, { borderRadius: scale(20), width: scale(95), height: vs(45),  marginLeft: scale(12) }]}
      >
        <TouchableOpacity activeOpacity={0.8} style={styles.goldButtonInner}>
          <Text style={[styles.goldText, { fontSize: ms(14) }]}>GOLD</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Icons */}
      <View style={[styles.iconContainer, { gap: scale(16), marginRight: scale(12) }]}>
        <IconWrapper
          onPress={() => navigation.navigate("Chatbot" as never)}
          icon={<Ionicons name="chatbox-ellipses" size={ms(22)} color="#0E2A3A" />}
        />
        <IconWrapper
          onPress={() => navigation.navigate("Hash" as never)}
          icon={<Fontisto name="hashtag" size={ms(18)} color="#0E2A3A" />}
        />
        <IconWrapper
          onPress={() => navigation.navigate("Notification" as never)}
          icon={<Ionicons name="notifications" size={ms(22)} color="#0E2A3A" />}
        />
      </View>
    </SafeAreaView>
  );
}

const IconWrapper = ({ onPress, icon }: { onPress: () => void; icon: React.ReactNode }) => {
  const { scale, vs } = useResponsive();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.iconWrapper,
        { width: scale(42), height: scale(42), borderRadius: scale(21) },
      ]}
    >
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0E2A3A",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  goldButton: {
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  goldButtonInner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  goldText: {
    fontWeight: "bold",
    color: "#0E2A3A",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
