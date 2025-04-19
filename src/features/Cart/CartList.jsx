import CartItem from "./CartItem";

function CartList() {
  return (
    <div className="w-full md:w-2/3 h-full flex flex-col gap-2 md:gap-4 ">
      <div className="px-6 md-min-h-fit bg-white md:border border-gray-300 md:rounded-2xl">
        <div className="text-sm text-left text-black py-4 md:py-6">
          <p className="font-semibold md:text-base">
            There are 6 items in your cart
          </p>
        </div>
        <div className="flex flex-col gap-4 overflow-hidden">
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
        </div>
      </div>
    </div>
  );
}

export default CartList;
