import React from "react";
import { View, Text, FlatList, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Gold_bar from "../Home Page/Gold_bar";

const user = {
  name: "Nandan G",
  balance: 68,
};

const offers = [
  {
    id: "1",
    title: "Whey Protein",
    category: "Protein",
    discount: "Use 10% off on Protein",
    image: require("../../assets/images/page1.jpg"),
    coins: 7,
  },
  {
    id: "2",
    title: "Vitamin C",
    category: "Capsules",
    discount: "Use 16% off on Tablets",
    image: require("../../assets/images/page1.jpg"),
    coins: 3,
  },
  {
    id: "3",
    title: "Backbone Belt",
    category: "Health",
    discount: "Use 22% off on Tablets",
    image: require("../../assets/images/page1.jpg"),
    coins: 8,
  },
];

export default function App() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
    <view>
      <Gold_bar />
    </view>
    <ScrollView style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Health Coin</Text>
      </View>

      {/* User Balance */}
      <View style={styles.balanceContainer}>
        <Text style={styles.username}>{user.name}</Text>
        <View style={styles.balance}>
          <Ionicons name="wallet" size={18} color="#B19333" />
          <Text style={styles.balanceText}>{user.balance}</Text>
        </View>
      </View>

      {/* Offers Section */}
      <Text style={styles.sectionTitle}>Offers</Text>
      <FlatList
        data={offers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardCategory}>{item.category}</Text>
              <Text style={styles.cardDiscount}>{item.discount}</Text>
              <View style={styles.coinContainer}>
                <Ionicons name="wallet" size={16} color="#B19333" />
                <Text style={styles.coinText}>{item.coins}</Text>
              </View>
            </View>
          </View>
        )}
        scrollEnabled={false} // Since inside ScrollView
      />
    </ScrollView>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    padding: 30,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  backButton: {
    marginRight: 10, // Spacing between back button and title
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#063247",
  },
  balanceContainer: {
    backgroundColor: "#BEE3F8",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: '#063247',
    marginTop: 10,
  },
  balance: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  balanceText: {
    fontSize: 18,
    marginLeft: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: '#063247',
  },
  card: {
    backgroundColor: "#BEE3F8",
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: '#063247',
  },
  cardCategory: {
    fontSize: 16,
    color: "gray",
  },
  cardDiscount: {
    fontSize: 14,
    marginTop: 5,
  },
  coinContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  coinText: {
    fontSize: 16,
    marginLeft: 5,
  },
});