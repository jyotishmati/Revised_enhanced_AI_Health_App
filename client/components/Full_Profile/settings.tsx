// import React from 'react';
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, } from 'react-native';
// import { FontAwesome, MaterialIcons, Feather } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import Gold_bar from "../Home Page/Gold_bar";

// const SettingsScreen = () => {
//   const navigation = useNavigation();

//   return (
//     <SafeAreaView style={styles.safeArea}>
//     <view>
//       <Gold_bar />
//     </view>
//     <View style={styles.container}>
//       {/* Back Navigation */}
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//         <Feather name="arrow-left" size={20} color="#003366" />
//         <Text style={styles.headerText}>Setting</Text>
//       </TouchableOpacity>

//       {/* User Info Fields */}
//       <View style={styles.inputContainer}>
//         <FontAwesome name="user" size={18} color="#003366" />
//         <TextInput style={styles.input} value="Nandan G" editable={false} />
//       </View>

//       <View style={styles.inputContainer}>
//         <MaterialIcons name="email" size={18} color="#003366" />
//         <TextInput style={styles.input} value="example@gmail.com" editable={false} />
//       </View>

//       <View style={styles.inputContainer}>
//         <FontAwesome name="lock" size={18} color="#003366" />
//         <TextInput style={styles.input} value="********" editable={false} secureTextEntry />
//       </View>

//       <View style={styles.inputContainer}>
//         <Feather name="phone" size={18} color="#003366" />
//         <TextInput style={styles.input} value="9999999999" editable={false} />
//       </View>

//       {/* Gender and DOB with Proper Spacing */}
//       <View style={styles.rowContainer}>
//         <View style={[styles.inputContainer, styles.smallBox]}>
//           <FontAwesome name="mars" size={18} color="#003366" />
//           <Text style={styles.input}>Male</Text>
//         </View>
//         <View style={[styles.inputContainer, styles.smallBox]}>
//           <MaterialIcons name="calendar-today" size={18} color="#003366" />
//           <Text style={styles.input}>12/3/1990</Text>
//         </View>
//       </View>

//       <View style={styles.inputContainer}>
//         <FontAwesome name="map-marker" size={18} color="#003366" />
//         <TextInput
//           style={styles.input}
//           value="81/1 Basavanagudi, Bengaluru"
//           editable={false}
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <FontAwesome name="cog" size={18} color="#003366" />
//         <TextInput style={styles.input} value="9888888888" editable={false} />
//       </View>
//     </View>
//   </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     padding: 30,
//   },
//   backButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   headerText: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginLeft: 10,
//     color: '#063247',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#CDEEFF',
//     padding: 12,
//     borderRadius: 10,
//     marginBottom: 15,
//   },
//   input: {
//     marginLeft: 10,
//     fontSize: 18,
//     color: '#063247',
//     flex: 1,
//   },
//   rowContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 15,
//   },
//   smallBox: {
//     flex: 1,
//     marginRight: 10,
//   },
// });

// export default SettingsScreen;


import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  ScrollView,
} from 'react-native';
import { FontAwesome, MaterialIcons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Gold_bar from "../Home Page/Gold_bar";
import { useResponsive } from '../../hooks/useresponsive';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { scale, vs, ms } = useResponsive();

  const AnimatedInput = ({ icon, value, isSecure = false, delay = 0 }: any) => {
    const translateY = useRef(new Animated.Value(20)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.parallel([
        Animated.timing(translateY, { toValue: 0, duration: 400, delay, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 400, delay, useNativeDriver: true }),
      ]).start();
    }, []);

    return (
      <Animated.View style={[styles.inputContainer, { opacity, transform: [{ translateY }] }]}>
        {icon}
        <TextInput
          style={[styles.input, { fontSize: ms(18) }]}
          value={value}
          editable={false}
          secureTextEntry={isSecure}
        />
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        <Gold_bar />
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={[styles.backButton, { paddingVertical: vs(8) }]} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={ms(20)} color="#003366" />
          <Text style={[styles.headerText, { fontSize: ms(22) }]}>Settings</Text>
        </TouchableOpacity>

        <AnimatedInput icon={<FontAwesome name="user" size={ms(18)} color="#003366" />} value="Nandan G" delay={0} />
        <AnimatedInput icon={<MaterialIcons name="email" size={ms(18)} color="#003366" />} value="example@gmail.com" delay={100} />
        <AnimatedInput icon={<FontAwesome name="lock" size={ms(18)} color="#003366" />} value="********" isSecure delay={200} />
        <AnimatedInput icon={<Feather name="phone" size={ms(18)} color="#003366" />} value="9999999999" delay={300} />

        {/* Gender and DOB */}
        <View style={styles.rowContainer}>
          <AnimatedInput icon={<FontAwesome name="mars" size={ms(18)} color="#003366" />} value="Male" delay={400} />
          <AnimatedInput icon={<MaterialIcons name="calendar-today" size={ms(18)} color="#003366" />} value="12/3/1990" delay={500} />
        </View>

        <AnimatedInput icon={<FontAwesome name="map-marker" size={ms(18)} color="#003366" />} value="81/1 Basavanagudi, Bengaluru" delay={600} />
        <AnimatedInput icon={<FontAwesome name="cog" size={ms(18)} color="#003366" />} value="9888888888" delay={700} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, backgroundColor: '#FFFFFF', padding: 30 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  headerText: { fontWeight: 'bold', marginLeft: 10, color: '#063247' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CDEEFF',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  input: {
    marginLeft: 10,
    color: '#063247',
    flex: 1,
  },
  rowContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
});
