import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import CartContent from "./CartContent";
import { useNavigate } from "react-router-dom";

const CartWrapper = ({ cartItems,setopenCartSheet }) => {
  const navigate = useNavigate()
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.saleprice > 0
              ? currentItem?.saleprice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;
  return (
    <div>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        <div className="mt-8 space-y-4 ">
          <div className="space-y-2 max-h-[400px] border overflow-y-auto p-2">
            {cartItems && cartItems.length > 0
              ? cartItems.map((item, i) => (
                  <CartContent key={i} cartItems={item} />
                ))
              : <div className="flex flex-col items-center justify-center p-4 ">
                   <img className="w-28" src="https://cdn-icons-png.freepik.com/512/7835/7835563.png" alt="" />
                   <p className="text-xl mt-4 font-semibold" >Your cart is Empty.. !</p>
                   <p className="text-xs  text-center mt-2">please add products to your cart in order to <br/> proceed to checkout</p>
                 </div>}
          </div>

          <div className="flex justify-between ">
            <span className="font-medium">Total</span>
            <span className="font-medium">${totalCartAmount}.00</span>
          </div>
          <Button
          onClick={()=>{navigate('/shop/checkout')
            setopenCartSheet(false)
          }}
          disabled={cartItems.length === 0}
          className={`${cartItems.length === 0 ? 'cursor-not-allowed' : ''} mt-3 w-full`}>Check Out</Button>
        </div>
      </SheetContent>
    </div>
  );
};

export default CartWrapper;
