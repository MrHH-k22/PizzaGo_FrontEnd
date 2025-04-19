import { Link } from "react-router-dom";

function CartSummary() {
  return (
    <div className="w-full md:w-1/3 md:gap-6 gap-2 max-h-fit">
      <div className="border border-gray-300 rounded-2xl p-6 bg-white mb-10">
        <div className="pb-2">
          <div className="w-full flex justify-between items-center py-2 cursor-pointer">
            <div className="w-full flex items-center gap-1">
              <p>Total Item Costs</p>
            </div>
            <p className="text-base font-semibold">$45</p>
          </div>
          <div className="w-full flex justify-between items-center py-2 cursor-pointer">
            <div className="w-full flex items-center gap-1">
              <p>Total Quantity</p>
            </div>
            <p className="text-base font-semibold">8</p>
          </div>
          <div className="w-full flex justify-between items-center py-2 cursor-pointer">
            <div className="w-full flex items-center gap-1">
              <p>Delivery fee</p>
            </div>
            <p className="text-base font-semibold">$12</p>
          </div>
        </div>
        <div className="pt-4 border-t flex items-end justify-between text-right">
          <p className="text-nowrap">Total Amount</p>
          <div>
            <p className="font-bold text-3xl">$100</p>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Link
          to="/"
          className="py-[12px] px-[24px] inline-flex items-center justify-center rounded-lg gap-[10px] bg-red-600 border-2 border-red-600 text-white disabled:bg-gray-300 disabled:pointer-events-none w-full hover:bg-white hover:text-red-600 transition duration-300 ease-in-out "
        >
          <span className="inlne text-center text-base font-medium">
            Check out
          </span>
        </Link>
      </div>
    </div>
  );
}

export default CartSummary;
