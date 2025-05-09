import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Gold_bar from "../Home Page/Gold_bar";
import Navigation from "../Home Page/Navigation_Bar";
import User from "../Home Page/hello";
import OrganHealth from "./Organ_Health";
import Calendar from "../Home Page/Calendar/calendar";
import SurgicalHistory from "./surgical_history";
import UpcomingAppointments from "./upcoming_appointments";
import Footer from "../Home Page/footer";
import HumanAnatomy from "../Home Page/Human_Anatomy";
import { useResponsive } from "../../hooks/useresponsive";

const FitnessScreen: React.FC = () => {
  const navigation = useNavigation();
  const { scale, vs } = useResponsive();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Gold_bar />
      <Navigation />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContentContainer, { paddingBottom: vs(30) }]}
        showsVerticalScrollIndicator={false}
      >
        <User />
        <OrganHealth />
        <Calendar />
        <HumanAnatomy />
        <SurgicalHistory />
        <UpcomingAppointments />
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

export default FitnessScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    // Add vertical space dynamically using vs() if needed
  },
});
