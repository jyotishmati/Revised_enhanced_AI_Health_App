// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   TouchableWithoutFeedback,
//   Keyboard,
//   Image,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { verify } from "crypto";
// import { verifyEmail } from "@/api/loginAPI";
// export default function VerificationScreen() {
//   const [otp, setOtp] = useState<string>("");
//   const navigation = useNavigation();

//   const handleOTP = async () => {
//     try {
//       if (!otp) {
//         alert("Enter OTP");
//         return;
//       }

//       const otpNumber = parseInt(otp, 10);
//       console.log("Working 1");

//       const res = await verifyEmail({ otp: otpNumber });
//       if(!res){
//         navigation.navigate("Login/Signup" as never);
//         return;
//       }
//       if (!res.isCompleteUserDetails) {
//         navigation.navigate("Profile" as never);
//         return;
//       }
//       navigation.navigate("HomeTemplate" as never)
//       return;
//     } catch (err: any) {
//       alert(err.message || "An error occurred");
//       if(err.message == "Invalid or Expired Token"){
//         navigation.navigate("Login/Signup" as never);
//         return;
//       }
//       console.error(err);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
//       <View style={{ flex: 1 }}>
//         <ScrollView
//           contentContainerStyle={styles.scrollContainer}
//           keyboardShouldPersistTaps="handled"
//         >
//           <View style={styles.backButton}>
//             <TouchableOpacity>
//               {/* Back button icon can be added here */}
//             </TouchableOpacity>
//           </View>

//           <View style={styles.contentContainer}>
//             <Text style={styles.title}>Verification Code</Text>
//             <Text style={styles.subtitle}>
//               Please enter verification code, we sent it to your Number: +91
//               9876543210
//             </Text>

//             <TextInput
//               placeholder="Enter OTP"
//               style={styles.input}
//               keyboardType="number-pad"
//               value={otp}
//               onChangeText={(text) => setOtp(text.replace(/[^0-9]/g, ""))}
//               placeholderTextColor="#9CA3AF"
//             />

//             <TouchableOpacity style={styles.button} onPress={handleOTP}>
//               <Text style={styles.buttonText}>Continue</Text>
//             </TouchableOpacity>

//             <View style={styles.loginContainer}>
//               <Text style={styles.loginText}>
//                 Login to your corporate account.
//               </Text>
//               <TouchableOpacity>
//                 <Text style={styles.loginLink}>Login here</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           <View style={styles.imageContainer}>
//             <Image
//               source={require("../../assets/images/login.png")}
//               style={styles.image}
//               resizeMode="contain"
//             />
//           </View>
//         </ScrollView>

//         <View style={styles.bottomBar}>
//           <View style={styles.bottomIndicator} />
//         </View>
//       </View>
//       {/* </TouchableWithoutFeedback> */}
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     paddingHorizontal: 20,
//     justifyContent: "center",
//   },
//   backButton: {
//     height: 24,
//     justifyContent: "center",
//   },
//   contentContainer: {
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#002D3D",
//     textAlign: "center",
//     marginBottom: 0,
//   },
//   subtitle: {
//     fontSize: 15,
//     color: "#9CA3AF",
//     textAlign: "center",
//     marginBottom: 24,
//   },
//   input: {
//     width: "100%",
//     borderBottomWidth: 1,
//     borderBottomColor: "#E5E7EB",
//     paddingBottom: 6,
//     fontSize: 16,
//     textAlign: "center",
//     color: "#9CA3AF",
//   },
//   button: {
//     backgroundColor: "#002D3D",
//     borderRadius: 25,
//     paddingVertical: 14,
//     width: "100%",
//     marginTop: 24,
//   },
//   buttonText: {
//     color: "white",
//     textAlign: "center",
//     fontSize: 16,
//   },
//   loginContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 12,
//     gap: 4,
//   },
//   loginText: {
//     color: "#9CA3AF",
//     fontSize: 14,
//   },
//   loginLink: {
//     color: "#002D3D",
//     fontSize: 14,
//     fontWeight: "500",
//   },
//   imageContainer: {
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   image: {
//     width: 250,
//     height: 346,
//   },
//   bottomBar: {
//     position: "absolute",
//     bottom: 0,
//     width: "100%",
//     height: 60,
//     backgroundColor: "white",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   bottomIndicator: {
//     width: 200,
//     height: 5,
//     backgroundColor: "#9CA3AF",
//     borderRadius: 10,
//   },
// });


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
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { verifyEmail } from "@/api/loginAPI";
import { useResponsive } from "../../hooks/useresponsive";

export default function VerificationScreen() {
  const [otp, setOtp] = useState<string>("");
  const navigation = useNavigation();

  const { scale, vs, ms, isAndroid } = useResponsive();

  const handleOTP = async () => {
    try {
      if (!otp) {
        alert("Enter OTP");
        return;
      }

      const otpNumber = parseInt(otp, 10);
      const res = await verifyEmail({ otp: otpNumber });

      if (!res) {
        navigation.navigate("Login/Signup" as never);
        return;
      }
      if (!res.isCompleteUserDetails) {
        navigation.navigate("Profile" as never);
        return;
      }
      navigation.navigate("HomeTemplate" as never);
    } catch (err: any) {
      alert(err.message || "An error occurred");
      if (err.message === "Invalid or Expired Token") {
        navigation.navigate("Login/Signup" as never);
      }
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <ScrollView
              contentContainerStyle={[styles.scrollContainer, { paddingBottom: vs(80) }]}
              keyboardShouldPersistTaps="handled"
            >
              {/* Content */}
              <View style={styles.contentContainer}>
                <Text style={[styles.title, { fontSize: ms(28) }]}>Verification Code</Text>
                <Text style={[styles.subtitle, { fontSize: ms(15) }]}>
                  Please enter the verification code sent to your number: +91 9876543210
                </Text>

                <TextInput
                  placeholder="Enter OTP"
                  style={[styles.input, { fontSize: ms(16) }]}
                  keyboardType="number-pad"
                  value={otp}
                  onChangeText={(text) => setOtp(text.replace(/[^0-9]/g, ""))}
                  maxLength={6}
                  placeholderTextColor="#9CA3AF"
                />

                <TouchableOpacity
                  style={[styles.button, { borderRadius: ms(25), paddingVertical: vs(14), marginTop: vs(24) }]}
                  onPress={handleOTP}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.buttonText, { fontSize: ms(16) }]}>Continue</Text>
                </TouchableOpacity>

                <View style={[styles.loginContainer, { marginTop: vs(12) }]}>
                  <Text style={[styles.loginText, { fontSize: ms(14) }]}>
                    Login to your corporate account.
                  </Text>
                  <TouchableOpacity>
                    <Text style={[styles.loginLink, { fontSize: ms(14) }]}>Login here</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Bottom Image */}
              <View style={[styles.imageContainer, { marginBottom: vs(20) }]}>
                <Image
                  source={require("../../assets/images/login.png")}
                  style={{
                    width: scale(250),
                    height: vs(346),
                    maxWidth: "100%",
                  }}
                  resizeMode="contain"
                />
              </View>
            </ScrollView>

            {/* Fixed Bottom Bar */}
            <View style={[styles.bottomBar, { height: vs(60) }]}>
              <View
                style={[
                  styles.bottomIndicator,
                  { width: scale(200), height: vs(5), borderRadius: ms(10) },
                ]}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
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
  contentContainer: {
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    color: "#002D3D",
    textAlign: "center",
    marginBottom: 0,
  },
  subtitle: {
    color: "#9CA3AF",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 6,
    textAlign: "center",
    color: "#000",
  },
  button: {
    backgroundColor: "#002D3D",
    width: "100%",
    minHeight: 48,
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
