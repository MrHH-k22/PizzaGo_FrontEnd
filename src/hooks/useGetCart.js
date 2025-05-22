import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getCart } from "../services/cart.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function useGetCart() {
  const { user } = useAuth();
  const {
    data: cart,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    // Skip executing the query for unauthenticated users
    enabled: !!user,
    onError: (error) => {
      console.log("error status", error);
      toast.error(`Failed to fetch cart: ${error.message}`, {
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
    cart: cart || { items: [] },
    isLoading,
    isError,
    error,
    refetch,
  };
}
