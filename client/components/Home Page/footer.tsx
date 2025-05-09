// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import { useResponsive } from "../../hooks/useresponsive";

// export default function Footer() {
//   const navigation = useNavigation();
//   const { scale, vs, ms } = useResponsive();

//   return (
//     <View style={styles.wrapper}>
//       <View style={styles.container}>
//         {/* Icon Row */}
//         <View style={styles.iconRow}>
//           {[
//             { screen: "HomeTemplate", icon: <Ionicons name="home" size={ms(22)} color="#0E3A5F" />, label: "Home" },
//             { screen: "Docters", icon: <MaterialIcons name="local-hospital" size={ms(22)} color="#0E3A5F" />, label: "Doctors" },
//             { screen: "Insurance", icon: <FontAwesome5 name="star" size={ms(24)} color="#0E3A5F" solid />, label: "" },
//             { screen: "Analytics", icon: <MaterialIcons name="analytics" size={ms(22)} color="#0E3A5F" />, label: "Analytics" },
//             { screen: "FullProfile", icon: <FontAwesome5 name="user-circle" size={ms(22)} color="#0E3A5F" solid />, label: "Profile" },
//           ].map((item, idx) => (
//             <TouchableOpacity
//               key={idx}
//               style={styles.button}
//               onPress={() => navigation.navigate(item.screen as never)}
//               activeOpacity={0.8}
//             >
//               {idx === 2 ? (
//                 <View style={[styles.centerButton, { width: scale(50), height: vs(50), borderRadius: scale(25) }]}>
//                   {item.icon}
//                 </View>
//               ) : (
//                 item.icon
//               )}
//               <Text style={[styles.text, { fontSize: ms(12) }]}>{item.label}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Bottom Indicator Bar */}
//         <View style={styles.indicatorContainer}>
//           <View style={[styles.indicator, { width: scale(150), height: vs(5), borderRadius: scale(10) }]} />
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   wrapper: {
//     width: "100%",
//     backgroundColor: "#FFFFFF",
//   },
//   container: {
//     flexDirection: "column",
//     backgroundColor: "#FFFFFF",
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 5,
//     paddingVertical: 5,
//     paddingHorizontal: 15,
//   },
//   iconRow: {
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//     alignItems: "center",
//     marginTop: 5,
//   },
//   button: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   centerButton: {
//     backgroundColor: "#F3F4F6",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   text: {
//     color: "#6B7280",
//     marginTop: 4,
//   },
//   indicatorContainer: {
//     width: "100%",
//     alignItems: "center",
//     paddingBottom: 5,
//     marginTop: 2,
//   },
//   indicator: {
//     backgroundColor: "#9CA3AF",
//   },
// });


import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useResponsive } from "../../hooks/useresponsive";

export default function Footer() {
  const navigation = useNavigation();
  const route = useRoute();
  const { scale, vs, ms } = useResponsive();

  const tabs = [
    { screen: "HomeTemplate", icon: <Ionicons name="home" size={ms(22)} />, label: "Home" },
    { screen: "Docters", icon: <MaterialIcons name="local-hospital" size={ms(22)} />, label: "Doctors" },
    { screen: "Insurance", icon: <FontAwesome5 name="star" size={ms(24)} />, label: "" },
    { screen: "Analytics", icon: <MaterialIcons name="analytics" size={ms(22)} />, label: "Analytics" },
    { screen: "FullProfile", icon: <FontAwesome5 name="user-circle" size={ms(22)} />, label: "Profile" },
  ];

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {/* Icon Row */}
        <View style={styles.iconRow}>
          {tabs.map((item, idx) => {
            const isActive = route.name === item.screen;
            const iconColor = isActive ? "#0E3A5F" : "#6B7280";
            return (
              <TouchableOpacity
                key={idx}
                style={styles.button}
                onPress={() => navigation.navigate(item.screen as never)}
                activeOpacity={0.8}
              >
                {idx === 2 ? (
                  <View style={[styles.centerButton, { width: scale(50), height: vs(50), borderRadius: scale(25) }]}>
                    {React.cloneElement(item.icon, { color: iconColor })}
                  </View>
                ) : (
                  React.cloneElement(item.icon, { color: iconColor })
                )}
                <Text style={[
                  styles.text,
                  { fontSize: ms(12), color: iconColor },
                  isActive && styles.activeText
                ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Bottom Indicator Bar */}
        <View style={styles.indicatorContainer}>
          <View style={[styles.indicator, { width: scale(150), height: vs(5), borderRadius: scale(10) }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
  container: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 5,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  centerButton: {
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    marginTop: 4,
  },
  activeText: {
    fontWeight: "bold",
  },
  indicatorContainer: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 5,
    marginTop: 2,
  },
  indicator: {
    backgroundColor: "#9CA3AF",
  },
});
