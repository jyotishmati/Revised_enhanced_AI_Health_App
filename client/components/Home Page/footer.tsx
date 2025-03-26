import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size;

export default function Footer() {
  const navigation = useNavigation();
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {/* Row of Icon Buttons */}
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="home" size={scale(22)} color="#0E3A5F" /> 
            <Text style={styles.text}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <MaterialIcons name="local-hospital" size={scale(22)} color="#0E3A5F" />
            <Text style={styles.text}>Doctors</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Insurance' as never)}>
            <View style={styles.centerButton}>
              <FontAwesome5 name="star" size={scale(24)} color="#0E3A5F" solid />
            </View>
            <Text style={styles.text}></Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <MaterialIcons name="analytics" size={scale(22)} color="#0E3A5F" />
            <Text style={styles.text}>Analytics</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FullProfile' as never)}>
            <FontAwesome5 name="user-circle" size={scale(22)} color="#0E3A5F" solid />
            <Text style={styles.text}>Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Indicator Bar */}
        <View style={styles.indicatorContainer}>
          <View style={styles.indicator} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    backgroundColor: "#fff",
  },
  container: {
    flexDirection: "column",
    backgroundColor: "#fff",
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: scale(-2) },
    shadowOpacity: 0.1,
    shadowRadius: scale(4),
    elevation: scale(5),
    paddingVertical: scale(10),
    paddingHorizontal: scale(15),
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  centerButton: {
    backgroundColor: "#F3F4F6",
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: scale(10),
  },
  text: {
    fontSize: scale(12),
    color: "#6B7280",
    marginTop: scale(4),
  },
  activeText: {
    color: "#0E3A5F",
    fontWeight: "bold",
  },
  indicatorContainer: {
    width: "100%",
    alignItems: "center",
    paddingBottom: scale(5),
    marginTop: scale(2),
  },
  indicator: {
    width: scale(150),
    height: scale(5.5),
    backgroundColor: "#9CA3AF",
    borderRadius: scale(10),
  },
});