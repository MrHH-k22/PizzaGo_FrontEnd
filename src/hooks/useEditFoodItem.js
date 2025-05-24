import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { editFoodItem } from "../services/foodItem.service";

export default function useEditFoodItem() {
    const queryClient = useQueryClient();
    const {
        mutate: editFoodItemMutation,
        isLoading: isEditingFoodItem,
        isError,
        isSuccess,
        error,
        data,
    } = useMutation({
        mutationFn: (foodItemData) => editFoodItem(foodItemData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['foodItems'] });
            toast.success("Food item updated successfully.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        },
        onError: (error) => {
            toast.error(`Failed to update food item: ${error.message}`, {
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
        editFoodItemMutation,
        isEditingFoodItem,
        isSuccess,
        isError,
        error,
        data,
    };
}