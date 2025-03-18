import apiClient from "./apiClient";
import { getItem, setItem } from "./tokenOperation";
// import { storeToken } from "./tokenOperation";
// import { getToken, saveToken } from "./tokenOperation2";

interface ILoginSignup {
  email: string;
  password: string;
  confirmPassword?: string;
}

export const loginSignup = async ({
  email,
  password,
  confirmPassword = "",
}: ILoginSignup) => {
  if (!email.includes("@")) {
    throw new Error("Invalid email format");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }
  if (confirmPassword && password !== confirmPassword) {
    throw new Error("Incorrect Password");
  }
  try {
    const response = await apiClient.post(
      "user/login-signup",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status) {
      console.log(response.data.token);
      await setItem(response.data.token);
      return response.data;
    }
  } catch (error: any) {
    console.error(error);
    console.error(error.message);
    throw error;
  }
};

interface IOTP {
  otp: Number;
}
export const verifyEmail = async ({ otp }: IOTP) => {
  try {
    const token = await getItem();
    if (!token) {
      throw new Error("No token found, please log in again.");
    }
    console.log(token);

    const response = await apiClient.post(
      "user/verify-email",
      { secret: otp },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error verifying email:", error);

    if (error.response) {
      if(error.response.data?.message == "User not found"){
        alert("User Not found")
      }
      if(error.response.data?.message == "Email already verified"){
        alert("Email Already verified")
        window.location.href = "/Login%2FSignup"
      }
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
