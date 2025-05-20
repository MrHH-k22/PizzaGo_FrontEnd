import { Link } from "react-router-dom";
import CustomButton from "../../components/CustomButton";

function CartSummary({ cart }) {
  // Calculate values dynamically from cart prop
  const calculateTotalItemCost = () => {
    return cart.items.reduce(
      (total, item) => total + item.foodItemId.price * item.quantity,
      0
    );
  };

  const calculateTotalQuantity = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  const deliveryFee = 20000;

  // Calculate dynamically
  const totalItemCost = calculateTotalItemCost();
  const totalQuantity = calculateTotalQuantity();
  const totalAmount = totalItemCost + deliveryFee;

  const formatPrice = (price) => new Intl.NumberFormat("vi-VN").format(price);

  return (
    <div className="w-full md:w-1/3 md:gap-6 gap-2 max-h-fit">
      <div className="border border-gray-300 rounded-2xl p-4 md:p-6 bg-white mb-4 md:mb-10">
        <div className="pb-2">
          {/* Sử dụng grid để căn chỉnh rõ ràng */}
          <div className="grid grid-cols-2 py-2">
            <div>
              <p className="whitespace-nowrap">Total Item Costs</p>
            </div>
            <div className="text-right">
              <p className="text-base font-semibold whitespace-nowrap">
                {formatPrice(totalItemCost)} đ
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 py-2">
            <div>
              <p className="whitespace-nowrap">Total Quantity</p>
            </div>
            <div className="text-right">
              <p className="text-base font-semibold whitespace-nowrap">
                {totalQuantity}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 py-2">
            <div>
              <p className="whitespace-nowrap">Delivery fee</p>
            </div>
            <div className="text-right">
              <p className="text-base font-semibold whitespace-nowrap">
                {formatPrice(deliveryFee)} đ
              </p>
            </div>
          </div>
        </div>

        {/* Phần tổng cộng với đường viền phía trên */}
        <div className="pt-4 border-t grid grid-cols-2 items-end">
          <div>
            <p className="whitespace-nowrap">Total Amount</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-xl sm:text-2xl md:text-3xl whitespace-nowrap">
              {formatPrice(totalAmount)} đ
            </p>
          </div>
        </div>
      </div>

      <CustomButton text="Check out" width="full" to="/checkout" />
    </div>
  );
}

export default CartSummary;
