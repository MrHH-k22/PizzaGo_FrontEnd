// Tạo file hooks/useSearchFood.js
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { searchFoodItems } from "../services/foodItem.service";

export default function useSearchFood() {
  const {
    mutate: searchFood,
    data: searchResults,
    isLoading: isSearching,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: (query) => searchFoodItems(query),
    onError: (error) => {
      toast.error(`Search failed: ${error.message}`, {
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
    searchFood,
    searchResults,
    isSearching,
    isError,
    error,
    resetSearch: reset,
  };
}
