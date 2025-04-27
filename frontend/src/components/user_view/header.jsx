import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { MdOutlineLogout } from "react-icons/md";
import { logoutUserService } from "@/services";
import { useDispatch, useSelector } from "react-redux";
import { setauth, setUser } from "@/store/auth";
import { TbTruckDelivery } from "react-icons/tb";
import { useToast } from "@/hooks/use-toast";
import { headerNavLinks } from "@/config/form";
import { Link , NavLink, useNavigate} from "react-router-dom";
import { MdOutlineAccountCircle } from "react-icons/md";
import { Menu } from "lucide-react";
import { PiShoppingCartLight } from "react-icons/pi";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import CartWrapper from "./Cart-Wrapper";
const UserHeader = () => {
  const dispatch = useDispatch();
  const [activeLink, setactiveLink] = useState("home");
  const { toast } = useToast();
  const [sideBar, setsideBar] = useState(false);
  const [openCartSheet, setopenCartSheet] = useState(false);
   const {cartItems} = useSelector(state=>state.cartItems)
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  
 

// cartItems?.data?.items.length
  // logout
  const handleLogout = async () => {
    try {
      const res = await logoutUserService();
      if (res.sucess) {
        toast({
          title: `${res.message}`,
        });
        dispatch(setUser(null));
        dispatch(setauth(false));
      }
    } catch (error) {
      console.log(error);
      toast({
        title: `${error.response.data.message}`,
        variant: "destructive",
      });
    }
  };

  // function for navlinks
  const MenuItems = () => {
    return (
      <nav>
        <div className="flex flex-col lg:flex-row items-center gap-5">
          {headerNavLinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "underline text-blue-400 font-bold"
                  : "text-black hover:text-blue-500"
              }
              onClick={() => setsideBar(false)}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </nav>
    );
  };

  return (
    <div className="">
      <header className="fixed w-full  top-0 bg-white flex items-center justify-between px-3 md:px-6 z-50 shadow-sm">
        <div className="left">
          <img src={logo} 
           onClick={()=>navigate('/shop/home')}
          alt="" className="w-44 md:w-60 object-cover cursor-pointer" />
        </div>
        <div className="right font-medium capitalize hidden lg:block">
          <MenuItems />
        </div>
        <div className="logoutbtn text-2xl cursor-pointer flex gap-5 items-center">
          <div className="hidden lg:block">
            <Popover className="hidden lg:block">
              <PopoverTrigger asChild>
                <Avatar className="border">
                  <AvatarImage src={logo} className="object-cover'" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-50 space-y-3">
                <Link
                  className="flex items-center capitalize gap-3 hover:underline border-b pb-3"
                  to={"/shop/account"}
                  onClick={() => setactiveLink("/shop/account")}
                >
                  <MdOutlineAccountCircle size={"20"} />
                  <p>account</p>
                </Link>
                <Link
                  className="flex items-center capitalize gap-3 hover:underline"
                  to={"/shop/account"}
                  onClick={() => setactiveLink("/shop/account")}
                >
                  <TbTruckDelivery size={"20"} />
                  <p>orders</p>
                </Link>
              </PopoverContent>
            </Popover>
          </div>

          {/* cart sheet or page  */}
          <Sheet
            open={openCartSheet}
            onOpenChange={() => setopenCartSheet(false)}
          >
            <Button
              className="relative"
              size="icon"
              variant="outline"
              onClick={() => setopenCartSheet(true)}
            >
              <p className="bg-red-500 text-white font-semibold absolute text-sm top-[-12px] px-2  right-[-10px] rounded-full">{`${ cartItems?.data?.items.length > 0 ?  cartItems?.data?.items.length : 0}`}</p>
              <PiShoppingCartLight size={56} />
            </Button>
            <CartWrapper
              setopenCartSheet={setopenCartSheet}
              cartItems={cartItems && cartItems?.data?.items && cartItems?.data?.items.length > 0 ? cartItems?.data?.items : [] }
            />
          </Sheet>
          <Menu className="lg:hidden" onClick={() => setsideBar(true)} />
          <MdOutlineLogout onClick={handleLogout} />
        </div>

        {/*  for mobile items */}
      </header>
      <div className="">
        <Sheet
          open={sideBar}
          onOpenChange={() => {
            setsideBar(false);
          }}
        >
          <SheetContent side={"left"} className="overflow-auto ">
            <SheetHeader className={"relative"}>
              <SheetTitle className="text-xl ">
                <img className="w-48" src={logo} alt="" />
              </SheetTitle>
            </SheetHeader>
            <div className="mt-4 capitalize">
              <MenuItems />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default UserHeader;
