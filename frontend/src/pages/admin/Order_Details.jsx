import { Badge } from "@/components/ui/badge";
import { DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { AdmingetDetailsOrders, AdmingetOrders, AdminResetOrders, updateStatusOrder } from "@/store/admin/orderSlice";
import CommonFormComponent from "@/utils/form";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminOrder_Details = ({setopenOrderDialogPage}) => {
  const initialdata = {
    status: "",
  };
  const [formdata, setformdata] = useState(initialdata);
  const { user } = useSelector((state) => state.auth);
  const { getDetails } = useSelector((state) => state.adminorders);
  const dispatch = useDispatch()



  const handleOrderStatus = (e) => {
    e.preventDefault();
    const {status} = formdata

    dispatch(updateStatusOrder({id : getDetails?._id , orderStatus : status})).then((data)=>{
       if(data?.payload?.success){
          dispatch(AdmingetDetailsOrders(getDetails?._id))
          dispatch(AdmingetOrders())
          setformdata(initialdata)
          
       }
    })
  };

  return (
    <div>
      <DialogContent className="sm:max-w-[600px] ">
        <div className="grid gap-4 p-3 mt-5">
          <div className="flex items-center justify-between">
            <p className="font-bold uppercase text-sm">Order Id</p>
            <Label className="text-sm  text-gray-600">{getDetails?._id}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-bold uppercase text-sm">Order Date/</p>
            <Label className="text-sm  text-gray-600">
              {getDetails?.orderDate.split("T")[0]}
            </Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-bold uppercase text-sm">Order Status</p>
            <Label className="text-sm  text-gray-600">
            <Badge
                          className={`${
                            getDetails?.orderStatus !== "rejected"
                              ? "bg-green-400"
                              : "bg-red-400 "
                          } px-3 py-2 hover:bg-blue-400`}
                        >
                          {getDetails?.orderStatus}
                          {getDetails?.orderStatus === "pending" && ".."}
                        </Badge>
            </Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-bold uppercase text-sm">Order Price</p>
            <Label className="text-sm  text-gray-600">
              ${getDetails?.totalAmount}
            </Label>
          </div>
        </div>
        <hr />
        <div className="grid gap-3">
          <div className="grid gap-3">
            <div className="font-medium underline">Order Details</div>
            <ul className="grid gap-2">
              {getDetails &&
              getDetails.cartItems &&
              getDetails.cartItems.length > 0
                ? getDetails.cartItems.map((order, i) => (
                    <li key={i} className="flex items-center justify-between">
                      <span>title : {order?.title}</span>
                      <span>Quantity : {order?.quantity}</span>
                      <span>Price : ${order?.price}</span>
                    </li>
                  ))
                : []}
            </ul>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="grid gap-3">
            <div>
              <span className="font-medium underline"> Shipping Info</span>
              <div className="grid text-muted-foreground gap-2 capitalize mt-3 text-sm">
                <span>{user?.userName}</span>
                <span>{getDetails?.addressInfo?.address}</span>
                <span>{getDetails?.addressInfo?.pincode}</span>
                <span>{getDetails?.addressInfo?.city}</span>
                <span>{getDetails?.addressInfo?.phone}</span>
              </div>
            </div>
          </div>
        </div>

        <section>
          <CommonFormComponent
            formdata={formdata}
            setformData={setformdata}
            onFormSubmit={handleOrderStatus}
            buttonText={"Update Order Status"}
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "In Pending" },
                  { id: "inprocess", label: "In Process" },
                  { id: "inshipping", label: "In Shipping" },
                  { id: "rejected", label: "Rejected" },
                  { id: "delivered", label: "Delivered" },
                ],
              },
            ]}
          />
        </section>
      </DialogContent>
    </div>
  );
};

export default AdminOrder_Details;
