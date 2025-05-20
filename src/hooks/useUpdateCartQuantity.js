// useUpdateCart.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateQuantity } from "../services/cart.service";

export default function useUpdateCartQuantity() {
  const queryClient = useQueryClient();

  const { mutate: updateCart, isLoading } = useMutation({
    mutationFn: ({ foodId, action }) => updateQuantity(foodId, action),
    onSuccess: () => {
      // Cập nhật cache
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      console.log("error", error);
      toast.error(`Failed to update cart: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
  });

  // Hàm tiện ích để tăng số lượng
  const increaseQuantity = (foodId) => {
    updateCart({ foodId, action: "increase" });
  };

  // Hàm tiện ích để giảm số lượng
  const decreaseQuantity = (foodId) => {
    updateCart({ foodId, action: "decrease" });
  };

  return {
    increaseQuantity,
    decreaseQuantity,
    isLoading,
  };
}
