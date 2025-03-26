import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Gold_bar from "../Home Page/Gold_bar";

const SubscriptionScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <view>
      <Gold_bar />
      </view>
      
      <ScrollView contentContainerStyle={styles.container}>
        {/* Back Navigation */}
        <View style={styles.header}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="#004080"
            style={styles.backIcon}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Subscription</Text>
        </View>

        {/* Subscription Plans */}
        <SubscriptionCard 
          title="FREE" 
          price="₹0" 
          features={["Chatbot", "Health analysis"]}
          buttonText="Current"
          isCurrent={true} 
        />
        
        <SubscriptionCard 
          title="PREMIUM" 
          price="₹99" 
          features={["Chatbot", "Health Report"]}
          buttonText="Buy Now"
          isCurrent={false} 
        />

      </ScrollView>
    </SafeAreaView>
  );
};

const SubscriptionCard = ({ 
  title, 
  price, 
  features, 
  buttonText, 
  isCurrent 
}: {
  title: string;
  price: string;
  features: string[];
  buttonText: string;
  isCurrent: boolean;
}) => (
  <View style={styles.card}>
    <Text style={styles.planTitle}>{title}</Text>
    <Text style={styles.price}>{price}<Text style={styles.perMonth}>/month</Text></Text>
    {/* Features List */}
    {features.map((feature, index) => (
      <Text key={index} style={styles.featureText}>• {feature}</Text>
    ))}
    
    {/* Button */}
    <TouchableOpacity style={isCurrent ? styles.currentButton : styles.buyNowButton}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  </View>
);

// Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flexGrow: 1,
    padding: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backIcon: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#063247",
  },
  card: {
    backgroundColor: "#CDEEFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#063247",
    marginBottom: 5,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#063247",
  },
  perMonth: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#063247",
  },
  featureText: {
    fontSize: 16,
    color: "#063247",
    marginTop: 5,
  },
  currentButton: {
    backgroundColor: "#002B44",
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buyNowButton: {
    backgroundColor: "#002B44",
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SubscriptionScreen;