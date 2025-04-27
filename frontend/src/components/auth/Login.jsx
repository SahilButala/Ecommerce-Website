import { SignFormControl, SignInitialFormData } from "@/config/form";
import {  LoginUserService } from "@/services";
import { setauth, setUser } from "@/store/auth";
import CommonFormComponent from "@/utils/form";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate, } from "react-router-dom";

function Login() {
  const [loginData, setloginData] = useState(SignInitialFormData);
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate()
  const { toast } = useToast();
  const dispatch = useDispatch();
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      setisLoading(true);
      const res = await LoginUserService(loginData);
      console.log(res)
      if(res.sucess){
        toast({
          title: `${res.message}`,
        })
        dispatch(setUser(res.user))
        dispatch(setauth(true))
      }
    } catch (error) {
      if(error){
          setloginData(SignInitialFormData)
      }
      console.log(error);
      toast({
        title:  error.response.data.message,
        variant : "destructive"
      })
    }finally{
      setisLoading(false)
    }
  };

  return (
    <div className="mx-auto w-full max-w-md ">
      <div className="text-center mb-5">
        <h1 className="font-bold text-4xl mb-3 ">Sign In</h1>
        <Link to={"/auth/register"} className="text-sm ">
          Create account ,{" "}
          <span className="text-blue-500 font-medium hover:underline ">
            Click here to Register
          </span>{" "}<br/>
        </Link>
      </div>
      <div className="">
        <CommonFormComponent
          formControls={SignFormControl}
          formdata={loginData}
          setformData={setloginData}
          onFormSubmit={handleLoginSubmit}
          buttonText={"Sign In"}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default Login;
