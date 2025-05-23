import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { changePassword } from "../services/user.service";

export default function useChangePassword() {
  const queryClient = useQueryClient();

  const {
    mutate: changePasswordMutation,
    isLoading: isChangingPassword,
    isError,
    isSuccess,
    error,
    data,
  } = useMutation({
    mutationFn: (passwordData) => changePassword(passwordData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Password changed successfully.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
    onError: (error) => {
      toast.error(`Failed to change password: ${error.message}`, {
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
    changePasswordMutation,
    isChangingPassword,
    isSuccess,
    isError,
    error,
    data,
  };
}
