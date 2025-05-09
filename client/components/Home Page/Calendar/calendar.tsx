import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { FontAwesome } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./types";
import { useResponsive } from "../../../hooks/useresponsive"; // ✅ Responsive Hook

type CalendarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CalendarScreen"
>;

const HorizontalCalendar: React.FC = () => {
  const navigation = useNavigation<CalendarScreenNavigationProp>();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState<Date[]>([]);
  const [dayWidth, setDayWidth] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const { scale, vs, ms, screenWidth } = useResponsive();

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
        const totalDayWidth = dayWidth + scale(10);
        const offset =
          todayIndex * totalDayWidth + totalDayWidth / 2 - screenWidth / 2;
        const clampedOffset = Math.max(offset, 0);
        scrollViewRef.current.scrollTo({ x: clampedOffset, animated: true });
      }
    }
  }, [dayWidth, daysInMonth]);

  const handleExpandPress = () => {
    navigation.navigate("CalendarExpand" as never);
  };

  return (
    <View style={[styles.container, { paddingHorizontal: scale(16), paddingVertical: vs(20), marginTop: vs(-1) }]}>
      <View style={styles.header}>
        <Text style={[styles.monthText, { fontSize: ms(16), marginLeft: scale(14) }]}>
          {format(currentDate, "MMMM yyyy").toUpperCase()}
        </Text>
        <TouchableOpacity onPress={handleExpandPress} style={[styles.expandButton, {
          padding: scale(10),
          width: scale(32),
          height: scale(32),
          borderRadius: scale(20),
          marginRight: scale(12),
        }]}>
          <FontAwesome name="expand" size={ms(14)} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
        ref={scrollViewRef}
      >
        {daysInMonth.map((day, index) => {
          const isToday = format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
          const dateString = format(day, "yyyy-MM-dd");

          return (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate("DocumentManagerScreen", { date: dateString })}
              style={[
                styles.dayContainer,
                {
                  paddingVertical: vs(12),
                  paddingHorizontal: scale(5),
                  marginHorizontal: scale(5),
                  borderRadius: scale(100),
                },
                isToday && styles.today,
              ]}
              onLayout={(event) => {
                if (index === 0) {
                  setDayWidth(event.nativeEvent.layout.width);
                }
              }}
            >
              <Text style={[
                styles.dayText,
                { fontSize: ms(12) },
                isToday && styles.todayText,
              ]}>
                {format(day, "d")}
              </Text>
              <Text style={[
                styles.weekdayText,
                { fontSize: ms(12) },
                isToday && styles.todayDay,
              ]}>
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
    backgroundColor: "#FAFAFA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  monthText: {
    color: "#063247",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  expandButton: {
    backgroundColor: "#063247",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    flexDirection: "row",
  },
  dayContainer: {
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  today: {
    backgroundColor: "#0F172A",
    padding: 14,
  },
  dayText: {
    fontWeight: "bold",
    color: "#1E293B",
  },
  weekdayText: {
    color: "#64748B",
  },
  todayText: {
    backgroundColor: "#C3E7FA",
    paddingVertical: 7,
    paddingHorizontal: 8,
    textAlign: "center",
    borderRadius: 100,
    color: "#063247",
  },
  todayDay: {
    color: "#fff",
  },
});

export default HorizontalCalendar;

