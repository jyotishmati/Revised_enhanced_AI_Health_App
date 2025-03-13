import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { verify } from "crypto";
import { verifyEmail } from "@/api/loginAPI";
export default function VerificationScreen() {
  const [otp, setOtp] = useState<string>("");
  const navigation = useNavigation();

  const handleOTP = async () => {
    try {
      if (!otp) {
        alert("Enter OTP");
        return;
      }

      const otpNumber = parseInt(otp, 10);
      console.log("Working 1");

      const res = await verifyEmail({ otp: otpNumber });
      if(!res){
        navigation.navigate("Login/Signup" as never);
        return;
      }
      if (!res.isCompleteUserDetails) {
        navigation.navigate("Profile" as never);
        return;
      }
      navigation.navigate("HomeTemplate" as never)
      return;
    } catch (err: any) {
      alert(err.message || "An error occurred");
      if(err.message == "Invalid or Expired Token"){
        navigation.navigate("Login/Signup" as never);
        return;
      }
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
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.backButton}>
            <TouchableOpacity>
              {/* Back button icon can be added here */}
            </TouchableOpacity>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.title}>Verification Code</Text>
            <Text style={styles.subtitle}>
              Please enter verification code, we sent it to your Number: +91
              9876543210
            </Text>

            <TextInput
              placeholder="Enter OTP"
              style={styles.input}
              keyboardType="number-pad"
              value={otp}
              onChangeText={(text) => setOtp(text.replace(/[^0-9]/g, ""))}
              placeholderTextColor="#9CA3AF"
            />

            <TouchableOpacity style={styles.button} onPress={handleOTP}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>
                Login to your corporate account.
              </Text>
              <TouchableOpacity>
                <Text style={styles.loginLink}>Login here</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/images/login.png")}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        </ScrollView>

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
