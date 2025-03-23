import axios from "axios";
import { getItem } from "./tokenOperation";
import { currentLocation } from "./other";


const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BACKEND_LINK || "http://localhost:5000/v1",
});

export const setHeaders = async () => {
  const token = await getItem();
  if (!token) {
    throw new Error("No token found, please log in again.");
  }
  let getLocation = await currentLocation();
  if(!getLocation)getLocation = [0, 0]
  console.log(getLocation)
  console.log(process.env.EXPO_PUBLIC_BACKEND_LINK)
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "Coordinates": JSON.stringify(getLocation),
  };
};

export default apiClient;
