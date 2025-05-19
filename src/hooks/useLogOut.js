import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { logOut } from "../services/authService";
import { useAuth } from "./useAuth";

export default function useLogOut() {
  const { logout } = useAuth();

  const { mutate: logOutUser } = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      logout(); // Clear user from auth context
      toast.success("Đăng xuất thành công", {
        position: "top-right",
        autoClose: 3000,
      });
      window.location.href = "/";
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
