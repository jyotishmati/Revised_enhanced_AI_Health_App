import React, { useState } from "react";
import {
  ScrollView,
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  TextInput, // Removed as it wasn't used
  FlatList, // Removed as it wasn't used
  Dimensions,
  StyleSheet,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons"; // Ionicons removed if not used elsewhere
import Gold_bar from "../Home Page/Gold_bar";
import { useNavigation } from "@react-navigation/native";
import SelfInsurance from "./self_insurance"; // Assuming this component exists and works
import Footer from "../Home Page/footer";

const { width } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size; // Base width is 375

const InsuranceScreen = () => {
  const navigation = useNavigation();
  // State to track the currently selected tab ("self", "family") or null if none
  const [selectedTab, setSelectedTab] = useState<"self" | "family" | null>(null);

  // Function to handle button presses - toggles selection
  const handleTabPress = (tabName: "self" | "family") => {
    setSelectedTab((prevTab) => (prevTab === tabName ? null : tabName));
    // If the currently selected tab is the one being pressed, set state to null (hide content).
    // Otherwise, set the state to the pressed tab name (show content).
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <Gold_bar />
      <ScrollView style={styles.container}>
      {/* Top Gold Bar */}
      <View style={styles.profileContainer}>
        {/* Profile Image */}
        <Image
          // Make sure the path to your asset is correct
          source={require("../../assets/images/page1.jpg")}
          style={styles.profileImage}
        />

        {/* Vertical Divider */}
        <View style={styles.verticalDivider} />

        {/* Profile Details */}
        <View style={styles.profileDetails}>
          <Text style={styles.userName}>Aditi Sharma</Text>
          <Text style={styles.userInfo}>Mobile: 9876543210</Text>
          <Text style={styles.userInfo}>MID: NS1234567890</Text>
        </View>
      </View>

      {/* Insurance Type Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.insuranceButton,
            // Apply active style only if 'self' is selected
            selectedTab === "self" && styles.activeButton,
          ]}
          // Use the handleTabPress function
          onPress={() => handleTabPress("self")}
          activeOpacity={0.7} // Optional: add feedback on press
        >
          <FontAwesome
            name="user"
            size={scale(24)}
            // Change icon color based on selection for better visual feedback
            color={selectedTab === "self" ? "#003366" : "#FFF"}
          />
          <Text
            style={[
              styles.buttonText,
              // Change text color based on selection
              selectedTab === "self" && styles.activeButtonText,
            ]}
          >
            Self Insurance
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.insuranceButton,
            // Apply active style only if 'family' is selected
            selectedTab === "family" && styles.activeButton,
          ]}
          // Use the handleTabPress function
          onPress={() => handleTabPress("family")}
          activeOpacity={0.7} // Optional: add feedback on press
        >
          <FontAwesome
            name="users"
            size={scale(24)}
             // Change icon color based on selection
            color={selectedTab === "family" ? "#003366" : "#FFF"}
          />
          <Text
           style={[
              styles.buttonText,
              // Change text color based on selection
              selectedTab === "family" && styles.activeButtonText,
           ]}
          >
            Family Insurance
          </Text>
        </TouchableOpacity>
      </View>

      {/* Render Selected Insurance Component Conditionally */}
      {/* This View will only render its children if selectedTab is not null */}
      <View style={styles.contentArea}>
        {selectedTab === "self" && <SelfInsurance />}
        {selectedTab === "family" && (
          // Placeholder for Family Insurance content
          <Text style={styles.infoText}>Family Insurance coming soon...</Text>
        )}
        {/* If selectedTab is null, nothing renders here */}
      </View>

      {/* Horizontal Divider AFTER the buttons AND content area */}
      <View style={styles.horizontalLineFull} />

      {/* Insurance Plans Section (remains visible always) */}
      <View style={styles.planContainer}>
        {/* First Insurance Card */}
        <View style={styles.insuranceCard}>
          <View style={styles.insuranceHeader}>
            <Image
              source={{ uri: "https://via.placeholder.com/60" }} // Example placeholder
              style={styles.insuranceLogo}
            />
            <Text style={styles.insuranceCompany}>Niva Health Insurance</Text>
          </View>

          <Text style={styles.planPrice}>
            ₹7,020
            <Text style={styles.discountText}> 5% Off per year</Text>
          </Text>
          <Text style={styles.strikePrice}>₹7,389</Text>

          <View style={styles.horizontalLine} />

          <Text style={styles.planBenefitsTitle}>Plan Benefits</Text>
          <Text style={styles.planBenefits}>
            • Up to 3X cover in 3 yrs{"\n"}
            • Unlimited Restoration Forever{"\n"}
            • Maternity and IVF{"\n"}
            • Tax Benefits
          </Text>

          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Buy Plan</Text>
          </TouchableOpacity>
        </View>

        {/* Second Insurance Card */}
        <View style={styles.insuranceCard}>
          <View style={styles.insuranceHeader}>
             {/* Make sure the path to your asset is correct */}
            <Image
              source={require("../../assets/images/page1.jpg")}
              style={styles.insuranceLogo}
            />
            <Text style={styles.insuranceCompany}>TATA AIA Life Insurance</Text>
          </View>

          <Text style={styles.planPrice}>
            ₹7,120
            <Text style={styles.discountText}> 5% Off per year</Text>
          </Text>
          <Text style={styles.strikePrice}>₹7,389</Text>

          <View style={styles.horizontalLine} />

          <Text style={styles.planBenefitsTitle}>Plan Benefits</Text>
          <Text style={styles.planBenefits}>
            • Up to 3X cover in 3 yrs{"\n"}
            • Unlimited Restoration Forever{"\n"}
            • Maternity and IVF{"\n"}
            • Tax Benefits
          </Text>

          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Buy Plan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    <Footer/>
    </SafeAreaView>
  );
};

export default InsuranceScreen;

// --- Styles --- (Added activeButtonText style and contentArea style)
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Set a background color for the whole screen if needed
  },
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB", // Light background
  },

  /* PROFILE SECTION */
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(20),
    paddingVertical: scale(20), // Added vertical padding
  },
  profileImage: {
    width: scale(100), // Slightly smaller image
    height: scale(100),
    borderRadius: scale(10),
  },
  verticalDivider: {
    width: scale(1),
    height: "80%", // Adjusted height
    backgroundColor: "#D1D5DB", // Lighter divider color
    marginHorizontal: scale(15),
  },
  profileDetails: {
    flex: 1,
    justifyContent: "center",
  },
  userName: {
    fontSize: scale(18),
    fontWeight: "bold",
    color: "#111827", // Darker text
    marginBottom: scale(4), // Increased spacing
  },
  userInfo: {
    fontSize: scale(14),
    color: "#4B5563", // Medium grey text
    marginTop: scale(4), // Increased spacing
  },

  /* INSURANCE TYPE BUTTONS */
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: scale(16),
    marginTop: scale(10), // Reduced top margin
    marginBottom: scale(20), // Add margin below buttons before content
  },
  insuranceButton: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#003366", // Default background
    paddingVertical: scale(12),
    paddingHorizontal: scale(15), // Adjusted padding
    borderRadius: scale(8),
    flex: 1,
    marginHorizontal: scale(6), // Slightly increased spacing between buttons
    borderWidth: 1,
    borderColor: "#003366", // Border matches background initially
  },
  activeButton: {
    backgroundColor: "#E0F2FE", // Light blue background when active
    borderColor: "#0055AA", // Darker blue border when active
  },
  buttonText: {
    color: "#FFF", // Default text color (white)
    fontSize: scale(14), // Slightly smaller text
    fontWeight: "600", // Semi-bold
    marginTop: scale(5),
    textAlign: "center",
  },
  activeButtonText: {
     color: "#003366", // Dark blue text when active
  },

  /* --- CONTENT AREA --- */
  contentArea: {
      // This view wraps the conditionally rendered content
      // Add padding or margin if needed when content is visible
      paddingHorizontal: scale(20), // Example padding
      marginBottom: scale(20), // Space before the horizontal line
  },
  infoText: { // Style for placeholder text
    fontSize: scale(16),
    textAlign: "center",
    marginTop: scale(10), // Reduced margin
    color: "#6B7280", // Grey info text
  },

  /* HORIZONTAL DIVIDER AFTER BUTTONS/CONTENT */
  horizontalLineFull: {
    height: scale(1),
    backgroundColor: "#E5E7EB", // Lighter line color
    // marginVertical: scale(20), // Removed vertical margin here, handled by spacing above/below
    marginHorizontal: scale(20),
  },

  /* INSURANCE CARDS */
  planContainer: {
    paddingHorizontal: scale(20),
    marginTop: scale(20), // Add margin above the cards section
    marginBottom: scale(20),
  },
  insuranceCard: {
    backgroundColor: "#FFF",
    borderRadius: scale(10),
    padding: scale(15),
    marginBottom: scale(15),
    shadowColor: "#000",
    shadowOpacity: 0.05, // Reduced shadow opacity
    shadowRadius: scale(5),
    shadowOffset: { width: 0, height: scale(2) },
    elevation: scale(3), // Slightly increased elevation
  },
  insuranceHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scale(10),
  },
  insuranceLogo: {
    width: scale(45), // Slightly smaller logo
    height: scale(45),
    marginRight: scale(12),
    borderRadius: scale(5),
    borderWidth: 1, // Optional: add border to logo
    borderColor: "#E5E7EB",
  },
  insuranceCompany: {
    fontSize: scale(16),
    fontWeight: "bold",
    color: "#1F2937", // Darker company name
    flex: 1,
  },
  planPrice: {
    fontSize: scale(18), // Adjusted size
    fontWeight: "bold",
    color: "#111827",
    marginTop: scale(5),
  },
  discountText: {
    fontSize: scale(14), // Adjusted size
    color: "#059669", // Green color for discount
    fontWeight: "600",
  },
  strikePrice: {
    fontSize: scale(14), // Adjusted size
    color: "#6B7280", // Grey strike-through price
    textDecorationLine: "line-through",
    marginTop: scale(2),
  },
  horizontalLine: {
    height: scale(1),
    backgroundColor: "#E5E7EB", // Lighter line color inside card
    marginVertical: scale(12),
  },
  planBenefitsTitle: {
    fontSize: scale(15), // Adjusted size
    fontWeight: "bold",
    color: "#111827",
    marginBottom: scale(8),
  },
  planBenefits: {
    fontSize: scale(14),
    color: "#4B5563", // Medium grey text
    marginBottom: scale(15),
    lineHeight: scale(21), // Adjusted line height
  },
  buyButton: {
    backgroundColor: "#003366",
    paddingVertical: scale(12),
    borderRadius: scale(8),
    alignItems: "center",
    marginTop: scale(5), // Added margin top
  },
  buyButtonText: {
    color: "#FFF",
    fontSize: scale(16),
    fontWeight: "bold",
  },
});