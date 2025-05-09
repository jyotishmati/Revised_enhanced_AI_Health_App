// import React, { useState } from "react";
// import { Ionicons } from "@expo/vector-icons";
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
// import { IUserDetails } from "@/app/navigation/ProfileNavigator";

// const { width, height } = Dimensions.get("window");

// const dynamicFontSize = width > 400 ? 18 : 16;
// const dynamicPadding = width > 400 ? 14 : 12;
// const buttonHeight = width > 400 ? 50 : 45;
// const titleFontSize = width > 400 ? 26 : 22;

// interface FormField {
//   key: keyof IUserDetails;
//   label: string;
//   placeholder: string;
//   isDropdown?: boolean;
//   isDatePicker?: boolean;
//   options?: string[];
// }

// interface ProfileFormProps {
//   title: string;
//   step: string;
//   fields: FormField[];
//   nextScreen?: string;
// }

// const ProfileForm: React.FC<
//   ProfileFormProps & {
//     userData: IUserDetails;
//     setUserData: (data: IUserDetails) => void;
//     onSubmit?: () => void;
//   }
// > = ({ title, step, fields, userData, setUserData, nextScreen, onSubmit }) => {
//   const navigation = useNavigation();
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);

//   const handleChange = (field: string, value: string | number | Date) => {
//     setUserData({ ...userData, [field]: value });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={[styles.title, { fontSize: titleFontSize }]}>{title}</Text>
//       <Text style={styles.stepText}>Complete {step}</Text>

//       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContainer}>
//         {fields.map((field, index) => (
//           <View key={index} style={styles.inputContainer}>
//             <Text style={[styles.label, { fontSize: dynamicFontSize }]}>{field.label}</Text>
//             {field.isDatePicker ? (
//               <TouchableOpacity
//                 style={styles.datePicker}
//                 onPress={() => setShowDatePicker(true)}
//               >
//                 <Text style={styles.dateText}>
//                   {selectedDate ? selectedDate.toDateString() : field.placeholder}
//                 </Text>
//                 <Ionicons name="calendar-outline" size={20} color="#777" style={styles.icon} />
//               </TouchableOpacity>
//             ) : field.isDropdown ? (
//               <Picker
//                 selectedValue={userData[field.key]}
//                 onValueChange={(value) => handleChange(field.key, value)}
//                 style={[styles.picker, { fontSize: dynamicFontSize }]}
//                 mode="dropdown"
//               >
//                 <Picker.Item label={field.placeholder} value="" enabled={false} />
//                 {field.options?.map((option, idx) => (
//                   <Picker.Item key={idx} label={option} value={option} />
//                 ))}
//               </Picker>
//             ) : (
//               <View style={styles.inputBox}>
//                 <TextInput
//                   value={userData[field.key]?.toString()}
//                   onChangeText={(text) => handleChange(field.key, text)}
//                   placeholder={field.placeholder}
//                   placeholderTextColor="#999"
//                   style={[styles.input, { fontSize: dynamicFontSize }]}
//                 />
//               </View>
//             )}
//           </View>
//         ))}
//       </ScrollView>

//       {showDatePicker && (
//         <DateTimePicker
//           value={selectedDate || new Date()}
//           mode="date"
//           display={Platform.OS === "ios" ? "spinner" : "default"}
//           onChange={(event, date) => {
//             setShowDatePicker(false);
//             if (date) setSelectedDate(date);
//           }}
//           maximumDate={new Date()}
//         />
//       )}

//       {nextScreen && (
//         <TouchableOpacity
//           style={[styles.nextButton, { height: buttonHeight, paddingVertical: dynamicPadding }]}
//           onPress={() => navigation.navigate(nextScreen as never)}
//         >
//           <Text style={styles.nextButtonText}>Next</Text>
//         </TouchableOpacity>
//       )}
//       {onSubmit && (
//         <TouchableOpacity style={styles.nextButton} onPress={onSubmit}>
//           <Text style={styles.nextButtonText}>Submit</Text>
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
//     borderRadius: 10,
//     backgroundColor: "#F8F8F8",
//   },
//   datePicker: {
//     flexDirection: "row",
//     alignItems: "center",
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
//     marginLeft: 10,
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
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { IUserDetails } from "@/app/navigation/ProfileNavigator";
import { useResponsive } from "../../hooks/useresponsive";

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
  userData: IUserDetails;
  setUserData: (data: IUserDetails) => void;
  onSubmit?: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  title,
  step,
  fields,
  userData,
  setUserData,
  nextScreen,
  onSubmit,
}) => {
  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const { scale, vs, ms } = useResponsive();

  const handleChange = (field: string, value: string | number | Date) => {
    setUserData({ ...userData, [field]: value });
  };

  return (
    <View style={[styles.container, { paddingHorizontal: scale(20) }]}>
      <Text style={[styles.title, { fontSize: ms(26) }]}>{title}</Text>
      <Text style={[styles.stepText, { fontSize: ms(15), marginBottom: vs(12) }]}>
        Complete {step}
      </Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: vs(40) }}>
        {fields.map((field, index) => (
          <View key={index} style={{ marginBottom: vs(20) }}>
            <Text style={[styles.label, { fontSize: ms(16) }]}>{field.label}</Text>
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
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={userData[field.key]}
                  onValueChange={(value) => handleChange(field.key, value)}
                  style={styles.picker}
                  mode="dropdown"
                >
                  <Picker.Item label={field.placeholder} value="" enabled={false} />
                  {field.options?.map((option, idx) => (
                    <Picker.Item key={idx} label={option} value={option} />
                  ))}
                </Picker>
              </View>
            ) : (
              <View style={styles.inputBox}>
                <TextInput
                  value={userData[field.key]?.toString()}
                  onChangeText={(text) => handleChange(field.key, text)}
                  placeholder={field.placeholder}
                  placeholderTextColor="#999"
                  style={[styles.input, { fontSize: ms(16) }]}
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
          style={[styles.nextButton, { paddingVertical: vs(14), marginBottom: vs(16) }]}
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
  },
  title: {
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginTop: 20,
  },
  stepText: {
    color: "#555",
    textAlign: "center",
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
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#F8F8F8",
  },
  picker: {
    width: "100%",
    color: "#000",
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
    marginHorizontal: 20,
    paddingVertical: 14,
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileForm;
