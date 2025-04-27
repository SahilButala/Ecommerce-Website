import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import UserOrderDetails from "./Order_Details";
import AdminOrder_Details from "../admin/Order_Details";
import { useDispatch, useSelector } from "react-redux";
import { getallOrderByUser, getallOrderDetails, resetOrderDetails } from "@/store/userView/orderSlice";
import { Badge } from "@/components/ui/badge";

// user order page
const Orders = () => {
  const [openOrderDetailsPage, setopenOrderDetailsPage] = useState(false);
  const dispatch = useDispatch();
  const { orderList } = useSelector((state) => state.order);
   const {orderDetails} = useSelector(state=>state.order)

  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getallOrderByUser({ userId: user?._id }));
  }, [dispatch]);

  const handleToFetchOrderDetails = (id)=>{
      dispatch(getallOrderDetails(id))
  }

  useEffect(()=>{
    if(orderDetails !== null ) setopenOrderDetailsPage(true)
  },[orderDetails])

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Your Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order Id</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order status</TableHead>
                <TableHead>Order price</TableHead>
                <TableHead>
                  <span>Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderList && orderList.length > 0
                ? orderList.map((order,i) => (
                    <TableRow key={i}>
                      <TableCell>{order?._id}</TableCell>
                      <TableCell>{order?.orderDate.split("T")[0]}</TableCell>
                      <TableCell className="flex items-center capitalize cursor-pointer ">
                        <Badge
                          className={`${
                            order?.orderStatus === "confirmed"
                              ? "bg-green-400"
                              : "bg-red-400 "
                          } px-3 py-2 hover:bg-blue-400`}
                        >
                          {order?.orderStatus}
                          {order?.orderStatus === "pending" && ".."}
                        </Badge>
                      </TableCell>
                      <TableCell>${order?.totalAmount}</TableCell>
                      <TableCell>
                        <Dialog
                          open={openOrderDetailsPage}
                          onOpenChange={()=>{
                            setopenOrderDetailsPage(false),
                            dispatch(resetOrderDetails())
                          }}
                        >
                          <Button
                            onClick={() => {
                              handleToFetchOrderDetails(order?._id);
                            }}
                          >
                            View Details
                          </Button>
                          <UserOrderDetails />
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                : []}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
