import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import AdminOrder_Details from "./Order_Details";
import { useDispatch, useSelector } from "react-redux";
import {
  AdmingetDetailsOrders,
  AdmingetOrders,
  AdminResetOrders,
} from "@/store/admin/orderSlice";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
const AdminOrderPage = () => {
  const dispatch = useDispatch();
  const { orders, getDetails } = useSelector((state) => state.adminorders);
  const [openOrderDialogPage, setopenOrderDialogPage] = useState(false);

  useEffect(() => {
    dispatch(AdmingetOrders());
  }, [dispatch]);

  const handleToFetchOrderDetails = (id) => {
    dispatch(AdmingetDetailsOrders(id));
  };

  useEffect(() => {
    if (getDetails !== null) setopenOrderDialogPage(true);
  }, [getDetails]);

  return (
    <div>
      <Tabs>
        <TabsContent>
          <Card className="">
            <CardHeader>
              <CardTitle>Your AdminOrderPage</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
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
                  {orders && orders.length > 0
                    ? orders.map((order, i) => (
                        <TableRow key={i}>
                          <TableCell>{order?._id}</TableCell>
                          <TableCell>
                            {order?.orderDate.split("T")[0]}
                          </TableCell>
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
                              open={openOrderDialogPage}
                              onOpenChange={() => {
                                setopenOrderDialogPage(false);
                                dispatch(AdminResetOrders());
                              }}
                            >
                              <Button
                                onClick={() => {
                                  handleToFetchOrderDetails(order?._id);
                                }}
                              >
                                View Details
                              </Button>
                              <AdminOrder_Details
                                setopenOrderDialogPage={setopenOrderDialogPage}
                              />
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))
                    : []}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminOrderPage;
