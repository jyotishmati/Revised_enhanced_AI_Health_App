import { loginSignup } from "@/api/loginAPI";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

interface LoginTemplateProps {
  title: string;
  subtitle: string;
  buttonText: string;
  // onButtonPress: () => void;
  // onLoginPress: () => void;
  onProfilePage: () => void;
  onVerifyPage: () => void;
  onHomePage: () => void;
  imageSource: any;
}

export default function LoginTemplate({
  title,
  subtitle,
  buttonText,
  // onButtonPress,
  // onLoginPress,
  onVerifyPage,
  onProfilePage,
  onHomePage,
  imageSource,
}: LoginTemplateProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const handleLogin = async () => {
    try {
      if (!email || !password) {
        return alert("Fields are Empty");
      }
      const result = await loginSignup({ email, password, confirmPassword });
      if (!result) {
        alert("Problem in the Login!!");
        return;
      }
      if (!result.verifyEmail) {
        onVerifyPage();
        return;
      }
      if (!result.isCompleteUserDetails) {
        onProfilePage();
        return;
      }
      if (result.isValid) {
        onHomePage();
        return;
      }
    } catch (err) {
      alert("Problem in the Login!!");
      console.error(err);
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      <View style={{ flex: 1 }}>
        {/* Scrollable Content */}
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back button area */}
          <View style={styles.backButton}>
            <TouchableOpacity>
              {/* Back button icon can be added here */}
            </TouchableOpacity>
          </View>

          {/* Main content */}
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>

            {/* Input fields */}
            <TextInput
              placeholder="Enter Email ID"
              style={styles.input}
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#9CA3AF"
            />

            <TextInput
              placeholder="Enter Password"
              onChangeText={(text) => setPassword(text)}
              style={[styles.input, { marginTop: 24 }]}
              secureTextEntry
              placeholderTextColor="#9CA3AF"
            />

            <TextInput
              placeholder="Confirm Password"
              onChangeText={(text) => setConfirmPassword(text)}
              style={[styles.input, { marginTop: 24 }]}
              secureTextEntry
              placeholderTextColor="#9CA3AF"
            />

            {/* Send OTP Button */}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>

            {/* Login link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>
                Login to your corporate account.
              </Text>
              <TouchableOpacity>
                <Text style={styles.loginLink}>Login here</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom Image */}
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/images/login.png")}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        </ScrollView>

        {/* Fixed Bottom Bar */}
        <View style={styles.bottomBar}>
          <View style={styles.bottomIndicator} />
        </View>
      </View>
      {/* </TouchableWithoutFeedback> */}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  backButton: {
    height: 24,
    justifyContent: "center",
  },
  contentContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#002D3D",
    textAlign: "center",
    marginBottom: 0,
  },
  subtitle: {
    fontSize: 15,
    color: "#9CA3AF",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 6,
    fontSize: 16,
    textAlign: "center",
    color: "#9CA3AF",
  },
  button: {
    backgroundColor: "#002D3D",
    borderRadius: 25,
    paddingVertical: 14,
    width: "100%",
    marginTop: 24,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    gap: 4,
  },
  loginText: {
    color: "#9CA3AF",
    fontSize: 14,
  },
  loginLink: {
    color: "#002D3D",
    fontSize: 14,
    fontWeight: "500",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
  image: {
    width: 250,
    height: 346,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 60,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomIndicator: {
    width: 200,
    height: 5,
    backgroundColor: "#9CA3AF",
    borderRadius: 10,
  },
});
