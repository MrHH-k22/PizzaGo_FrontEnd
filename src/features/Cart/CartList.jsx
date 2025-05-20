import CartItem from "./CartItem";

function CartList({ cart }) {
  return (
    <div className="w-full md:w-2/3 h-full flex flex-col gap-2 md:gap-4">
      <div className="px-6 md-min-h-fit bg-white md:border border-gray-300 md:rounded-2xl">
        <div className="text-sm text-left text-black py-4 md:py-6">
          <p className="font-semibold md:text-base">
            There are {cart?.items?.length} items in your cart
          </p>
        </div>
        <div className="flex flex-col gap-4 overflow-hidden">
          {cart?.items?.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CartList;
