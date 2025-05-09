// import React, { useState } from "react";
// import {
//   SafeAreaView,
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   ScrollView,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// const { width } = Dimensions.get("window");
// const scale = (size: number) => (width / 375) * size; // Base width of 375

// export default function NotificationsScreen() {
//   const [activeTab, setActiveTab] = useState<"today" | "lastWeek">("today");

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView
//         contentContainerStyle={{ paddingBottom: scale(20) }}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Header Section */}
//         <View style={styles.header}>
//           <View>
//             <Text style={styles.title}>Notifications</Text>
//             <Text style={styles.subtitle}>You have 12 Total Notifications!</Text>
//           </View>
//           <View style={styles.plusContainer}>
//             <Text style={styles.plusText}>+2</Text>
//           </View>
//         </View>

//         {/* Tabs Row */}
//         <View style={styles.tabsRow}>
//           <TouchableOpacity
//             style={[
//               styles.tabButton,
//               activeTab === "today" && styles.activeTab,
//             ]}
//             onPress={() => setActiveTab("today")}
//           >
//             <Text
//               style={[
//                 styles.tabText,
//                 activeTab === "today" && styles.activeTabText,
//               ]}
//             >
//               Today
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               styles.tabButton,
//               activeTab === "lastWeek" && styles.activeTab,
//             ]}
//             onPress={() => setActiveTab("lastWeek")}
//           >
//             <Text
//               style={[
//                 styles.tabText,
//                 activeTab === "lastWeek" && styles.activeTabText,
//               ]}
//             >
//               Last Week
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {/* Urgent Section */}
//         <Text style={styles.sectionTitle}>Urgent ( 1 )</Text>
//         <View style={styles.urgentCard}>
//           <View style={styles.urgentIconContainer}>
//             <Ionicons
//               name="warning-outline"
//               size={scale(40)}
//               color="#FF6700"
//             />
//           </View>
//           <View style={styles.urgentTextContainer}>
//             <Text style={styles.urgentTitle}>Heart beat Abnormal!</Text>
//             <Text style={styles.urgentSubtitle}>
//               Our AI think you have an abnormal heartbeat. Please consult a doctor!
//             </Text>
//             <TouchableOpacity style={styles.bookButton}>
//               <Text style={styles.bookButtonText}>Book Appointment</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Earlier Section */}
//         <View style={styles.earlierHeader}>
//           <Text style={styles.sectionTitle}>Earlier ( 11 )</Text>
//           <TouchableOpacity>
//             <Text style={styles.seeAllText}>See All</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Notification Items */}
//         <View style={styles.notificationItem}>
//           <Text style={styles.notificationTitle}>52 New AI Chatbot Message!</Text>
//           <Text style={styles.notificationSubtitle}>
//             MeAI can’t wait to see you responding
//           </Text>
//         </View>

//         <View style={styles.notificationItem}>
//           <Text style={styles.notificationTitle}>Medical Reminder</Text>
//           <Text style={styles.notificationSubtitle}>
//             Take 10mg of Cipro Capsule ( 2 / 1 left )
//           </Text>
//         </View>

//         <View style={styles.notificationItem}>
//           <Text style={styles.notificationTitle}>Appointment with Dr. Sanjay</Text>
//           <Text style={styles.notificationSubtitle}>Tomorrow at 2PM</Text>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     paddingLeft: 10,
//     paddingRight: 10,
//   },
//   /* Header Section */
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: scale(16),
//     paddingTop: scale(20),
//     paddingBottom: scale(8),
//     marginBottom: scale(6),
//   },
//   title: {
//     fontSize: scale(22),
//     fontWeight: "bold",
//     color: "#063247",
//   },
//   subtitle: {
//     fontSize: scale(16),
//     color: "#063247",
//     marginTop: scale(4),
//   },
//   plusContainer: {
//     width: scale(36),
//     height: scale(36),
//     borderRadius: scale(18),
//     backgroundColor: "#E2E8F0",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   plusText: {
//     color: "#0F172A",
//     fontSize: scale(14),
//     fontWeight: "bold",
//   },

//   /* Tabs Row */
//   tabsRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: scale(16),
//     marginBottom: scale(16),
//   },
//   tabButton: {
//     paddingVertical: scale(10),
//     paddingHorizontal: scale(16),
//     marginRight: scale(12),
//     borderRadius: scale(20),
//     backgroundColor: "#F3F4F6", // same background for both
//   },
//   tabText: {
//     fontSize: scale(16),
//     color: "#6B7280",
//     fontWeight: "600",
//   },
//   activeTab: {
//     backgroundColor: "#0F172A", // changes to navy/purple when active
//   },
//   activeTabText: {
//     color: "#FFFFFF",
//   },

//   /* Section Titles */
//   sectionTitle: {
//     fontSize: scale(18),
//     fontWeight: "600",
//     color: "#0F172A",
//     paddingHorizontal: scale(16),
//     marginBottom: scale(6),
//   },

//   /* Urgent Card */
//   urgentCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#FEE2E2",
//     marginHorizontal: scale(16),
//     borderRadius: scale(8),
//     padding: scale(16),
//     marginBottom: scale(18),
//   },
//   urgentIconContainer: {
//     marginRight: scale(12),
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   urgentTextContainer: {
//     flex: 1,
//   },
//   urgentTitle: {
//     fontSize: scale(16),
//     fontWeight: "bold",
//     color: "#DC2626",
//     marginBottom: scale(8),
//   },
//   urgentSubtitle: {
//     fontSize: scale(14),
//     color: "#1F2937",
//     marginBottom: scale(12),
//   },
//   bookButton: {
//     alignSelf: "flex-start",
//     backgroundColor: "#0F172A",
//     paddingVertical: scale(6),
//     paddingHorizontal: scale(12),
//     borderRadius: scale(6),
//   },
//   bookButtonText: {
//     color: "#FFFFFF",
//     fontSize: scale(13),
//     fontWeight: "600",
//   },

//   /* Earlier Header */
//   earlierHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: scale(0),
//     marginBottom: scale(6),
//   },
//   seeAllText: {
//     fontSize: scale(14),
//     fontWeight: "500",
//     color: "#063247",
//     paddingHorizontal: scale(14),
//   },

//   /* Notification Items */
//   notificationItem: {
//     paddingHorizontal: scale(16),
//     paddingVertical: scale(16),
//     borderBottomWidth: 1,
//     borderBottomColor: "#E5E7EB",
//   },
//   notificationTitle: {
//     fontSize: scale(16),
//     fontWeight: "bold",
//     color: "#063247",
//     marginBottom: scale(4),
//   },
//   notificationSubtitle: {
//     fontSize: scale(14),
//     color: "#063247",
//   },
// });


import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useResponsive } from "../../hooks/useresponsive";

export default function NotificationsScreen() {
  const [activeTab, setActiveTab] = useState<"today" | "lastWeek">("today");
  const navigation = useNavigation();
  const { scale, ms, vs } = useResponsive();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: vs(20) }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={ms(24)} color="#0F172A" />
          </TouchableOpacity>
          <View>
            <Text style={[styles.title, { fontSize: ms(22) }]}>Notifications</Text>
            <Text style={[styles.subtitle, { fontSize: ms(16) }]}>You have 12 Total Notifications!</Text>
          </View>
          <View style={[styles.plusContainer, { width: ms(36), height: ms(36), borderRadius: ms(18) }]}>
            <Text style={[styles.plusText, { fontSize: ms(14) }]}>+2</Text>
          </View>
        </View>

        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === "today" && styles.activeTab]}
            onPress={() => setActiveTab("today")}
          >
            <Text style={[styles.tabText, activeTab === "today" && styles.activeTabText]}>Today</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === "lastWeek" && styles.activeTab]}
            onPress={() => setActiveTab("lastWeek")}
          >
            <Text style={[styles.tabText, activeTab === "lastWeek" && styles.activeTabText]}>Last Week</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Urgent ( 1 )</Text>
        <View style={styles.urgentCard}>
          <View style={styles.urgentIconContainer}>
            <Ionicons name="warning-outline" size={ms(40)} color="#FF6700" />
          </View>
          <View style={styles.urgentTextContainer}>
            <Text style={[styles.urgentTitle, { fontSize: ms(16) }]}>Heart beat Abnormal!</Text>
            <Text style={[styles.urgentSubtitle, { fontSize: ms(14) }]}>Our AI think you have an abnormal heartbeat. Please consult a doctor!</Text>
            <TouchableOpacity style={styles.bookButton}>
              <Text style={[styles.bookButtonText, { fontSize: ms(13) }]}>Book Appointment</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.earlierHeader}>
          <Text style={styles.sectionTitle}>Earlier ( 11 )</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.notificationItem}>
          <Text style={[styles.notificationTitle, { fontSize: ms(16) }]}>52 New AI Chatbot Message!</Text>
          <Text style={[styles.notificationSubtitle, { fontSize: ms(14) }]}>MeAI can’t wait to see you responding</Text>
        </View>

        <View style={styles.notificationItem}>
          <Text style={[styles.notificationTitle, { fontSize: ms(16) }]}>Medical Reminder</Text>
          <Text style={[styles.notificationSubtitle, { fontSize: ms(14) }]}>Take 10mg of Cipro Capsule ( 2 / 1 left )</Text>
        </View>

        <View style={styles.notificationItem}>
          <Text style={[styles.notificationTitle, { fontSize: ms(16) }]}>Appointment with Dr. Sanjay</Text>
          <Text style={[styles.notificationSubtitle, { fontSize: ms(14) }]}>Tomorrow at 2PM</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingLeft: 10,
    paddingRight: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
    marginBottom: 6,
  },
  title: {
    fontWeight: "bold",
    color: "#063247",
  },
  subtitle: {
    color: "#063247",
    marginTop: 4,
  },
  plusContainer: {
    backgroundColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },
  plusText: {
    color: "#0F172A",
    fontWeight: "bold",
  },
  tabsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
  },
  tabText: {
    color: "#6B7280",
    fontWeight: "600",
  },
  activeTab: {
    backgroundColor: "#0F172A",
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  sectionTitle: {
    fontWeight: "600",
    color: "#0F172A",
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  urgentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEE2E2",
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 16,
    marginBottom: 18,
  },
  urgentIconContainer: {
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  urgentTextContainer: {
    flex: 1,
  },
  urgentTitle: {
    fontWeight: "bold",
    color: "#DC2626",
    marginBottom: 8,
  },
  urgentSubtitle: {
    color: "#1F2937",
    marginBottom: 12,
  },
  bookButton: {
    alignSelf: "flex-start",
    backgroundColor: "#0F172A",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  bookButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  earlierHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  seeAllText: {
    fontWeight: "500",
    color: "#063247",
  },
  notificationItem: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  notificationTitle: {
    fontWeight: "bold",
    color: "#063247",
    marginBottom: 4,
  },
  notificationSubtitle: {
    color: "#063247",
  },
});
