import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Animated
} from "react-native";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { formatTimestamp } from "@/api/other";
import { getAllChatAPI, newChatAPI } from "@/api/chatBotAPI";
import { useResponsive } from "../../hooks/useresponsive";

type Message = {
  text: string;
  sender: "user" | "chatbot";
  timestamp: number;
};

const ChatScreen = () => {
  const navigation = useNavigation();
  const { scale, ms, vs } = useResponsive();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userTimestamp = Date.now();
    setMessages((prev) => [...prev, { text: input, sender: "user", timestamp: userTimestamp }]);

    try {
      const aiData = await newChatAPI({ text: input });
      const botReply = aiData.text;
      const chatTimestamp = Date.now();

      setMessages((prev) => [...prev, { text: botReply, sender: "chatbot", timestamp: chatTimestamp }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [...prev, { text: "Failed to reach the server. Please try again.", sender: "chatbot", timestamp: Date.now() }]);
    }

    setInput("");
  };

  const fetchChats = async () => {
    const oldChats = await getAllChatAPI();
    const formatted = oldChats.map((chat: any) => ({
      text: chat.text,
      sender: chat.sender === "chatbot" ? "chatbot" : ("user" as Message["sender"]),
      timestamp: Number(chat.timestamp),
    }));
    setMessages(formatted);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={
        item.sender === "user" ? styles.userMessageContainer : styles.botMessageContainer
      }
    >
      {item.sender === "chatbot" && (
        <Ionicons
          name="chatbubbles-outline"
          size={scale(24)}
          color="#0E3A5F"
          style={{ marginRight: scale(10) }}
        />
      )}
      <View
        style={
          item.sender === "user"
            ? [styles.userMessage, { padding: vs(10), borderRadius: ms(15) }]
            : [styles.botMessage, { padding: vs(10), borderRadius: ms(15) }]
        }
      >
        <Text
          style={
            item.sender === "user"
              ? [styles.userText, { fontSize: ms(14) }]
              : [styles.botText, { fontSize: ms(14) }]
          }
        >
          {item.text}
        </Text>
        <View style={{ alignSelf: "flex-end", marginTop: vs(5) }}>
          <Text style={[styles.timestamp, { fontSize: ms(10) }]}> 
            {formatTimestamp(item.timestamp)}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#f8f9fa", padding: ms(16) }}
    >
      <View style={[styles.header, {marginTop: vs(12)}]}>
        <FontAwesome
          name="arrow-left"
          size={ms(20)}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text style={[styles.title, { fontSize: ms(22), marginTop: vs(10) }]}>Med AI Bot</Text>
        <View style={{ width: ms(20) }} />
      </View>

      <Text style={[styles.subtitle, { fontSize: ms(14) }]}>Your medical AI companion</Text>
      <View style={{ borderBottomWidth: 1, borderBottomColor: "#ccc", marginVertical: vs(10) }} />

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: vs(10) }}
        keyboardShouldPersistTaps="handled"
      />

      <View style={[styles.inputContainer, { paddingVertical: vs(10), borderRadius: ms(50) }]}>
        <TouchableOpacity>
          <Feather name="camera" size={ms(24)} color="#555" />
        </TouchableOpacity>
        <TextInput
          placeholder="Type Something..."
          style={[styles.input, { fontSize: ms(14), marginHorizontal: ms(10) }]}
          placeholderTextColor="#555"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Feather name="send" size={ms(24)} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  title: {
    fontWeight: "bold",
    color: "#111",
  },
  subtitle: {
    textAlign: "center",
    color: "#555",
    marginBottom: 5,
  },
  botMessageContainer: {
    alignItems: "flex-start",
    marginTop: 10,
    flexDirection: "row",
  },
  userMessageContainer: {
    alignItems: "flex-end",
    marginTop: 10,
  },
  botMessage: {
    flexDirection: "column",
    backgroundColor: "#E5E7EB",
    maxWidth: "85%",
    alignItems: "flex-start",
    paddingBottom: 4,
  },
  userMessage: {
    flexDirection: "row",
    backgroundColor: "#007AFF",
    maxWidth: "75%",
    alignItems: "center",
  },
  botText: {
    color: "#333",
  },
  userText: {
    color: "#fff",
  },
  timestamp: {
    color: "#888",
    textAlign: "right",
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  input: {
    flex: 1,
    color: "#333",
  },
});

export default ChatScreen;

