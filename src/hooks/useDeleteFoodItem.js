import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteFoodItem } from "../services/foodItem.service";

export default function useDeleteFoodItem() {
    const queryClient = useQueryClient();
    const {
        mutate: deleteFoodItemMutation,
        isLoading: isDeletingFoodItem,
        isError,
        isSuccess,
        error,
        data,
    } = useMutation({
        mutationFn: (itemId) => deleteFoodItem(itemId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['foodItems'] });
            toast.success("Food item deleted successfully.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        },
        onError: (error) => {
            toast.error(`Failed to delete food item: ${error.message}`, {
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
        deleteFoodItemMutation,
        isDeletingFoodItem,
        isSuccess,
        isError,
        error,
        data,
    };
}