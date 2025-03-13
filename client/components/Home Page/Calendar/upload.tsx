// import React, { useState, useEffect } from "react";
// import { View, Text, TouchableOpacity, Animated, StyleSheet } from "react-native";
// import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

// const FloatingMenu = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
//   const slideAnim = new Animated.Value(visible ? 0 : 1);

//   useEffect(() => {
//     Animated.timing(slideAnim, {
//       toValue: visible ? 1 : 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   }, [visible]);

//   if (!visible) return null; // Prevent unnecessary rendering when not visible

//   return (
//     <View style={styles.overlay}>
//       <Animated.View
//         style={[
//           styles.curvedContainer,
//           {
//             transform: [{ translateY: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [300, 0] }) }],
//           },
//         ]}
//       >
//         {/* Upload and Scan buttons */}
//         <View style={styles.buttonRow}>
//           <TouchableOpacity style={styles.buttonContainer}>
//             <View style={styles.iconWrapper}>
//               <FontAwesome5 name="upload" size={24} color="#0C3C5F" />
//             </View>
//             <Text style={styles.buttonText}>Upload</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.buttonContainer}>
//             <View style={styles.iconWrapper}>
//               <FontAwesome5 name="qrcode" size={24} color="#0C3C5F" />
//             </View>
//             <Text style={styles.buttonText}>Scan</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Close Button */}
//         <TouchableOpacity onPress={onClose} style={styles.closeButton}>
//           <Ionicons name="close" size={24} color="#0C3C5F" />
//         </TouchableOpacity>
//       </Animated.View>
//     </View>
//   );
// };

// const DocumentManagerScreen = () => {
//   const [menuVisible, setMenuVisible] = useState(false);

//   return (
//     <View style={styles.container}>
//       {/* Plus Button */}
//       <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.plusButton}>
//         <Ionicons name="add-circle" size={50} color="#0C3C5F" />
//       </TouchableOpacity>

//       {/* Floating Curved Overlay */}
//       <FloatingMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8f8f8",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   overlay: {
//     position: "absolute",
//     width: "100%",
//     height: "100%",
//     backgroundColor: "rgba(0,0,0,0.5)", // Debugging: Change this to "red" if not visible
//     justifyContent: "flex-end",
//   },
//   curvedContainer: {
//     width: "100%",
//     height: "50%",
//     backgroundColor: "#0C3C5F",
//     borderTopLeftRadius: 300,
//     borderTopRightRadius: 300,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   buttonRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "60%",
//   },
//   buttonContainer: {
//     alignItems: "center",
//   },
//   iconWrapper: {
//     backgroundColor: "white",
//     borderRadius: 50,
//     padding: 15,
//   },
//   buttonText: {
//     color: "white",
//     marginTop: 5,
//   },
//   closeButton: {
//     backgroundColor: "#AEDFF7",
//     borderRadius: 50,
//     padding: 15,
//     position: "absolute",
//     bottom: -25,
//   },
//   plusButton: {
//     position: "absolute",
//     bottom: 50,
//     right: 30,
//   },
// });

// export default DocumentManagerScreen;


import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const FloatingMenu = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null; // Hide if closed

  return (
    <View style={styles.overlay}>
      {/* Curved Section */}
      <View style={styles.curvedContainer}>
        {/* Upload Button */}
        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="file-upload" size={28} color="white" />
          <Text style={styles.optionText}>Upload</Text>
        </TouchableOpacity>

        {/* Scan Button */}
        <TouchableOpacity style={styles.option}>
          <AntDesign name="scan1" size={28} color="white" />
          <Text style={styles.optionText}>Scan</Text>
        </TouchableOpacity>

        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={() => setVisible(false)}>
          <AntDesign name="close" size={24} color="#00344A" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "50%", // Cover top portion
    alignItems: "center",
  },
  curvedContainer: {
    backgroundColor: "#002B45",
    width: "100%",
    height: "75%", // Occupy most of the overlay
    borderBottomLeftRadius: 250, // Creates the curved effect
    justifyContent: "center",
    alignItems: "center",
  },
  option: {
    alignItems: "center",
    marginBottom: 20,
  },
  optionText: {
    color: "white",
    fontSize: 16,
    marginTop: 5,
  },
  closeButton: {
    position: "absolute",
    bottom: -25, // Slightly below the curved container
    backgroundColor: "#A9D5EE",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FloatingMenu;
