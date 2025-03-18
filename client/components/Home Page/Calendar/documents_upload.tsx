// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Modal,
//   Image,
//   TextInput,
//   StyleSheet,
//   Alert,
// } from "react-native";
// import { Ionicons, FontAwesome } from "@expo/vector-icons";
// import * as DocumentPicker from "expo-document-picker";
// import * as FileSystem from "expo-file-system";
// import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
// import { RootStackParamList } from "./types"; // adjust the path as needed

// type DocumentManagerRouteProp = RouteProp<
//   RootStackParamList,
//   "DocumentManagerScreen"
// >;

// const DocumentManagerScreen: React.FC = () => {
//   const route = useRoute<DocumentManagerRouteProp>();
//   const navigation = useNavigation();
//   // Retrieve the date passed from CalendarScreen (if any)
//   const selectedDateParam = route.params?.date ?? null;

//   const [userDocuments, setUserDocuments] = useState<any[]>([]);
//   const [search, setSearch] = useState("");
//   const [isFloatingMenuVisible, setFloatingMenuVisible] = useState(false);
//   const [selectedDocument, setSelectedDocument] = useState<any | null>(null);
//   const [isModalVisible, setModalVisible] = useState(false);

//   // Handle File Upload
// const handleUpload = async () => {
//   if (!selectedDateParam) {
//     Alert.alert(
//       "No date selected",
//       "Please go back and select a date from the calendar first."
//     );
//     return;
//   }

//   const result = await DocumentPicker.getDocumentAsync({
//     type: "application/pdf",
//   });

//   if (result.canceled) return;

//   const newDocument = {
//     id: `${userDocuments.length + 1}`,
//     name: result.assets[0].name,
//     date: selectedDateParam, // Use the selected date from the calendar
//   };

//   // Log the document details (file name and date)
//   console.log("Uploaded file:", newDocument.name, "on date:", newDocument.date);

//   setUserDocuments((prevDocs) => [...prevDocs, newDocument]);
//   setFloatingMenuVisible(false);
// };

//   // Function to send documents to backend
//   // const sendDocumentsToBackend = async (documents: any[]) => {
//   //   try {
//   //     const response = await fetch("https://your-backend.com/api/documents", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({ documents }),
//   //     });

//   //     if (!response.ok) {
//   //       throw new Error("Failed to send documents to backend");
//   //     }
//   //     const responseData = await response.json();
//   //     console.log("Documents sent successfully:", responseData);
//   //   } catch (error) {
//   //     console.error("Error sending documents:", error);
//   //   }
//   // };

//   // // Automatically send updated documents to backend when they change
//   // useEffect(() => {
//   //   if (userDocuments.length > 0) {
//   //     sendDocumentsToBackend(userDocuments);
//   //   }
//   // }, [userDocuments]);

//   // Handle click on a document to view details
//   const handleDocumentClick = (document: any) => {
//     setSelectedDocument(document);
//     setModalVisible(true);
//   };

//   // Filter documents based on search input
//   const filteredDocuments = userDocuments.filter((document) =>
//     document.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="#0C3C5F" />
//         </TouchableOpacity>
//         <Text style={styles.headerText}>Document Manager</Text>
//       </View>

//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <View style={styles.searchBar}>
//           <FontAwesome name="search" size={18} color="gray" />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search document"
//             value={search}
//             onChangeText={setSearch}
//           />
//         </View>
//       </View>

//       {/* Document Count & Actions */}
//       <View style={styles.documentActions}>
//         <Text style={styles.documentCount}>
//           {filteredDocuments.length} Documents
//         </Text>
//         <View style={styles.sortActions}>
//           <Text style={styles.sortText}>Default</Text>
//           <Ionicons name="swap-vertical" size={18} color="gray" />
//           <TouchableOpacity
//             style={styles.addButton}
//             onPress={() => setFloatingMenuVisible(true)}
//           >
//             <Ionicons name="add" size={18} color="white" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Document Grid */}
//       {filteredDocuments.length > 0 ? (
//         <FlatList
//           data={filteredDocuments}
//           keyExtractor={(item) => item.id}
//           numColumns={2}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.documentItem}
//               onPress={() => handleDocumentClick(item)}
//             >
//               <Image
//                 source={require("../../../assets/images/page1.jpg")}
//                 style={styles.documentImage}
//               />
//               <Text style={styles.documentTitle}>{item.name}</Text>
//               <Text style={styles.documentDate}>Uploaded: {item.date}</Text>
//             </TouchableOpacity>
//           )}
//         />
//       ) : (
//         <View style={styles.noDocumentsContainer}>
//           <Image
//             source={require("../../../assets/images/page1.jpg")}
//             style={styles.noDocumentsImage}
//           />
//           <Text style={styles.noDocumentsText}>0 Documents</Text>
//         </View>
//       )}

//       {/* Floating Menu for Upload */}
//       <Modal visible={isFloatingMenuVisible} animationType="fade" transparent>
//         <TouchableOpacity
//           style={styles.floatingMenuOverlay}
//           activeOpacity={1}
//           onPress={() => setFloatingMenuVisible(false)}
//         >
//           <View style={styles.floatingMenu}>
//             <Text style={styles.menuTitle}>Select Upload Option</Text>
//             <TouchableOpacity onPress={handleUpload}>
//               <Text style={styles.menuItem}>Upload File</Text>
//             </TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       </Modal>

//       {/* Document Details Modal */}
//       <Modal visible={isModalVisible} animationType="slide" transparent>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Document Details</Text>
//             {selectedDocument && (
//               <>
//                 <Text style={styles.modalText}>
//                   Name: {selectedDocument.name}
//                 </Text>
//                 <Text style={styles.modalText}>
//                   Date: {selectedDocument.date}
//                 </Text>
//               </>
//             )}
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setModalVisible(false)}
//             >
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default DocumentManagerScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#F5F5F5", padding: 16 },
//   header: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
//   headerText: { marginLeft: 12, fontSize: 18, fontWeight: "600", color: "#0C3C5F" },
//   searchContainer: {
//     backgroundColor: "#0C3C5F",
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 16,
//   },
//   searchBar: {
//     backgroundColor: "white",
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 12,
//     borderRadius: 50,
//     height: 40,
//   },
//   searchInput: { marginLeft: 10, flex: 1, fontSize: 16 },
//   documentActions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   documentCount: { fontSize: 18, fontWeight: "600" },
//   sortActions: { flexDirection: "row", alignItems: "center" },
//   sortText: { fontSize: 16, color: "gray", marginRight: 8 },
//   addButton: {
//     marginLeft: 12,
//     backgroundColor: "#0C3C5F",
//     borderRadius: 50,
//     padding: 8,
//     alignItems: "center",
//     justifyContent: "center",
//     width: 32,
//     height: 32,
//   },
//   documentItem: {
//     backgroundColor: "white",
//     padding: 8,
//     marginHorizontal: 4,
//     marginBottom: 16,
//     width: "48%",
//     borderRadius: 8,
//   },
//   documentImage: { width: "100%", height: 100, borderRadius: 8 },
//   documentTitle: { fontSize: 14, fontWeight: "600", marginTop: 8 },
//   documentDate: { fontSize: 12, color: "gray" },
//   noDocumentsContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
//   noDocumentsImage: { width: 120, height: 120, marginBottom: 12 },
//   noDocumentsText: { fontSize: 16, color: "gray", marginBottom: 12 },
//   floatingMenuOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   floatingMenu: { backgroundColor: "white", padding: 16, borderRadius: 8 },
//   menuTitle: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
//   menuItem: { fontSize: 16, paddingVertical: 8 },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   modalContent: { backgroundColor: "white", padding: 20, borderRadius: 8, alignItems: "center" },
//   modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
//   modalText: { fontSize: 16, marginBottom: 5 },
//   closeButton: { marginTop: 10, padding: 10, backgroundColor: "#0C3C5F", borderRadius: 5 },
//   closeButtonText: { color: "white", fontWeight: "bold" },
// });

// import * as Linking from "expo-linking";
import { Platform, Linking } from "react-native";

import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
  TextInput,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";

import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";

type DocumentManagerRouteProp = RouteProp<
  RootStackParamList,
  "DocumentManagerScreen"
>;

const { width } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size; // Base width is 375
type Document = {
  id: string;
  name: string;
  date: string;
  uri: string;
};

const DocumentManagerScreen: React.FC = () => {
 
  const route = useRoute<DocumentManagerRouteProp>();
  const navigation = useNavigation();
  // Retrieve the date passed from CalendarScreen (if any)
  const selectedDateParam = route.params?.date ?? null;
  console.log(selectedDateParam);

  const [userDocuments, setUserDocuments] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [isFloatingMenuVisible, setFloatingMenuVisible] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const handleUpload = async () => {
    if (!selectedDateParam) {
      Alert.alert(
        "No date selected",
        "Please go back and select a date from the calendar first."
      );
      return;
    }

    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (result.canceled) return;

      const newDocument: Document = {
        id: `${Date.now()}`,
        name: result.assets[0].name,
        date: selectedDateParam,
        uri: result.assets[0].uri,
      };

      const updatedDocuments = [...userDocuments, newDocument];

      await AsyncStorage.setItem("documents", JSON.stringify(updatedDocuments));

      setUserDocuments(updatedDocuments);
      console.log(
        "Uploaded file:",
        newDocument.name,
        "on date:",
        newDocument.date
      );
    } catch (error) {
      console.error("Error uploading document:", error);
      Alert.alert("Error", "Failed to upload document.");
    }
  };

  const handleFetch = async () => {
    try {
      const storedData = await AsyncStorage.getItem("documents");

      if (storedData) {
        const parsedData: Document[] = JSON.parse(storedData);

        const filteredDocuments = parsedData.filter(
          (doc) => doc.date === selectedDateParam
        );

        setUserDocuments(filteredDocuments);
        console.log(
          "Fetched documents for date:",
          selectedDateParam,
          filteredDocuments
        );
      } else {
        console.log("No saved documents found");
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);
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

  const filteredDocuments = userDocuments.filter((document) =>
    document.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={scale(24)} color="#0C3C5F" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Document Manager</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <FontAwesome name="search" size={scale(18)} color="gray" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search document"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* Document Count & Actions */}
      <View style={styles.documentActions}>
        <Text style={styles.documentCount}>
          {filteredDocuments.length} Documents
        </Text>
        <View style={styles.sortActions}>
          <Text style={styles.sortText}>Default</Text>
          <Ionicons name="swap-vertical" size={scale(18)} color="gray" />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setFloatingMenuVisible(true)}
          >
            <Ionicons name="add" size={scale(18)} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Document Grid */}
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
                source={require("../../../assets/images/page1.jpg")}
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
            source={require("../../../assets/images/page1.jpg")}
            style={styles.noDocumentsImage}
          />
          <Text style={styles.noDocumentsText}>0 Documents</Text>
        </View>
      )}

      {/* Floating Menu for Upload */}
      <Modal visible={isFloatingMenuVisible} animationType="fade" transparent>
        <TouchableOpacity
          style={styles.floatingMenuOverlay}
          activeOpacity={1}
          onPress={() => setFloatingMenuVisible(false)}
        >
          <View style={styles.floatingMenu}>
            <Text style={styles.menuTitle}>Select Upload Option</Text>
            <TouchableOpacity onPress={handleUpload}>
              <Text style={styles.menuItem}>Upload File</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Document Details Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Document Details</Text>
            {selectedDocument && (
              <>
                <Text style={styles.modalText}>
                  Name: {selectedDocument.name}
                </Text>
                <Text style={styles.modalText}>
                  Date: {selectedDocument.date}
                </Text>
              </>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DocumentManagerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: scale(16),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scale(16),
  },
  headerText: {
    marginLeft: scale(12),
    fontSize: scale(18),
    fontWeight: "600",
    color: "#0C3C5F",
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
