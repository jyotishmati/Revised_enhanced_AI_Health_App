import apiClient from "./apiClient";
import { getItem } from "./tokenOperation";

export const uploadDocumentAPI = async (
    file: File,
    date: string
  ): Promise<{ fileId: string; encryptedFileId: string }> => {
    try {
      const token = await getItem(); 
      if (!token) throw new Error("No token found, please log in again.");
  
      if (!file || !date) throw new Error("File or Date not provided");
  
      const formData = new FormData();
      formData.append("file", file);
      formData.append("date", date);
  
      const response = await apiClient.post("docs/save-docs", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      return response.data;
    } catch (error: any) {
      console.error("Upload Error:", error);
      if (error.response) {
        throw new Error(error.response.data?.message || "Upload failed.");
      }
      throw new Error("An unexpected error occurred.");
    }
  };
  


  export const fetchDocumentsByDateAPI = async (
    date: string
  ): Promise<Document[]> => {
    try {
      const token = await getItem(); 
      if (!token) throw new Error("No token found, please log in again.");
  
      const response = await apiClient.post(
        "docs/get-docs",
        { date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      return response.data.documents;
    } catch (error: any) {
      console.error("Fetch Error:", error);
      if (error.response) {
        throw new Error(error.response.data?.message || "Failed to fetch files.");
      }
      throw new Error("An unexpected error occurred.");
    }
  };
  