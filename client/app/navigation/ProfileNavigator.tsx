import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen1 from "@/components/Profile/profile1";
import ProfileScreen2 from "@/components/Profile/profile2";

export interface IUserDetails {
  userName: string;
  emergencyContact: number;
  emergencyName: string;
  gender: string;
  dob: Date;
  age: number;
  idType: string;
  idNumber: number;
  nameCard: string;
  namePhysician: string;
  pincode: number;
  state: string;
}

const Stack = createNativeStackNavigator();

export default function ProfileNavigator() {
  const [userData, setUserData] = useState<IUserDetails>({
    userName: "",
    emergencyContact: 0,
    emergencyName: "",
    gender: "",
    dob: new Date(),
    age: 18,
    idType: "",
    idNumber: 0,
    nameCard: "",
    namePhysician: "",
    pincode: 0,
    state: "",
  });

  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile1">
        {(props) => (
          <ProfileScreen1 {...props} userData={userData} setUserData={setUserData} />
        )}
      </Stack.Screen>
      <Stack.Screen name="Profile2">
        {(props) => (
          <ProfileScreen2 {...props} userData={userData} setUserData={setUserData} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
