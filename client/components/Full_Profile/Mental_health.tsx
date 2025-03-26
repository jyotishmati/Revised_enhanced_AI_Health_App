import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useNavigation } from "@react-navigation/native";
import Gold_bar from "../Home Page/Gold_bar";

const MentalHealthScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <view>
        <Gold_bar />
      </view>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header with Back Navigation */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#002B44" style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mental Health</Text>
        </View>

        {/* Health Cards */}
        <HealthCard title="Stress Level" value={63} icon="brain" />
        <HealthCard title="Sleep Quality" value={72} icon="bed" />
        <HealthCard title="Anxiety" value={42} icon="bolt" />
      </ScrollView>
    </SafeAreaView>
  );
};

// Component for each health stat card
const HealthCard = ({ title, value, icon }: { title: string, value: number, icon: string }) => (
  <View style={styles.card}>
    <View style={styles.cardContent}>
      <FontAwesome5 name={icon} size={20} color="#002B44" style={styles.cardIcon} />
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
    
    {/* Circular Progress with Centered Text */}
    <View style={styles.progressContainer}>
      <AnimatedCircularProgress
        size={50}
        width={5}
        fill={value}
        tintColor="#002B44"
        backgroundColor="#A5D3E8"
      >
        {() => <Text style={styles.progressText}>{value}</Text>}
      </AnimatedCircularProgress>
    </View>
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
    padding: 25,
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#D3ECFB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardIcon: {
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#063247",
  },
  progressContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  progressText: {
    position: "absolute",
    fontSize: 16,
    fontWeight: "bold",
    color: "#063247",
    textAlign: "center",
    width: 50, // Same as progress circle size
    height: 50,
    lineHeight: 50, // Ensures vertical centering
  },
});

export default MentalHealthScreen;