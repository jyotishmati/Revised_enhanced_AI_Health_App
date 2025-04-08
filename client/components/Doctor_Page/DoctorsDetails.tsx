import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { Feather, Ionicons, Fontisto, MaterialIcons } from "@expo/vector-icons";
  
  import axios from "axios";
  import { DoctorType } from "./Doctors";
  import {
    NavigationProp,
    ParamListBase,
    useNavigation,
  } from "@react-navigation/native";
  import BackNavigation from "./BackNavigation";
import { getDoctors } from "@/api/doctorAPI";
  
  const { width } = Dimensions.get("window");
  const scale = (size: number) => (width / 375) * size;
  
  const DoctorsDetails = ({ route }: any) => {
    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const { id } = route.params;
    console.log(id);
  
    const [item, setItem] = useState<DoctorType>();
    // const url = `http://localhost:5000/doctors/${id}`;
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data  = await getDoctors(id)
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
        <BackNavigation heading={"Docter Details"} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          <View style={styles.card}>
            <Image
              source={{ uri: item?.image }}
              style={{
                width: scale(90),
                height: scale(100),
                borderRadius: scale(12),
              }}
            />
            <View>
              <Text
                style={{
                  color: "#063247",
                  fontWeight: "bold",
                  fontSize: scale(16),
                  marginBottom: scale(5),
                }}
              >
                Dr. {item?.firstName} {item?.lastName}
              </Text>
              <Text
                style={{
                  color: "#7D8A95",
                  fontWeight: "500",
                  fontSize: scale(12),
                  marginBottom: scale(30),
                }}
              >
                {item?.specialist}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name={"location-outline"}
                  size={scale(12)}
                  color="#4B5563"
                  style={{ marginRight: scale(6) }}
                />
                <Text
                  style={{
                    fontSize: scale(14),
                    color: "#7D8A95",
                  }}
                >
                  {item?.location}
                </Text>
              </View>
              {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name={"star"}
                  size={scale(12)}
                  color="#4B5563"
                  style={{ marginRight: scale(6) }}
                />
                <Text
                  style={{
                    fontSize: scale(14),
                    color: "#7D8A95",
                  }}
                >
                  {item?.experience}+ Experience
                </Text>
              </View> */}
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <View style={styles.icons}>
                <Feather name="users" color={"#063247"} size={scale(24)} />
              </View>
              <Text
                style={{
                  fontSize: scale(14),
                  fontWeight: "500",
                  color: "#7A7F88",
                }}
              >
                2000+
              </Text>
              <Text
                style={{
                  fontSize: scale(10),
                  color: "#7A7F88",
                }}
              >
                Patients
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <View style={styles.icons}>
                <Ionicons
                  name="medal-outline"
                  color={"#063247"}
                  size={scale(24)}
                />
              </View>
              <Text
                style={{
                  fontSize: scale(14),
                  fontWeight: "500",
                  color: "#7A7F88",
                }}
              >
                {item?.experience}+
              </Text>
              <Text
                style={{
                  fontSize: scale(10),
                  color: "#7A7F88",
                }}
              >
                Experience
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <View style={styles.icons}>
                <Fontisto
                  name="injection-syringe"
                  color={"#063247"}
                  size={scale(24)}
                />
              </View>
              <Text
                style={{
                  fontSize: scale(14),
                  fontWeight: "500",
                  color: "#7A7F88",
                }}
              >
                200+
              </Text>
              <Text
                style={{
                  fontSize: scale(10),
                  color: "#7A7F88",
                }}
              >
                Operations
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.primaryHeading}>About Me</Text>
            <Text style={styles.primaryText}>{item?.about}</Text>
            <Text style={styles.primaryHeading}>Working Time</Text>
            <Text style={styles.primaryText}>
              Monday to Friday, 10am - 2pm
            </Text>
            <Text style={styles.primaryHeading}>Education</Text>
            <Text style={styles.primaryText}>{item?.education}</Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#063247",
              borderRadius: scale(9999),
              marginVertical: scale(24),
              paddingHorizontal: scale(32),
              paddingVertical: scale(12),
            }}
            onPress={() => navigation.navigate("BookAppointment" as any,{id:item?.id})}
          >
            <Text
              style={{ color: "#fff", textAlign: "center", fontSize: scale(16) }}
            >
              Book Appointment
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };
  
  export default DoctorsDetails;
  
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