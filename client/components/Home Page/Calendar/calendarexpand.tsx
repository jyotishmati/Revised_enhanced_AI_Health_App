// import React, { useState } from "react";
// import { useRef, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   Dimensions,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons";
// import RNPickerSelect from "react-native-picker-select";
// import { RootStackParamList } from "./types"; // adjust the path as needed
// import { StackNavigationProp } from "@react-navigation/stack";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// type CalendarScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   "CalendarScreen"
// >;

// const { width } = Dimensions.get("window");
// const scale = (size: number) => (width / 375) * size; // Base width is 375

// const getDaysInMonth = (month: number, year: number) => {
//   return new Date(year, month + 1, 0).getDate();
// };
// interface IDocument {
//   id: string;
//   name: string;
//   date: string;  // Add this
//   uri: string;
//   // Add any other properties you need
// }

// const CalendarScreen = () => {
//   const navigation = useNavigation<CalendarScreenNavigationProp>();
//   const currentYear = new Date().getFullYear();
//   const today = new Date();
//   const todayDate = today.getDate();
//   const todayMonth = today.getMonth();
//   const [documentsData, setDocumentsData] = useState<IDocument[]>([]);
//   const [selectedYear, setSelectedYear] = useState(currentYear);
//   const scrollViewRef = useRef<ScrollView>(null);

//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   const yearOptions = Array.from({ length: 21 }, (_, i) => ({
//     label: `${currentYear - 10 + i}`,
//     value: currentYear - 10 + i,
//   }));
//   useEffect(() => {
//     if (scrollViewRef.current) {
//       setTimeout(() => {
//         scrollViewRef.current?.scrollTo({
//           y: todayMonth * 300,
//           animated: true,
//         });
//       }, 200);
//     }
//   }, []);

//   useEffect(() => {
//     const fetchDocuments = async () => {
//       const storedData = await AsyncStorage.getItem("documents");
//       if (storedData) {
//         setDocumentsData(JSON.parse(storedData));
//       }
//     };
//     fetchDocuments();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {/* Header with Back Button */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={styles.backButton}
//         >
//           <Ionicons
//             name="chevron-back-outline"
//             size={scale(24)}
//             color="#0f172a"
//           />
//         </TouchableOpacity>
//         <Text style={styles.headerText}>Calendar</Text>
//       </View>

//       {/* Year Picker */}
//       <View style={styles.pickerContainer}>
//         <Text style={styles.pickerLabel}>Select Year:</Text>
//         <RNPickerSelect
//           onValueChange={(year: number) => setSelectedYear(year)}
//           items={yearOptions}
//           value={selectedYear}
//           style={{
//             inputIOS: styles.picker,
//             inputAndroid: styles.picker,
//           }}
//         />
//       </View>

//       {/* Scrollable Calendar */}
//       <ScrollView
//         ref={scrollViewRef}
//         contentContainerStyle={styles.scrollContainer}
//       >
//         {months.map((month, monthIndex) => {
//           const daysInMonth = getDaysInMonth(monthIndex, selectedYear);
//           const firstDay = new Date(selectedYear, monthIndex, 1).getDay();

//           return (
//             <View key={monthIndex} style={styles.monthContainer}>
//               <Text style={styles.monthTitle}>
//                 {month} {selectedYear}
//               </Text>

//               {/* Week Days */}
//               <View style={styles.weekRow}>
//                 {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
//                   (day) => (
//                     <Text key={day} style={styles.weekDay}>
//                       {day}
//                     </Text>
//                   )
//                 )}
//               </View>

//               <View style={styles.daysContainer}>
//                 {Array.from({ length: firstDay }).map((_, i) => (
//                   <View key={`empty-${i}`} style={styles.emptyDay} />
//                 ))}

//                 {Array.from({ length: daysInMonth }, (_, index) => {
//                   const dayNumber = index + 1;
//                   const isToday =
//                     selectedYear === currentYear &&
//                     monthIndex === todayMonth &&
//                     dayNumber === todayDate;
//                   const dateString = `${selectedYear}-${String(
//                     monthIndex + 1
//                   ).padStart(2, "0")}-${String(dayNumber).padStart(2, "0")}`;
//                   const hasDocuments = documentsData.some(doc => doc.date === dateString);

//                   return (
//                     <View key={index} style={styles.dayWrapper}>
//                       <TouchableOpacity
//                         style={[styles.day, isToday && styles.today, hasDocuments && styles.hasDoc]}
//                         onPress={() =>
//                           navigation.navigate("DocumentManagerScreen", {
//                             date: dateString,
//                           })
//                         }
//                       >
//                         <Text
//                           style={[styles.dayText, isToday && styles.todayText, hasDocuments && styles.hasDocText]}
//                         >
//                           {dayNumber}
//                         </Text>
//                       </TouchableOpacity>
//                     </View>
//                   );
//                 })}
//               </View>
//             </View>
//           );
//         })}
//       </ScrollView>
//     </View>
//   );
// };

// export default CalendarScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffffff",
//     paddingTop: scale(40),
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: scale(16),
//     paddingBottom: scale(10),
//   },
//   backButton: {
//     marginRight: scale(10),
//   },
//   hasDocuments: {
//     backgroundColor: '#e3f2fd', 
//   },
//   hasDocumentsText: {
//     fontWeight: 'bold',
//     color: '#1976d2', 
//   },
//   headerText: {
//     fontSize: scale(18),
//     fontWeight: "bold",
//     color: "#0f172a",
//   },
//   pickerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#ffffff",
//     padding: scale(12),
//     borderRadius: scale(10),
//     marginHorizontal: scale(16),
//     marginBottom: scale(10),
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: scale(2) },
//     shadowOpacity: 0.1,
//     shadowRadius: scale(4),
//     elevation: scale(3),
//     borderWidth: 1,
//     borderColor: "#e2e8f0",
//     width: scale(250),
//   },
//   pickerLabel: {
//     fontSize: scale(16),
//     fontWeight: "600",
//     color: "#1e293b",
//     marginRight: scale(10),
//   },
//   picker: {
//     fontSize: scale(16),
//     borderWidth: 1,
//     borderColor: "#cbd5e1",
//     borderRadius: scale(6),
//     backgroundColor: "#f1f5f9",
//     color: "#1e293b",
//     width: scale(130),
//   },
//   scrollContainer: {
//     paddingBottom: scale(20),
//   },
//   monthContainer: {
//     paddingHorizontal: scale(16),
//     marginBottom: scale(20),
//   },
//   monthTitle: {
//     fontSize: scale(20),
//     fontWeight: "bold",
//     color: "#1e293b",
//     marginBottom: scale(10),
//   },
//   weekRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: scale(5),
//   },
//   weekDay: {
//     width: scale(40),
//     textAlign: "center",
//     fontSize: scale(14),
//     fontWeight: "600",
//     color: "#64748b",
//   },
//   daysContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     width: "100%",
//   },
//   dayWrapper: {
//     width: "14.28%",
//     alignItems: "center",
//   },
//   emptyDay: {
//     width: "14.28%",
//     height: scale(40),
//   },
//   day: {
//     width: scale(40),
//     height: scale(40),
//     justifyContent: "center",
//     alignItems: "center",
//     margin: scale(2),
//     borderRadius: scale(20),
//     backgroundColor: "#f1f5f9",
//   },
//   today: {
//     backgroundColor: "#0f172a",
//   },
//   hasDoc: {
//     backgroundColor: "#b0b7c0",
//   },
//   hasDocText: {
//     color: "#ffffff",
//     fontWeight: "bold",
//   },
//   dayText: {
//     fontSize: scale(14),
//     color: "#334155",
//   },
//   todayText: {
//     color: "#ffffff",
//     fontWeight: "bold",
//   },
// });

import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "./types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useResponsive } from "../../../hooks/useresponsive";

type CalendarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CalendarScreen"
>;

const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

interface IDocument {
  id: string;
  name: string;
  date: string;
  uri: string;
}

const CalendarScreen = () => {
  const navigation = useNavigation<CalendarScreenNavigationProp>();
  const currentYear = new Date().getFullYear();
  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const [documentsData, setDocumentsData] = useState<IDocument[]>([]);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const scrollViewRef = useRef<ScrollView>(null);
  const { scale, vs, ms } = useResponsive();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const yearOptions = Array.from({ length: 21 }, (_, i) => ({
    label: `${currentYear - 10 + i}`,
    value: currentYear - 10 + i,
  }));

  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({ y: todayMonth * vs(300), animated: true });
      }, 200);
    }
  }, []);

  useEffect(() => {
    const fetchDocuments = async () => {
      const storedData = await AsyncStorage.getItem("documents");
      if (storedData) {
        setDocumentsData(JSON.parse(storedData));
      }
    };
    fetchDocuments();
  }, []);

  return (
    <View style={[styles.container, { paddingTop: vs(26) }]}> 
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back-outline" size={ms(24)} color="#0f172a" />
        </TouchableOpacity>
        <Text style={[styles.headerText, { fontSize: ms(18) }]}>Calendar</Text>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={[styles.pickerLabel, { fontSize: ms(16) }]}>Select Year:</Text>
        <RNPickerSelect
          onValueChange={(year: number) => setSelectedYear(year)}
          items={yearOptions}
          value={selectedYear}
          style={{ inputIOS: styles.picker, inputAndroid: styles.picker }}
        />
      </View>

      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollContainer}>
        {months.map((month, monthIndex) => {
          const daysInMonth = getDaysInMonth(monthIndex, selectedYear);
          const firstDay = new Date(selectedYear, monthIndex, 1).getDay();

          return (
            <View key={monthIndex} style={styles.monthContainer}>
              <Text style={[styles.monthTitle, { fontSize: ms(20) }]}>
                {month} {selectedYear}
              </Text>

              <View style={styles.weekRow}>
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                  <Text key={day} style={[styles.weekDay, { fontSize: ms(14) }]}>{day}</Text>
                ))}
              </View>

              <View style={styles.daysContainer}>
                {Array.from({ length: firstDay }).map((_, i) => (
                  <View key={`empty-${i}`} style={styles.emptyDay} />
                ))}

                {Array.from({ length: daysInMonth }, (_, index) => {
                  const dayNumber = index + 1;
                  const isToday =
                    selectedYear === currentYear &&
                    monthIndex === todayMonth &&
                    dayNumber === todayDate;

                  const dateString = `${selectedYear}-${String(monthIndex + 1).padStart(2, "0")}-${String(dayNumber).padStart(2, "0")}`;
                  const hasDocuments = documentsData.some(doc => doc.date === dateString);

                  return (
                    <View key={index} style={styles.dayWrapper}>
                      <TouchableOpacity
                        style={[
                          styles.day,
                          isToday && styles.today,
                          hasDocuments && styles.hasDoc,
                        ]}
                        onPress={() => navigation.navigate("DocumentManagerScreen", { date: dateString })}
                      >
                        <Text
                          style={[
                            styles.dayText,
                            isToday && styles.todayText,
                            hasDocuments && styles.hasDocText,
                          ]}
                        >
                          {dayNumber}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  backButton: { marginRight: 10 },
  headerText: { fontWeight: "bold", color: "#0f172a" },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    width: 250,
  },
  pickerLabel: { fontWeight: "600", color: "#1e293b", marginRight: 10 },
  picker: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 6,
    backgroundColor: "#f1f5f9",
    color: "#1e293b",
    width: 130,
  },
  scrollContainer: { paddingBottom: 20 },
  monthContainer: { paddingHorizontal: 16, marginBottom: 20 },
  monthTitle: { fontWeight: "bold", color: "#1e293b", marginBottom: 10 },
  weekRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5 },
  weekDay: { width: 40, textAlign: "center", fontWeight: "600", color: "#64748b" },
  daysContainer: { flexDirection: "row", flexWrap: "wrap", width: "100%" },
  dayWrapper: { width: "14.28%", alignItems: "center" },
  emptyDay: { width: "14.28%", height: 40 },
  day: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
    borderRadius: 20,
    backgroundColor: "#f1f5f9",
  },
  today: { backgroundColor: "#0f172a" },
  hasDoc: { backgroundColor: "#b0b7c0" },
  hasDocText: { color: "#ffffff", fontWeight: "bold" },
  dayText: { color: "#334155" },
  todayText: { color: "#ffffff", fontWeight: "bold" },
});
