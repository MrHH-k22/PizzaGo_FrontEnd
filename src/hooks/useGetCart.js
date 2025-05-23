import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getCart } from "../services/cart.service";
import { useNavigate } from "react-router-dom";

export default function useGetCart() {
  const {
    data: cart,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
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
    cart,
    isLoading,
    isError,
    error,
    refetch,
  };
}
