import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { Svg, Circle } from "react-native-svg";

const InsuranceSummary = () => {
  const total = 9882.38;
  const claimed = 4003.38;
  const unclaimed = 3882.03;
  const partially = 1082.08;

  return (
    <View style={styles.container}>
      {/* Self Insurance Card */}
      <Card style={styles.insuranceCard}>
        <Text style={styles.insuranceTitle}>Self Insurance</Text>
        <Text style={styles.infoText}>
          <Text style={styles.bold}>ID Number:</Text> 311097152
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.bold}>Policy Number:</Text> CA311712841
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.bold}>Residence:</Text>{" "}
          <Text style={styles.bold}>Jayanagar, Bengaluru</Text>
        </Text>
      </Card>

      {/* Insurance Summary Card */}
      <Card style={styles.summaryCard}>
        <View style={styles.header}>
          <Text style={styles.summaryTitle}>Insurance Summary</Text>
          <Text style={styles.infoIcon}>ℹ️</Text>
        </View>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalAmount}>₹{total.toLocaleString("en-IN")}</Text>

        {/* Circular Progress Chart */}
        <View style={styles.chartContainer}>
          <Svg width={120} height={120} viewBox="0 0 100 100">
            {/* Background Circle */}
            <Circle cx="50" cy="50" r="40" stroke="#E0E0E0" strokeWidth="10" fill="none" />
            {/* Partially Claimed */}
            <Circle
              cx="50"
              cy="50"
              r="40"
              stroke="#4CAF50"
              strokeWidth="10"
              fill="none"
              strokeDasharray="15,85"
              strokeDashoffset="0"
              strokeLinecap="round"
            />
            {/* Claimed */}
            <Circle
              cx="50"
              cy="50"
              r="40"
              stroke="#FF9800"
              strokeWidth="10"
              fill="none"
              strokeDasharray="35,65"
              strokeDashoffset="-15"
              strokeLinecap="round"
            />
            {/* Unclaimed */}
            <Circle
              cx="50"
              cy="50"
              r="40"
              stroke="#FFC107"
              strokeWidth="10"
              fill="none"
              strokeDasharray="50,50"
              strokeDashoffset="-50"
              strokeLinecap="round"
            />
          </Svg>
        </View>

        {/* Legend */}
        <View style={styles.legendContainer}>
          <View style={styles.legendRow}>
            <Text style={[styles.legendDot, { backgroundColor: "#4CAF50" }]}></Text>
            <Text style={styles.legendText}>Partially: ₹{partially.toFixed(2)}</Text>
          </View>
          <View style={styles.legendRow}>
            <Text style={[styles.legendDot, { backgroundColor: "#FF9800" }]}></Text>
            <Text style={styles.legendText}>Claimed: ₹{claimed.toFixed(2)}</Text>
          </View>
          <View style={styles.legendRow}>
            <Text style={[styles.legendDot, { backgroundColor: "#FFC107" }]}></Text>
            <Text style={styles.legendText}>Unclaimed: ₹{unclaimed.toFixed(2)}</Text>
          </View>
        </View>

        <Text style={styles.optimizeText}>Optimize again to get your best score</Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#F5F7FA",
    flex: 1,
  },
  insuranceCard: {
    backgroundColor: "#0D3557",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  insuranceTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoText: {
    color: "#D0D7E2",
    fontSize: 14,
    marginBottom: 3,
  },
  bold: {
    fontWeight: "bold",
    color: "#fff",
  },
  summaryCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  infoIcon: {
    fontSize: 16,
    color: "#777",
  },
  totalLabel: {
    fontSize: 14,
    color: "#777",
    marginTop: 10,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  chartContainer: {
    alignItems: "center",
    marginVertical: 15,
  },
  legendContainer: {
    marginTop: 10,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  legendText: {
    fontSize: 14,
    color: "#555",
  },
  optimizeText: {
    textAlign: "center",
    fontSize: 12,
    color: "#777",
    marginTop: 15,
  },
});

export default InsuranceSummary;