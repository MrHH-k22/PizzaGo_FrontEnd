import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addFoodItem } from "../services/foodItem.service";

export default function useAddFoodItem() {
    const queryClient = useQueryClient();
    const {
        mutate: addNewFoodItem,
        isLoading: isAddingFoodItem,
        isError,
        isSuccess,
        error,
        data,
    } = useMutation({
        mutationFn: (foodItemData) => addFoodItem(foodItemData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['foodItems'] });
            toast.success("Food item created successfully.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        },
        onError: (error) => {
            toast.error(`Failed to create food item: ${error.message}`, {
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
        addNewFoodItem,
        isAddingFoodItem,
        isSuccess,
        isError,
        error,
        data,
    };
}