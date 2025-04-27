import React, { useState } from "react";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config/form";
import { Badge } from "../ui/badge";


const UserProductCardBox = ({ products, isLoading , handleDetailsPage,handleAddToCart , text}) => {

  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6  lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {text || ""}
          </h2>
          {isLoading ? (
            <h1 className="text-center mt-40 font-medium">Please wait...</h1>
          ) : (
            <div className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {products && products.length > 0 ? (
                products.map((product, i) => (
                  <div key={i} className="group relative r border p-3  "  >
                    <img
                      alt={product.image}
                      src={product.image}
                      onClick={()=>handleDetailsPage(product?._id)}
                      className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80 cursor-pointer"
                    />
                    {
                    <div className="absolute  top-4 right-4">
                       {product.totalStock === 0 ? <Badge className={'p-2 text-xs bg-blue-400 '}>Out of the stock</Badge> : <Badge className={'bg-blue-400 font-bold capitalize'  }>only : {product?.totalStock} items left</Badge>}
                    </div>
                    }
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <p className="font-medium">{product.title}</p>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 cursor-pointer hover:underline"  onClick={()=>handleDetailsPage(product?._id)}>
                          {`${product.description.slice(0, 80)}... `}
                        </p>
                        <div>
                          <div className="upper flex justify-between mt-2">
                            <p className="text-sm font-medium">Price : {product.saleprice}</p>
                            <p className="text-sm font-medium">{categoryOptionsMap[product.category]}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  {product.totalStock === 0 ?  <Button
                      className="mt-2 font-medium capitalize border bg-gray-200  border-gray-200/50"
                      variant="ghost"
                      // onClick={() => handleAddToCart(product?._id)}
                    >
                     Out of the Stock
                    </Button>:
                    <Button
                      className="mt-2 font-medium capitalize border border-gray-200/50"
                      variant="ghost"
                      onClick={() => handleAddToCart(product?._id,product?.totalStock)}
                    >
                      Add to cart
                    </Button>}
                  </div>
                ))
              ) : (
                <h1 className="font-medium">No products..</h1>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProductCardBox;
