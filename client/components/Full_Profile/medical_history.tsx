import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Gold_bar from "../Home Page/Gold_bar";

const MedicalHistoryScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <view>
      <Gold_bar />
      </view>
    <ScrollView style={styles.container}>
      
      {/* Back Navigation */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={20} color="#000" />
        <Text style={styles.headerTitle}>Medical History</Text>
      </TouchableOpacity>

      {/* Medical Conditions */}
      <Text style={styles.sectionTitle}>Medical Conditions</Text>
      <View style={styles.boxContainer}>
        <TouchableOpacity style={styles.listItem}>
          <View style={styles.iconWrapper}>
            <Ionicons name="water-outline" size={18} color="#000" />
          </View>
          <Text style={styles.itemText}>Diabetes</Text>
          <Ionicons name="chevron-forward" size={18} color="#000" style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.listItem}>
          <View style={styles.iconWrapper}>
            <Ionicons name="medkit-outline" size={18} color="#000" />
          </View>
          <Text style={styles.itemText}>Cholesterol</Text>
          <Ionicons name="chevron-forward" size={18} color="#000" style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>

      {/* Allergies */}
      <Text style={styles.sectionTitle}>Allergies</Text>
      <View style={styles.allergyContainer}>
        <TouchableOpacity style={styles.allergyItem}>
          <Ionicons name="flower-outline" size={18} color="#000" />
          <Text style={styles.allergyText}>Pollen</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.allergyItem}>
          <Ionicons name="cube-outline" size={18} color="#000" />
          <Text style={styles.allergyText}>Milk</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.allergyItem}>
          <Ionicons name="cloud-outline" size={18} color="#000" />
          <Text style={styles.allergyText}>Dust</Text>
        </TouchableOpacity>
      </View>

      {/* Surgeries */}
      <Text style={styles.sectionTitle}>Surgeries</Text>
      <View style={styles.boxContainer}>
        <TouchableOpacity style={styles.listItem}>
          <View style={styles.iconWrapper}>
            <Ionicons name="walk-outline" size={18} color="#000" />
          </View>
          <Text style={styles.itemText}>Kidney Stone</Text>
          <Ionicons name="chevron-forward" size={18} color="#000" style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.listItem}>
          <View style={styles.iconWrapper}>
            <Ionicons name="body-outline" size={18} color="#000" />
          </View>
          <Text style={styles.itemText}>Ligament Tear</Text>
          <Ionicons name="chevron-forward" size={18} color="#000" style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default MedicalHistoryScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF",
      paddingHorizontal: 24, // Increased padding
      paddingTop: 20,
    },
    backButton: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: "bold",
      marginLeft: 8,
      color: "#063247",
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#063247",
      marginBottom: 15,
      marginTop: 10,
    },
    boxContainer: {
      marginBottom: 16,
    },
    listItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#B3E5FC",
      paddingVertical: 18, // Increased padding
      paddingHorizontal: 16, // Increased padding
      borderRadius: 15, // Slightly rounded corners
      marginBottom: 12, // Increased spacing
    },
    iconWrapper: {
      width: 40, // Increased size
      height: 40,
      borderRadius: 20,
      backgroundColor: "#FFFFFF",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 16, // Increased spacing
    },
    itemText: {
      fontSize: 18, // Slightly larger text
      color: "#063247",
      flex: 1,
    },
    arrowIcon: {
      marginLeft: "auto",
      fontSize: 20, // Slightly larger arrow
    },
    allergyContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    allergyItem: {
      width: 90, // Fixed width for proper spacing
      height: 90, // Square shape
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#B3E5FC",
      borderRadius: 12,
    },
    allergyText: {
      fontSize: 18,
      color: "#063247",
      marginTop: 6, // Space between icon and text
      textAlign: "center", // Center-aligned text
    },
  });
  