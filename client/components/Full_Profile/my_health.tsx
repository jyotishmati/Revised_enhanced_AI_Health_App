import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Gold_bar from "../Home Page/Gold_bar";

const HealthStatsScreen = () => {
  const navigation = useNavigation(); 
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <Gold_bar />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header with Back Navigation */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#004080" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Health</Text>
        </View>

        {/* Two-Column Layout for Blood Pressure & Sugar */}
        <View style={styles.row}>
          <StatisticCard title="Blood Pressure" value="120 / 80 mm/Hg" icon="heartbeat" />
          <StatisticCard title="Blood Sugar" value="125 / 72 mg/dL" icon="tint" />
        </View>

        {/* Adjusted spacing for the pill layout */}
        <StatisticPill title="Sleep" value="7.5 hr/day" icon="bed" style={{ marginTop: 20 }} />
        <StatisticPill title="Calories Burn" value="1,598 kcal" icon="fire" style={{ marginTop: 10 }} />
        <StatisticPill title="Oxygen" value="96 SpO2" icon="leaf" style={{}} />
        <StatisticPill title="Cholesterol" value="200 mg/dL" icon="medkit" style={{}} />
        <StatisticPill title="Blood Group" value="AB +ve" icon="tint" style={{}} />
      </ScrollView>
    </SafeAreaView>
  );
};

// **Box-style card for Blood Pressure & Sugar**
const StatisticCard = ({ title, value, icon }: { title: string; value: string; icon: string }) => (
  <View style={styles.statCard}>
    <FontAwesome5 name={icon} size={30} color="#004080" />
    <Text style={styles.statTitle}>{title}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

// **Rounded pill-style cards for other stats**
const StatisticPill = ({ title, value, icon, style }: { title: string; value: string; icon: string; style: any }) => (
  <View style={[styles.pillCard, style]}>
    <FontAwesome5 name={icon} size={22} color="#004080" style={styles.pillIcon} />
    <Text style={styles.pillTitle}>{title}</Text>
    <Text style={styles.pillValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flexGrow: 1,
    padding: 25,
    marginTop:15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    padding: 5, // Makes the touch area larger
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#063247",
    marginLeft: 10, // Adds spacing between the back icon and text
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statCard: {
    backgroundColor: "#D6EBFF",
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 25,
    alignItems: "center",
    width: "48%", // Two-column layout
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginTop: 16,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#063247",
    marginTop: 5,
  },
  statValue: {
    fontSize: 18,
    color: "#063247",
    marginTop: 5,
    fontWeight: "bold",
  },
  pillCard: {
    flexDirection: "row",
    backgroundColor: "#D6EBFF",
    borderRadius: 25,
    padding: 16,
    alignItems: "center",
    marginBottom: 15,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  pillIcon: {
    marginRight: 12,
  },
  pillTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#063247",
    flex: 1,
  },
  pillValue: {
    fontSize: 16,
    color: "#063247",
    fontWeight: "bold",
  },
});

export default HealthStatsScreen;