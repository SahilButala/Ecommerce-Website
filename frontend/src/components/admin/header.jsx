import React from "react";
import { MdOutlineLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { logoutUserService } from "@/services";
import { setauth, setUser } from "@/store/auth";
import { RiMenuFold2Line } from "react-icons/ri";
function AdminHeader({setopen}) {
  const {toast} = useToast()
  const dispatch = useDispatch()
    const handleLogout =async ()=>{
      try {
        const res = await logoutUserService()
        if(res.sucess){
             toast({
              title : `${res.message}`
             })
             dispatch(setUser(null))
             dispatch(setauth(false))
        }
      } catch (error) {
        console.log(error)
        toast({
          title : `${error.response.data.message}`,
          variant : "destructive"
        })
      }
  
    }
  return (
    <div className="p-3 flex justify-between items-center lg:justify-end ">
      <div onClick={()=>setopen(true)} className="block lg:hidden text-2xl font-semibold cursor-pointer">
         <RiMenuFold2Line/>
      </div>
      <div
        onClick={handleLogout}
        className=" text-2xl cursor-pointer "
      >
        <MdOutlineLogout />
      </div>
    </div>
  );
}

export default AdminHeader;
