import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useResponsive } from "../../hooks/useresponsive"; // Assuming you have this hook

export default function VerificationScreen() {
  const [otp, setOtp] = useState("");
  const navigation = useNavigation();
  const { scale, vs, ms } = useResponsive();

  return (
    <SafeAreaView style={[styles.container, { paddingVertical: vs(12) }]}>
      {/* Gold Button */}
      <LinearGradient
        colors={["#B8860B", "#C9A409", "#E6C200", "#FFD700"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.goldButton, { borderRadius: scale(20), width: scale(95), height: vs(45),  marginLeft: scale(0),marginTop: vs(35) }]}
      >
        <TouchableOpacity activeOpacity={0.8} style={styles.goldButtonInner}>
          <Text style={[styles.goldText, { fontSize: ms(14) }]}>GOLD</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Icons */}
      <View style={[styles.iconContainer, { gap: scale(16), marginRight: scale(0), marginTop: vs(35)  }]}>
        <IconWrapper
          onPress={() => navigation.navigate("Chatbot" as never)}
          icon={<Ionicons name="chatbox-ellipses" size={ms(22)} color="#0E2A3A" />}
        />
        <IconWrapper
          onPress={() => navigation.navigate("Hash" as never)}
          icon={<Fontisto name="hashtag" size={ms(18)} color="#0E2A3A" />}
        />
        <IconWrapper
          onPress={() => navigation.navigate("Notification" as never)}
          icon={<Ionicons name="notifications" size={ms(22)} color="#0E2A3A" />}
        />
      </View>
    </SafeAreaView>
  );
}

const IconWrapper = ({ onPress, icon }: { onPress: () => void; icon: React.ReactNode }) => {
  const { scale, vs } = useResponsive();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.iconWrapper,
        { width: scale(42), height: scale(42), borderRadius: scale(21) },
      ]}
    >
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0E2A3A",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  goldButton: {
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  goldButtonInner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  goldText: {
    fontWeight: "bold",
    color: "#0E2A3A",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
