// import React from "react";
// import ProfileForm from "./profiletemplate";

// const ProfileScreen1 = () => {
//   const fields = [
//     { label: "User Name", placeholder: "Enter your name" },
//     { label: "Email Address", placeholder: "Enter your email" },
//     { label: "Emergency Contact", placeholder: "Enter contact number" },
//     { label: "Name of Emergency Contact", placeholder: "Enter name" },
//     { label: "Age", placeholder: "Enter your age" },
//     { label: "Gender", placeholder: "Select gender", isDropdown: true },
//     { label: "Date of Birth", placeholder: "Select date", isDropdown: true },
//   ];

//   return <ProfileForm title="Profile" step="1 of 3" fields={fields} nextScreen="Profile2" />;
// };

// export default ProfileScreen1;

import React from "react";
import ProfileForm from "./profiletemplate";
import { IUserDetails } from "@/app/navigation/ProfileNavigator";

export interface FormField {
  key: keyof IUserDetails;
  label: string;
  placeholder: string;
  isDropdown?: boolean;
  isDatePicker?: boolean;
  options?: string[];
}


const ProfileScreen1 = ({ navigation, userData, setUserData }: 
  { navigation: any; userData: IUserDetails; setUserData: (data: IUserDetails) => void }) => {
  
    const fields: FormField[] = [
      { key: "userName", label: "User Name", placeholder: "Enter your name" },
      { key: "emergencyContact", label: "Emergency Contact", placeholder: "Enter contact number" },
      { key: "emergencyName", label: "Name of Emergency Contact", placeholder: "Enter name" },
      { key: "dob", label: "Date of Birth", placeholder: "Select date", isDatePicker: true },
      { key: "age", label: "Age", placeholder: "Enter your age" },
      { key: "gender", label: "Gender", placeholder: "Select gender", isDropdown: true, options: ["Male", "Female", "Other"] },
    ];

  return (
    <ProfileForm
      title="Profile"
      step="1 of 2"
      fields={fields}
      userData={userData}
      setUserData={setUserData}
      nextScreen="Profile2"
    />
  );
};

export default ProfileScreen1;
