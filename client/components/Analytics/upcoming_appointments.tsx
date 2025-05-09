import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useResponsive } from "../../hooks/useresponsive";

interface Appointment {
  id: string;
  dateTime: string;
  doctorName: string;
  specialty: string;
  location: string;
  imageUrl?: string;
}

interface AppointmentCardProps {
  appointment: Appointment;
  onCancelPress?: (id: string) => void;
  onReschedulePress?: (id: string) => void;
  index: number;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onCancelPress,
  onReschedulePress,
  index,
}) => {
  const { scale, vs, ms } = useResponsive();
  const placeholderImage = require("./../../assets/images/page1.jpg");

  // Animation logic
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      delay: index * 150, // Staggered animation
      useNativeDriver: true,
    }).start();

    Animated.timing(translateY, {
      toValue: 0,
      duration: 400,
      delay: index * 150,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, translateY]);

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          padding: vs(15),
          borderRadius: scale(15),
          marginBottom: vs(20),
          opacity: fadeAnim,
          transform: [{ translateY }],
        },
      ]}
    >
      <Text style={[styles.dateTimeText, { fontSize: ms(14), marginBottom: vs(15), paddingBottom: vs(10) }]}>
        {appointment.dateTime}
      </Text>

      <View style={[styles.doctorInfoContainer, { marginBottom: vs(20) }]}>
        <Image
          source={appointment.imageUrl ? { uri: appointment.imageUrl } : placeholderImage}
          style={{
            width: scale(80),
            height: scale(80),
            borderRadius: scale(12),
            marginRight: scale(15),
          }}
          resizeMode="cover"
        />
        <View style={styles.doctorTextContainer}>
          <Text style={[styles.doctorName, { fontSize: ms(16), marginBottom: vs(4) }]}>
            {appointment.doctorName}
          </Text>
          <Text style={[styles.doctorSpecialty, { fontSize: ms(14), marginBottom: vs(8) }]}>
            {appointment.specialty}
          </Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={scale(16)} color="#666" style={{ marginRight: scale(5) }} />
            <Text style={[styles.locationText, { fontSize: ms(13) }]}>{appointment.location}</Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.cancelButton,
            {
              paddingVertical: vs(12),
              paddingHorizontal: scale(20),
              borderRadius: scale(25),
              marginHorizontal: scale(5),
            },
          ]}
          onPress={() => onCancelPress && onCancelPress(appointment.id)}
        >
          <Text style={[styles.cancelButtonText, { fontSize: ms(14) }]}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.rescheduleButton,
            {
              paddingVertical: vs(12),
              paddingHorizontal: scale(20),
              borderRadius: scale(25),
              marginHorizontal: scale(5),
            },
          ]}
          onPress={() => onReschedulePress && onReschedulePress(appointment.id)}
        >
          <Text style={[styles.rescheduleButtonText, { fontSize: ms(14) }]}>Reschedule</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const UpcomingAppointments: React.FC = () => {
  const { scale, vs, ms } = useResponsive();

  const appointmentsData: Appointment[] = [
    {
      id: "appt1",
      dateTime: "November 08, 2024 - 10.00 AM",
      doctorName: "Dr. James Robinson",
      specialty: "Neuro Surgery",
      location: "Colombia Asia, Bengaluru",
      imageUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80",
    },
    {
      id: "appt2",
      dateTime: "December 24, 2024 - 3:00 PM",
      doctorName: "Dr. Daniel Lee",
      specialty: "Neuro Surgery",
      location: "Jayadev Hospital, Bengaluru",
      imageUrl: "https://plus.unsplash.com/premium_photo-1661580574627-9211124e5c3f?q=80",
    },
  ];

  const handleCancel = (id: string) => console.log(`Cancel appointment ID: ${id}`);
  const handleReschedule = (id: string) => console.log(`Reschedule appointment ID: ${id}`);

  return (
    <View style={[styles.sectionContainer, { paddingHorizontal: scale(20), marginTop: vs(20), marginBottom: vs(20) }]}>
      <Text style={[styles.sectionTitle, { fontSize: ms(18), marginBottom: vs(15) }]}>Upcoming Appointments</Text>
      {appointmentsData.map((appt, idx) => (
        <AppointmentCard
          key={appt.id}
          appointment={appt}
          onCancelPress={handleCancel}
          onReschedulePress={handleReschedule}
          index={idx}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {},
  sectionTitle: {
    fontWeight: "bold",
    color: "#333",
  },
  cardContainer: {
    backgroundColor: "#f0f4f7",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  dateTimeText: {
    fontWeight: "bold",
    color: "#444",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  doctorInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  doctorTextContainer: {
    flex: 1,
  },
  doctorName: {
    fontWeight: "bold",
    color: "#2c3e50",
  },
  doctorSpecialty: {
    color: "#555",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    color: "#666",
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
  },
  cancelButton: {
    backgroundColor: "#FFFFFF",
    borderColor: "#e0e0e0",
  },
  cancelButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
  rescheduleButton: {
    backgroundColor: "#0A2F5B",
    borderColor: "#0A2F5B",
  },
  rescheduleButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default UpcomingAppointments;
