import { IUserDetails } from "@/app/navigation/ProfileNavigator";
import apiClient, { setHeaders } from "./apiClient";
import { getItem } from "./tokenOperation";

interface UpdateUserResponse {
  message: string;
  isValid: boolean;
  verifyEmail: boolean;
  isCompleteUserDetails: boolean;
}
export const createMasterHealthAPI = async (data:JSON):Promise<any>=>{
  try{
    const token = await getItem();
    if (!token) {
      throw new Error("No token found, please log in again.");
    }
    const response = await apiClient.post("master-health/update-master-health", {
      headers: await setHeaders(),
      body:JSON.stringify(data)
    });
    if (!response?.data?.data[0]?.tests) {
      throw new Error("Server lost");
    }

    return response.data.data[0].tests;

  }catch (error: any) {
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
}

export const getMasterHealthAPI = async (): Promise<any[]> => {
  try {
    const token = await getItem();
    if (!token) {
      throw new Error("No token found, please log in again.");
    }
    const response = await apiClient.get("master-health/get-master-health", {
      headers: await setHeaders(),
    });
    if (!response?.data?.data[0]?.tests) {
      throw new Error("Server lost");
    }

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
const a = {
  tests: [
    {
      test_name: "Hemoglobin",
      normal_range: "13 - 18 g/dl",
      result: 8,
      unit: "g/dl",
    },
    {
      test_name: "Hematocrit",
      normal_range: "39 - 54 %",
      result: 26.8,
      unit: "%",
    },
    {
      test_name: "Red Blood Cells",
      normal_range: "4.2 - 6.5 Million/uL",
      result: 2.95,
      unit: "Million/uL",
    },
    {
      test_name: "MCV",
      normal_range: "75 - 95 fl",
      result: 90.9,
      unit: "fl",
    },
    {
      test_name: "MCH",
      normal_range: "26 - 32 pg",
      result: 27.2,
      unit: "pg",
    },
    {
      test_name: "MCHC",
      normal_range: "31 - 36 g/dl",
      result: 29.9,
      unit: "g/dl",
    },
    {
      test_name: "RDW",
      normal_range: "11.5 - 14.5 %",
      result: 16.5,
      unit: "%",
    },
    {
      test_name: "TLC Count",
      normal_range: "4 - 11 10^3/mm^3",
      result: 16.65,
      unit: "10^3/mm^3",
    },
    {
      test_name: "Platelets",
      normal_range: "140 - 440 10^3/mm^3",
      result: 267,
      unit: "10^3/mm^3",
    },
  ],
};
import { Platform } from "react-native";
import BlobUtil from "react-native-blob-util";
import { currentLocation } from "./other";
export const uploadMasterHealth = async (
  file: {
    blob: Blob;
    uri?: string;
    name: string;
    type?: string | null;
  },
  type: "image" | "pdf"
): Promise<any> => {
  try {
    const formData = new FormData();
    if (Platform.OS === "web") {
      formData.append("file", file.blob, file.name);
    } else {
      formData.append("file", {
        uri: file.uri,
        name: file.name,
        type: file.type || "application/octet-stream",
      } as any);
    }

    const token = await getItem();
    if (!token) {
      throw new Error("No token found, please log in again.");
    }

    let getLocation = await currentLocation();
    if (!getLocation) getLocation = [0, 0];

    console.log("Working API");
    const res = await apiClient.post(
      "master-health/extract-master-health",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Coordinates: JSON.stringify(getLocation),
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progress: any) => {
          const percentCompleted = Math.round(
            (progress.loaded * 100) / progress.total
          );
          console.log(`Upload progress: ${percentCompleted}%`);
        },
      }
    );
    console.log(res);
    return [true, a];

  } catch (error) {
    console.error("Upload error:", error);
    alert("Error uploading file");
    return false;
  }
};
