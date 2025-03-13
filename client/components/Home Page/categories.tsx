import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size;

const categories = [
  { id: "1", name: "Heart", icon: "heart-outline" },
  { id: "2", name: "Dental", icon: "happy-outline" },
  { id: "3", name: "Kidney", icon: "water-outline" },
  { id: "4", name: "Stomach", icon: "fast-food-outline" },
  { id: "5", name: "Lung", icon: "cloud-outline" },
  { id: "6", name: "Brain", icon: "eye-outline" },
  { id: "7", name: "Mental", icon: "person-outline" },
  { id: "8", name: "Liver", icon: "flask-outline" },
];

const CategoriesGrid: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>

      {/* Grid Section */}
      <FlatList
        data={categories}
        numColumns={4}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryButton}>
            <Ionicons
              name={item.icon as keyof typeof Ionicons.glyphMap}
              size={scale(24)}
              color="#0F172A"
            />
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(8),
    paddingVertical: scale(16),
    backgroundColor: "#FFF",
    marginTop: scale(-1),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scale(16),
  },
  title: {
    fontSize: scale(18),
    fontWeight: "bold",
    color: "#1E293B",
  },
  seeAll: {
    fontSize: scale(14),
    color: "#64748B",
  },
  categoryButton: {
    width: scale(78),
    height: scale(80),
    backgroundColor: "#F1F5F9",
    borderRadius: scale(16),
    justifyContent: "center",
    alignItems: "center",
    margin: scale(6),
  },
  categoryText: {
    fontSize: scale(12),
    color: "#334155",
    marginTop: scale(4),
  },
});

export default CategoriesGrid;