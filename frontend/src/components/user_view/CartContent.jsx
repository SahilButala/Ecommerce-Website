import { DeleteCartItem, updateCartItemQuantity } from "@/store/userView/cart";
import { Trash } from "lucide-react";
import React from "react";
import { IoAdd } from "react-icons/io5";
import { RxMinus } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
const CartContent = ({ cartItems }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleDeleteItem = () => {
    dispatch(
      DeleteCartItem({ userId: user?._id, productId: cartItems?.productId })
    );
  };
  const { toast } = useToast();


  const handleUpdateQuantityOfItems = (getcartItem, type) => {
    dispatch(
      updateCartItemQuantity({
        userId: user?._id,
        productId: getcartItem?.productId,
        quantity:
          type === "add"
            ? getcartItem?.quantity + 1
            : getcartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: `quantity updated , item ${
            type === "add" ? "added" : "remove"
          } to cart`,
        });
      }
    });
  };
  return (
    <div className="">
      <div className=" flex gap-5  relative">
        <div className="leftside w-20 h-20  ">
          <img
            src={cartItems?.image}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
        <div className="rightside">
          <p className="font-medium ">{cartItems?.title}</p>
          <div className="lower flex gap-2 mt-3 items-center">
            <button
              onClick={() => handleUpdateQuantityOfItems(cartItems, "minus")}
              className={`${cartItems?.quantity === 1 && "cursor-not-allowed"}`}
              disabled={cartItems?.quantity === 1}
            >
              <RxMinus className="border text-red-500" size={20} />
            </button>
            <p className="text-sm font-medium">{cartItems.quantity}</p>
            <IoAdd
              onClick={() => handleUpdateQuantityOfItems(cartItems, "add")}
              className="border text-green-600 cursor-pointer"
              size={20}
            />
          </div>
        </div>
        {/* price */}
        <div className="flex  items-center gap-2 absolute right-2 ">
          $
          {(
            (cartItems?.saleprice > 0
              ? cartItems?.saleprice
              : cartItems?.price) * cartItems?.quantity
          ).toFixed(2)}
          <Trash
            size={15}
            className="text-red-500 cursor-pointer"
            onClick={() => handleDeleteItem()}
          />
        </div>
      </div>
    </div>
  );
};
  
export default CartContent;
