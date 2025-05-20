import { IoIosArrowRoundBack } from "react-icons/io";
import CartList from "./CartList";
import CartSummary from "./CartSummary";
import { useNavigate } from "react-router-dom";
import useGetCart from "../../hooks/useGetCart";

function Cart() {
  const { cart, isLoading, isError, error } = useGetCart();
  console.log("cart", cart);
  const navigate = useNavigate();
  function handleGoBack() {
    navigate(-1);
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <div className="cart-container">
      <div class="flex py-4 md:py-6 items-center justify-between bg-white flex-row">
        <div class="text-left text-black ">
          <div
            class="flex flex-row items-center cursor-pointer active:opacity-50"
            onClick={handleGoBack}
          >
            <IoIosArrowRoundBack />
            <p class="text-sm inline select-none">Go Back</p>
          </div>
        </div>
        <p class="text-base md:text-3xl font-semibold md:font-bold">My Cart</p>
        <div class="w-[48px] h-3"></div>
      </div>
      <div className="flex flex-col md:flex-row gap-2 md:gap-4  ">
        <CartList cart={cart} />
        <CartSummary cart={cart} />
      </div>
    </div>
  );
}

export default Cart;
