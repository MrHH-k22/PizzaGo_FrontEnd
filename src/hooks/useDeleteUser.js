import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteUser } from "../services/user.service";

export default function useDeleteUser() {
    const queryClient = useQueryClient();
    const {
        mutate: deleteUserMutation,
        isLoading: isDeletingUser,
        isError,
        isSuccess,
        error,
        data,
    } = useMutation({
        mutationFn: (userId) => deleteUser(userId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success("User deleted successfully.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        },
        onError: (error) => {
            toast.error(`Failed to delete user: ${error.message}`, {
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
        deleteUserMutation,
        isDeletingUser,
        isSuccess,
        isError,
        error,
        data,
    };
}