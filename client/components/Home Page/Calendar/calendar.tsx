// import React, { useState, useEffect } from "react";
// import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
// import { useNavigation } from "@react-navigation/native"; // For navigation
// import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
// import { Ionicons } from "@expo/vector-icons"; // For the expand icon

// const HorizontalCalendar: React.FC = () => {
//   const navigation = useNavigation(); // Navigation hook
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [daysInMonth, setDaysInMonth] = useState<Date[]>([]);

//   useEffect(() => {
//     const firstDay = startOfMonth(currentDate);
//     const lastDay = endOfMonth(currentDate);
//     setDaysInMonth(eachDayOfInterval({ start: firstDay, end: lastDay }));
//   }, [currentDate]);

//   // Function to handle expand button press
//   const handleExpandPress = () => {
//     navigation.navigate("CalendarExpand" as never); // Navigate to the full calendar screen
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header: Month, Year & Expand Button */}
//       <View style={styles.header}>
//         <Text style={styles.monthText}>{format(currentDate, "MMMM yyyy")}</Text>
//         <TouchableOpacity onPress={handleExpandPress} style={styles.expandButton}>
//           <Ionicons name="expand-outline" size={20} color="#0F172A" />
//         </TouchableOpacity>
//       </View>

//       {/* Horizontal Scrollable Dates */}
//       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
//         {daysInMonth.map((day, index) => {
//           const isToday = format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
//           return (
//             <TouchableOpacity key={index} style={[styles.dayContainer, isToday && styles.today]}>
//               <Text style={[styles.dayText, isToday && styles.todayText]}>
//                 {format(day, "d")}
//               </Text>
//               <Text style={[styles.weekdayText, isToday && styles.todayText]}>
//                 {format(day, "E")}
//               </Text>
//             </TouchableOpacity>
//           );
//         })}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: "#FAFAFA",
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   monthText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#0F172A",
//   },
//   expandButton: {
//     padding: 8,
//   },
//   scrollContainer: {
//     flexDirection: "row",
//   },
//   dayContainer: {
//     alignItems: "center",
//     padding: 8,
//     marginHorizontal: 5,
//     borderRadius: 20,
//     backgroundColor: "#E2E8F0",
//   },
//   today: {
//     backgroundColor: "#0F172A",
//   },
//   dayText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#1E293B",
//   },
//   weekdayText: {
//     fontSize: 12,
//     color: "#64748B",
//   },
//   todayText: {
//     color: "#F1F5F9",
//   },
// });

// export default HorizontalCalendar;

// import React, { useState, useEffect } from "react";
// import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
// import { useNavigation } from "@react-navigation/native"; // For navigation
// import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
// import { FontAwesome, Ionicons } from "@expo/vector-icons"; // For the expand icon

// const HorizontalCalendar: React.FC = () => {
//   const navigation = useNavigation(); // Navigation hook
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [daysInMonth, setDaysInMonth] = useState<Date[]>([]);

//   useEffect(() => {
//     const firstDay = startOfMonth(currentDate);
//     const lastDay = endOfMonth(currentDate);
//     setDaysInMonth(eachDayOfInterval({ start: firstDay, end: lastDay }));
//   }, [currentDate]);

//   // Function to handle expand button press
//   const handleExpandPress = () => {
//     navigation.navigate("CalendarExpand" as never); // Navigate to the full calendar screen
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header: Month, Year & Expand Button */}
//       <View style={styles.header}>
//         <Text style={styles.monthText}>{format(currentDate, "MMMM yyyy")}</Text>
//         <TouchableOpacity onPress={handleExpandPress} style={styles.expandButton}>
//           <FontAwesome name="expand" size={16} color="#FFFFFF" />
//         </TouchableOpacity>
//       </View>

//       {/* Horizontal Scrollable Dates */}
//       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
//         {daysInMonth.map((day, index) => {
//           const isToday = format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
//           return (
//             <TouchableOpacity key={index} style={[styles.dayContainer, isToday && styles.today]}>
//               <Text style={[styles.dayText, isToday && styles.todayText]}>
//                 {format(day, "d")}
//               </Text>
//               <Text style={[styles.weekdayText, isToday && styles.todayText]}>
//                 {format(day, "E")}
//               </Text>
//             </TouchableOpacity>
//           );
//         })}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: "#FAFAFA",
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   monthText: {
//     fontSize: 22,
//     fontFamily: "Poppins",
//     fontWeight: "bold",
//     color: "#0F172A",
//   },
//   expandButton: {
//     padding: 8,
//     backgroundColor: "#0F172A", // Navy blue background
//     borderRadius: 20, // Circular button
//     width: 32,
//     height: 32,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   scrollContainer: {
//     flexDirection: "row",
//   },
//   dayContainer: {
//     alignItems: "center",
//     padding: 8,
//     marginHorizontal: 5,
//     borderRadius: 20,
//     backgroundColor: "#E2E8F0",
//   },
//   today: {
//     backgroundColor: "#0F172A",
//   },
//   dayText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#1E293B",
//   },
//   weekdayText: {
//     fontSize: 12,
//     color: "#64748B",
//   },
//   todayText: {
//     color: "#F1F5F9",
//   },
// });

// export default HorizontalCalendar;

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { FontAwesome } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./types";

const { width } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size;
type CalendarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CalendarScreen"
>;

const HorizontalCalendar: React.FC = () => {
  // const navigation = useNavigation();
  const navigation = useNavigation<CalendarScreenNavigationProp>();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState<Date[]>([]);
  const [dayWidth, setDayWidth] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const firstDay = startOfMonth(currentDate);
    const lastDay = endOfMonth(currentDate);
    setDaysInMonth(eachDayOfInterval({ start: firstDay, end: lastDay }));
  }, [currentDate]);

  useEffect(() => {
    if (dayWidth > 0 && daysInMonth.length > 0 && scrollViewRef.current) {
      const todayIndex = daysInMonth.findIndex(
        (day) => format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
      );
      if (todayIndex >= 0) {
        const scrollViewWidth = width;
        const totalDayWidth = dayWidth + scale(10);
        const offset =
          todayIndex * totalDayWidth + totalDayWidth / 2 - scrollViewWidth / 2;
        const clampedOffset = Math.max(offset, 0);
        scrollViewRef.current.scrollTo({ x: clampedOffset, animated: true });
      }
    }
  }, [dayWidth, daysInMonth]);

  const handleExpandPress = () => {
    navigation.navigate("CalendarExpand" as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.monthText}>{format(currentDate, "MMMM yyyy")}</Text>
        <TouchableOpacity
          onPress={handleExpandPress}
          style={styles.expandButton}
        >
          <FontAwesome name="expand" size={scale(14)} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
        ref={scrollViewRef}
      >
        {daysInMonth.map((day, index) => {
          const isToday =
            format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
          // const dateString = `${selectedYear}-${String(
          //   monthIndex + 1
          // ).padStart(2, "0")}-${String(dayNumber).padStart(2, "0")}`;
          // const hasDocuments = documentsData.some(doc => doc.date === dateString);
          const dateString = format(day, "yyyy-MM-dd");
          return (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate("DocumentManagerScreen", {
                  date: dateString,
                })
              }
              style={[styles.dayContainer, isToday && styles.today]}
              onLayout={(event) => {
                if (index === 0) {
                  setDayWidth(event.nativeEvent.layout.width);
                }
              }}
            >
              <Text style={[styles.dayText, isToday && styles.todayText]}>
                {format(day, "d")}
              </Text>
              <Text style={[styles.weekdayText, isToday && styles.todayDay]}>
                {format(day, "E")}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(11),
    paddingVertical: scale(20),
    backgroundColor: "#FAFAFA",
    fontFamily: "Poppins",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scale(10),
  },
  monthText: {
    fontSize: scale(16),
    fontFamily: "Poppins",
    marginLeft: scale(14),
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#063247",
  },
  expandButton: {
    padding: scale(10),
    backgroundColor: "#063247",
    marginRight: scale(12),
    borderRadius: scale(20),
    width: scale(24),
    height: scale(24),
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    flexDirection: "row",
  },
  dayContainer: {
    alignItems: "center",
    paddingVertical: scale(12),
    paddingHorizontal: scale(5),
    marginHorizontal: scale(5),
    borderRadius: scale(100),
    backgroundColor: "#FAFAFA",
  },
  today: {
    backgroundColor: "#0F172A",
    padding: scale(14),
  },
  dayText: {
    fontSize: scale(12),
    fontWeight: "bold",
    // color: "black",
    color: "#1E293B",
  },
  weekdayText: {
    fontSize: scale(12),
    color: "#64748B",
  },
  todayText: {
    backgroundColor: "#C3E7FA",
    paddingVertical: scale(7),
    paddingHorizontal: scale(8),
    textAlign: "center",
    borderRadius: scale(100),
    color: "#063247",
    // marginBottom: scale(5),
  },
  todayDay: {
    color: "#fff",
  },
});

export default HorizontalCalendar;
