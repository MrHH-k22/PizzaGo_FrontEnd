import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getOrders } from "../services/order.service";

export default function useGetOrders() {
  const {
    data: orders,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
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

  // Return a function that provides the orders data
  const getOrdersData = () => {
    return orders || []; // Return empty array if data is not loaded yet
  };

  return {
    getOrders: getOrdersData,
    orders,
    isLoading,
    isSuccess: !isLoading && !isError && !!orders,
    isError,
    error,
    refetch,
  };
}
