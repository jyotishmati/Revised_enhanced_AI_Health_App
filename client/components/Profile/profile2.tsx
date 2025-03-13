// import React from "react";
// import ProfileForm from "./profiletemplate";

// const ProfileScreen2 = () => {
//   const fields = [
//     { label: "ID Type", placeholder: "Select ID Type", isDropdown: true },
//     { label: "ID Number", placeholder: "Enter your ID number" },
//     { label: "Name on the Card", placeholder: "Enter name" },
//     { label: "Primary Care Physician", placeholder: "Enter physician name" },
//     { label: "Pincode", placeholder: "Enter pincode" },
//     { label: "State", placeholder: "Select state", isDropdown: true },
//   ];

//   return <ProfileForm title="Profile" step="2 of 3" fields={fields} nextScreen="HomeTemplate" />;
// };

// export default ProfileScreen2;
import React from "react";
import ProfileForm from "./profiletemplate";
import { IUserDetails } from "@/app/navigation/ProfileNavigator";
import { FormField } from "./profile1";
import { updateUserAPI } from "@/api/userAPI";




const ProfileScreen2 = ({ navigation, userData, setUserData }: 
  { navigation: any; userData: IUserDetails; setUserData: (data: IUserDetails) => void }) => {

  const fields: FormField[] = [
    { label: "ID Type", placeholder: "Select ID Type", isDropdown: true, options: ["Aadhar", "PAN", "Passport"], key: "idType" },
    { label: "ID Number", placeholder: "Enter your ID number", key: "idNumber" },
    { label: "Name on the Card", placeholder: "Enter name", key: "nameCard" },
    { label: "Primary Care Physician", placeholder: "Enter physician name", key: "namePhysician" },
    { label: "Pincode", placeholder: "Enter pincode", key: "pincode" },
    { label: "State", placeholder: "Select state", isDropdown: true, options: ["Karnataka", "Maharashtra", "Tamil Nadu"], key: "state" },
  ];

  const handleSubmit = async () => {
    try {
      const res = await updateUserAPI(userData)
      if(!res){
        return alert("Internal Server Error")
      }
      if(!res.verifyEmail){
        navigation.navigate("Login/Signup")
      }else if(!res.isCompleteUserDetails){
        navigation.navigate("Profile")
      }else if(res.isValid){
        navigation.navigate("HomeTemplate")
      }
    } catch (error) {
      console.error("Error submitting profile:", error);
    }
  };

  return (
    <ProfileForm
      title="Profile"
      step="2 of 2"
      fields={fields}
      userData={userData}
      setUserData={setUserData}
      onSubmit={handleSubmit}
    />
  );
};

export default ProfileScreen2;
