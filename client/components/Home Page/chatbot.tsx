import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons"; 

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Med AI Bot</Text>
      <Text style={styles.subtitle}>Your medical AI companion</Text>
      <View style={styles.underline} />

      <View style={styles.botMessageContainer}>
        <View style={styles.botMessage}>
          <Image
            source={require("../../assets/images/bot-icion.png")} 
            style={styles.botIcon}
          />
          <Text style={styles.botText}>
            Hello Nandan! 👋{"\n"}How may I help you today?
          </Text>
        </View>
      </View>

      {/* User Message */}
      <View style={styles.userMessageContainer}>
        <View style={styles.userMessage}>
          <Text style={styles.userText}>
            Hello! How’s my health progress so far? Am I healthier or not?
          </Text>
          <View style={styles.userIcon}>
            <Feather name="user" size={14} color="#333" />
          </View>
        </View>
      </View>

      {/* Input Bar */}
      <View style={styles.inputContainer}>
        <TouchableOpacity>
          <Feather name="camera" size={20} color="#555" />
        </TouchableOpacity>
        <TextInput
          placeholder="Type Something..."
          style={styles.input}
          placeholderTextColor="#555"
        />
        <TouchableOpacity>
          <Feather name="send" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 10,
  },
  botMessageContainer: {
    alignItems: "flex-start",
    marginTop: 10,
  },
  botMessage: {
    flexDirection: "row",
    backgroundColor: "#E5E7EB",
    padding: 10,
    borderRadius: 15,
    maxWidth: "75%",
    alignItems: "center",
  },
  botIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  botText: {
    color: "#333",
    fontSize: 14,
  },
  userMessageContainer: {
    alignItems: "flex-end",
    marginTop: 10,
  },
  userMessage: {
    flexDirection: "row",
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 15,
    maxWidth: "75%",
    alignItems: "center",
  },
  userText: {
    color: "#fff",
    fontSize: 14,
  },
  userIcon: {
    backgroundColor: "#fff",
    borderRadius: 50,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  inputContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    marginHorizontal: 10,
  },
});

export default ChatScreen;

//includes older messages
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Image,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import { Feather } from "@expo/vector-icons";

// const ChatScreen = ({ selectedDate }) => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     fetch(`http://localhost:5000/api/chat/getByDate/${selectedDate}`)
//       .then((res) => res.json())
//       .then((data) => setMessages(data.data))
//       .catch((err) => console.log(err));
//   }, [selectedDate]);

//   const renderMessage = ({ item }) => (
//     <View
//       style={
//         item.senderId === "bot"
//           ? styles.botMessageContainer
//           : styles.userMessageContainer
//       }
//     >
//       <View
//         style={
//           item.senderId === "bot" ? styles.botMessage : styles.userMessage
//         }
//       >
//         {item.senderId === "bot" && (
//           <Image
//             source={require("../../assets/images/bot-icon.png")}
//             style={styles.botIcon}
//           />
//         )}
//         <Text style={item.senderId === "bot" ? styles.botText : styles.userText}>
//           {item.message} ({new Date(item.createdAt).toLocaleTimeString()})
//         </Text>
//         {item.senderId !== "bot" && (
//           <View style={styles.userIcon}>
//             <Feather name="user" size={14} color="#333" />
//           </View>
//         )}
//       </View>
//     </View>
//   );

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={styles.container}
//     >
//       <Text style={styles.title}>Med AI Bot</Text>
//       <Text style={styles.subtitle}>Your medical AI companion</Text>
//       <View style={styles.underline} />

//       {/* Chat Messages */}
//       <FlatList
//         data={messages}
//         keyExtractor={(item) => item._id}
//         renderItem={renderMessage}
//         contentContainerStyle={{ paddingBottom: 80 }}
//       />

//       {/* Input Bar */}
//       <View style={styles.inputContainer}>
//         <TouchableOpacity>
//           <Feather name="camera" size={20} color="#555" />
//         </TouchableOpacity>
//         <TextInput
//           placeholder="Type Something..."
//           style={styles.input}
//           placeholderTextColor="#555"
//         />
//         <TouchableOpacity>
//           <Feather name="send" size={20} color="#007AFF" />
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8f9fa",
//     padding: 20,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#111",
//   },
//   subtitle: {
//     fontSize: 14,
//     color: "#555",
//     marginBottom: 5,
//   },
//   underline: {
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//     marginVertical: 10,
//   },
//   botMessageContainer: {
//     alignItems: "flex-start",
//     marginTop: 10,
//   },
//   botMessage: {
//     flexDirection: "row",
//     backgroundColor: "#E5E7EB",
//     padding: 10,
//     borderRadius: 15,
//     maxWidth: "75%",
//     alignItems: "center",
//   },
//   botIcon: {
//     width: 25,
//     height: 25,
//     marginRight: 10,
//   },
//   botText: {
//     color: "#333",
//     fontSize: 14,
//   },
//   userMessageContainer: {
//     alignItems: "flex-end",
//     marginTop: 10,
//   },
//   userMessage: {
//     flexDirection: "row",
//     backgroundColor: "#007AFF",
//     padding: 10,
//     borderRadius: 15,
//     maxWidth: "75%",
//     alignItems: "center",
//   },
//   userText: {
//     color: "#fff",
//     fontSize: 14,
//   },
//   userIcon: {
//     backgroundColor: "#fff",
//     borderRadius: 50,
//     width: 25,
//     height: 25,
//     justifyContent: "center",
//     alignItems: "center",
//     marginLeft: 10,
//   },
//   inputContainer: {
//     position: "absolute",
//     bottom: 20,
//     left: 20,
//     right: 20,
//     backgroundColor: "#fff",
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     borderRadius: 50,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   input: {
//     flex: 1,
//     fontSize: 14,
//     color: "#333",
//     marginHorizontal: 10,
//   },
// });

// export default ChatScreen;