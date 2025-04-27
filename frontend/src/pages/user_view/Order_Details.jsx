import { Badge } from "@/components/ui/badge";
import { DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const UserOrderDetails = () => {
  const {user} = useSelector(state=>state.auth)
  const {orderDetails} = useSelector(state=>state.order)
  console.log(orderDetails,"orderDetails")
  return (
    <div>
      <DialogContent className="sm:max-w-[600px] ">
        <div className="grid gap-4 p-3 mt-5">
          <div className="flex items-center justify-between">
            <p className="font-bold uppercase text-sm">Order Id</p>
            <Label className="text-sm  text-gray-600">{orderDetails?._id}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-bold uppercase text-sm">Order Date</p>
            <Label className="text-sm  text-gray-600">{orderDetails?.orderUpdateDate.split("T")[0]}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-bold uppercase text-sm">Order Status</p>
            <Label className="text-sm  text-gray-600">
            <Badge
                          className={`${
                            orderDetails?.orderStatus === "confirmed"
                              ? "bg-green-400"
                              : "bg-red-400 "
                          } px-3 py-2 hover:bg-blue-400 capitalize font-bold` }
                        >
                          {orderDetails?.orderStatus}
                          {orderDetails?.orderStatus === "pending" && ".."}
                        </Badge>
            </Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-bold uppercase text-sm">Order Total Price</p>
            <Label className="text-sm  text-gray-600">${orderDetails?.totalAmount}</Label>
          </div>
        </div>
        <hr />
        <div className="grid gap-3">
          <div className="grid gap-3">
            <div className="font-medium underline">Order Details</div>
            <ul className="grid gap-2">
              {
              orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ? orderDetails?.cartItems.map((item)=>(
              <li className="flex items-center justify-between text-sm capitalize font-medium underline ">
                <span>Name : {item?.title}</span>
                <span>Price : ${item?.price}</span>
                <span>Quantity : {item?.quantity}</span>
              </li>

                )) : <h3>No Products</h3>
              }
            </ul>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="grid gap-3">
            <div>
              <span className="font-medium underline"> Shipping Info</span>
              <div className="grid text-muted-foreground gap-2  mt-3 text-sm">
                <span>Name : {user?.userName}</span>
                <span>Email : {user?.email}</span>
                <span>Address : {orderDetails?.addressInfo?.address}</span>
                <span>Pincode : {orderDetails?.addressInfo?.pincode}</span>
                <span>City : {orderDetails?.addressInfo?.city}</span>
                <span>Phone : {orderDetails?.addressInfo?.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </div>
  );
};

export default UserOrderDetails;
