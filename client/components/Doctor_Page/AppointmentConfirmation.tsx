import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { Feather, MaterialIcons } from "@expo/vector-icons";
  import {
    NavigationProp,
    ParamListBase,
    useNavigation,
  } from "@react-navigation/native";
  import BackNavigation from "./BackNavigation";
  import { DoctorType } from "./Doctors";
  import axios from "axios";
import { getDoctors } from "@/api/doctorAPI";
  
  const { width, height } = Dimensions.get("window");
  const scale = (size: number) => (width / 375) * size;
  
  const AppointmentConfirmation = ({ route }: any) => {
    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const { id } = route.params;
    console.log(id);
  
    const [item, setItem] = useState<DoctorType>();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await getDoctors(id)
          console.log(data);
          if (data.status != "success") {
            console.error("error fetching doctor data");
          } else {
            setItem(data.message.doctor);
          }
        } catch (e) {
          console.error(e);
        }
      };
      fetchData();
    }, []);
  
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <BackNavigation heading={"Appointment Confirmation"} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: scale(80),
              marginBottom: scale(20),
            }}
          >
            <View style={styles.icons}>
              <View style={styles.iconinside}>
                <Feather name="check" size={scale(24)} color="#000" />
              </View>
            </View>
            <Text style={styles.primaryHeading}>Appointment Confirm!</Text>
            <Text style={styles.primaryText}>
              {`Your appointment with Dr. ${item?.firstName} ${item?.lastName} is confirmed for June 25, 2025, at 10:00 AM.`}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#063247",
                borderRadius: scale(9999),
                marginVertical: scale(24),
                paddingHorizontal: scale(32),
                paddingVertical: scale(12),
                width: scale(300),
              }}
              onPress={() => navigation.navigate("Docters" as never)}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontSize: scale(16),
                }}
              >
                Done
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("BookAppointment" as any, { id: id })
              }
            >
              <Text style={styles.primaryText}>Edit your appointment</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  };
  
  export default AppointmentConfirmation;
  
  const styles = StyleSheet.create({
    primaryText: {
      color: "#7D8A95",
      fontSize: scale(12),
      textAlign: "center",
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
    icons: {
      borderRadius: scale(72),
      backgroundColor: "#A4CFC3",
      padding: scale(30),
    },
    iconinside: {
      borderRadius: scale(72),
      backgroundColor: "#fff",
      padding: scale(5),
    },
  });