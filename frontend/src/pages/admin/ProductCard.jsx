import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";

const ProductCard = ({
  products,
  setopenDialogProduct,
  setProductformData,
  setcurrentProductId,
  handleDeleteProduct,
}) => {
  return (
    
    <Card className="w-full max-w-sm mx-auto rounded-lg shadow-md grid grid-rows-[auto,1fr,auto] overflow-hidden">
      <div className="">
        <div className="relative">
          <img
            src={products?.image || "No image for this Product"}
            alt={"No image for this Product"}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">{products?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                products?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${products?.price}
            </span>
            {products?.salePrice > 0 ? (
              <span className="text-lg font-bold">${products?.salePrice}</span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              console.log("id", products?._id);
              setopenDialogProduct(true);
              setcurrentProductId(products?._id);
              setProductformData(products);
            }}
          >
            Edit
          </Button>
          {/* onClick={() => handleDeleteProduct(products?.id)} */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete your product and remove your data
                  from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button
                    variant="destructive"
                    className="bg-red-600"
                    onClick={() => handleDeleteProduct(products?._id)}
                  >
                    Yes, delete Product
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ProductCard;
