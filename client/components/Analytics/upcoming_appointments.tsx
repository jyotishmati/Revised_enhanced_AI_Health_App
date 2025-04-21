import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Ensure you have @expo/vector-icons

// --- Interface for Appointment Data ---
interface Appointment {
  id: string;
  dateTime: string; // e.g., "November 08, 2024 - 10.00 AM"
  doctorName: string;
  specialty: string;
  location: string;
  imageUrl?: string; // Optional: URL for the doctor's image
}

// --- Reusable Appointment Card Component ---
interface AppointmentCardProps {
  appointment: Appointment;
  onCancelPress?: (id: string) => void;
  onReschedulePress?: (id: string) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onCancelPress,
  onReschedulePress,
}) => {
  // Placeholder image if imageUrl is not provided
  const placeholderImage = require("./../../assets/images/page1.jpg"); // Adjust path if needed

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.dateTimeText}>{appointment.dateTime}</Text>

      <View style={styles.doctorInfoContainer}>
        <Image
          source={
            appointment.imageUrl
              ? { uri: appointment.imageUrl }
              : placeholderImage
          }
          style={styles.doctorImage}
          resizeMode="cover"
        />
        <View style={styles.doctorTextContainer}>
          <Text style={styles.doctorName}>{appointment.doctorName}</Text>
          <Text style={styles.doctorSpecialty}>{appointment.specialty}</Text>
          <View style={styles.locationContainer}>
            <Ionicons
              name="location-outline"
              size={16}
              color="#666"
              style={styles.locationIcon}
            />
            <Text style={styles.locationText}>{appointment.location}</Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => onCancelPress && onCancelPress(appointment.id)}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.rescheduleButton]}
          onPress={() => onReschedulePress && onReschedulePress(appointment.id)}
        >
          <Text style={styles.rescheduleButtonText}>Reschedule</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --- Main Upcoming Appointments Section Component ---
const UpcomingAppointments: React.FC = () => {
  // Sample data - replace with actual data source later
  const appointmentsData: Appointment[] = [
    {
      id: "appt1",
      dateTime: "November 08, 2024 - 10.00 AM",
      doctorName: "Dr. James Robinson",
      specialty: "Neuro Surgery",
      location: "Colombia Asia, Bengaluru",
      // Replace with actual image URL or remove for placeholder
      imageUrl:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "appt2",
      dateTime: "December 24, 2024 - 15.00pm", // Note: Original image says 15.00pm, usually just 3:00 PM or 15:00
      doctorName: "Dr. Daniel Lee",
      specialty: "Neuro Surgery",
      location: "Jayadev Hospital, Bengaluru",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1661580574627-9211124e5c3f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const handleCancel = (id: string) => {
    console.log(`Cancel appointment ID: ${id}`);
    // Add cancel logic here
  };

  const handleReschedule = (id: string) => {
    console.log(`Reschedule appointment ID: ${id}`);
    // Add reschedule logic/navigation here
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
      {appointmentsData.map((appt) => (
        <AppointmentCard
          key={appt.id}
          appointment={appt}
          onCancelPress={handleCancel}
          onReschedulePress={handleReschedule}
        />
      ))}
    </View>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  sectionContainer: {
    paddingHorizontal: 20, // Match Surgical History padding
    marginTop: 20, // Space above the section title
    marginBottom: 20, // Space below the whole section (adjust if needed)
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", // Or #0A2F5B if preferred
    marginBottom: 15,
  },
  cardContainer: {
    backgroundColor: "#f0f4f7", // Light grey background
    borderRadius: 15,
    padding: 15,
    marginBottom: 20, // Space between appointment cards
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  dateTimeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#444", // Slightly darker grey
    marginBottom: 15, // Space below date/time
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  doctorInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20, // Space before buttons
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 12, // Rounded corners for the image
    marginRight: 15,
  },
  doctorTextContainer: {
    flex: 1, // Take remaining space
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50", // Dark blue/grey
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: "#555", // Medium grey
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: {
    marginRight: 5,
  },
  locationText: {
    fontSize: 13,
    color: "#666", // Grey color for location
    flex: 1, // Allow text wrapping
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Space out buttons
    marginTop: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25, // Highly rounded buttons
    flex: 1, // Make buttons take up available space (almost half each)
    alignItems: "center",
    marginHorizontal: 5, // Add small space between buttons
    borderWidth: 1, // Add border to both for consistency, color differs
  },
  cancelButton: {
    backgroundColor: "#FFFFFF", // White background
    borderColor: "#e0e0e0", // Light grey border
  },
  cancelButtonText: {
    color: "#333", // Dark text
    fontWeight: "bold",
    fontSize: 14,
  },
  rescheduleButton: {
    backgroundColor: "#0A2F5B", // Dark blue background
    borderColor: "#0A2F5B", // Matching border color
  },
  rescheduleButtonText: {
    color: "#FFFFFF", // White text
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default UpcomingAppointments;
