import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getCategories } from "../services/category.service"; // Giả định path đến file chứa hàm getCategories

export default function useGetCategory() {
  const {
    data: categories,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    onError: (error) => {
      toast.error(`Failed to fetch categories: ${error.message}`, {
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
    categories,
    isLoading,
    isError,
    error,
    refetch,
  };
}
