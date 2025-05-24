import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Svg, Circle, Text as SvgText } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { useResponsive } from "../../hooks/useresponsive";

const HealthCard = () => {
  const healthScore = 63;
  const radius = 40;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;

  const animatedValue = useRef(new Animated.Value(0)).current;
  const [displayedScore, setDisplayedScore] = useState(0);

  const [userData] = useState<any>(null);
  const navigation = useNavigation();
  const { scale, vs, ms } = useResponsive();

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: healthScore,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    const interval = setInterval(() => {
      setDisplayedScore((prev) => {
        if (prev < healthScore) return prev + 1;
        clearInterval(interval);
        return healthScore;
      });
    }, 15);

    return () => clearInterval(interval);
  }, []);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  return (
    <View style={[styles.container, { padding: scale(15) }]}>
      {/* Left Section */}
      <View style={{ flex: 1, marginTop: vs(8), gap: vs(4) }}>
        <View style={styles.greetingContainer}>
          <Text style={[styles.greetingText, { fontSize: ms(24) }]}>
            Hello {userData?.name || "Amaresh"}!
          </Text>
          <Text style={[styles.waveEmoji, { fontSize: ms(18), paddingTop: vs(2) }]}>👋</Text>
        </View>

        <Text style={[styles.subtitle, { fontSize: ms(12) }]}>
          You have 0 appointments today!
        </Text>

        <Text style={[styles.sectionTitle, { fontSize: ms(14), marginTop: vs(10) }]}>
          Health Score
        </Text>
        <Text style={[styles.infoText, { fontSize: ms(10) }]}>
          Blood Type: <Text style={styles.boldText}>{userData?.bloodType || "A+"}</Text>
        </Text>
        <Text style={[styles.infoText, { fontSize: ms(10) }]}>
          Age: <Text style={styles.boldText}>{userData?.age || "24"}</Text>
        </Text>
      </View>

      {/* Right Section */}
      <View style={{ alignItems: "center", marginTop: vs(10) }}>
        <Text style={[styles.healthScoreLabel, { fontSize: ms(10), marginTop: vs(10) }]}>
          Your Health Score
        </Text>
        <Svg width={Math.min(scale(125), 110)} height={Math.min(scale(125), 110)} viewBox="0 0 100 100">
          {/* Background Circle */}
          <Circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress Circle */}
          <AnimatedCircle
            cx="50"
            cy="50"
            r={radius}
            stroke="#0F3D59"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
          />
          {/* Score Number */}
          <SvgText
            x="50"
            y="55"
            textAnchor="middle"
            fontSize="35"
            fontWeight="bold"
            fill="#0F3D59"
          >
            {displayedScore}
          </SvgText>
          <SvgText
            x="50"
            y="70"
            textAnchor="middle"
            fontSize="9"
            fill="#6B7280"
          >
            Out of 100
          </SvgText>
        </Svg>
        <Text style={[styles.noteText, { fontSize: ms(7), marginTop: vs(2) }]}>
          *Calculated from test report
        </Text>
      </View>
    </View>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F3F4F6",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  greetingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  greetingText: {
    fontWeight: "bold",
    color: "#063247",
  },
  waveEmoji: {
    marginLeft: 5,
  },
  subtitle: {
    color: "#7D8A95",
  },
  sectionTitle: {
    fontWeight: "600",
    color: "#063247",
  },
  boldText: {
    fontWeight: "bold",
    color: "#1F2937",
  },
  infoText: {
    color: "#6B7280",
  },
  healthScoreLabel: {
    fontWeight: "bold",
    color: "#063247",
  },
  noteText: {
    color: "#9CA3AF",
  },
});

export default HealthCard;
