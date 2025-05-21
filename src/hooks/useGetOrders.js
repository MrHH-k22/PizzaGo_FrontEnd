import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getOrders } from "../services/order.service";

export default function useGetOrders() {
  const {
    data: listorders,
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

  return {
    listorders,
    isLoading,
    isError,
    error,
    refetch,
  };
}
