// components/Checkout.jsx
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import DeliveryInfo from "./DeliveryInfo";
import CustomerInfo from "./CustomerInfo";
import CartSummary from "./CartSummary";
import CustomButton from "../../components/CustomButton";
import { useAuth } from "../../hooks/useAuth";
import useGetCart from "../../hooks/useGetCart";
import useCreateOrder from "../../hooks/useCreateOrder";
import { FormProvider, useForm } from "react-hook-form";

function Checkout() {
  const { user } = useAuth();
  const { cart, isLoading, isError, error } = useGetCart();
  const { createOrder, isLoading: isCreating } = useCreateOrder();

  const navigate = useNavigate();
  function handleGoBack() {
    navigate(-1);
  }

  const methods = useForm({
    defaultValues: {
      deliveryAddress: user?.address || "",
      note: "",
      shippingMethod: "Economy Delivery", // Default shipping method
    },
  });

  const onSubmit = (data) => {
    if (!user || !cart) return;

    // Tạo order data từ form, user và cart
    const orderData = {
      deliveryAddress: data.deliveryAddress,
      note: data.note,
      shippingMethod: data.shippingMethod, // Thêm phương thức vận chuyển
      items: cart.items,
    };

    // Gọi createOrder với dữ liệu đã chuẩn bị
    createOrder(orderData);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="cart-container">
      <div className="flex py-4 md:py-6 items-center justify-between bg-white flex-row">
        <div className="text-left text-black ">
          <div
            className="flex flex-row items-center cursor-pointer active:opacity-50"
            onClick={handleGoBack}
          >
            <IoIosArrowRoundBack />
            <p className="text-sm inline select-none">Go Back</p>
          </div>
        </div>
        <p className="text-base md:text-3xl font-semibold md:font-bold">
          Check out
        </p>
        <div className="w-[48px] h-3"></div>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row gap-2 md:gap-4"
        >
          <div className="w-full md:w-2/3 h-full flex flex-col gap-2 md:gap-4">
            <CustomerInfo user={user} />
            <DeliveryInfo user={user} />
          </div>
          <div className="w-full md:w-1/3 md:gap-6 gap-2 max-h-fit">
            <CartSummary />
            <div className="mt-4">
              <CustomButton
                text={isCreating ? "Processing..." : "Đặt hàng"}
                width="full"
                type="submit"
                disabled={isCreating}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default Checkout;
