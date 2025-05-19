import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getFoodItems } from "../services/foodItem.service";

export default function useGetFoodItems() {
  const {
    data: foodItems,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["foodItems"],
    queryFn: getFoodItems,
    onError: (error) => {
      toast.error(`Failed to fetch data: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    },
  });

  return {
    foodItems,
    isLoading,
    isError,
    error,
    refetch,
  };
}
