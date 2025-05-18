import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logOut } from "../services/authService";
import { useAuth } from "./useAuth";

export default function useLogOut() {
  const navigate = useNavigate();
  const { clearUser } = useAuth();

  const { mutate: logOutUser } = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      clearUser(); // Clear user from auth context
      toast.success("Đăng xuất thành công", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/"); // Redirect to home page
    },
    onError: (error) => {
      toast.error(`Đăng xuất thất bại: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
      });
    },
  });

  return { logOutUser };
}
