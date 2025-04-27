import { registerFormControl, registerInitialFormData } from "@/config/form";
import { useToast } from "@/hooks/use-toast";
import { RegisterUserService } from "@/services";
import CommonFormComponent from "@/utils/form";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [registerData, setregisterData] = useState(registerInitialFormData);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);

  console.log(registerData)

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      setisLoading(true);
      const res = await RegisterUserService(registerData);

      if (res.sucess) {
        toast({
          title: "Register Successfully",
          description: `${res.message}`,
        });
        setregisterData({
          userName: "",
          email: "",
          password: "",
        });
        navigate("/auth/login");
      }
      setisLoading(false);
    } catch (error) {
      console.log(error);
      toast({
        title: `${error.response.data.message}`,
        variant: "destructive",
      });
    }finally{
      setisLoading(false)
    }
  };
  return (
    <div className="mx-auto w-full max-w-md ">
      <div className="text-center mb-5">
        <h1 className="font-bold text-4xl mb-3 ">Create New Account</h1>
        <Link to={"/auth/login"} className="text-sm hover:underline ">
          Did you have already account ,{" "}
          <span className="text-blue-500 font-medium ">Click to Sign in</span>{" "}
        </Link>
      </div>
      <div className="">
        <CommonFormComponent
          formControls={registerFormControl}
          formdata={registerData}
          setformData={setregisterData}
          onFormSubmit={handleRegisterSubmit}
          buttonText={"Register"}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Register;
