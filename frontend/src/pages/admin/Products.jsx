import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  addProductFormElements,
  CreateProdcutInitialFormData,
} from "@/config/form";
import CommonFormComponent from "@/utils/form";
import React, { useEffect, useState } from "react";
import ImageUplaod from "./ImageUplaod";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import {
  addNewProducts,
  DeleteProducts,
  editProducts,
  fetchAllProducts,
} from "@/store/admin";
import { editProductService } from "@/services";

const AdminProducts = () => {
  const { toast } = useToast();
  const [currentProductId, setcurrentProductId] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();
  const [openDialogProduct, setopenDialogProduct] = useState(false);
  // this state for save image
  const [imageFile, setImageFile] = useState("");
  // this state  for a url that get form cloudinary
  const [uploadImageUrl, setuploadImageUrl] = useState("");
  const [ProductformData, setProductformData] = useState(
    CreateProdcutInitialFormData
  );
  const [imageUploadLoading,setimageUploadLoading] = useState(false)
  const { product } = useSelector((store) => store?.products);

  // console.log("sahil",product)

  const handleSubmit = (e) => {
    e.preventDefault();
    currentProductId !== null ? handleUpdateProduct() : handleAddproduct();
  };

  const handleAddproduct = () => {
    dispatch(
      addNewProducts({
        ...ProductformData,
        image: uploadImageUrl,
      })
    ).then((res) => {
      if (res?.payload?.sucess) {
        dispatch(fetchAllProducts());
        setProductformData(CreateProdcutInitialFormData);
        toast({
          title: `${res?.payload?.message}`,
        });
        setopenDialogProduct(false);
      }
    });
  };

  const handleDeleteProduct = (getId) => {
    dispatch(DeleteProducts(getId)).then((res) => {
      if (res?.payload?.sucess) {
        dispatch(fetchAllProducts());
        toast({
          title: `${res?.payload?.message}`,
        });
      }
    });
  };

  const handleUpdateProduct = () => {
    dispatch(
      editProducts({
        formdata: ProductformData,
        id: currentProductId,
      })
    ).then((data) => {
      console.log(data, "edit");

      if (data?.payload?.sucess) {
        dispatch(fetchAllProducts());
        toast({
          title: `${data?.payload?.message}`,
        });
        setProductformData(CreateProdcutInitialFormData);
        setopenDialogProduct(false);
        setcurrentProductId(null);
      }
    });
  };

  const isValid = ()=>{
     return Object.keys(ProductformData).map(item=> ProductformData[item] !== '').every(key=>key)
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <>
      {/* button for add product */}
      <div className="w-full justify-end flex">
        <Button onClick={() => setopenDialogProduct(true)}>Add Products</Button>
      </div>
      {/*list of all  products */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3 auto-rows-[minmax(auto,1fr)] mt-4">
        {product && product.length > 0 ? (
          product.map((prod) => (

              <ProductCard
               products={prod}
               setopenDialogProduct={setopenDialogProduct}
               setProductformData={setProductformData}
               setcurrentProductId={setcurrentProductId}
               handleDeleteProduct={handleDeleteProduct}
             />
          ))
        ) : (
          <h1 className="capitalize font-medium">no product add items for website</h1>
        )}
      </div>
      {/* form to add product */}
      <Sheet
        open={openDialogProduct}
        onOpenChange={() => {
          setopenDialogProduct(false),
            setProductformData(CreateProdcutInitialFormData),
            setcurrentProductId(null);
        }}
      >
        <SheetContent side={"right"} className="overflow-auto ">
          <SheetHeader>
            <SheetTitle>
              {currentProductId !== null
                ? "Update Product"
                : "Add New Products"}
            </SheetTitle>
          </SheetHeader>
          {/* form elements */}
          <ImageUplaod
            imageUploadLoading={imageUploadLoading}
            setimageUploadLoading = {setimageUploadLoading}
            setisLoading={setisLoading}
            uploadImageUrl={uploadImageUrl}
            setuploadImageUrl={setuploadImageUrl}
            imageFile={imageFile}
            setImageFile={setImageFile}
          />
          <div className="py-8">
            <CommonFormComponent
              formControls={addProductFormElements}
              formdata={ProductformData}
              setformData={setProductformData}
              buttonText={
                currentProductId !== null ? "Update Product" : "Add Products"
              }
              isDisabled = {isValid}
              onFormSubmit={handleSubmit}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AdminProducts;
