// components/CartSummary.jsx
import React, { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import useGetCart from "../../hooks/useGetCart";

// Định nghĩa các strategy tính phí vận chuyển
const shippingStrategies = {
  "Fast Delivery": (items, totalPrice) => {
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    return totalQuantity > 6 ? totalPrice * 0.2 : totalPrice * 0.15;
  },
  "Economy Delivery": (items, totalPrice) => {
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    return totalQuantity > 6 ? totalPrice * 0.1 : totalPrice * 0.05;
  },
  "Pick up": () => 0,
};

function CartSummary() {
  const { cart } = useGetCart();
  const { control } = useFormContext();

  // Lấy phương thức vận chuyển từ form
  const shippingMethod = useWatch({
    control,
    name: "shippingMethod",
    defaultValue: "Economy Delivery",
  });

  // Format currency with dot separator for thousands
  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Tính toán giá trị giỏ hàng
  const basketData = useMemo(() => {
    if (!cart || !cart.items || !cart.items.length) {
      return {
        productCount: 0,
        subtotal: 0,
        memberDiscount: 0,
        deliveryFee: 0,
        total: 0,
        rewardPoints: 0,
      };
    }

    // Tính tổng giá tiền đồ ăn
    const subtotal = cart.items.reduce(
      (sum, item) => sum + item.foodItemId.price * item.quantity,
      0
    );

    // Tính phí vận chuyển dựa trên strategy
    const deliveryFee = shippingStrategies[shippingMethod]
      ? shippingStrategies[shippingMethod](cart.items, subtotal)
      : 0;

    const memberDiscount = 0;
    const total = subtotal - memberDiscount + deliveryFee;
    const rewardPoints = Math.floor((total * 0.1) / 1000) * 10; // 10 points for every 1000 đ
    const productCount = cart.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    return {
      productCount,
      subtotal,
      memberDiscount,
      deliveryFee,
      total,
      rewardPoints,
    };
  }, [cart, shippingMethod]);

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-2xl border border-gray-300 px-8 py-6">
      {/* Header section with basket info */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">My Basket</h2>
          <p className="text-sm text-gray-600">
            There are {basketData.productCount} products in your cart
          </p>
        </div>
      </div>

      {/* Pricing details */}
      <div className="border-b border-gray-200 pb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700">Sub total</span>
          <span className="text-gray-900 font-medium">
            {formatCurrency(basketData.subtotal)} đ
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-gray-900 mr-1">
              Delivery fee ({shippingMethod})
            </span>
          </div>
          <span className="text-gray-900">
            {formatCurrency(basketData.deliveryFee)} đ
          </span>
        </div>
      </div>

      {/* Total and rewards */}
      <div className="pt-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-gray-800 font-medium">Total</span>
          <span className="text-xl font-bold text-gray-900">
            {formatCurrency(basketData.total)} đ
          </span>
        </div>

        {/* <div className="text-sm text-gray-500 text-right">
          Get{" "}
          <span className="font-medium">{basketData.rewardPoints} points</span>{" "}
          <span className="text-red-500">Hut rewards</span>
        </div> */}
      </div>
    </div>
  );
}

export default CartSummary;
