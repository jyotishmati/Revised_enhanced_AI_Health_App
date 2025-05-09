// import { loginSignup } from "@/api/loginAPI";
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   TouchableWithoutFeedback,
//   Keyboard,
// } from "react-native";

// interface LoginTemplateProps {
//   title: string;
//   subtitle: string;
//   buttonText: string;
//   // onButtonPress: () => void;
//   // onLoginPress: () => void;
//   onProfilePage: () => void;
//   onVerifyPage: () => void;
//   onHomePage: () => void;
//   imageSource: any;
// }

// export default function LoginTemplate({
//   title,
//   subtitle,
//   buttonText,
//   // onButtonPress,
//   // onLoginPress,
//   onVerifyPage,
//   onProfilePage,
//   onHomePage,
//   imageSource,
// }: LoginTemplateProps) {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [confirmPassword, setConfirmPassword] = useState<string>("");
//   const handleLogin = async () => {
//     try {
//       if (!email || !password) {
//         return alert("Fields are Empty");
//       }
//       const result = await loginSignup({ email, password, confirmPassword });
//       if (!result) {
//         alert("Problem in the Login!!");
//         return;
//       }
//       if (!result.verifyEmail) {
//         onVerifyPage();
//         return;
//       }
//       if (!result.isCompleteUserDetails) {
//         onProfilePage();
//         return;
//       }
//       if (result.isValid) {
//         onHomePage();
//         return;
//       }
//     } catch (err) {
//       alert("Problem in the Login!!");
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
//         {/* Scrollable Content */}
//         <ScrollView
//           contentContainerStyle={styles.scrollContainer}
//           keyboardShouldPersistTaps="handled"
//         >
//           {/* Back button area */}
//           <View style={styles.backButton}>
//             <TouchableOpacity>
//               {/* Back button icon can be added here */}
//             </TouchableOpacity>
//           </View>

//           {/* Main content */}
//           <View style={styles.contentContainer}>
//             <Text style={styles.title}>{title}</Text>
//             <Text style={styles.subtitle}>{subtitle}</Text>

//             {/* Input fields */}
//             <TextInput
//               placeholder="Enter Email ID"
//               style={styles.input}
//               keyboardType="email-address"
//               onChangeText={(text) => setEmail(text)}
//               autoCapitalize="none"
//               autoCorrect={false}
//               placeholderTextColor="#9CA3AF"
//             />

//             <TextInput
//               placeholder="Enter Password"
//               onChangeText={(text) => setPassword(text)}
//               style={[styles.input, { marginTop: 24 }]}
//               secureTextEntry
//               placeholderTextColor="#9CA3AF"
//             />

//             <TextInput
//               placeholder="Confirm Password"
//               onChangeText={(text) => setConfirmPassword(text)}
//               style={[styles.input, { marginTop: 24 }]}
//               secureTextEntry
//               placeholderTextColor="#9CA3AF"
//             />

//             {/* Send OTP Button */}
//             <TouchableOpacity style={styles.button} onPress={handleLogin}>
//               <Text style={styles.buttonText}>{buttonText}</Text>
//             </TouchableOpacity>

//             {/* Login link */}
//             <View style={styles.loginContainer}>
//               <Text style={styles.loginText}>
//                 Login to your corporate account.
//               </Text>
//               <TouchableOpacity>
//                 <Text style={styles.loginLink}>Login here</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Bottom Image */}
//           <View style={styles.imageContainer}>
//             <Image
//               source={require("../../assets/images/login.png")}
//               style={styles.image}
//               resizeMode="contain"
//             />
//           </View>
//         </ScrollView>

//         {/* Fixed Bottom Bar */}
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
  SafeAreaView
} from "react-native";
import { useResponsive } from "../../hooks/useresponsive";

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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <ScrollView
              contentContainerStyle={[styles.scrollContainer, { paddingBottom: vs(80) }]}
              keyboardShouldPersistTaps="handled"
            >
              {/* Main Content */}
              <View style={styles.contentContainer}>
                <Text style={[styles.title, { fontSize: ms(28) }]}>{title}</Text>
                <Text style={[styles.subtitle, { fontSize: ms(15) }]}>{subtitle}</Text>

                {/* Input Fields */}
                <TextInput
                  placeholder="Enter Email ID"
                  style={[styles.input, { fontSize: ms(16) }]}
                  keyboardType="email-address"
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholderTextColor="#9CA3AF"
                />

                <TextInput
                  placeholder="Enter Password"
                  style={[styles.input, { marginTop: vs(24), fontSize: ms(16) }]}
                  onChangeText={setPassword}
                  secureTextEntry
                  placeholderTextColor="#9CA3AF"
                />

                <TextInput
                  placeholder="Confirm Password"
                  style={[styles.input, { marginTop: vs(24), fontSize: ms(16) }]}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  placeholderTextColor="#9CA3AF"
                />

                {/* Login Button */}
                <TouchableOpacity
                  style={[styles.button, { borderRadius: ms(25), paddingVertical: vs(14), marginTop: vs(24) }]}
                  onPress={handleLogin}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.buttonText, { fontSize: ms(16) }]}>{buttonText}</Text>
                </TouchableOpacity>

                {/* Login Link */}
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

            {/* Bottom Indicator */}
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
