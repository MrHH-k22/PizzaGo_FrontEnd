import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addToCartService } from "../services/cart.service";
import { useNavigate } from "react-router-dom";

export default function useAddToCart() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: addToCartMutation,
    isLoading: isAddingToCart,
    isError,
    isSuccess,
    error,
    data,
  } = useMutation({
    mutationFn: (data) => addToCartService(data.foodId, data.quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Thêm vào giỏ hàng thành công.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
    onError: (error) => {
      if (error.status === 401) {
        toast.error("Vui lòng đăng nhập để thêm vào giỏ hàng", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        // Chuyển hướng đến trang đăng nhập
        navigate("/login", { state: { from: window.location.pathname } });
      } else {
        toast.error(`Thêm vào giỏ hàng thất bại: ${error.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    },
  });

  const addToCart = (foodId, quantity) => {
    addToCartMutation({ foodId, quantity });
  };

  return {
    addToCart,
    isAddingToCart,
    isError,
    isSuccess,
    error,
    data,
  };
}
