import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addressFormControls } from "@/config/form";
import CommonFormComponent from "@/utils/form";
import React, { useEffect, useState } from "react";
import AddressList from "./AddressList";
import { useDispatch, useSelector } from "react-redux";
import {
  Add_address,
  get_address,
  update_address,
} from "@/store/userView/address";
import { toast, useToast } from "@/hooks/use-toast";
const Address = ({currentSelectedAddress,setcurrentSelectedAddress , SelectedId}) => {
  const { user } = useSelector((state) => state.auth);
  const [currentEditedId, setcurrentEditedId] = useState(null);
  const { toast } = useToast();
  const { address } = useSelector((state) => state.address);
  const initialFormData = {
    city: "",
    pincode: "",
    phone: "",
    notes: "",
    address: "",
  };
  const [formdata, setformdata] = useState(initialFormData);
  const dispatch = useDispatch();
  // console.log(formdata,"formdaata")
  const handleToaddAddress = (e) => {
    e.preventDefault();

    if (address.length >= 3 && currentEditedId === null) {
      setformdata(initialFormData);
      toast({
        title: "you can add maximum 3 addresses",
        variant: "destructive",
      });
      return;
    }
    currentEditedId !== null
      ? dispatch(
          update_address({
            userId: user?._id,
            addressId: currentEditedId,
            formdata: formdata,
          })
        ).then((data) => {
          console.log(data?.payload, "data");
          if (data?.payload) {
            toast({
              title: "address updated suucessfully ",
            });
            dispatch(get_address({ userId: user?._id }));
            setformdata(initialFormData);
            setcurrentEditedId(null);
          }
        })
      : dispatch(
          Add_address({
            ...formdata,
            userId: user?._id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            toast({
              title: "address added suucessfully ",
            });
            dispatch(get_address({ userId: user?._id }));
            setformdata(initialFormData);
          }
        });
  };

  const isValid = () => {
    return Object.keys(formdata)
      .map((item) => formdata[item] !== "")
      .every((key) => key);
  };

  const handleToUpdateAddress = (getCurrentAddressId) => {
    setcurrentEditedId(getCurrentAddressId?._id);
    setformdata({
      ...formdata,
      address: getCurrentAddressId?.address,
      city: getCurrentAddressId?.city,
      phone: getCurrentAddressId?.phone,
      pincode: getCurrentAddressId?.pincode,
      notes: getCurrentAddressId?.notes,
    });
  };

  useEffect(() => {
    dispatch(get_address({ userId: user?._id }));
  }, [dispatch]);
  return (
    <div>
      <Card>
        <div className="mb-5 p-3 grid grid-cols-1  sm:grid-cols-2  gap-3">
          {address && address.length > 0
            ? address.map((sigleaddres, i) => (
                <AddressList
                  key={i}
                  SelectedId={SelectedId}
                  currentSelectedAddress={currentSelectedAddress}
                  setcurrentSelectedAddress={setcurrentSelectedAddress}
                  setcurrentEditedId={setcurrentEditedId}
                  setformData={setformdata}
                  addressInfo={sigleaddres}
                  handleToUpdateAddress={handleToUpdateAddress}
                />
              ))
            : null}
        </div>
        <CardHeader>
          <CardTitle>
            {currentEditedId !== null ? "Edit address" : "Add new address"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <CommonFormComponent
            formControls={addressFormControls}
            setformData={setformdata}
            formdata={formdata}
            buttonText={
              currentEditedId !== null ? "Edit address" : "Add new address"
            }
            onFormSubmit={handleToaddAddress}
            isDisabled={!isValid()}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Address;
