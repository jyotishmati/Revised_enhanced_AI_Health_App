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

const menuItems = [
  { id: "1", label: "My Health", icon: "heart-outline" },
  { id: "2", label: "Subscription", icon: "card-outline" },
  { id: "3", label: "Recent", icon: "time-outline" },
  { id: "4", label: "Insurance", icon: "shield-checkmark-outline" },
  { id: "5", label: "Health Coin", icon: "wallet-outline" },
  { id: "6", label: "FAQ’s", icon: "help-circle-outline" },
  { id: "7", label: "Setting", icon: "settings-outline" },
  { id: "8", label: "Terms & Conditions", icon: "document-text-outline" },
  { id: "9", label: "Log out", icon: "log-out-outline" },
];

const ProfileScreen: React.FC = () => {
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  const handleUploadPhoto = async () => {
    try {
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
      console.log("ImagePicker result:", result);

      if (!result.canceled) {
        setProfilePhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const renderProfilePhoto = () => {
    if (!profilePhoto) {
      // No photo => show placeholder circle with plus icon
      return (
        <TouchableOpacity
          style={styles.photoPlaceholder}
          onPress={handleUploadPhoto}
        >
          <Feather name="plus" size={24} color="#999" />
        </TouchableOpacity>
      );
    }
    // If a photo is available, display it using the URI from state
    return (
      <TouchableOpacity onPress={handleUploadPhoto}>
        <Image source={{ uri: profilePhoto }} style={styles.profileImage} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* TOP SECTION: Profile Photo + User Info */}
      <View style={styles.topSection}>
        {renderProfilePhoto()}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Nandan</Text>
          <Text style={styles.userDetails}>Mobile : 9876543210</Text>
          <Text style={styles.userDetails}>MID : NS1234567890</Text>
        </View>
      </View>

      {/* MENU ITEMS */}
      <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
        {menuItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.menuItem}>
            {/* Left icon */}
            <Ionicons
              name={item.icon as any}
              size={20}
              color="#4B5563"
              style={{ marginRight: 12 }}
            />
            {/* Label */}
            <Text style={styles.menuLabel}>{item.label}</Text>
            {/* Right chevron */}
            <Feather
              name="chevron-right"
              size={20}
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
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
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
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  menuLabel: {
    fontSize: 15,
    color: "#1F2937",
  },
});