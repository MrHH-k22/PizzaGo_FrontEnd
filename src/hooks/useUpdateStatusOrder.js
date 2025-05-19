import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateOrderStatus } from "../services/order.service";

export default function useUpdateStatusOrder() {
  const {
    mutate: updateStatusOrder,
    isLoading,
    isError,
    isSuccess,
    error,
    data,
  } = useMutation({
    mutationFn: ({ orderId, newStatus }) =>
      updateOrderStatus(orderId, newStatus),
    onSuccess: (data) => {
      toast.success("Order status updated successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
    onError: (error) => {
      toast.error(`Failed to update order status: ${error.message}`, {
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
    updateStatusOrder,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
  };
}
