import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getCountByRole } from "../services/user.service"; // Giả định path đến file chứa hàm getCountByRole
export default function useGetCountByRole(role) {
    const {
        data: countByRole,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["countByRole", role],
        queryFn: () => getCountByRole(role),
        onError: (error) => {
            toast.error(`Failed to fetch count by role: ${error.message}`, {
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
        countByRole,
        isLoading,
        isError,
        error,
        refetch,
    };
}