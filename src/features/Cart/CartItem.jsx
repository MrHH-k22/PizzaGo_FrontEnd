import { MdDelete } from "react-icons/md";
import { getImagePath } from "../../utils/helpers";
import useUpdateCartQuantity from "../../hooks/useUpdateCartQuantity";
import useRemoveFromCart from "../../hooks/useRemoveFromCart";

function CartItem({ item }) {
  const { foodItemId, quantity, _id } = item;
  const {
    increaseQuantity,
    decreaseQuantity,
    isLoading: isUpdatingCartQuantity,
  } = useUpdateCartQuantity();
  const { removeFromCart, isLoading: isRemovingFromCart } = useRemoveFromCart();

  const formattedPrice = new Intl.NumberFormat("vi-VN").format(
    foodItemId.price
  );
  const totalPrice = new Intl.NumberFormat("vi-VN").format(
    foodItemId.price * quantity
  );

  const handleIncrease = () => {
    increaseQuantity(foodItemId._id || foodItemId);
  };

  const handleDecrease = () => {
    decreaseQuantity(foodItemId._id || foodItemId);
  };

  const handleRemove = () => {
    removeFromCart(_id);
  };

  return (
    <div className="py-4 border-b border-gray-200 w-full">
      <div className="flex items-center w-full">
        {/* Hình ảnh - chiếm 15% */}
        <div className="w-[15%] min-w-[70px]">
          <img
            src={getImagePath(foodItemId.image)}
            alt={foodItemId.name}
            className="w-24 h-24 rounded-md object-cover"
          />
        </div>

        {/* Container chứa thông tin còn lại - chiếm 85% */}
        <div className="flex w-[85%] justify-between items-center">
          {/* Tên và mô tả - chiếm 45% */}
          <div className="flex flex-col w-[45%] pr-2">
            <h3 className="font-medium text-base md:text-lg text-black truncate">
              {foodItemId.name}
            </h3>
            <p className="text-gray-600 text-xs md:text-sm mt-1 line-clamp-2">
              {foodItemId.description}
            </p>
          </div>

          {/* Số lượng - chiếm 25% */}
          <div className="w-[25%] flex justify-center">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                className="px-2 md:px-3 py-1 disabled:bg-gray-100 text-gray-600 hover:bg-gray-100"
                onClick={handleDecrease}
                disabled={isUpdatingCartQuantity || quantity === 1}
              >
                -
              </button>
              <span className="px-3 md:px-4">{quantity}</span>
              <button
                className="px-2 md:px-3 py-1 text-gray-600 disabled:bg-gray-100 hover:bg-gray-100"
                onClick={handleIncrease}
                disabled={isUpdatingCartQuantity}
              >
                +
              </button>
            </div>
          </div>

          {/* Giá và nút xóa - chiếm 30% */}
          <div className="w-[30%] flex items-center justify-end">
            <p className="font-medium text-base md:text-lg whitespace-nowrap">
              {totalPrice} đ
            </p>
            <button
              className="text-gray-500 hover:text-gray-700 ml-4"
              disabled={isRemovingFromCart}
              onClick={handleRemove}
            >
              <MdDelete size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
