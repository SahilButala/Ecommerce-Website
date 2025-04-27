import React, { useState } from "react";
import chekout from "../../assets/chekout.jpeg";
import Address from "./Address";
import { useDispatch, useSelector } from "react-redux";
import CartContent from "@/components/user_view/CartContent";
import { Button } from "@/components/ui/button";
import { CreateOrder } from "@/store/userView/orderSlice";
import { useToast } from "@/hooks/use-toast";

const CheckOut = () => {
  const { cartItems } = useSelector((state) => state.cartItems);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setcurrentSelectedAddress] = useState(null);
  const dispatch = useDispatch();
  const {approvalURL} =useSelector(state=>state.order)
  const { toast } = useToast();
  const [isPaymentStart, setisPaymentStart] = useState(false)



  const totalCartAmount =
    cartItems?.data?.items && cartItems?.data?.items?.length > 0
      ? cartItems?.data?.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.saleprice > 0
              ? currentItem?.saleprice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

   
  const handleToCheckOut = () => {

    if(cartItems?.data?.items.length === 0){
        toast({
          title : "your card iis empty to checkout",
          variant : "destructive"
        })
    }

    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });

      return;
    }


    const formdata = {
      userId: user?._id,
      cartId : cartItems?._id,
      cartItems: cartItems?.data?.items.map((singleItem) => ({
        productId: singleItem?.productId,
        title: singleItem.title,
        image: singleItem?.image,
        price: singleItem?.price,
        saleprice:
          singleItem?.saleprice > 0 ? singleItem?.saleprice : singleItem?.price,
        quantity: singleItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    console.log("form",formdata)
    try {
      setisPaymentStart(true)
      dispatch(CreateOrder(formdata)).then((data) => {
        if(data?.payload?.success){
          setisPaymentStart(false)
        }
      })
    } catch (error) {
      console.log("errr", error.message);
    }
  };

  if(approvalURL){
     window.location.href  = approvalURL
  }

  return (
    <div className="mt-[60px] md:mt-[82px]">
      <div className="flex flex-col ">
        <div className="relative h-[300px] w-full overflow-hidden ">
          <img
            src={chekout}
            className="h-full w-full object-cover object-center"
            alt=""
          />
        </div>
        {
           console.log("currentSelectedAddress",currentSelectedAddress)
        }

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-3 ">
          <Address
            SelectedId = {currentSelectedAddress}
            currentSelectedAddress={currentSelectedAddress}
            setcurrentSelectedAddress={setcurrentSelectedAddress}
          />
          {/* max-h-[350px] overflow-y-auto border p-3 */}
          <div>
            <div className="flex  flex-col gap-4 max-h-[350px] overflow-y-auto border p-4 ">
              {cartItems?.data?.items && cartItems?.data?.items?.length > 0 ? (
                cartItems?.data?.items.map((item, i) => (
                  <CartContent key={i} cartItems={item} />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center p-7  border">
                  <img
                    className="w-28"
                    src="https://cdn-icons-png.freepik.com/512/7835/7835563.png"
                    alt=""
                  />
                  <p className="text-xl mt-4 font-semibold">
                    Your cart is Empty.. !
                  </p>
                  <p className="text-sm  text-center mt-2">
                    Please add products to your cart in order to <br /> proceed
                    to checkout
                  </p>
                </div>
              )}
            </div>
            <div className="flex justify-between border mt-3 p-2">
              <span className="font-medium">Total</span>
              <span className="font-medium">${totalCartAmount}.00</span>
            </div>
            <Button
              className={`mt-3 w-full 
              `}
              onClick={handleToCheckOut}
              disabled={cartItems?.data?.items.length === 0}
            >
              {
                isPaymentStart ? "Processing Paypal Payment..." : "Checkout  with Paypal"
            }
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default CheckOut;
