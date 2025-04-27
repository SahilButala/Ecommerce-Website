import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const Brands = ({ brands , handleToNavigateProductsPage}) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 mt-5">
        {brands.map((category) => (
          <div className="" key={category.id}>
            <Card 
              onClick={()=>handleToNavigateProductsPage(category.id,"brand")}
              className={`relative h-[200px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] hover:translate-y-[-7px] transition-all cursor-pointer`}
            >
              <CardContent className="flex flex-col items-center  p-7 relative h-full w-full  ">
                <img src={category.image} className="h-full w-full object-cover " alt="" />
                <Button variant="outline" className="font-medium mt-3 absolute bottom-4">
                  {category.label} 
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
