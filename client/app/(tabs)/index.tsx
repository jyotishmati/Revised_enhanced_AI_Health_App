import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import WelcomeScreen from "../../components/Onboarding/welcome1";
import WelcomeScreen2 from "../../components/Onboarding/welcome2";
import WelcomeScreen3 from "../../components/Onboarding/welcome3";
import LoginScreen from "../../components/Login/LoginScreen";
import LoginScreenOTP from "../../components/Login/Login(OTP)";
import HomeTemplate from "../../components/Home Page/HomeTemplate";
import Chatbot from "../../components/Home Page/chatbot";
import Calendar from "../../components/Home Page/Calendar/calendar";
import CalendarExpand from "../../components/Home Page/Calendar/calendarexpand";
import ProfileNavigator from "../navigation/ProfileNavigator";
import { ActivityIndicator, View } from "react-native";
import { tokenValidation } from "@/api/tokenOperation";
import MasterHealthVault from "@/components/Home Page/Master Health/Vault_master_health";

import ExpandBB from '@/components/Home Page/Blood Bank/expand_BB';
import DocumentManagerScreen from '@/components/Home Page/Calendar/documents_upload';
import Upload from '../../components/Home Page/Calendar/upload';
import Hash from "@/components/Home Page/Hash"
import Insurance from "@/components/Insurance"
import FullProfile from '../../components/full_profile';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt_token");

        if (!token) {
          setInitialRoute("Welcome1");
          return;
        }
        const checkingAuth = await tokenValidation();

        if (checkingAuth) {
          setInitialRoute("HomeTemplate");
        } else {
          setInitialRoute("Login/Signup");
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        setInitialRoute("Login/Signup");
      }
    };

    checkAuth();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
        name="Welcome1"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Welcome2" component={WelcomeScreen2} />
      <Stack.Screen name="Welcome3" component={WelcomeScreen3} />
      <Stack.Screen name="Login/Signup" component={LoginScreen} />
      <Stack.Screen name="Login(OTP)" component={LoginScreenOTP} />
      <Stack.Screen name="HomeTemplate" component={HomeTemplate} />
      <Stack.Screen name="Chatbot" component={Chatbot} />
      <Stack.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Calendar" component={Calendar} />
      <Stack.Screen name="CalendarExpand" component={CalendarExpand} />
      <Stack.Screen name="MasterHealthVault" component={MasterHealthVault} />
      <Stack.Screen name="ExpandBB" component={ExpandBB} />
      <Stack.Screen name="DocumentManagerScreen" component={DocumentManagerScreen} />
      <Stack.Screen name="Upload" component={Upload} />
      <Stack.Screen name='Hash' component={Hash} />
      <Stack.Screen name='Insurance' component={Insurance} />
      <Stack.Screen name='FullProfile' component={FullProfile} />
    </Stack.Navigator>
  );
}
