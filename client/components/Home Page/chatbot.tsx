import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import axios from "axios";
import { formatTimestamp } from "@/api/other";
import { getAllChatAPI, newChatAPI } from "@/api/chatBotAPI";
import { useNavigation } from "@react-navigation/native";
type Message = {
  text: string;
  sender: "user" | "chatbot";
  timestamp: number;
};

const ChatScreen = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! How are you?",
      sender: "user",
      timestamp: Date.now() - 60000,
    },
    {
      text: "I'm doing well, thank you! How can I assist you today?",
      sender: "chatbot",
      timestamp: Date.now() - 50000,
    },
  ]);
  const [input, setInput] = useState("");
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userTimestamp = Date.now();

    setMessages((prev) => [
      ...prev,
      { text: input, sender: "user", timestamp: userTimestamp },
    ]);
    try {
      const aiData = await newChatAPI({ text: input });

      const botReply = aiData.text;
      const chatTimestamp = Date.now();
      setMessages((prev) => [
        ...prev,
        { text: botReply, sender: "chatbot", timestamp: chatTimestamp },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Failed to reach the server. Please try again.",
          sender: "chatbot",
          timestamp: Date.now(),
        },
      ]);
    }

    setInput("");
  };
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const fetchOldData = async () => {
      const oldChatDetails = await getAllChatAPI();
  
      const formattedChats: Message[] = oldChatDetails.map((chat) => ({
        text: chat.text,
        sender: chat.sender === "chatbot" ? "chatbot" : "user", 
        timestamp: Number(chat.timestamp), 
      }));
  
      setMessages(formattedChats);
    };
  
    fetchOldData();
  }, []);
  
  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={
        item.sender === "user"
          ? styles.userMessageContainer
          : styles.botMessageContainer
      }
    >
      {item.sender === "chatbot" && (
        <Image
          source={require("../../assets/images/bot-icion.png")}
          style={styles.botIcon}
        />
      )}
      <View
        style={item.sender === "user" ? styles.userMessage : styles.botMessage}
      >
        <Text style={item.sender === "user" ? styles.userText : styles.botText}>
          {item.text}
        </Text>
        <Text style={styles.timestamp}>{formatTimestamp(item.timestamp)}</Text>
        {item.sender === "user" && (
          <View style={styles.userIcon}>
            <Feather name="user" size={14} color="#333" />
          </View>
        )}
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.header}>
        <FontAwesome name="arrow-left" size={20} color="black" onPress={() => navigation.goBack()}/>
      <Text style={styles.title}>Med AI Bot</Text>
        {/* <Text style={styles.headerTitle}>Master Health Vault</Text> */}
        <View style={styles.iconGroup}>
        </View>
      </View>
      <Text style={styles.subtitle}>Your medical AI companion</Text>
      <View style={styles.underline} />

      {/* <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.messageList}
        initialScrollIndex={messages.length - 1}
        getItemLayout={(data, index) => ({
          length: 60,
          offset: 60 * index,
          index,
        })}
      /> */}
        <FlatList
    ref={flatListRef}
    data={messages}
    renderItem={renderItem}
    keyExtractor={(_, index) => index.toString()}
    contentContainerStyle={styles.messageList}
    // inverted
    keyboardShouldPersistTaps="handled" 
  />


      {/* Input Bar */}
      <View style={styles.inputContainer}>
        <TouchableOpacity>
          <Feather name="camera" size={24} color="#555" />
        </TouchableOpacity>
        <TextInput
          placeholder="Type Something..."
          style={styles.input}
          placeholderTextColor="#555"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Feather name="send" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 40,
    paddingBottom:70
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  iconGroup: {
    flexDirection: "row",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
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
  messageList: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  botMessage: {
    flexDirection: "row",
    backgroundColor: "#E5E7EB",
    padding: 10,
    borderRadius: 15,
    maxWidth: "75%",
    alignItems: "center",
  },
  timestamp: {
    fontSize: 10,
    color: "#888",
    marginTop: 10, 
    marginLeft: 5,
    textAlign: "right",
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
