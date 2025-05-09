import React, { useState, useRef } from "react";
import {
  Animated,
  ScrollView,
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Gold_bar from "../Home Page/Gold_bar";
import { useNavigation } from "@react-navigation/native";
import SelfInsurance from "./self_insurance";
import Footer from "../Home Page/footer";
import { useResponsive } from "../../hooks/useresponsive"; // Ensure this path is correct

const InsuranceScreen = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState<"self" | "family" | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { scale, ms } = useResponsive();

  const handleTabPress = (tabName: "self" | "family") => {
    setSelectedTab((prevTab) => (prevTab === tabName ? null : tabName));
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Gold_bar />
      <ScrollView style={styles.container}>
        <View style={styles.profileContainer}>
          <Image
            source={require("../../assets/images/page1.jpg")}
            style={[styles.profileImage, { width: scale(100), height: scale(100), borderRadius: scale(10) }]}
          />
          <View style={[styles.verticalDivider, { width: scale(1), marginHorizontal: scale(15) }]} />
          <View style={styles.profileDetails}>
            <Text style={[styles.userName, { fontSize: ms(18) }]}>Aditi Sharma</Text>
            <Text style={[styles.userInfo, { fontSize: ms(14) }]}>Mobile: 9876543210</Text>
            <Text style={[styles.userInfo, { fontSize: ms(14) }]}>MID: NS1234567890</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          {["self", "family"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.insuranceButton,
                selectedTab === tab && styles.activeButton,
              ]}
              onPress={() => handleTabPress(tab as "self" | "family")}
              activeOpacity={0.7}
            >
              <FontAwesome
                name={tab === "self" ? "user" : "users"}
                size={ms(24)}
                color={selectedTab === tab ? "#003366" : "#FFF"}
              />
              <Text
                style={[
                  styles.buttonText,
                  selectedTab === tab && styles.activeButtonText,
                ]}
              >
                {tab === "self" ? "Self Insurance" : "Family Insurance"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Animated.View style={[styles.contentArea, { opacity: fadeAnim }]}>
          {selectedTab === "self" && <SelfInsurance />}
          {selectedTab === "family" && (
            <Text style={[styles.infoText, { fontSize: ms(16) }]}>
              Family Insurance coming soon...
            </Text>
          )}
        </Animated.View>

        <View style={styles.horizontalLineFull} />

        <View style={styles.planContainer}>
          {["Niva Health Insurance", "TATA AIA Life Insurance"].map((company, index) => (
            <View key={company} style={styles.insuranceCard}>
              <View style={styles.insuranceHeader}>
                <Image
                  source={
                    index === 0
                      ? { uri: "https://via.placeholder.com/60" }
                      : require("../../assets/images/page1.jpg")
                  }
                  style={[styles.insuranceLogo, { width: scale(45), height: scale(45), borderRadius: scale(5) }]}
                />
                <Text style={[styles.insuranceCompany, { fontSize: ms(16) }]}>{company}</Text>
              </View>
              <Text style={[styles.planPrice, { fontSize: ms(18) }]}>
                ₹7,0{index === 0 ? "20" : "120"}
                <Text style={[styles.discountText, { fontSize: ms(14) }]}> 5% Off per year</Text>
              </Text>
              <Text style={[styles.strikePrice, { fontSize: ms(14) }]}>₹7,389</Text>
              <View style={styles.horizontalLine} />
              <Text style={[styles.planBenefitsTitle, { fontSize: ms(15) }]}>Plan Benefits</Text>
              <Text style={[styles.planBenefits, { fontSize: ms(14), lineHeight: ms(21) }]}>
                • Up to 3X cover in 3 yrs{"\n"}• Unlimited Restoration Forever{"\n"}• Maternity and IVF{"\n"}• Tax Benefits
              </Text>
              <TouchableOpacity style={styles.buyButton}>
                <Text style={[styles.buyButtonText, { fontSize: ms(16) }]}>Buy Plan</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

export default InsuranceScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  profileContainer: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingVertical: 20 },
  verticalDivider: { height: "80%", backgroundColor: "#D1D5DB" },
  profileDetails: { flex: 1, justifyContent: "center" },
  userName: { fontWeight: "bold", color: "#111827", marginBottom: 4 },
  userInfo: { color: "#4B5563", marginTop: 4 },
  buttonContainer: { flexDirection: "row", justifyContent: "space-around", paddingHorizontal: 16, marginTop: 10, marginBottom: 20 },
  insuranceButton: { flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#003366", paddingVertical: 12, paddingHorizontal: 15, borderRadius: 8, flex: 1, marginHorizontal: 6, borderWidth: 1, borderColor: "#003366" },
  activeButton: { backgroundColor: "#E0F2FE", borderColor: "#0055AA" },
  buttonText: { color: "#FFF", fontWeight: "600", marginTop: 5, textAlign: "center" },
  activeButtonText: { color: "#003366" },
  contentArea: { paddingHorizontal: 20, marginBottom: 20 },
  profileImage: {
    resizeMode: "cover", // Or "contain" based on your requirement
  },
  infoText: { textAlign: "center", marginTop: 10, color: "#6B7280" },
  horizontalLineFull: { height: 1, backgroundColor: "#E5E7EB", marginHorizontal: 20 },
  planContainer: { paddingHorizontal: 20, marginTop: 20, marginBottom: 20 },
  insuranceCard: { backgroundColor: "#FFF", borderRadius: 10, padding: 15, marginBottom: 15, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 5, shadowOffset: { width: 0, height: 2 }, elevation: 3 },
  insuranceHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  insuranceLogo: { marginRight: 12, borderWidth: 1, borderColor: "#E5E7EB" },
  insuranceCompany: { fontWeight: "bold", color: "#1F2937", flex: 1 },
  planPrice: { fontWeight: "bold", color: "#111827", marginTop: 5 },
  discountText: { color: "#059669", fontWeight: "600" },
  strikePrice: { color: "#6B7280", textDecorationLine: "line-through", marginTop: 2 },
  horizontalLine: { height: 1, backgroundColor: "#E5E7EB", marginVertical: 12 },
  planBenefitsTitle: { fontWeight: "bold", color: "#111827", marginBottom: 8 },
  planBenefits: { color: "#4B5563", marginBottom: 15 },
  buyButton: { backgroundColor: "#003366", paddingVertical: 12, borderRadius: 8, alignItems: "center", marginTop: 5 },
  buyButtonText: { color: "#FFF", fontWeight: "bold" },
});
