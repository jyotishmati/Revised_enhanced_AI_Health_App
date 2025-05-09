// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   FlatList,
//   Dimensions,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// const { width } = Dimensions.get("window");
// const scale = (size: number) => (width / 375) * size;

// const categories = [
//   { id: "1", name: "Heart", icon: "heart-outline" },
//   { id: "2", name: "Dental", icon: "happy-outline" },
//   { id: "3", name: "Kidney", icon: "water-outline" },
//   { id: "4", name: "Stomach", icon: "fast-food-outline" },
//   { id: "5", name: "Lung", icon: "cloud-outline" },
//   { id: "6", name: "Brain", icon: "eye-outline" },
//   { id: "7", name: "Mental", icon: "person-outline" },
//   { id: "8", name: "Liver", icon: "flask-outline" },
// ];

// const CategoriesGrid: React.FC = () => {
//   return (
//     <View style={styles.container}>
//       {/* Header Section */}
//       <View style={styles.header}>
//         <Text style={styles.title}>Categories</Text>
//         <TouchableOpacity>
//           <Text style={styles.seeAll}>See all</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Grid Section */}
//       <FlatList
//         data={categories}
//         numColumns={4}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity style={styles.categoryButton}>
//             <Ionicons
//               name={item.icon as keyof typeof Ionicons.glyphMap}
//               size={scale(24)}
//               color="#0F172A"
//             />
//             <Text style={styles.categoryText}>{item.name}</Text>
//           </TouchableOpacity>
//         )}
//         scrollEnabled={false}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: scale(8),
//     paddingVertical: scale(16),
//     backgroundColor: "#FFF",
//     marginTop: scale(-1),
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: scale(16),
//   },
//   title: {
//     fontSize: scale(16),
//     fontWeight: 700,
//     marginLeft: 12,
//     color: "#1E293B",
//   },
//   seeAll: {
//     fontSize: scale(12),
//     color: "#64748B",
//     marginRight: 14,
//   },
//   categoryButton: {
//     width: scale(78),
//     height: scale(80),
//     backgroundColor: "#F1F5F9",
//     borderRadius: scale(16),
//     justifyContent: "center",
//     alignItems: "center",
//     margin: scale(6),
//   },
//   categoryText: {
//     fontSize: scale(12),
//     color: "#334155",
//     marginTop: scale(4),
//   },
// });

// export default CategoriesGrid;

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useResponsive } from "../../hooks/useresponsive";

const CategoriesGrid: React.FC = () => {
  const { scale, ms, vs } = useResponsive();

  const categories = [
    { id: "1", name: "Heart", icon: <FontAwesome5 name="heartbeat" size={ms(24)} color="#0F172A" /> },
    { id: "2", name: "Dental", icon: <MaterialCommunityIcons name="tooth-outline" size={ms(24)} color="#0F172A" /> },
    { id: "3", name: "Kidney", icon: <Ionicons name="water-outline" size={ms(24)} color="#0F172A" /> },
    { id: "4", name: "Stomach", icon: <MaterialCommunityIcons name="food-variant" size={ms(24)} color="#0F172A" /> },
    { id: "5", name: "Lung", icon: <MaterialCommunityIcons name="lungs" size={ms(24)} color="#0F172A" /> },
    { id: "6", name: "Brain", icon: <MaterialCommunityIcons name="brain" size={ms(24)} color="#0F172A" /> },
    { id: "7", name: "Mental", icon: <Ionicons name="person-circle-outline" size={ms(24)} color="#0F172A" /> },
    { id: "8", name: "Liver", icon: <Ionicons name="flask-outline" size={ms(24)} color="#0F172A" /> },
  ];

  return (
    <View style={[styles.container, {marginTop: vs(-1)}]}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={[styles.title, { fontSize: ms(18) }]}>Categories</Text>
        <TouchableOpacity>
          <Text style={[styles.seeAll, { fontSize: ms(14) }]}>See all</Text>
        </TouchableOpacity>
      </View>

      {/* Grid Section */}
      <FlatList
        data={categories}
        numColumns={4}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.categoryButton, { width: scale(76), height: vs(80),borderRadius: scale(16), margin: scale(6) }]}>
            {item.icon}
            <Text style={[styles.categoryText, { fontSize: ms(12), marginTop: vs(4) }]}>{item.name}</Text>
          </TouchableOpacity>
        )}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontWeight: "bold",
    color: "#1E293B",
  },
  seeAll: {
    color: "#64748B",
  },
  categoryButton: {
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  categoryText: {
    color: "#334155",
    textAlign: "center",
  },
});

export default CategoriesGrid;
