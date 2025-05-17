import axios from "axios";
import axiosAuth from "../axios/axios";
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
    const response = await axios.post(
      `${API_URL}/auth/signUp`,
      transformedData
    );
    return response.data;
  } catch (error) {
    console.error("Signup error details:", error);
    const errMsg =
      error.response?.data?.message || "Không thể đăng kí tài khoản";
    throw { message: errMsg };
  }
};
export const logIn = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auth/logIn`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const errMsg =
      error.response?.data?.message || "Không thể đăng nhập tài khoản";
    throw { message: errMsg };
  }
};
export const logOut = async () => {
  try {
    const response = await axiosAuth.post(`${API_URL}/auth/logOut`);
    return response.data;
  } catch (error) {
    const errMsg =
      error.response?.data?.message || "Không thể đăng xuất tài khoản";
    throw { message: errMsg };
  }
};
