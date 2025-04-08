// import apiClient from "./apiClient";
// import { calculateAge } from "./other";
// import { getItem } from "./tokenOperation";

// const EXPIRY_TIME = 12 * 60 * 60 * 1000;

// export const loadUserData = async () => {
//   console.log("Fetching user data...");
//   const cachedData = localStorage.getItem("userData");
//   const cachedTimestamp = localStorage.getItem("userDataTimestamp");

//   if (cachedData && cachedTimestamp) {
//     const isExpired = Date.now() - Number(cachedTimestamp) > EXPIRY_TIME;

//     if (!isExpired) {
//       return JSON.parse(cachedData);
//     }
//   }

//   try {
//     const token = await getItem();
//     if (!token) {
//       throw new Error("No token found, please log in again.");
//     }
//     const response = await apiClient.get("/user/get-user-details", {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const user = response.data.existingUser;
//     console.log(user)
//     if (!user.userName|| !user.dob || !user.bloodType) {
//       return null;
//     }
//     const freshData = {
//       name: user.userName,
//       age: calculateAge(user.dob),
//       bloodType: user.bloodType,
//       appointment: user.nextAppointment || "No appointment scheduled",
//     };

//     localStorage.setItem("userData", JSON.stringify(freshData));
//     localStorage.setItem("userDataTimestamp", String(Date.now()));

//     return freshData;
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     if (cachedData) {
//       return JSON.parse(cachedData);
//     }
//     throw error;
//   }
// };


import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "./apiClient";
import { calculateAge } from "./other";
import { getItem } from "./tokenOperation";

const EXPIRY_TIME = 12 * 60 * 60 * 1000; 

// export const loadUserData = async () => {
//   console.log("Fetching user data...");

//   try {
//     const cachedData = await AsyncStorage.getItem("userData");
//     const cachedTimestamp = await AsyncStorage.getItem("userDataTimestamp");

//     if (cachedData && cachedTimestamp) {
//       const isExpired = Date.now() - Number(cachedTimestamp) > EXPIRY_TIME;

//       if (!isExpired) {
//         return JSON.parse(cachedData);
//       }
//     }

//     const token = await getItem();
//     if (!token) {
//       throw new Error("No token found, please log in again.");
//     }

//     const response = await apiClient.get("/user/get-user-details", {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const user = response.data.existingUser;
//     console.log(user);

//     if (!user.userName || !user.dob || !user.bloodType) {
//       return null;
//     }

//     const freshData = {
//       name: user.userName,
//       age: calculateAge(user.dob),
//       bloodType: user.bloodType,
//       appointment: user.nextAppointment || "No appointment scheduled",
//     };

//     // await AsyncStorage.setItem("userData", JSON.stringify(freshData));
//     // await AsyncStorage.setItem("userDataTimestamp", String(Date.now()));

//     return freshData;
//   } catch (error) {
//     console.error("Error fetching user data:", error);

//     const cachedData = await AsyncStorage.getItem("userData");
//     if (cachedData) {
//       return JSON.parse(cachedData);
//     }

//     throw error;
//   }
// };
