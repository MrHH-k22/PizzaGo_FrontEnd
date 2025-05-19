// import axios from "axios";
// import axiosAuth from "../axios/axios";
import Cookies from "js-cookie";
const API_URL = import.meta.env.VITE_BACKEND_URL;

export const signupUser = async (data) => {
  try {
    const transformedData = {
      fullName: data.fullname,
      email: data.email,
      password: data.password,
      address: data.address,
    };

    console.log("Sending signup data:", transformedData);

    const response = await fetch(`${API_URL}/auth/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transformedData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw { message: responseData.message || "Không thể đăng kí tài khoản" };
    }

    return responseData;
  } catch (error) {
    console.error("Signup error details:", error);
    const errMsg = error.message || "Không thể đăng kí tài khoản";
    throw { message: errMsg };
  }
};
export const logIn = async (data) => {
  try {
    const transformedData = {
      email: data.email,
      password: data.password,
      role: data.role,
    };
    const response = await fetch(`${API_URL}/auth/logIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transformedData),
      credentials: "include", // Include cookies in the request
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw {
        message: responseData.message || "Không thể đăng nhập tài khoản",
      };
    }
    return responseData.data;
  } catch (error) {
    const errMsg =
      error.response?.data?.message || "Không thể đăng nhập tài khoản";
    throw { message: errMsg };
  }
};
export const logOut = async () => {
  try {
    const response = await fetch(`${API_URL}/auth/logOut`, {
      method: "POST",
      credentials: "include", // Include cookies in the request
    });

    if (!response.ok) {
      const data = await response.json();
      throw { message: data.message || "Không thể đăng xuất tài khoản" };
    }

    return true;
  } catch (error) {
    const errMsg = error.message || "Không thể đăng xuất tài khoản";
    throw { message: errMsg };
  }
};

export const verifyAccess = async (requiredRole) => {
  try {
    // Get accessToken from cookie
    const accessToken = Cookies.get("accessToken");

    const response = await fetch(`${API_URL}/auth/verify-access`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
      body: JSON.stringify({ requiredRole }),
      credentials: "include", // Still include cookies for session verification
    });

    if (!response.ok) {
      const data = await response.json();
      throw { message: data.message || "Access verification failed" };
    }

    return await response.json();
  } catch (error) {
    console.error("Access verification error:", error);
    const errMsg = error.message || "Không thể xác thực quyền truy cập";
    throw { message: errMsg };
  }
};
