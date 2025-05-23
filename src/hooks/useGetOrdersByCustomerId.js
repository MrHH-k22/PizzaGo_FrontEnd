import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getOrdersByCustomerId } from "../services/order.service";

export default function useGetOrdersByCustomerId(customerId) {
  const {
    data: orders,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["orders", customerId],
    queryFn: () => getOrdersByCustomerId(customerId),
    enabled: !!customerId,
    onError: (error) => {
      toast.error(`Failed to fetch orders: ${error.message}`, {
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
    orders,
    isLoading,
    isError,
    error,
    refetch,
  };
}
