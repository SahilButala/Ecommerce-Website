import React from "react";
import acc from "../../assets/acc.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Orders from "./Orders";
import Address from "./Address";

function Account() {
  return (
    <div className="mt-[60px] md:mt-[82px]">
      <div className="flex flex-col">
        <div className="relative  w-full overflow-hidden">
          <img
            src={acc}
            width={"1600"}
            height={"200"}
            style={{ aspectRatio: "1600/500 ", objectFit: "cover" }}
            alt=""
          />
        </div>
      </div>

      {/*  */}
      <div className="container mx-auto grid grid-cols-1 gap-8 py-7">
        <div className="flex flex-col rounded-lg border p-4  shadow-sm ">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              <Orders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Account;
