import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { logIn } from "../services/authService";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

export default function useLogIn() {
  const navigate = useNavigate();
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
      Cookies.set(
        "userData",
        JSON.stringify({
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role,
        }),
        { expires: 7 }
      );
      // Annouce when success
      toast.success("Đăng nhập thành công.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/");
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
