import { IUserDetails } from "@/app/navigation/ProfileNavigator";
import apiClient from "./apiClient";
import { getItem } from "./tokenOperation";

interface UpdateUserResponse {
  message: string;
  isValid: boolean;
  verifyEmail: boolean;
  isCompleteUserDetails: boolean;
}

export const updateUserAPI = async (
  userDetails: IUserDetails
): Promise<UpdateUserResponse> => {
    try {
      const token = await getItem();
      if (!token) {
        throw new Error("No token found, please log in again.");
      }
    if (!userDetails) {
      throw new Error("User Details not Provided");
    }
    const response = await apiClient.post("user/update-user", userDetails, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
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
