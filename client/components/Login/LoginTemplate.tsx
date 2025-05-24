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
  SafeAreaView,
  Keyboard,
} from "react-native";
import { useResponsive } from "../../hooks/useresponsive";
import { useNavigation } from "@react-navigation/native";

interface LoginTemplateProps {
  title: string;
  subtitle: string;
  buttonText: string;
  onProfilePage: () => void;
  onVerifyPage: () => void;
  onHomePage: () => void;
  imageSource: any;
}

export default function LoginTemplate({
  title,
  subtitle,
  buttonText,
  onVerifyPage,
  onProfilePage,
  onHomePage,
  imageSource,
}: LoginTemplateProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const { scale, vs, ms, isAndroid } = useResponsive();
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      if (!email || !password || !confirmPassword) {
        return alert("Please fill all fields.");
      }
      if (password !== confirmPassword) {
        return alert("Passwords do not match.");
      }

      const result = await loginSignup({ email, password, confirmPassword });
      if (!result) {
        alert("Login failed. Please try again.");
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
      }
    } catch (err) {
      alert("An error occurred during login.");
      console.error(err);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={isAndroid ? vs(20) : 0}
      >
        <ScrollView
          contentContainerStyle={[styles.scrollContainer, {  paddingBottom: Math.min(vs(60), 40) }]}
          keyboardShouldPersistTaps="handled"
        >
          {/* Optional Back Button Area */}
          <View style={[styles.backButton, { height: vs(24) }]}>
            <TouchableOpacity>
              {/* Back icon goes here if needed */}
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.contentContainer}>
            <Text style={[styles.title, { fontSize: ms(28), marginBottom: vs(0), marginTop: vs(52) }]}>
              {title}
            </Text>
            <Text style={[styles.subtitle, { fontSize: ms(15), marginBottom: vs(24), marginTop: vs(4)
             }]}>
              {subtitle}
            </Text>

            <TextInput
              placeholder="Enter Email ID"
              style={[styles.input, { fontSize: ms(16), paddingBottom: vs(6) }]}
              keyboardType="email-address"
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#9CA3AF"
            />

            <TextInput
              placeholder="Enter Password"
              onChangeText={setPassword}
              style={[styles.input, { fontSize: ms(16), marginTop: vs(24), paddingBottom: vs(6) }]}
              secureTextEntry
              placeholderTextColor="#9CA3AF"
            />

            <TextInput
              placeholder="Confirm Password"
              onChangeText={setConfirmPassword}
              style={[styles.input, { fontSize: ms(16), marginTop: vs(24), paddingBottom: vs(6) }]}
              secureTextEntry
              placeholderTextColor="#9CA3AF"
            />

            <TouchableOpacity
              style={[
                styles.button,
                {
                  borderRadius: ms(25),
                  paddingVertical: vs(14),
                  marginTop: vs(24),
                },
              ]}
              onPress={handleLogin}
            >
              <Text style={[styles.buttonText, { fontSize: ms(16) }]}>{buttonText}</Text>
            </TouchableOpacity>

            <View style={[styles.loginContainer, { marginTop: vs(12) }]}>
              <Text style={[styles.loginText, { fontSize: ms(14) }]}>
                Login to your corporate account.
              </Text>
              <TouchableOpacity onPress={()=>navigation.navigate("HomeTemplate" as never)}>
                <Text style={[styles.loginLink, { fontSize: ms(14) }]}>Login here</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom Image */}
          <View style={[styles.imageContainer, { marginBottom: vs(20) }]}>
            <Image
              source={imageSource}
              style={{
                width: scale(250),
                height: vs(346),
                maxWidth: "100%",
              }}
              resizeMode="contain"
            />
          </View>
        </ScrollView>

        {/* Bottom Indicator Bar */}
        <View style={[styles.bottomBar, { height: vs(60) }]}>
          <View
            style={[
              styles.bottomIndicator,
              {
                width: scale(200),
                height: vs(5),
                borderRadius: ms(10),
              },
            ]}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
    justifyContent: "center",
  },
  contentContainer: {
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    color: "#002D3D",
    textAlign: "center",
  },
  subtitle: {
    color: "#9CA3AF",
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    textAlign: "center",
    color: "#000",
  },
  button: {
    backgroundColor: "#002D3D",
    width: "100%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "500",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  loginText: {
    color: "#9CA3AF",
  },
  loginLink: {
    color: "#002D3D",
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  imageContainer: {
    alignItems: "center",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomIndicator: {
    backgroundColor: "#9CA3AF",
  },
});
