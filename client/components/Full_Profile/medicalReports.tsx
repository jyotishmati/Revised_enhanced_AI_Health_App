import React, { useEffect, useState } from "react";
import { Platform, Linking } from "react-native";

import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
const { width } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size;
import { useNavigation } from "@react-navigation/native";
import Gold_bar from "../Home Page/Gold_bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const navigation = useNavigation();
  const [userDocuments, setUserDocuments] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const handleFetch = async () => {
    try {
      const storedData = await AsyncStorage.getItem("documents");

      if (storedData) {
        const parsedData: Document[] = JSON.parse(storedData);

        setUserDocuments(parsedData);
      } else {
        console.log("No saved documents found");
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };
  const handleDocumentClick = async (document: any) => {
    try {
      if (!document.uri) {
        alert("No valid URI found");
        return;
      }

      if (Platform.OS === "web") {
        // If it's a remote file, try using a proxy for CORS issues
        if (document.uri.startsWith("http")) {
          await Linking.openURL(
            `https://cors-anywhere.herokuapp.com/${document.uri}`
          );
        } else {
          // For local files, use blob URLs
          const response = await fetch(document.uri);
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        }
      } else {
        // For Android and iOS
        const fileInfo = await FileSystem.getInfoAsync(document.uri);

        if (fileInfo.exists) {
          await Sharing.shareAsync(document.uri);
        } else {
          alert("File not found");
        }
      }
    } catch (error) {
      console.error("Error opening document:", error);
      alert("Failed to open document");
    }
  };
  useEffect(() => {
    handleFetch();
  }, []);
  const filteredDocuments = userDocuments.filter((document) =>
    document.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <SafeAreaView style={styles.safeArea}>
      <Gold_bar />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header with Back Navigation */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#004080" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Medical Reports</Text>
        </View>
        {filteredDocuments.length > 0 ? (
          <FlatList
            data={filteredDocuments}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.documentItem}
                onPress={() => handleDocumentClick(item)}
              >
                <Image
                  source={require("../../assets/images/page1.jpg")}
                  style={styles.documentImage}
                />
                <Text style={styles.documentTitle}>{item.name}</Text>
                <Text style={styles.documentDate}>Uploaded: {item.date}</Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <View style={styles.noDocumentsContainer}>
            <Image
              source={require("../../assets/images/page1.jpg")}
              style={styles.noDocumentsImage}
            />
            <Text style={styles.noDocumentsText}>0 Documents</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flexGrow: 1,
    padding: 25,
    marginTop: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    padding: 5, // Makes the touch area larger
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#063247",
    marginLeft: 10, // Adds spacing between the back icon and text
  },
  searchContainer: {
    backgroundColor: "#0C3C5F",
    padding: scale(16),
    borderRadius: scale(12),
    marginBottom: scale(16),
  },
  searchBar: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(12),
    borderRadius: scale(50),
    height: scale(40),
  },
  searchInput: {
    marginLeft: scale(10),
    flex: 1,
    fontSize: scale(16),
  },
  documentActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scale(16),
  },
  documentCount: {
    fontSize: scale(18),
    fontWeight: "600",
  },
  sortActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  sortText: {
    fontSize: scale(16),
    color: "gray",
    marginRight: scale(8),
  },
  addButton: {
    marginLeft: scale(12),
    backgroundColor: "#0C3C5F",
    borderRadius: scale(50),
    padding: scale(8),
    alignItems: "center",
    justifyContent: "center",
    width: scale(32),
    height: scale(32),
  },
  documentItem: {
    backgroundColor: "white",
    padding: scale(8),
    marginHorizontal: scale(4),
    marginBottom: scale(16),
    width: "48%",
    borderRadius: scale(8),
  },
  documentImage: {
    width: "100%",
    height: scale(100),
    borderRadius: scale(8),
  },
  documentTitle: {
    fontSize: scale(14),
    fontWeight: "600",
    marginTop: scale(8),
  },
  documentDate: {
    fontSize: scale(12),
    color: "gray",
  },
  noDocumentsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDocumentsImage: {
    width: scale(120),
    height: scale(120),
    marginBottom: scale(12),
  },
  noDocumentsText: {
    fontSize: scale(16),
    color: "gray",
    marginBottom: scale(12),
  },
  floatingMenuOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  floatingMenu: {
    backgroundColor: "white",
    padding: scale(16),
    borderRadius: scale(8),
  },
  menuTitle: {
    fontSize: scale(18),
    fontWeight: "600",
    marginBottom: scale(8),
  },
  menuItem: {
    fontSize: scale(16),
    paddingVertical: scale(8),
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: scale(20),
    borderRadius: scale(8),
    alignItems: "center",
  },
  modalTitle: {
    fontSize: scale(18),
    fontWeight: "bold",
    marginBottom: scale(10),
  },
  modalText: {
    fontSize: scale(16),
    marginBottom: scale(5),
  },
  closeButton: {
    marginTop: scale(10),
    padding: scale(10),
    backgroundColor: "#0C3C5F",
    borderRadius: scale(5),
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
