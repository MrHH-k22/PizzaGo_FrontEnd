import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signupUser } from "../services/authService";
import { useNavigate } from "react-router";

export default function useSignUp() {
  const navigate = useNavigate();
  const {
    mutate: registerUser,
    isLoading: isCreatingUser,
    isError,
    isSuccess,
    error,
    data,
  } = useMutation({
    mutationFn: (userData) => signupUser(userData),
    onSuccess: (data) => {
      toast.success("Tạo tài khoản thành công.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/login");
    },
    onError: (error) => {
      toast.error(`Đăng kí thất bại: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
  });

  // Return the mutation functions and states
  return {
    registerUser,
    isCreatingUser,
    isSuccess,
    isError,
    error,
    data,
  };
}
