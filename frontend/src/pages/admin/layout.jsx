import AdminHeader from "@/components/admin/header";
import AdminSideBar from "@/components/admin/SideBar";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";



const AdminLayOutPage = () => {
  const [open,setopen] = useState(false)
  return (
    <div className="flex min-h-screen w-full">
      {/* admin side bar */}
      <AdminSideBar open={open} setopen={setopen} />
      <div className="flex flex-col flex-1  ">
        <AdminHeader setopen={setopen} />
        <main className="flex flex-1 flex-col bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayOutPage;
