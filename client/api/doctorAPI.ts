
import apiClient, { setHeaders } from "./apiClient";
import { getItem } from "./tokenOperation";

export const getAllDoctor = async () => {
  try {
    const token = await getItem();
    if (!token) {
      throw new Error("No token found, please log in again.");
    }

    const response = await apiClient.get("/doctor/doctors", {
      headers: await setHeaders(),
    });
    if(!response){
      console.error(response)
      return
    }
    console.log(response.data)
    return response.data;
  } catch (error: any) {
    console.error(error);
    if (error.response) {
      if (error.response.status === 400) {
        throw new Error(
          error.response.data?.message || "Invalid or Expired OTP."
        );
      }
      throw new Error(error.response.data?.message || "Verification failed.");
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

export const getDoctors = async (id:any) => {
  try {
    const token = await getItem();
    if (!token) {
      throw new Error("No token found, please log in again.");
    }

    const response = await apiClient.get(`/doctor/doctors/${id}`, {
      headers: await setHeaders(),
    });
    if(!response){
      console.error(response)
      return
    }
    console.log(response)
    return response.data;
  } catch (error: any) {
    console.error(error);
    if (error.response) {
      if (error.response.status === 400) {
        throw new Error(
          error.response.data?.message || "Invalid or Expired OTP."
        );
      }
      throw new Error(error.response.data?.message || "Verification failed.");
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};
