// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   Animated,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Feather, Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import { useNavigation } from "@react-navigation/native";
// import { useResponsive } from "../../hooks/useresponsive";

// const menuItems = [
//   { id: "1", label: "My Health", icon: "heart-outline", screen: "MyHealth" },
//   { id: "2", label: "Subscription", icon: "card-outline", screen: "Subscription" },
//   { id: "3", label: "Medical History", icon: "time-outline", screen: "MedicalHistory" },
//   { id: "4", label: "Life Style", icon: "pulse-outline", screen: "LifeStyle" },
//   { id: "5", label: "Mental Health", icon: "happy-outline", screen: "MentalHealth" },
//   { id: "6", label: "Fitness", icon: "barbell-outline", screen: "Fitness" },
//   { id: "7", label: "Medical Reports", icon: "document-text-outline", screen: "MedicalReports" },
//   { id: "8", label: "Connect Device", icon: "watch-outline", screen: "ConnectDevice" },
//   { id: "9", label: "Health Coin", icon: "wallet-outline", screen: "HealthCoin" },
//   { id: "10", label: "Insurance", icon: "shield-checkmark-outline" },
//   { id: "11", label: "Setting", icon: "settings-outline", screen: "Settings" },
//   { id: "12", label: "FAQ's", icon: "help-circle-outline" },
//   { id: "13", label: "Terms & Conditions", icon: "document-text-outline" },
//   { id: "14", label: "Log out", icon: "log-out-outline" },
// ];

// const ProfileScreen: React.FC = () => {
//   const navigation = useNavigation();
//   const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
//   const { scale, vs, ms } = useResponsive();
//   const slideAnim = new Animated.Value(100);
//   const fadeAnim = new Animated.Value(0);

//   React.useEffect(() => {
//     Animated.parallel([
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 500,
//         useNativeDriver: true,
//       }),
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 500,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, []);

//   const handleUploadPhoto = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== "granted") {
//       alert("We need permissions to access your photos!");
//       return;
//     }
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setProfilePhoto(result.assets[0].uri);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <TouchableOpacity
//         style={[styles.backButton, { padding: scale(8), borderRadius: scale(20), marginTop: Math.min(vs(24), 22) }]}
//         onPress={() => navigation.goBack()}
//       >
//         <Ionicons name="arrow-back" size={ms(24)} color="#374151" />
//       </TouchableOpacity>

//       <Animated.View
//         style={[styles.topSection, {
//           padding: scale(15),
//           borderRadius: scale(12),
//           marginTop: Math.min(vs(50), 38),
//           marginBottom: vs(20),
//           opacity: fadeAnim,
//           transform: [{ translateY: slideAnim }],
//         }]}
//       >
//         {profilePhoto ? (
//           <TouchableOpacity onPress={handleUploadPhoto}>
//             <Image
//               source={{ uri: profilePhoto }}
//               style={[styles.profileImage, {
//                 width: scale(80),
//                 height: scale(80),
//                 borderRadius: scale(40),
//               }]}
//             />
//           </TouchableOpacity>
//         ) : (
//           <TouchableOpacity
//             style={[styles.photoPlaceholder, {
//               width: scale(80),
//               height: scale(80),
//               borderRadius: scale(40),
//             }]}
//             onPress={handleUploadPhoto}
//           >
//             <Feather name="plus" size={ms(24)} color="#999" />
//           </TouchableOpacity>
//         )}

//         <View style={styles.userInfo}>
//           <Text style={[styles.userName, { fontSize: ms(18), marginBottom: vs(4) }]}>Nandan</Text>
//           <Text style={[styles.userDetails, { fontSize: ms(14) }]}>Mobile : 9876543210</Text>
//           <Text style={[styles.userDetails, { fontSize: ms(14) }]}>MID : NS1234567890</Text>
//         </View>
//       </Animated.View>

//       <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
//         {menuItems.map((item) => (
//           <TouchableOpacity
//             key={item.id}
//             style={[styles.menuItem, { paddingVertical: vs(14), paddingHorizontal: scale(16),
//               borderRadius: scale(10),
//               marginBottom: vs(8),}]}
//             onPress={() => {
//               if (item.screen) navigation.navigate(item.screen as never);
//             }}
//           >
//             <Ionicons
//               name={item.icon as any}
//               size={ms(22)}
//               color="#4B5563"
//               style={{ marginRight: scale(14) }}
//             />
//             <Text style={[styles.menuLabel, { fontSize: ms(16) }]}>{item.label}</Text>
//             <Feather name="chevron-right" size={ms(22)} color="#9CA3AF" style={{ marginLeft: "auto" }} />
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default ProfileScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     paddingHorizontal: 16,
//     paddingTop: 20,
//   },
//   backButton: {
//     position: "absolute",
//     top: 16,
//     left: 16,
//     zIndex: 10,
//     backgroundColor: "#F3F4F6",
//   },
//   topSection: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F9FAFB",
//   },
//   photoPlaceholder: {
//     backgroundColor: "#E5E7EB",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 16,
//   },
//   profileImage: {
//     marginRight: 16,
//     resizeMode: "cover",
//   },
//   userInfo: {
//     flex: 1,
//   },
//   userName: {
//     fontWeight: "bold",
//     color: "#1F2937",
//   },
//   userDetails: {
//     color: "#6B7280",
//     marginBottom: 2,
//   },
//   menuContainer: {
//     flex: 1,
//     marginTop: 10,
//   },
//   menuItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     backgroundColor: "#FFFFFF",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
  
//   menuLabel: {
//     color: "#1F2937",
//     flex: 1,
//   },
// });

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useResponsive } from "../../hooks/useresponsive";

const menuItems = [
  { id: "1", label: "My Health", icon: "heart-outline", screen: "MyHealth" },
  { id: "2", label: "Subscription", icon: "card-outline", screen: "Subscription" },
  { id: "3", label: "Medical History", icon: "time-outline", screen: "MedicalHistory" },
  { id: "4", label: "Life Style", icon: "pulse-outline", screen: "LifeStyle" },
  { id: "5", label: "Mental Health", icon: "happy-outline", screen: "MentalHealth" },
  { id: "6", label: "Fitness", icon: "barbell-outline", screen: "Fitness" },
  { id: "7", label: "Medical Reports", icon: "document-text-outline", screen: "MedicalReports" },
  { id: "8", label: "Connect Device", icon: "watch-outline", screen: "ConnectDevice" },
  { id: "9", label: "Health Coin", icon: "wallet-outline", screen: "HealthCoin" },
  { id: "10", label: "Insurance", icon: "shield-checkmark-outline" },
  { id: "11", label: "Setting", icon: "settings-outline", screen: "Settings" },
  { id: "12", label: "FAQ's", icon: "help-circle-outline" },
  { id: "13", label: "Terms & Conditions", icon: "document-text-outline" },
  { id: "14", label: "Log out", icon: "log-out-outline" },
];

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const { scale, vs, ms } = useResponsive();
  const slideAnim = new Animated.Value(100);
  const fadeAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleUploadPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("We need permissions to access your photos!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePhoto(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={[
          styles.backButton,
          {
            padding: scale(8),
            borderRadius: scale(20),
            top: vs(45), 
          },
        ]}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={ms(24)} color="#374151" />
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.topSection,
          {
            padding: scale(15),
            borderRadius: scale(12),
            marginTop: Math.min(vs(50), 40),
            marginBottom: vs(20),
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 4, // for Android shadow
          },
        ]}
      >
        {profilePhoto ? (
          <TouchableOpacity onPress={handleUploadPhoto}>
            <Image
              source={{ uri: profilePhoto }}
              style={[
                styles.profileImage,
                {
                  width: scale(80),
                  height: scale(80),
                  borderRadius: scale(40),
                },
              ]}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.photoPlaceholder,
              {
                width: scale(80),
                height: scale(80),
                borderRadius: scale(40),
              },
            ]}
            onPress={handleUploadPhoto}
          >
            <Feather name="plus" size={ms(24)} color="#999" />
          </TouchableOpacity>
        )}

        <View style={styles.userInfo}>
          <Text style={[styles.userName, { fontSize: ms(18), marginBottom: vs(4) }]}>
            Nandan
          </Text>
          <Text style={[styles.userDetails, { fontSize: ms(14) }]}>
            Mobile : 9876543210
          </Text>
          <Text style={[styles.userDetails, { fontSize: ms(14) }]}>
            MID : NS1234567890
          </Text>
        </View>
      </Animated.View>

      <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.menuItem,
              {
                paddingVertical: vs(14),
                paddingHorizontal: scale(16),
                borderRadius: scale(10),
                marginBottom: vs(8),
              },
            ]}
            onPress={() => {
              if (item.screen) navigation.navigate(item.screen as never);
            }}
          >
            <Ionicons
              name={item.icon as any}
              size={ms(22)}
              color="#4B5563"
              style={{ marginRight: scale(14) }}
            />
            <Text style={[styles.menuLabel, { fontSize: ms(16) }]}>{item.label}</Text>
            <Feather
              name="chevron-right"
              size={ms(22)}
              color="#9CA3AF"
              style={{ marginLeft: "auto" }}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  backButton: {
    position: "absolute",
    left: 16,
    zIndex: 10,
    backgroundColor: "#F3F4F6",
  },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  photoPlaceholder: {
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  profileImage: {
    marginRight: 16,
    resizeMode: "cover",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontWeight: "bold",
    color: "#1F2937",
  },
  userDetails: {
    color: "#6B7280",
    marginBottom: 2,
  },
  menuContainer: {
    flex: 1,
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuLabel: {
    color: "#1F2937",
    flex: 1,
  },
});
