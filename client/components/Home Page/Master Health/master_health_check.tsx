// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// const { width } = Dimensions.get("window");
// const scale = (size: number) => (width / 375) * size;

// const MasterHealthVault = () => {
//   const navigation = useNavigation();
//   return (
//     <View style={styles.container}>
//       <View style={styles.card}>
//         <Text style={styles.text}>Master Health Vault</Text>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => navigation.navigate("MasterHealthVault" as never)}
//         >
//           <Text style={styles.buttonText}>Check</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     backgroundColor: "#023047",
//     // borderRadius: 60,
//   },
//   card: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     // backgroundColor: "#023047",
//     paddingHorizontal: scale(16),
//     minHeight: scale(60),
//     // borderRadius: 20,
//     width: "100%",
//   },

//   text: {
//     color: "white",
//     fontSize: scale(16), // Reduced text size
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   button: {
//     backgroundColor: "white",
//     paddingHorizontal: scale(28),
//     paddingVertical: scale(5),
//     borderRadius: scale(20),
//     alignContent: "center",
//   },
//   buttonText: {
//     color: "#000",
//     fontSize: scale(14),
//     fontWeight: "600",
//     textAlign: "center",
//   },
// });

// export default MasterHealthVault;


import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useResponsive } from "../../../hooks/useresponsive"; // Assuming you have this

const MasterHealthVault = () => {
  const navigation = useNavigation();
  const { scale, vs, ms } = useResponsive();

  return (
    <LinearGradient
      colors={["#023047", "#045D75"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.container, { paddingVertical: vs(15) }]}
    >
      <View style={[styles.card, { paddingHorizontal: scale(16) }]}>
        <Text style={[styles.text, { fontSize: ms(16),  marginLeft: scale(-10),}]}>Master Health Vault</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.button,
            {
              paddingHorizontal: scale(28),
              paddingVertical: vs(8),
              borderRadius: scale(20),
              marginRight: scale(-12),
            },
          ]}
          onPress={() => navigation.navigate("MasterHealthVault" as never)}
        >
          <Text style={[styles.buttonText, { fontSize: ms(14) }]}>Check</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    
  },
  button: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      android: {
        elevation: 2,
      },
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
      },
    }),
  },
  buttonText: {
    color: "#023047",
    fontWeight: "600",
    textAlign: "center",
  },
});

export default MasterHealthVault;
