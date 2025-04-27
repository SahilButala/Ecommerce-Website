import { ChangePassInitialData } from "@/config/form";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { ChangePasswordService } from "@/services";
import { useToast } from "@/hooks/use-toast";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ChangePass = () => {
  const [isLoading, setisLoading] = useState(false);
  const [passError, setpassError] = useState("");
  const [showPass, setShowpass] = useState(false);
  const navigate = useNavigate()
  const { toast } = useToast();
  const [changePassData, setchangePassData] = useState(ChangePassInitialData);
  const handleChangePassword = async (e) => {
    try {
      const res = await ChangePasswordService(changePassData);
      if (res.sucess) {
        navigate('/auth/login')
        toast({
          title: `${res.message}`,
        });
        setchangePassData({
          email: "",
          oldpassword: "",
          newpassword: "",
          ReEnterPass: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
    console.log(changePassData);
  };

  const checkBothPassIsSame = () => {
    if (changePassData.newpassword && changePassData.ReEnterPass) {
      if (changePassData.newpassword !== changePassData.ReEnterPass) {
        setpassError("Passwords must be the same.");
        return false;
      } else {
        setpassError("");
        return true;
      }
    }
    return false;
  };

  const handleInputchange = (e) => {
    const { name, value } = e.target;
    setchangePassData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const passType = showPass ? "text" : "password";

  useEffect(() => {
    if (passError) {
      const timer = setTimeout(() => {
        setpassError(""); // Remove error after 3 seconds
      }, 3000);

      return () => clearTimeout(timer); // Cleanup timeout on re-render
    }
  }, [passError]);

  return (
    <div className="mx-auto w-full max-w-md ">
      <div className="text-center mb-5">
        <h1 className="font-bold text-4xl mb-3 ">Change Password</h1>
      </div>
      <form
        className="flex flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (checkBothPassIsSame()) {
            handleChangePassword(changePassData);
          }
        }}
      >
        <Label>Email </Label>
        <Input
          placeholder="enter your email"
          name="email"
          onChange={handleInputchange}
          value={changePassData.email}
          type="email"
        />
        <Label>Old Password</Label>
        <div className="relative">
          <Input
            placeholder="enter your old password"
            name="oldpassword"
            onChange={handleInputchange}
            value={changePassData.oldpassword}
            type={passType}
          />
          {showPass ? (
            <FaRegEye
              onClick={() => setShowpass(false)}
              className="absolute top-3 right-3 cursor-pointer"
            />
          ) : (
            <FaEyeSlash
              onClick={() => setShowpass(true)}
              className="absolute top-3 right-3 cursor-pointer"
            />
          )}
        </div>
        <Label>New Password</Label>
        <div className="relative">
          <Input
            placeholder="enter your new password"
            name="newpassword"
            onChange={handleInputchange}
            value={changePassData.newpassword}
            type={passType}
          />
          {showPass ? (
            <FaRegEye
              onClick={() => setShowpass(false)}
              className="absolute top-3 right-3 cursor-pointer"
            />
          ) : (
            <FaEyeSlash
              onClick={() => setShowpass(true)}
              className="absolute top-3 right-3 cursor-pointer"
            />
          )}
        </div>
        <Label>Re-enter New Password</Label>
        <div className="relative">
          <Input
            placeholder="Re-enter your New Password"
            name="ReEnterPass"
            onChange={handleInputchange}
            value={changePassData.ReEnterPass}
            type={passType}
          />
          {showPass ? (
            <FaRegEye
              onClick={() => setShowpass(false)}
              className="absolute top-3 right-3 cursor-pointer"
            />
          ) : (
            <FaEyeSlash
              onClick={() => setShowpass(true)}
              className="absolute top-3 right-3 cursor-pointer"
            />
          )}
        </div>
        {passError ? (
          <p className="text-red-500 text-[13px]">{passError}</p>
        ) : null}
        <Button type="submit" className='mt-3'>Change Password</Button>
      </form>
    </div>
  );
};

export default ChangePass;
