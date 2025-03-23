import apiClient, { setHeaders } from "./apiClient";
export interface IBloodType {
    bloodType: string;
  }
  
  export interface IBloodDonor {
    userName: string;
    userId: string;
    coordinates: [number, number];
    phno: string;
  }
  
  export interface IBloodDonorResponse {
    message: string;
    nearestDonor: IBloodDonor;
    topDonors: IBloodDonor[];
  }
export const getNearestDonor = async (
    bloodType: IBloodType
  ): Promise<IBloodDonorResponse | null> => {
    try {
  
      if (!bloodType) {
        throw new Error("Blood Type is not provided");
      }
      console.log(bloodType)
      const response = await apiClient.post("blood-bank/get-nearest-donor", {bloodType }, {
        headers: await setHeaders(),
      });
      console.log(response.data)
      return response.data
    //   return response.data.data;
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