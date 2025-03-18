import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import apiClient from "./apiClient";

export const setItem = async (value: string) => {
  try {
    await AsyncStorage.setItem("jwt_token", JSON.stringify(value));
  } catch (error) {
    console.error("Error setting item:", error);
  }
};

export const getItem = async () => {
  try {
    let value = await AsyncStorage.getItem("jwt_token");
    if(!value){
      return null
    }
    if (value.includes('"')) {
      value = value.replaceAll('"', "");
    }
    if (value.includes("'")) {
      value = value.replaceAll("'", "");
    }
    return value != null ? value : null;    
  } catch (error) {
    console.error("Error getting item:", error);
    return null;
  }
};

export const removeItem = async () => {
  try {
    await AsyncStorage.removeItem("jwt_token");
  } catch (error) {
    console.error("Error removing item:", error);
  }
};

export const tokenValidation = async () => {
  try {
    const token = await getItem();
    if(!token){
      throw new Error("User Not Login")
    }
    const response = await apiClient.get("/user/verify-token", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    
    if(!response){
      alert("Internal Server Error")
      return
    }
    if(response.data.isValid){
      return true
    }
    return false
  } catch (err: any) {
    console.error("Error getting item:", err);
    return null;
  }
};
