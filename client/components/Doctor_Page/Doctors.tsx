// import {
//   Dimensions,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import { Ionicons } from "@expo/vector-icons";
// import axios from "axios";
// import {
//   NavigationProp,
//   ParamListBase,
//   useNavigation,
// } from "@react-navigation/native";
// import { getAllDoctor } from "@/api/doctorAPI";
// import HealthCard from "../Home Page/hello";
// import NavigationBar from "../Home Page/Navigation_Bar";
// import GoldBar from "../Home Page/Gold_bar";
// import Calendar from "../Home Page/Calendar/calendar";
// import Footer from "../Home Page/footer";

// export type DoctorType = {
//   id: string;
//   firstName: string;
//   lastName: string;
//   image: string;
//   specialist: string;
//   location: string;
//   experience: number;
//   about: string;
//   workingTime: [string];
//   education: string;
// };

// const { width } = Dimensions.get("window");
// const scale = (size: number) => (width / 375) * size;

// const Doctors = () => {
//   const navigation: NavigationProp<ParamListBase> = useNavigation();
//   const [items, setItem] = useState<DoctorType[]>();
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getAllDoctor();
//         console.log(data);
//         if (data.status != "success") {
//           console.error("error fetching doctor data");
//         } else {
//           setItem(data.message.doctors);
//         }
//       } catch (e) {
//         console.error(e);
//       }
//     };
//     fetchData();
//   }, []);
//   console.log(items);

//   return (
//     <View style={styles.container}>
//       <ScrollView
//         style={styles.scrollView}
//         showsVerticalScrollIndicator={false}
//       >
//         <View style={styles.fixedHeader}>
//           <GoldBar />
//           <NavigationBar />
//         </View>

//         {/* Scrollable Content */}
//         <ScrollView
//           style={styles.scrollView}
//           contentContainerStyle={{ paddingBottom: 20 }}
//           showsVerticalScrollIndicator={false}
//         >
//           <HealthCard />
//         </ScrollView>
//         <Calendar />
//         <View style={{ paddingHorizontal: scale(30) }}>
//           {items?.map((item) => (
//             <TouchableOpacity
//               onPress={() =>
//                 navigation.navigate("DocterDetails" as any, { id: item.id })
//               }
//               key={item.id}
//             >
//               <View style={styles.card}>
//                 <Image
//                   source={{ uri: item.image }}
//                   style={{
//                     width: scale(90),
//                     height: scale(100),
//                     borderRadius: scale(12),
//                   }}
//                 />
//                 <View>
//                   <Text
//                     style={{
//                       color: "#063247",
//                       fontWeight: "bold",
//                       fontSize: scale(16),
//                     }}
//                   >
//                     Dr. {item.firstName} {item.lastName}
//                   </Text>
//                   <Text
//                     style={{
//                       color: "#7D8A95",
//                       fontWeight: "500",
//                       fontSize: scale(10),
//                       marginBottom: scale(15),
//                     }}
//                   >
//                     {item.specialist}
//                   </Text>
//                   <View style={{ flexDirection: "row", alignItems: "center" }}>
//                     <Ionicons
//                       name={"location-outline"}
//                       size={scale(12)}
//                       color="#4B5563"
//                       style={{ marginRight: scale(6) }}
//                     />
//                     <Text
//                       style={{
//                         fontSize: scale(14),
//                         color: "#7D8A95",
//                       }}
//                     >
//                       {item.location}
//                     </Text>
//                   </View>
//                   <View style={{ flexDirection: "row", alignItems: "center" }}>
//                     <Ionicons
//                       name={"star"}
//                       size={scale(12)}
//                       color="#4B5563"
//                       style={{ marginRight: scale(6) }}
//                     />
//                     <Text
//                       style={{
//                         fontSize: scale(14),
//                         color: "#7D8A95",
//                       }}
//                     >
//                       {item.experience}+ Experience
//                     </Text>
//                   </View>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </ScrollView>
//       <Footer />
//     </View>
//   );
// };

// export default Doctors;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   // scrollView: {
//   //   flexGrow: 1,
//   //   paddingHorizontal: scale(20),
//   // },
//   fixedHeader: {
//     // position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     zIndex: 10, // Ensures it's above the scrollable content
//     backgroundColor: "#fff", // Set the background to match the design
//   },
//   scrollView: {
//     flex: 1,
//     // marginTop: 155, // Adjust margin to prevent content from going under fixed headers
//   },

//   card: {
//     flex: 1,
//     flexDirection: "row",
//     columnGap: scale(20),
//     backgroundColor: "#F1F1F1",
//     borderRadius: scale(15),
//     marginBottom: scale(20),
//     padding: scale(10),
//     color: "#063247",
//     fontFamily: "Poppins",
//   },
// });

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
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { getAllDoctor } from "@/api/doctorAPI";
import HealthCard from "../Home Page/hello";
import NavigationBar from "../Home Page/Navigation_Bar";
import GoldBar from "../Home Page/Gold_bar";
import Calendar from "../Home Page/Calendar/calendar";
import Footer from "../Home Page/footer";
import { useResponsive } from "../../hooks/useresponsive";

export type DoctorType = {
  id: string;
  firstName: string;
  lastName: string;
  image: string;
  specialist: string;
  location: string;
  experience: number;
  about: string;
  workingTime: [string];
  education: string;
};

const Doctors = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const [items, setItem] = useState<DoctorType[]>();
  const { scale, ms, vs } = useResponsive();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllDoctor();
        if (data.status !== "success") {
          console.error("Error fetching doctor data");
        } else {
          setItem(data.message.doctors);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.fixedHeader}>
          <GoldBar />
          <NavigationBar />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ paddingBottom: vs(20) }}
          showsVerticalScrollIndicator={false}
        >
          <HealthCard />
        </ScrollView>

        <Calendar />

        <View style={{ paddingHorizontal: scale(30) }}>
          {items?.map((item) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("DocterDetails" as any, { id: item.id })
              }
              key={item.id}
            >
            <View style={[styles.card, {columnGap: scale(20), borderRadius: scale(15),
             marginBottom: vs(20),padding: scale(10),}]}>
                <Image
                  source={{ uri: item.image }}
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
                      fontSize: ms(16),
                    }}
                  >
                    Dr. {item.firstName} {item.lastName}
                  </Text>
                  <Text
                    style={{
                      color: "#7D8A95",
                      fontWeight: "500",
                      fontSize: ms(10),
                      marginBottom: vs(15),
                    }}
                  >
                    {item.specialist}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons
                      name="location-outline"
                      size={ms(12)}
                      color="#4B5563"
                      style={{ marginRight: scale(6) }}
                    />
                    <Text
                      style={{
                        fontSize: ms(14),
                        color: "#7D8A95",
                      }}
                    >
                      {item.location}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons
                      name="star"
                      size={ms(12)}
                      color="#4B5563"
                      style={{ marginRight: scale(6) }}
                    />
                    <Text
                      style={{
                        fontSize: ms(14),
                        color: "#7D8A95",
                      }}
                    >
                      {item.experience}+ Experience
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default Doctors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  fixedHeader: {
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F1F1F1",
    color: "#063247",
    fontFamily: "Poppins",
  },
});
