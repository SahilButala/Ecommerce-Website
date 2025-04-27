import { Input } from "@/components/ui/input";
import UserProductCardBox from "@/components/user_view/UserProductCardBox";
import { addToCart, fetchAllCartItems } from "@/store/userView/cart";
import {
  resetSearchResult,
  SearchProducts,
} from "@/store/userView/searchProducts";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import ProductDetails from "./ProductDetails";
import { fetchProductDetails } from "@/store/userView";

const SearchPage = () => {
  const [keyword, setkeyword] = useState("");
    const { toast } = useToast();
  const { SearchResult, isLoading } = useSelector((state) => state.search);
  const [searchparams, setsearchparams] = useSearchParams();
  const [oepnDetailsDiallog, setoepnDetailsDiallog] = useState(false);
  const {user} = useSelector(state=>state.auth)
  const {productDetails} = useSelector(state=>state.shopProducts)

  const dispatch = useDispatch();

  useEffect(() => {
    if (keyword && keyword.trim() !== " " && keyword.trim().length > 3) {
      setTimeout(() => {
        setsearchparams(new URLSearchParams(`keyword=${keyword}`));
        dispatch(SearchProducts(keyword));
      }, 1000);
    } else {
      setsearchparams(new URLSearchParams(`keyword=${""}`));
      dispatch(resetSearchResult());
    }
  }, [keyword]);

    const handleAddToCart = (getCurrentProductId) => {
  
      dispatch(
        addToCart({
          userId: user?._id,
          productId: getCurrentProductId,
          quantity: 1,
        })
      )
        .then((data) => {
          if (data?.payload) {
            dispatch(fetchAllCartItems(user?._id));
          }
        })
        .then(
          toast({
            title: "item added to cart..",
          })
        );
    };

      const handleDetailsPage = (id) => {
        setoepnDetailsDiallog(true);
        dispatch(fetchProductDetails(id));
      };
  return (
    <div className="mt-[82px] h-screen">
      <div className="mt-3 p-3">
        <Input
          className="w-full border py-6 outline-none  sticky "
          placeholder="Please enter product name "
          value={keyword}
          onChange={({ target }) => setkeyword(target.value)}
        />
      </div>

      {!isLoading && SearchResult.length === 0 && (
        <h2 className="text-center flex items-center justify-center text-sm  mt-7 text-gray-400 font-medium">
          Search Products by Name & Brand
        </h2>
      )}
      {isLoading && <div className="text-center">Loading...</div>}

      <div className="">
        {SearchResult && SearchResult.length > 0 && (
          <UserProductCardBox products={SearchResult} 
           handleAddToCart={handleAddToCart}
           handleDetailsPage={handleDetailsPage}
          />
        )}

{oepnDetailsDiallog && (
        <ProductDetails
          open={oepnDetailsDiallog}
          setopen={setoepnDetailsDiallog}
          ProductDetails={productDetails}
          isLoading={isLoading}
        />
      )}
      </div>
    </div>
  );
};

export default SearchPage;
