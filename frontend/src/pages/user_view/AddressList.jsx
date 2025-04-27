import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { delete_address, get_address } from "@/store/userView/address";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";

const AddressList = ({
  addressInfo,
  handleToUpdateAddress,
  currentSelectedAddress,
  setcurrentSelectedAddress,
  SelectedId
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  
  const handleToDeleteAddress = () => {
    try {
      dispatch(
        delete_address({
          userId: user?._id,
          addressId: addressInfo?._id,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: "address deleted suucessfully ",
          });
          dispatch(get_address({ userId: user?._id }));
        }
      });
    } catch (error) {
      console.log("error", error.message);
    }
  };
  return (
    <Card
      onClick={
        setcurrentSelectedAddress
          ? () => setcurrentSelectedAddress(addressInfo)
          : null
      }
      className={`${SelectedId?._id === addressInfo?._id ? "border-2 border-blue-400" : ""}`}
    >
      <CardContent className={`grid gap-4 py-4 ${SelectedId === addressInfo?._id ? "border-red-500 border " : ""}`}>
        <Label>Address : {addressInfo?.address}</Label>
        <Label>Pincode : {addressInfo?.pincode}</Label>
        <Label>City : {addressInfo?.city}</Label>
        <Label>Phone No : {addressInfo?.phone}</Label>
        <Label>Notes : {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="mt-2 flex  gap-3 justify-between">
        <Button onClick={() => handleToUpdateAddress(addressInfo)}>Edit</Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                address and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleToDeleteAddress()}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default AddressList;
