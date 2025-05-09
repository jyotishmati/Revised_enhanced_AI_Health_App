// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   TextInput,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
// } from "react-native";
// import { Feather } from "@expo/vector-icons";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Animated, { FadeInDown } from "react-native-reanimated";
// import { useResponsive } from "../../hooks/useresponsive";

// const { width } = Dimensions.get("window");

// const CommunityScreen = () => {
//   const { scale, vs, ms } = useResponsive();
//   const [searchFocus, setSearchFocus] = useState(false);

//   return (
//     <SafeAreaView style={styles.container}>
//       <Animated.View entering={FadeInDown} style={styles.titleContainer}>
//         <Text style={[styles.headerTitle, { fontSize: ms(22) }]}>Community</Text>
//         <Text style={[styles.headerSubtitle, { fontSize: ms(14) }]}>Welcome to Community</Text>
//       </Animated.View>

//       <View style={styles.topContainer}>
//         <View style={styles.profileWrapper}>
//           <Animated.Image
//             entering={FadeInDown}
//             source={require("../../assets/images/page1.jpg")}
//             style={[styles.profileImage, { width: scale(110), height: scale(110) }]}
//           />

//           <View style={[styles.verticalDivider, { height: scale(110) }]} />

//           <View style={styles.userInfoContainer}>
//             <Text style={[styles.doctorLabel, { fontSize: ms(12) }]}>DOCTOR</Text>
//             <Text style={[styles.userName, { fontSize: ms(16) }]}>Aisha Verma</Text>
//             <Text style={[styles.userDetails, { fontSize: ms(13) }]}>Mobile : 9876543210</Text>
//             <Text style={[styles.userDetails, { fontSize: ms(13) }]}>MID : NSI1234567890</Text>
//           </View>
//         </View>
//       </View>

//       <View style={styles.bottomContainer}>
//         <View style={[styles.navyPanel, { width: scale(130) }]}>
//           {Array.from({ length: 4 }).map((_, index) => (
//             <TouchableOpacity key={index} style={[styles.circleIcon, { width: scale(80), height: scale(80), borderRadius: scale(40) }]}>
//               <Image
//                 source={require("../../assets/images/page1.jpg")}
//                 style={styles.circleImage}
//               />
//             </TouchableOpacity>
//           ))}
//         </View>

//         <View style={styles.mainContent}>
//           <ScrollView style={styles.hashtagList} showsVerticalScrollIndicator={false}>
//             <View style={styles.announcementRow}>
//               <Text style={[styles.hashtagTitle, { fontSize: ms(14) }]}>#announcements</Text>
//               <View style={styles.announcementBadge}>
//                 <Text style={[styles.badgeText, { fontSize: ms(12) }]}>3</Text>
//               </View>
//             </View>
//             {[
//               "#updates", "#alerts", "#resources", "#job-opportunities", "#vaccination", "#diagnosis",
//               "#surgeries", "#prevention", "#med-life", "#med-insights", "#medical-buzz"
//             ].map((tag, idx) => (
//               <TouchableOpacity key={idx}>
//                 <Animated.Text
//                   entering={FadeInDown.delay(idx * 100)}
//                   style={[styles.hashtagText, { fontSize: ms(14) }]}
//                 >
//                   {tag}
//                 </Animated.Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>

//           <View style={[styles.searchBar, searchFocus && styles.searchBarActive]}>
//             <Feather name="search" size={ms(20)} color="gray" style={styles.searchIcon} />
//             <TextInput
//               placeholder="Search #"
//               style={[styles.searchInput, { fontSize: ms(14) }]}
//               placeholderTextColor="#6b7280"
//               onFocus={() => setSearchFocus(true)}
//               onBlur={() => setSearchFocus(false)}
//             />
//           </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default CommunityScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//   },
//   titleContainer: {
//     backgroundColor: "#FFFFFF",
//     paddingTop: 10,
//     paddingHorizontal: 16,
//     marginBottom: 10,
//   },
//   headerTitle: {
//     fontWeight: "bold",
//     color: "#1f2937",
//   },
//   headerSubtitle: {
//     color: "#6b7280",
//     marginBottom: 10,
//   },
//   topContainer: {
//     backgroundColor: "#f3f4f6",
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//   },
//   profileWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   profileImage: {
//     resizeMode: "cover",
//     borderRadius: 6,
//   },
//   verticalDivider: {
//     width: 1,
//     backgroundColor: "#ccc",
//     marginHorizontal: 16,
//   },
//   userInfoContainer: {
//     flex: 1,
//     justifyContent: "flex-start",
//   },
//   doctorLabel: {
//     fontWeight: "bold",
//     color: "#6b7280",
//     marginBottom: 2,
//   },
//   userName: {
//     fontWeight: "bold",
//     color: "#1f2937",
//   },
//   userDetails: {
//     color: "#6b7280",
//   },
//   bottomContainer: {
//     flex: 1,
//     flexDirection: "row",
//   },
//   navyPanel: {
//     backgroundColor: "#0F2D44",
//     alignItems: "center",
//     paddingVertical: 20,
//   },
//   circleIcon: {
//     overflow: "hidden",
//     marginBottom: 16,
//   },
//   circleImage: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//   },
//   mainContent: {
//     flex: 1,
//     padding: 16,
//   },
//   hashtagList: {
//     flex: 1,
//   },
//   announcementRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   hashtagTitle: {
//     fontWeight: "bold",
//     color: "#1f2937",
//   },
//   announcementBadge: {
//     backgroundColor: "#e5e7eb",
//     borderRadius: 12,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     marginLeft: 8,
//   },
//   badgeText: {
//     color: "white",
//     fontWeight: "bold",
//   },
//   hashtagText: {
//     color: "#6b7280",
//     marginBottom: 4,
//   },
//   searchBar: {
//     flexDirection: "row",
//     backgroundColor: "#f3f4f6",
//     padding: 12,
//     borderRadius: 50,
//     alignItems: "center",
//     marginTop: 16,
//   },
//   searchBarActive: {
//     backgroundColor: "#e0e7ff",
//   },
//   searchIcon: {
//     marginRight: 8,
//   },
//   searchInput: {
//     flex: 1,
//     color: "#1f2937",
//   },
// });

import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { useResponsive } from "../../hooks/useresponsive";

const { width } = Dimensions.get("window");

const CommunityScreen = () => {
  const { scale, vs, ms } = useResponsive();
  const navigation = useNavigation();
  const [searchFocus, setSearchFocus] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View entering={FadeInDown} style={styles.titleContainer}>
      <TouchableOpacity 
  onPress={() => navigation.goBack()} 
  style={{ marginTop: -35 }} // Move arrow up without affecting text
>
  <FontAwesome name="arrow-left" size={ms(20)} color="#1f2937" />
</TouchableOpacity>


        <View style={styles.titleTextWrapper}>
          <Text style={[styles.headerTitle, { fontSize: ms(22) }]}>Community</Text>
          <Text style={[styles.headerSubtitle, { fontSize: ms(14), marginTop: vs(10) }]}>
            Welcome to Community
          </Text>
        </View>
      </Animated.View>

      <View style={styles.topContainer}>
        <View style={styles.profileWrapper}>
          <Animated.Image
            entering={FadeInDown}
            source={require("../../assets/images/page1.jpg")}
            style={[styles.profileImage, { width: scale(110), height: scale(110) }]}
          />
          <View style={[styles.verticalDivider, { height: scale(110) }]} />
          <View style={styles.userInfoContainer}>
            <Text style={[styles.doctorLabel, { fontSize: ms(12) }]}>DOCTOR</Text>
            <Text style={[styles.userName, { fontSize: ms(16) }]}>Aisha Verma</Text>
            <Text style={[styles.userDetails, { fontSize: ms(13) }]}>Mobile : 9876543210</Text>
            <Text style={[styles.userDetails, { fontSize: ms(13) }]}>MID : NSI1234567890</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={[styles.navyPanel, { width: scale(130) }]}>
          {Array.from({ length: 4 }).map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.circleIcon,
                { width: scale(80), height: scale(80), borderRadius: scale(40) },
              ]}
            >
              <Image
                source={require("../../assets/images/page1.jpg")}
                style={styles.circleImage}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.mainContent}>
          <ScrollView style={styles.hashtagList} showsVerticalScrollIndicator={false}>
            <View style={styles.announcementRow}>
              <Text style={[styles.hashtagTitle, { fontSize: ms(14) }]}>#announcements</Text>
              <View style={styles.announcementBadge}>
                <Text style={[styles.badgeText, { fontSize: ms(12) }]}>3</Text>
              </View>
            </View>
            {[
              "#updates",
              "#alerts",
              "#resources",
              "#job-opportunities",
              "#vaccination",
              "#diagnosis",
              "#surgeries",
              "#prevention",
              "#med-life",
              "#med-insights",
              "#medical-buzz",
            ].map((tag, idx) => (
              <TouchableOpacity key={idx}>
                <Animated.Text
                  entering={FadeInDown.delay(idx * 100)}
                  style={[styles.hashtagText, { fontSize: ms(14) }]}
                >
                  {tag}
                </Animated.Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={[styles.searchBar, searchFocus && styles.searchBarActive]}>
            <Feather name="search" size={ms(20)} color="gray" style={styles.searchIcon} />
            <TextInput
              placeholder="Search #"
              style={[styles.searchInput, { fontSize: ms(14) }]}
              placeholderTextColor="#6b7280"
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setSearchFocus(false)}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CommunityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  titleContainer: {
    backgroundColor: "#FFFFFF",
    paddingTop: 15,
    paddingHorizontal: 16,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  titleTextWrapper: {
    marginLeft: 10,
  },
  headerTitle: {
    fontWeight: "bold",
    color: "#1f2937",
  },
  headerSubtitle: {
    color: "#6b7280",
    marginBottom: 10,
    marginLeft: -15
  },
  topContainer: {
    backgroundColor: "#f3f4f6",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  profileWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    resizeMode: "cover",
    borderRadius: 6,
  },
  verticalDivider: {
    width: 1,
    backgroundColor: "#ccc",
    marginHorizontal: 16,
  },
  userInfoContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  doctorLabel: {
    fontWeight: "bold",
    color: "#6b7280",
    marginBottom: 2,
  },
  userName: {
    fontWeight: "bold",
    color: "#1f2937",
  },
  userDetails: {
    color: "#6b7280",
  },
  bottomContainer: {
    flex: 1,
    flexDirection: "row",
  },
  navyPanel: {
    backgroundColor: "#0F2D44",
    alignItems: "center",
    paddingVertical: 20,
  },
  circleIcon: {
    overflow: "hidden",
    marginBottom: 16,
  },
  circleImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  mainContent: {
    flex: 1,
    padding: 16,
  },
  hashtagList: {
    flex: 1,
  },
  announcementRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  hashtagTitle: {
    fontWeight: "bold",
    color: "#1f2937",
  },
  announcementBadge: {
    backgroundColor: "#e5e7eb",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8,
  },
  badgeText: {
    color: "white",
    fontWeight: "bold",
  },
  hashtagText: {
    color: "#6b7280",
    marginBottom: 4,
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    padding: 12,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 16,
  },
  searchBarActive: {
    backgroundColor: "#e0e7ff",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: "#1f2937",
  },
});

