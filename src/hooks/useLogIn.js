import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { logIn } from "../services/authService";
import { useAuth } from "./useAuth";
import Cookies from "js-cookie";

export default function useLogIn() {
  const { setUser } = useAuth();
  const {
    mutate: logInUser,
    isLoading: isLoggingIn,
    isError,
    isSuccess,
    error,
    data,
  } = useMutation({
    mutationFn: (userData) => logIn(userData),
    onSuccess: (data) => {
      // Store user data in a single cookie
      console.log("data", data);
      Cookies.set(
        "userData",
        JSON.stringify({
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role,
          address: data.address,
        }),
        { expires: 7 }
      );
      if (data.accessToken) {
        Cookies.set("accessToken", data.accessToken, {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });
      }

      setUser({
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
        address: data.address,
      });
      // Annouce when success
      toast.success("Đăng nhập thành công.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      window.location.href = "/";
    },
    onError: (error) => {
      toast.error(`Đăng nhập thất bại: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
  });

  return {
    logInUser,
    isLoggingIn,
    isSuccess,
    isError,
    error,
    data,
  };
}
