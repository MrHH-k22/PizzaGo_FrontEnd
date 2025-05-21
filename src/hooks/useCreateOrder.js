// hooks/useCreateOrder.js

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createOrder } from "../services/order.service";
import { useNavigate } from "react-router-dom";

export default function useCreateOrder() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      // Invalidate và refetch cart query
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order created successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/customer/cart");
    },
    onError: (error) => {
      toast.error(`Failed to create order: ${error.message}`, {
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
    createOrder: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
}
