import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import Gold_bar from "../Home Page/Gold_bar";

const menuItems = [
  { id: "1", label: "My Health", icon: "heart-outline", screen: "MyHealth" },
  { id: "2", label: "Subscription", icon: "card-outline", screen: "Subscription" },
  { id: "3", label: "Medical History", icon: "time-outline", screen: "MedicalHistory" },
  { id: "4", label: "Life Style", icon: "pulse-outline", screen: "LifeStyle" },
  { id: "5", label: "Mental Health", icon: "happy-outline", screen: "MentalHealth" },
  { id: "6", label: "Fitness", icon: "barbell-outline", screen: "Fitness" },
  { id: "7", label: "Medical Reports", icon: "document-text-outline", screen: "MedicalReports" },
  { id: "8", label: "Connect Device", icon: "watch-outline", screen: "ConnectDevice" },
  { id: "9", label: "Health Coin", icon: "wallet-outline", screen: "HealthCoin"},
  { id: "10", label: "Insurance", icon: "shield-checkmark-outline" },
  { id: "11", label: "Setting", icon: "settings-outline", screen: "Settings" },
  { id: "12", label: "FAQ's", icon: "help-circle-outline" },
  { id: "13", label: "Terms & Conditions", icon: "document-text-outline" },
  { id: "14", label: "Log out", icon: "log-out-outline" },
];

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

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
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#374151" />
      </TouchableOpacity>

      {/* Profile Section */}
      <View style={styles.topSection}>
        {profilePhoto ? (
          <TouchableOpacity onPress={handleUploadPhoto}>
            <Image source={{ uri: profilePhoto }} style={styles.profileImage} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.photoPlaceholder} onPress={handleUploadPhoto}>
            <Feather name="plus" size={24} color="#999" />
          </TouchableOpacity>
        )}

        <View style={styles.userInfo}>
          <Text style={styles.userName}>Nandan</Text>
          <Text style={styles.userDetails}>Mobile : 9876543210</Text>
          <Text style={styles.userDetails}>MID : NS1234567890</Text>
        </View>
      </View>

      {/* Menu Items */}
      <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => {
              if (item.screen) {
                navigation.navigate(item.screen as never);
              }
            }}
          >
            <Ionicons name={item.icon as any} size={22} color="#4B5563" style={styles.menuIcon} />
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Feather name="chevron-right" size={22} color="#9CA3AF" style={styles.chevronIcon} />
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
    top: 16,
    left: 16,
    zIndex: 10,
    backgroundColor: "#F3F4F6",
    padding: 8,
    borderRadius: 20,
  },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20,
    backgroundColor: "#F9FAFB",
    padding: 15,
    borderRadius: 12,
  },
  photoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    resizeMode: "cover",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },
  userDetails: {
    fontSize: 14,
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
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  menuIcon: {
    marginRight: 14,
  },
  menuLabel: {
    fontSize: 16,
    color: "#1F2937",
    flex: 1,
  },
  chevronIcon: {
    marginLeft: "auto",
  },
});