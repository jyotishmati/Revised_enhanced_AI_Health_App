import { IUserDetails } from "@/app/navigation/ProfileNavigator";
import apiClient from "./apiClient";
import { getItem } from "./tokenOperation";

interface UpdateUserResponse {
  message: string;
  isValid: boolean;
  verifyEmail: boolean;
  isCompleteUserDetails: boolean;
}

export const getMasterHealthAPI = async (): Promise<any[]>=> {
  try {
    const token = await getItem();
    if (!token) {
      throw new Error("No token found, please log in again.");
    }
    const response = await apiClient.get("master-health/get-master-health", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response?.data?.data[0]?.tests) {
      throw new Error("Server lost");
    }
    console.log(response.data.data[0].tests);

    return response.data.data[0].tests;
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
