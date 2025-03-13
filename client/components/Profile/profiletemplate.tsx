// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   Platform,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { useNavigation } from "@react-navigation/native";
// import { Feather } from "@expo/vector-icons";

// interface FormField {
//   label: string;
//   placeholder: string;
//   isDropdown?: boolean;
//   options?: string[];
//   isDatePicker?: boolean;
// }

// interface ProfileFormProps {
//   title: string;
//   step: string;
//   fields: FormField[];
//   nextScreen?: string;
// }

// const ProfileForm: React.FC<ProfileFormProps> = ({ title, step, fields, nextScreen }) => {
//   const navigation = useNavigation();
//   const [selectedValues, setSelectedValues] = useState<{ [key: string]: string }>({});
//   const [date, setDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   const handleDropdownChange = (field: string, value: string) => {
//     setSelectedValues({ ...selectedValues, [field]: value });
//   };

//   const handleDateChange = (event: any, selectedDate?: Date) => {
//     setShowDatePicker(Platform.OS === "ios");
//     if (selectedDate) setDate(selectedDate);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//         <Feather name="arrow-left" size={24} color="black" />
//       </TouchableOpacity>

//       {/* Title */}
//       <Text style={styles.title}>{title}</Text>
//       <Text style={styles.stepText}>Complete {step}</Text>

//       {/* Form */}
//       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContainer}>
//         {fields.map((field, index) => (
//           <View key={index} style={styles.inputContainer}>
//             <Text style={styles.label}>{field.label}</Text>

//             {/* Dropdown Picker */}
//             {field.isDropdown ? (
//               <View style={styles.dropdownContainer}>
//                 <Picker
//                   selectedValue={selectedValues[field.label] || ""}
//                   onValueChange={(value) => handleDropdownChange(field.label, value)}
//                   style={styles.picker}
//                   mode="dropdown"
//                 >
//                   <Picker.Item label={field.placeholder} value="" color="#999" />
//                   {field.options?.map((option, idx) => (
//                     <Picker.Item key={idx} label={option} value={option} />
//                   ))}
//                 </Picker>
//               </View>
//             ) : (
//               /* Regular Input */
//               <View style={styles.inputBox}>
//                 <TextInput placeholder={field.placeholder} placeholderTextColor="#999" style={styles.input} />
//               </View>
//             )}
//           </View>
//         ))}
//       </ScrollView>

//       {/* Next Button */}
//       {nextScreen && (
//         <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate(nextScreen as never)}>
//           <Text style={styles.nextButtonText}>Next</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     paddingHorizontal: 24,
//     paddingTop: 6,
//   },
//   backButton: {
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#000",
//   },
//   stepText: {
//     color: "#555",
//     fontSize: 16,
//     marginBottom: 20,
//   },
//   formContainer: {
//     paddingBottom: 40, // To prevent overlapping with the button
//   },
//   inputContainer: {
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: "500",
//     color: "#333",
//     marginBottom: 4,
//   },
//   inputBox: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     padding: 12,
//     backgroundColor: "#F8F8F8",
//   },
//   input: {
//     fontSize: 16,
//     color: "#000",
//   },
//   dropdownContainer: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     backgroundColor: "#F8F8F8",
//     overflow: "hidden",  // Prevents weird border issues
//     height: 50,         // Matches other inputs
//     justifyContent: "center",
//   },
//   picker: {
//     width: "100%",
//     height: 50,
//     backgroundColor: "#F8F8F8",
//     borderWidth: 0,     // Ensures full width
//     // color: "#000",     // Proper text color
//   },

//   dateInput: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     padding: 12,
//     backgroundColor: "#F8F8F8",
//   },
//   nextButton: {
//     backgroundColor: "#003366",
//     paddingVertical: 14,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   nextButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default ProfileForm;
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   Platform,
//   Dimensions,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import { useNavigation } from "@react-navigation/native";
// import { Feather } from "@expo/vector-icons";

// const { width, height } = Dimensions.get("window");

// // Dynamic font sizes & layout adjustments
// const dynamicFontSize = width > 400 ? 18 : 16;
// const dynamicPadding = width > 400 ? 14 : 12;
// const buttonHeight = width > 400 ? 50 : 45;
// const titleFontSize = width > 400 ? 26 : 22;

// interface FormField {
//   label: string;
//   placeholder: string;
//   isDropdown?: boolean;
//   options?: string[];
// }

// interface ProfileFormProps {
//   title: string;
//   step: string;
//   fields: FormField[];
//   nextScreen?: string;
// }

// const ProfileForm: React.FC<ProfileFormProps> = ({ title, step, fields, nextScreen }) => {
//   const navigation = useNavigation();
//   const [selectedValues, setSelectedValues] = useState<{ [key: string]: string }>({});

//   const handleDropdownChange = (field: string, value: string) => {
//     setSelectedValues({ ...selectedValues, [field]: value });
//   };

//   return (
//     <View style={styles.container}>
//       {/* Back Button */}
//       {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//         <Feather name="arrow-left" size={24} color="black" />
//       </TouchableOpacity> */}

//       {/* Title Section */}
//       <Text style={[styles.title, { fontSize: titleFontSize }]}>{title}</Text>
//       <Text style={styles.stepText}>Complete {step}</Text>

//       {/* Form */}
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.formContainer}
//       >
//         {fields.map((field, index) => (
//           <View key={index} style={styles.inputContainer}>
//             <Text style={[styles.label, { fontSize: dynamicFontSize }]}>{field.label}</Text>

//             {/* Dropdown Picker */}
//             {field.isDropdown ? (
//               <View>
//                 <Picker
//                   selectedValue={selectedValues[field.label] || ""}
//                   onValueChange={(value) => handleDropdownChange(field.label, value)}
//                   style={[styles.picker, {fontSize: dynamicFontSize}]}
//                   mode="dropdown"
//                 >
//                   <Picker.Item label={field.placeholder} value=""  enabled={false} />
//                   {field.options?.map((option, idx) => (
//                     <Picker.Item key={idx} label={option} value={option} />
//                   ))}
//                 </Picker>
//               </View>
//             ) : (
//               /* Regular Input */
//               <View style={styles.inputBox}>
//                 <TextInput
//                   placeholder={field.placeholder}
//                   placeholderTextColor="#999"
//                   style={[styles.input, { fontSize: dynamicFontSize }]}
//                 />
//               </View>
//             )}
//           </View>
//         ))}
//       </ScrollView>

//       {/* Next Button */}
//       {nextScreen && (
//         <TouchableOpacity
//           style={[styles.nextButton, { height: buttonHeight, paddingVertical: dynamicPadding }]}
//           onPress={() => navigation.navigate(nextScreen as never)}
//         >
//           <Text style={styles.nextButtonText}>Next</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     paddingHorizontal: width * 0.06, // 6% of screen width
//     paddingTop: height * 0.0, // 2% of screen height
//   },
//   // backButton: {
//   //   marginBottom: height * 0.02,
//   // },
//   title: {
//     fontWeight: "bold",
//     color: "#000",
//     textAlign: "center",
//   },
//   stepText: {
//     color: "#555",
//     fontSize: 16,
//     marginBottom: height * 0.02,
//     textAlign: "center",
//   },
//   formContainer: {
//     paddingBottom: height * 0.05, // Prevents button overlap
//   },
//   inputContainer: {
//     marginBottom: height * 0.025,
//   },
//   label: {
//     fontWeight: "500",
//     color: "#333",
//     marginBottom: 6,
//   },
//   inputBox: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//     padding: 12,
//     backgroundColor: "#F8F8F8",
//   },
//   input: {
//     color: "#000",
//   },
//   // dropdownContainer: {
//   //   borderWidth: 1,
//   //   borderColor: "#ccc",
//   //   borderRadius: 10,
//   //   backgroundColor: "#F8F8F8",
//   //   height: 50,
//   //   justifyContent: "center",
//   // },
//   picker: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     width: "100%",
//     height: 50,
//     borderRadius: 10,
//     backgroundColor: "#F8F8F8",
//   },
//   nextButton: {
//     backgroundColor: "#003366",
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: height * 0.02,
//   },
//   nextButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default ProfileForm;

// import React, { useState } from "react";
// import { Ionicons } from "@expo/vector-icons"; // Import Ionicons
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   Platform,
//   Dimensions,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { useNavigation } from "@react-navigation/native";

// const { width, height } = Dimensions.get("window");

// // Dynamic font sizes & layout adjustments
// const dynamicFontSize = width > 400 ? 18 : 16;
// const dynamicPadding = width > 400 ? 14 : 12;
// const buttonHeight = width > 400 ? 50 : 45;
// const titleFontSize = width > 400 ? 26 : 22;

// interface FormField {
//   label: string;
//   placeholder: string;
//   isDropdown?: boolean;
//   isDatePicker?: boolean; // NEW PROPERTY for DOB Picker
//   options?: string[];
// }

// interface ProfileFormProps {
//   title: string;
//   step: string;
//   fields: FormField[];
//   nextScreen?: string;
// }

// const ProfileForm: React.FC<ProfileFormProps> = ({ title, step, fields, nextScreen }) => {
//   const navigation = useNavigation();
//   const [selectedValues, setSelectedValues] = useState<{ [key: string]: string }>({});
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);

//   // Handle dropdown change
//   const handleDropdownChange = (field: string, value: string) => {
//     setSelectedValues({ ...selectedValues, [field]: value });
//   };

//   // Handle Date Picker change
//   const handleDateChange = (event: any, date?: Date) => {
//     setShowDatePicker(false); // Hide picker after selection
//     if (date) {
//       setSelectedDate(date);
//       setSelectedValues({ ...selectedValues, DOB: date.toDateString() });
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={[styles.title, { fontSize: titleFontSize }]}>{title}</Text>
//       <Text style={styles.stepText}>Complete {step}</Text>

//       {/* Form Fields */}
//       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContainer}>
//         {fields.map((field, index) => (
//           <View key={index} style={styles.inputContainer}>
//             <Text style={[styles.label, { fontSize: dynamicFontSize }]}>{field.label}</Text>

//             {/* Date of Birth Picker */}
//             {field.isDatePicker ? (
//               <TouchableOpacity
//               style={styles.datePicker}
//               onPress={() => setShowDatePicker(true)}
//             >
//               <Text style={styles.dateText}>
//                 {selectedDate ? selectedDate.toDateString() : field.placeholder}
//               </Text>
//               <Ionicons name="calendar-outline" size={20} color="#777" style={styles.icon} />
//             </TouchableOpacity>
//             ) : field.isDropdown ? (
//               /* Dropdown Picker */
//               <View>
//                 <Picker
//                   selectedValue={selectedValues[field.label] || ""}
//                   onValueChange={(value) => handleDropdownChange(field.label, value)}
//                   style={[styles.picker, { fontSize: dynamicFontSize }]}
//                   mode="dropdown"
//                 >
//                   <Picker.Item label={field.placeholder} value="" enabled={false} />
//                   {field.options?.map((option, idx) => (
//                     <Picker.Item key={idx} label={option} value={option} />
//                   ))}
//                 </Picker>
//               </View>
//             ) : (
//               /* Regular Input */
//               <View style={styles.inputBox}>
//                 <TextInput
//                   placeholder={field.placeholder}
//                   placeholderTextColor="#999"
//                   style={[styles.input, { fontSize: dynamicFontSize }]}
//                 />
//               </View>
//             )}
//           </View>
//         ))}
//       </ScrollView>

//       {/* Date Picker Modal */}
//       {showDatePicker && (
//         <DateTimePicker
//           value={selectedDate || new Date()} // Default to current date
//           mode="date"
//           display={Platform.OS === "ios" ? "spinner" : "default"}
//           onChange={handleDateChange}
//           maximumDate={new Date()} // Prevent future dates
//         />
//       )}

//       {/* Next Button */}
//       {nextScreen && (
//         <TouchableOpacity
//           style={[styles.nextButton, { height: buttonHeight, paddingVertical: dynamicPadding }]}
//           onPress={() => navigation.navigate(nextScreen as never)}
//         >
//           <Text style={styles.nextButtonText}>Next</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     paddingHorizontal: width * 0.06,
//   },
//   title: {
//     fontWeight: "bold",
//     color: "#000",
//     textAlign: "center",
//   },
//   stepText: {
//     color: "#555",
//     fontSize: 16,
//     marginBottom: height * 0.02,
//     textAlign: "center",
//   },
//   formContainer: {
//     paddingBottom: height * 0.05,
//   },
//   inputContainer: {
//     marginBottom: height * 0.025,
//   },
//   label: {
//     fontWeight: "500",
//     color: "#333",
//     marginBottom: 6,
//   },
//   inputBox: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//     padding: 12,
//     backgroundColor: "#F8F8F8",
//   },
//   input: {
//     color: "#000",
//   },
//   picker: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     width: "100%",
//     height: 50,
//     borderRadius: 10,
//     backgroundColor: "#F8F8F8",
//   },
//   datePicker: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between", // Align icon to the right
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//     padding: 12,
//     backgroundColor: "#F8F8F8",
//   },
//   dateText: {
//     fontSize: 16,
//     color: "#000",
//   },
//   icon: {
//     marginLeft: 10, // Add space between text and icon
//   },
//   nextButton: {
//     backgroundColor: "#003366",
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: height * 0.02,
//   },
//   nextButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default ProfileForm;
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { IUserDetails } from "@/app/navigation/ProfileNavigator";

const { width, height } = Dimensions.get("window");

const dynamicFontSize = width > 400 ? 18 : 16;
const dynamicPadding = width > 400 ? 14 : 12;
const buttonHeight = width > 400 ? 50 : 45;
const titleFontSize = width > 400 ? 26 : 22;

interface FormField {
  key: keyof IUserDetails;
  label: string;
  placeholder: string;
  isDropdown?: boolean;
  isDatePicker?: boolean;
  options?: string[];
}

interface ProfileFormProps {
  title: string;
  step: string;
  fields: FormField[];
  nextScreen?: string;
}

const ProfileForm: React.FC<
  ProfileFormProps & {
    userData: IUserDetails;
    setUserData: (data: IUserDetails) => void;
    onSubmit?: () => void;
  }
> = ({ title, step, fields, userData, setUserData, nextScreen, onSubmit }) => {
  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleChange = (field: string, value: string | number | Date) => {
    setUserData({ ...userData, [field]: value });
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontSize: titleFontSize }]}>{title}</Text>
      <Text style={styles.stepText}>Complete {step}</Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContainer}>
        {fields.map((field, index) => (
          <View key={index} style={styles.inputContainer}>
            <Text style={[styles.label, { fontSize: dynamicFontSize }]}>{field.label}</Text>
            {field.isDatePicker ? (
              <TouchableOpacity
                style={styles.datePicker}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateText}>
                  {selectedDate ? selectedDate.toDateString() : field.placeholder}
                </Text>
                <Ionicons name="calendar-outline" size={20} color="#777" style={styles.icon} />
              </TouchableOpacity>
            ) : field.isDropdown ? (
              <Picker
                selectedValue={userData[field.key]}
                onValueChange={(value) => handleChange(field.key, value)}
                style={[styles.picker, { fontSize: dynamicFontSize }]}
                mode="dropdown"
              >
                <Picker.Item label={field.placeholder} value="" enabled={false} />
                {field.options?.map((option, idx) => (
                  <Picker.Item key={idx} label={option} value={option} />
                ))}
              </Picker>
            ) : (
              <View style={styles.inputBox}>
                <TextInput
                  value={userData[field.key]?.toString()}
                  onChangeText={(text) => handleChange(field.key, text)}
                  placeholder={field.placeholder}
                  placeholderTextColor="#999"
                  style={[styles.input, { fontSize: dynamicFontSize }]}
                />
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) setSelectedDate(date);
          }}
          maximumDate={new Date()}
        />
      )}

      {nextScreen && (
        <TouchableOpacity
          style={[styles.nextButton, { height: buttonHeight, paddingVertical: dynamicPadding }]}
          onPress={() => navigation.navigate(nextScreen as never)}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      )}
      {onSubmit && (
        <TouchableOpacity style={styles.nextButton} onPress={onSubmit}>
          <Text style={styles.nextButtonText}>Submit</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: width * 0.06,
  },
  title: {
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  stepText: {
    color: "#555",
    fontSize: 16,
    marginBottom: height * 0.02,
    textAlign: "center",
  },
  formContainer: {
    paddingBottom: height * 0.05,
  },
  inputContainer: {
    marginBottom: height * 0.025,
  },
  label: {
    fontWeight: "500",
    color: "#333",
    marginBottom: 6,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#F8F8F8",
  },
  input: {
    color: "#000",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#F8F8F8",
  },
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#F8F8F8",
  },
  dateText: {
    fontSize: 16,
    color: "#000",
  },
  icon: {
    marginLeft: 10,
  },
  nextButton: {
    backgroundColor: "#003366",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: height * 0.02,
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileForm;