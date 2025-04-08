import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity, // Keep if needed elsewhere, otherwise remove
  ScrollView,       // Import ScrollView
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Keep if needed elsewhere
import { useNavigation } from "@react-navigation/native"; // Keep if needed
import Gold_bar from "../Home Page/Gold_bar";
import Navigation from "../Home Page/Navigation_Bar";
import User from '../Home Page/hello';
import OrganHealth from "./Organ_Health";
import Calendar from '../Home Page/Calendar/calendar';
import SurgicalHistory from "./surgical_history"; // <-- Import the new component
import UpcomingAppointments from "./upcoming_appointments";
import Footer from "../Home Page/footer";

const FitnessScreen: React.FC = () => {
    const navigation = useNavigation(); // Keep if needed

    // Assuming Gold_bar and Navigation are fixed headers outside the scroll view
    // Assuming User, OrganHealth, Calendar, and SurgicalHistory should scroll

    return (
      <SafeAreaView style={styles.safeArea}>
        {/* Fixed Header Components */}
        <Gold_bar />
        <Navigation />
        {/* If there was a Search Bar, it would likely go here */}

        {/* Scrollable Content Area */}
        <ScrollView
            style={styles.scrollView} // Style for the ScrollView container
            contentContainerStyle={styles.scrollContentContainer} // Style for the content inside
            showsVerticalScrollIndicator={false} // Optional: hide scroll bar
        >
            {/* Components inside the scroll view */}
            <User />
            <OrganHealth />
            <Calendar />
            <SurgicalHistory /> {/* <-- Add the Surgical History component here */}
            <UpcomingAppointments />

        </ScrollView>
        <Footer/>
        </SafeAreaView>
    )
}
export default FitnessScreen;

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#FFFFFF', // Set a background color for the whole screen if needed
    },
    scrollView: {
      flex: 1, // Make ScrollView take up remaining space below fixed headers
    },
    scrollContentContainer: {
      paddingBottom: 30, // Add padding at the bottom of scrolled content
      // paddingHorizontal: 0 // If SurgicalHistory adds its own padding, keep this 0
                           // Otherwise, add horizontal padding here: e.g., paddingHorizontal: 20
    }
    // Add any other styles needed for FitnessScreen itself
})