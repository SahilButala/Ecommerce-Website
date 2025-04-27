import React from "react";
import { CgController } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { Label } from "../ui/label";
import { BadgeCent, LayoutDashboard, ShoppingBasket } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard />,
    path: "/admin/dashboard",
  },
  {
    id: "products",
    label: "Products",
    icon: <ShoppingBasket />,
    path: "/admin/products",
  },
  {
    id: "orders",
    label: "orders",
    icon: <BadgeCent />,
    path: "/admin/orders",
  },
];

// utility func for both screen
const SidbarItemsForBothScreen = ({setOpen})=> {
  const navigate = useNavigate();
  return (
    <div className="mt-8">
      {adminItems &&
        adminItems.map((item) => (
          <div
            className="mb-4  bg-gray-200 p-3 rounded-lg"
            key={item.id}
            onClick={() => {
              navigate(`${item.path}`);
              setOpen ? setOpen(false) : null
            }}
          >
            <div className="flex gap-3 items-center cursor-pointer hover:underline ">
              <div className="icon">{item.icon}</div>
              <Label className={`capitalize cursor-pointer text-[17px]`}>
                {item.label}
              </Label>
            </div>
          </div>
        ))}
    </div>
  );
}


// main func
const AdminSideBar = ({open,setopen}) => {
  const navigate = useNavigate();
  return (
    <>
     <Sheet open={open} onOpenChange={setopen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                  <LayoutDashboard/>
                <h1 className="text-xl font-extrabold cursor-pointer">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <SidbarItemsForBothScreen setOpen={setopen} />
          </div>
        </SheetContent>
      </Sheet>
    <aside className="hidden w-64 flex-col border-r bg-background p-5 lg:block  ">

      <div
        onClick={() => navigate("/admin/dashboard")}
        className="flex items-center gap-3"
      >
        <CgController className="text-2xl font-medium" />
        <h1 className=" font-bold bg-gray-200 p-2 px-6 rounded-xl cursor-pointer">
          Admin Panel
        </h1>
      </div>
      <SidbarItemsForBothScreen />
    </aside>
    </>
  );
};

export default AdminSideBar;
