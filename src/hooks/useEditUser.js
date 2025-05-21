import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { editUser } from "../services/user.service";

export default function useEditUser() {
  const queryClient = useQueryClient();
  const {
    mutate: editUserMutation,
    isLoading: isEditingUser,
    isError,
    isSuccess,
    error,
    data,
  } = useMutation({
    mutationFn: (userData) => editUser(userData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User updated successfully.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
    onError: (error) => {
      toast.error(`Failed to update user: ${error.message}`, {
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
    editUserMutation,
    isEditingUser,
    isSuccess,
    isError,
    error,
    data,
  };
}
