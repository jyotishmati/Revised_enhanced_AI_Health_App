import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { Svg, Circle } from "react-native-svg";
import { useResponsive } from "../../hooks/useresponsive"; // Adjust the path if needed

const InsuranceSummary = () => {
  const { scale, vs, ms } = useResponsive();

  const total = 9882.38;
  const claimed = 4003.38;
  const unclaimed = 3882.03;
  const partially = 1082.08;

  return (
    <View style={[styles.container, { padding: scale(15) }]}>
      {/* Self Insurance Card */}
      <Card style={[styles.insuranceCard, { padding: scale(20), borderRadius: scale(10), marginBottom: vs(15) }]}>
        <Text style={[styles.insuranceTitle, { fontSize: ms(16), marginBottom: vs(10) }]}>Self Insurance</Text>
        <Text style={[styles.infoText, { fontSize: ms(14), marginBottom: vs(3) }]}>
          <Text style={styles.bold}>ID Number:</Text> 311097152
        </Text>
        <Text style={[styles.infoText, { fontSize: ms(14), marginBottom: vs(3) }]}>
          <Text style={styles.bold}>Policy Number:</Text> CA311712841
        </Text>
        <Text style={[styles.infoText, { fontSize: ms(14), marginBottom: vs(3) }]}>
          <Text style={styles.bold}>Residence:</Text> <Text style={styles.bold}>Jayanagar, Bengaluru</Text>
        </Text>
      </Card>

      {/* Insurance Summary Card */}
      <Card style={[styles.summaryCard, { padding: scale(20), borderRadius: scale(10) }]}>
        <View style={styles.header}>
          <Text style={[styles.summaryTitle, { fontSize: ms(16) }]}>Insurance Summary</Text>
          <Text style={[styles.infoIcon, { fontSize: ms(16) }]}>ℹ️</Text>
        </View>
        <Text style={[styles.totalLabel, { fontSize: ms(14), marginTop: vs(10) }]}>Total</Text>
        <Text style={[styles.totalAmount, { fontSize: ms(24) }]}>₹{total.toLocaleString("en-IN")}</Text>

        {/* Circular Progress Chart */}
        <View style={[styles.chartContainer, { marginVertical: vs(15) }]}>
          <Svg width={scale(120)} height={scale(120)} viewBox="0 0 100 100">
            <Circle cx="50" cy="50" r="40" stroke="#E0E0E0" strokeWidth="10" fill="none" />
            <Circle cx="50" cy="50" r="40" stroke="#4CAF50" strokeWidth="10" fill="none" strokeDasharray="15,85" strokeDashoffset="0" strokeLinecap="round" />
            <Circle cx="50" cy="50" r="40" stroke="#FF9800" strokeWidth="10" fill="none" strokeDasharray="35,65" strokeDashoffset="-15" strokeLinecap="round" />
            <Circle cx="50" cy="50" r="40" stroke="#FFC107" strokeWidth="10" fill="none" strokeDasharray="50,50" strokeDashoffset="-50" strokeLinecap="round" />
          </Svg>
        </View>

        {/* Legend */}
        <View style={styles.legendContainer}>
          {[
            { color: "#4CAF50", label: "Partially", value: partially },
            { color: "#FF9800", label: "Claimed", value: claimed },
            { color: "#FFC107", label: "Unclaimed", value: unclaimed },
          ].map((item, index) => (
            <View key={index} style={styles.legendRow}>
              <Text style={[styles.legendDot, { backgroundColor: item.color, width: scale(10), height: scale(10), borderRadius: scale(5), marginRight: scale(10) }]} />
              <Text style={[styles.legendText, { fontSize: ms(14) }]}>{item.label}: ₹{item.value.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.optimizeText, { fontSize: ms(12), marginTop: vs(15) }]}>
          Optimize again to get your best score
        </Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F7FA",
    flex: 1,
  },
  insuranceCard: {
    backgroundColor: "#0D3557",
  },
  insuranceTitle: {
    color: "#fff",
    fontWeight: "bold",
  },
  infoText: {
    color: "#D0D7E2",
  },
  bold: {
    fontWeight: "bold",
    color: "#fff",
  },
  summaryCard: {
    backgroundColor: "#fff",
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryTitle: {
    fontWeight: "bold",
    color: "#333",
  },
  infoIcon: {
    color: "#777",
  },
  totalLabel: {
    color: "#777",
  },
  totalAmount: {
    fontWeight: "bold",
    color: "#000",
  },
  chartContainer: {
    alignItems: "center",
  },
  legendContainer: {
    marginTop: 10,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  legendDot: {},
  legendText: {
    color: "#555",
  },
  optimizeText: {
    textAlign: "center",
    color: "#777",
  },
});

export default InsuranceSummary;
