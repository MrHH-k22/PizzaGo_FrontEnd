import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getUsers } from "../services/user.service";

export default function useGetUsers(role) {
    const {
        data: listUsers,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["users", role],
        queryFn: () => getUsers(role),
        onError: (error) => {
            toast.error(`Failed to fetch users: ${error.message}`, {
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
        listUsers,
        isLoading,
        isError,
        error,
        refetch,
    };
}