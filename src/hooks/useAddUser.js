import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addUser } from "../services/user.service";

export default function useAddUser() {
    const queryClient = useQueryClient();
    const {
        mutate: addNewUser,
        isLoading: isAddingUser,
        isError,
        isSuccess,
        error,
        data,
    } = useMutation({
        mutationFn: (userData) => addUser(userData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success("User created successfully.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        },
        onError: (error) => {
            toast.error(`Failed to create user: ${error.message}`, {
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
        addNewUser,
        isAddingUser,
        isSuccess,
        isError,
        error,
        data,
    };
}