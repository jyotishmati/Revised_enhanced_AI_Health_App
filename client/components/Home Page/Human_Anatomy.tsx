// import React from "react";
// import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

// const { width } = Dimensions.get("window");

// const App = () => {
//   return (
//     <View style={styles.container}>
//       {/* Title */}
//       <Text style={styles.title}>Overview Conditions</Text>

//       {/* Human Body Image with 3D Effect */}
//       <Image
//         source={require("../../assets/images/human_skeleton_2.png")}
//         style={styles.humanImage}
//         resizeMode="contain"
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F5F7FA",
//     alignItems: "center",
//     paddingTop: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#0F172A",
//     textAlign: "left", // Align text to the left
//     marginBottom: 10,
//     width: "100%", // Ensure it spans full width for alignment
//     paddingLeft: 20,
//   },
//   humanImage: {
//     width: width * 1.2, // Slightly increased width
//     height: width * 1.6,
//     marginTop: 45, // Moves image down
//     transform: [
//       { perspective: 800 }, // Adds depth
//       { scaleX: 1.1 }, // Slight horizontal stretch
//       { scaleY: 1.15 }, // Slight vertical stretch
//       { rotateX: "-10deg" }, // Tilts the top backward
//     ],
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.5,
//     shadowRadius: 20,
//     elevation: 10, // Android shadow
//   },
// });

// export default App;

import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const scale = (size: number) => (width / 375) * size;

const HumanAnatomy = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Agent</Text>

      <View style={styles.imageWrapper}>
        <Image
          source={require("../../assets/images/human_updated.png")}
          style={styles.humanImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: scale(20),
    paddingBottom: scale(130),
    // marginBottom: scale(100),
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0F172A",
    textAlign: "left",
    marginBottom: scale(30),
    width: "100%",
    paddingLeft: scale(20),
  },
  imageWrapper: {
    width: width * 0.9,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  humanImage: {
    width: 300,
    height: 400,
    transform: [
      { perspective: 800 },
      { scaleX: 1.1 },
      { scaleY: 1.15 },
      { rotateX: "-10deg" },
    ],
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
    marginTop: 120,
    // marginBottom:70,
  },
});

export default HumanAnatomy;
