import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import BackNavigation from "./BackNavigation";
import Footer from "../Home Page/footer";

const { width } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size;

const BookAppointment = ({ route }: any) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const { id } = route.params;
  const a = [
    10.0, 10.3, 11.0, 11.3, 12.0, 12.3, 14.0, 14.3, 15.0, 15.3, 16.0, 16.3,
  ];
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <BackNavigation heading={"Book Appointment"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View>
          <Text style={styles.primaryHeading}>Select Hour</Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              rowGap: scale(15),
            }}
          >
            {a.map((c) => (
              <TouchableOpacity>
                <View
                  style={{
                    backgroundColor: "#EBEDF0",
                    borderRadius: scale(8),
                    paddingVertical: scale(10),
                    paddingHorizontal: scale(20),
                  }}
                >
                  <Text
                    style={{
                      fontSize: scale(14),
                      color: "#7D8A95",
                      fontWeight: "500",
                    }}
                  >
                    {c - 12 < 0
                      ? c.toFixed(2) + " AM"
                      : c == 12 || c == 12.3
                      ? c.toFixed(2) + " PM"
                      : (c - 12).toFixed(2) + " PM"}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#063247",
            borderRadius: scale(9999),
            marginVertical: scale(24),
            paddingHorizontal: scale(32),
            paddingVertical: scale(12),
          }}
          onPress={() =>
            navigation.navigate("AppointmentConfirmation" as any, { id: id })
          }
        >
          <Text
            style={{ color: "#fff", textAlign: "center", fontSize: scale(16) }}
          >
            Confirm
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default BookAppointment;

const styles = StyleSheet.create({
  primaryText: {
    color: "#7D8A95",
    fontSize: scale(12),
  },
  primaryHeading: {
    color: "#063247",
    fontSize: scale(22),
    fontWeight: "500",
    marginTop: scale(20),
    marginBottom: scale(10),
  },
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: scale(20),
  },
  navigation: {
    backgroundColor: "#FAFAFA",
    paddingVertical: scale(19),
    paddingLeft: scale(24),
    flexDirection: "row",
    alignItems: "center",
    columnGap: scale(10),
    marginBottom: scale(20),
  },
  card: {
    flex: 1,
    flexDirection: "row",
    columnGap: scale(20),
    backgroundColor: "#F1F1F1",
    borderRadius: scale(15),
    marginBottom: scale(20),
    padding: scale(10),
    color: "#063247",
    fontFamily: "Poppins",
  },
  icons: {
    borderRadius: scale(72),
    backgroundColor: "#EBEDF0",
    padding: scale(10),
  },
});
