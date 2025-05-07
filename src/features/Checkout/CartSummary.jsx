function CartSummary() {
  const basketData = {
    productCount: 1,
    subtotal: 279000,
    memberDiscount: 0,
    deliveryFee: 0,
    total: 279000,
    rewardPoints: 27,
  };

  // Format currency with dot separator for thousands
  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

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

        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <span className="text-blue-600 mr-1">Member discount</span>
            {/* <BiInfoCircle size={16} className="text-gray-400" /> */}
          </div>
          <span className="text-green-600">
            {formatCurrency(basketData.memberDiscount)} đ
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-blue-600 mr-1">Delivery fee</span>
            {/* <Info size={16} className="text-gray-400" /> */}
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

        <div className="text-sm text-gray-500 text-right">
          Get{" "}
          <span className="font-medium">{basketData.rewardPoints} points</span>{" "}
          <span className="text-red-500">Hut rewards</span>
        </div>
      </div>
    </div>
  );
}

export default CartSummary;
