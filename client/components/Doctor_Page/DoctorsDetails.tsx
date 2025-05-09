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
// import { Feather, Ionicons, Fontisto, MaterialIcons } from "@expo/vector-icons";
// import GoldBar from "../Home Page/Gold_bar";

// import axios from "axios";
// import { DoctorType } from "./Doctors";
// import {
//   NavigationProp,
//   ParamListBase,
//   useNavigation,
// } from "@react-navigation/native";
// import BackNavigation from "./BackNavigation";
// import { getDoctors } from "@/api/doctorAPI";
// import Footer from "../Home Page/footer";

// const { width } = Dimensions.get("window");
// const scale = (size: number) => (width / 375) * size;

// const DoctorsDetails = ({ route }: any) => {
//   const navigation: NavigationProp<ParamListBase> = useNavigation();
//   const { id } = route.params;
//   console.log(id);

//   const [item, setItem] = useState<DoctorType>();
//   // const url = `http://localhost:5000/doctors/${id}`;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getDoctors(id);
//         console.log(data);
//         if (data.status != "success") {
//           console.error("error fetching doctor data");
//         } else {
//           setItem(data.message.doctor);
//         }
//       } catch (e) {
//         console.error(e);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <View style={{ flex: 1, backgroundColor: "#fff" }}>
//       <View style={styles.fixedHeader}>
//         <GoldBar />
//       </View>
//       <BackNavigation heading={"Docter Details"} />
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         style={styles.scrollView}
//       >
//         <View style={styles.card}>
//           <Image
//             source={{ uri: item?.image }}
//             style={{
//               width: scale(90),
//               height: scale(100),
//               borderRadius: scale(12),
//             }}
//           />
//           <View>
//             <Text
//               style={{
//                 color: "#063247",
//                 fontWeight: "bold",
//                 fontSize: scale(16),
//                 marginBottom: scale(5),
//               }}
//             >
//               Dr. {item?.firstName} {item?.lastName}
//             </Text>
//             <Text
//               style={{
//                 color: "#7D8A95",
//                 fontWeight: "500",
//                 fontSize: scale(12),
//                 marginBottom: scale(30),
//               }}
//             >
//               {item?.specialist}
//             </Text>
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <Ionicons
//                 name={"location-outline"}
//                 size={scale(12)}
//                 color="#4B5563"
//                 style={{ marginRight: scale(6) }}
//               />
//               <Text
//                 style={{
//                   fontSize: scale(14),
//                   color: "#7D8A95",
//                 }}
//               >
//                 {item?.location}
//               </Text>
//             </View>
//             {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
//                 <Ionicons
//                   name={"star"}
//                   size={scale(12)}
//                   color="#4B5563"
//                   style={{ marginRight: scale(6) }}
//                 />
//                 <Text
//                   style={{
//                     fontSize: scale(14),
//                     color: "#7D8A95",
//                   }}
//                 >
//                   {item?.experience}+ Experience
//                 </Text>
//               </View> */}
//           </View>
//         </View>
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-around",
//           }}
//         >
//           <View
//             style={{
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <View style={styles.icons}>
//               <Feather name="users" color={"#063247"} size={scale(24)} />
//             </View>
//             <Text
//               style={{
//                 fontSize: scale(14),
//                 fontWeight: "500",
//                 color: "#7A7F88",
//               }}
//             >
//               2000+
//             </Text>
//             <Text
//               style={{
//                 fontSize: scale(10),
//                 color: "#7A7F88",
//               }}
//             >
//               Patients
//             </Text>
//           </View>
//           <View
//             style={{
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <View style={styles.icons}>
//               <Ionicons
//                 name="medal-outline"
//                 color={"#063247"}
//                 size={scale(24)}
//               />
//             </View>
//             <Text
//               style={{
//                 fontSize: scale(14),
//                 fontWeight: "500",
//                 color: "#7A7F88",
//               }}
//             >
//               {item?.experience}+
//             </Text>
//             <Text
//               style={{
//                 fontSize: scale(10),
//                 color: "#7A7F88",
//               }}
//             >
//               Experience
//             </Text>
//           </View>
//           <View
//             style={{
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <View style={styles.icons}>
//               <Fontisto
//                 name="injection-syringe"
//                 color={"#063247"}
//                 size={scale(24)}
//               />
//             </View>
//             <Text
//               style={{
//                 fontSize: scale(14),
//                 fontWeight: "500",
//                 color: "#7A7F88",
//               }}
//             >
//               200+
//             </Text>
//             <Text
//               style={{
//                 fontSize: scale(10),
//                 color: "#7A7F88",
//               }}
//             >
//               Operations
//             </Text>
//           </View>
//         </View>
//         <View>
//           <Text style={styles.primaryHeading}>About Me</Text>
//           <Text style={styles.primaryText}>{item?.about}</Text>
//           <Text style={styles.primaryHeading}>Working Time</Text>
//           <Text style={styles.primaryText}>Monday to Friday, 10am - 2pm</Text>
//           <Text style={styles.primaryHeading}>Education</Text>
//           <Text style={styles.primaryText}>{item?.education}</Text>
//         </View>
//         <TouchableOpacity
//           style={{
//             backgroundColor: "#063247",
//             borderRadius: scale(9999),
//             marginVertical: scale(24),
//             paddingHorizontal: scale(32),
//             paddingVertical: scale(12),
//           }}
//           onPress={() =>
//             navigation.navigate("BookAppointment" as any, { id: item?.id })
//           }
//         >
//           <Text
//             style={{ color: "#fff", textAlign: "center", fontSize: scale(16) }}
//           >
//             Book Appointment
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>
//       <Footer />
//     </View>
//   );
// };

// export default DoctorsDetails;

// const styles = StyleSheet.create({
//   primaryText: {
//     color: "#7D8A95",
//     fontSize: scale(12),
//   },
//   fixedHeader: {
//     // position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     zIndex: 10, // Ensures it's above the scrollable content
//     backgroundColor: "#fff", // Set the background to match the design
//   },
//   primaryHeading: {
//     color: "#063247",
//     fontSize: scale(22),
//     fontWeight: "500",
//     marginTop: scale(20),
//     marginBottom: scale(10),
//   },
//   scrollView: {
//     flexGrow: 1,
//     paddingHorizontal: scale(20),
//   },
//   navigation: {
//     backgroundColor: "#FAFAFA",
//     paddingVertical: scale(19),
//     paddingLeft: scale(24),
//     flexDirection: "row",
//     alignItems: "center",
//     columnGap: scale(10),
//     marginBottom: scale(20),
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
//   icons: {
//     borderRadius: scale(72),
//     backgroundColor: "#EBEDF0",
//     padding: scale(10),
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
import { Feather, Ionicons, Fontisto } from "@expo/vector-icons";
import GoldBar from "../Home Page/Gold_bar";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import BackNavigation from "./BackNavigation";
import { getDoctors } from "@/api/doctorAPI";
import Footer from "../Home Page/footer";
import { DoctorType } from "./Doctors";
import { useResponsive } from "../../hooks/useresponsive";

const DoctorsDetails = ({ route }: any) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const { id } = route.params;
  const { scale, vs, ms } = useResponsive();

  const [item, setItem] = useState<DoctorType>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDoctors(id);
        if (data.status !== "success") {
          console.error("Error fetching doctor data");
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
      <View style={styles.fixedHeader}>
        <GoldBar />
      </View>
      <BackNavigation heading={"Doctor Details"} />
      <ScrollView showsVerticalScrollIndicator={false} style={[styles.scrollView, {paddingHorizontal: scale(20),}]}>
        <View style={[styles.card, {columnGap: scale(20), borderRadius: scale(15), marginBottom: scale(20), padding: scale(10),}]}>
          <Image
            source={{ uri: item?.image }}
            style={{ width: scale(90), height: scale(100), borderRadius: scale(12) }}
          />
          <View>
            <Text style={[styles.primaryTitle, { fontSize: ms(16), marginBottom: scale(5), }]}>Dr. {item?.firstName} {item?.lastName}</Text>
            <Text style={[styles.primarySubtitle, { fontSize: ms(12), marginBottom: scale(30), }]}>{item?.specialist}</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={ms(12)} color="#4B5563" style={{ marginRight: scale(6) }} />
              <Text style={[styles.primaryLocation, { fontSize: ms(14) }]}>{item?.location}</Text>
            </View>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          {[
            { icon: <Feather name="users" size={ms(24)} color="#063247" />, value: "2000+", label: "Patients" },
            { icon: <Ionicons name="medal-outline" size={ms(24)} color="#063247" />, value: `${item?.experience}+`, label: "Experience" },
            { icon: <Fontisto name="injection-syringe" size={ms(24)} color="#063247" />, value: "200+", label: "Operations" },
          ].map((stat, idx) => (
            <View key={idx} style={styles.statBlock}>
              <View style={[styles.icons, {borderRadius: scale(72), padding: scale(10),}]}>{stat.icon}</View>
              <Text style={[styles.statValue, { fontSize: ms(14) }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { fontSize: ms(10) }]}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Details Section */}
        <View>
          <Text style={[styles.primaryHeading, {fontSize: scale(22), marginTop: scale(20), marginBottom: scale(10),}]}>About Me</Text>
          <Text style={[styles.primaryText, {fontSize: scale(12), marginBottom: scale(10),}]}>{item?.about}</Text>
          <Text style={[styles.primaryHeading, {fontSize: scale(22), marginTop: scale(20), marginBottom: scale(10),}]}>Working Time</Text>
          <Text style={[styles.primaryText, {fontSize: scale(12), marginBottom: scale(10),}]}>Monday to Friday, 10am - 2pm</Text>
          <Text style={[styles.primaryHeading, {fontSize: scale(22), marginTop: scale(20), marginBottom: scale(10),}]}>Education</Text>
          <Text style={[styles.primaryText, {fontSize: scale(12), marginBottom: scale(10),}]}>{item?.education}</Text>
        </View>

        {/* Book Appointment Button */}
        <TouchableOpacity
          style={[styles.appointmentButton, {borderRadius: scale(9999), marginVertical: scale(24), paddingHorizontal: scale(32), paddingVertical: scale(12),}]}
          onPress={() => navigation.navigate("BookAppointment" as any, { id: item?.id })}
        >
          <Text style={[styles.appointmentButtonText, {fontSize: scale(16),}]}>Book Appointment</Text>
        </TouchableOpacity>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default DoctorsDetails;

const styles = StyleSheet.create({
  fixedHeader: {
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "#fff",
  },
  scrollView: {
    flexGrow: 1,
    
  },
  primaryTitle: {
    color: "#063247",
    fontWeight: "bold",
    
  },
  primarySubtitle: {
    color: "#7D8A95",
    fontWeight: "500",
    
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  primaryLocation: {
    color: "#7D8A95",
  },
  card: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F1F1F1",
    
  },
  icons: {
    
    backgroundColor: "#EBEDF0",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statBlock: {
    flexDirection: "column",
    alignItems: "center",
  },
  statValue: {
    fontWeight: "500",
    color: "#7A7F88",
  },
  statLabel: {
    color: "#7A7F88",
  },
  primaryHeading: {
    color: "#063247",
    fontWeight: "500",
    
  },
  primaryText: {
    color: "#7D8A95",
    
  },
  appointmentButton: {
    backgroundColor: "#063247",
    
    alignSelf: "center",
  },
  appointmentButtonText: {
    color: "#fff",
    textAlign: "center",
    
    fontWeight: "bold",
  },
});
