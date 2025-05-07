import { useNavigate } from "react-router-dom";

//
import { IoIosArrowRoundBack } from "react-icons/io";
import DeliveryInfo from "./DeliveryInfo";
import CustomerInfo from "./CustomerInfo";
import CartSummary from "./CartSummary";
import CustomButton from "../../components/CustomButton";

function Checkout() {
  const navigate = useNavigate();
  function handleGoBack() {
    navigate(-1);
  }
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
        <p class="text-base md:text-3xl font-semibold md:font-bold">
          Check out
        </p>
        <div class="w-[48px] h-3"></div>
      </div>
      <div className="flex flex-col md:flex-row gap-2 md:gap-4">
        <div className="w-full md:w-2/3 h-full flex flex-col gap-2 md:gap-4">
          <DeliveryInfo />
          <CustomerInfo />
        </div>
        <div className="w-full md:w-1/3 md:gap-6 gap-2 max-h-fit">
          <CartSummary />
          <div className="mt-4">
            <CustomButton text="Đặt hàng" width="full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
