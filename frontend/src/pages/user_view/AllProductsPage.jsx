import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FilterProductsList from "@/components/user_view/FilterProductsList";
import UserProductCardBox from "@/components/user_view/UserProductCardBox";
import { SortOptions } from "@/config/form";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchUserShopingProducts,
} from "@/store/userView";
import { useSearchParams } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import { addToCart, fetchAllCartItems } from "@/store/userView/cart";
import { useToast } from "@/hooks/use-toast";

const AllProducts = () => {
  const { toast } = useToast();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cartItems);
  const [sort, setsort] = useState(null);
  const dispatch = useDispatch();
  const [filter, setfilter] = useState({});
  const [searchParams, setsearchParams] = useSearchParams();
  const { productList, isLoading, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const [oepnDetailsDiallog, setoepnDetailsDiallog] = useState(false);
  const handleSort = (value) => {
    setsort(value);
  };

  const handleDetailsPage = (id) => {
    setoepnDetailsDiallog(true);
    dispatch(fetchProductDetails(id));
  };

  const handleFilter = async (getCurrnetSection, getCurrentOption) => {
    let copyFilter = { ...filter };

    if (!copyFilter[getCurrnetSection]) {
      // If this filter section doesn't exist, add it
      copyFilter[getCurrnetSection] = [getCurrentOption];
    } else {
      const indexOfOption =
        copyFilter[getCurrnetSection].indexOf(getCurrentOption);

      if (indexOfOption === -1) {
        // Option not selected yet, so add it
        copyFilter[getCurrnetSection].push(getCurrentOption);
      } else {
        // Option already selected, so remove it
        copyFilter[getCurrnetSection].splice(indexOfOption, 1);

        // If after removing the option, array becomes empty, remove the key itself
        if (copyFilter[getCurrnetSection].length === 0) {
          delete copyFilter[getCurrnetSection];
        }
      }
    }

    setfilter(copyFilter);
    sessionStorage.setItem("filters", JSON.stringify(copyFilter));
  };

  const handlecreateSerachParams = (getfilter) => {
    const queryparams = [];
    for (const [key, value] of Object.entries(getfilter)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(",");
        queryparams.push(`${key}=${encodeURIComponent(paramValue)}`);
      }
    }

    return queryparams.join("&");
  };
  
  
  const handleAddToCart = (getCurrentProductId, getTotalStock) => {
    // let getCartItems = cartItems?.data?.items || [];

    // if (getCartItems.length) {
    //   const indexOfCurrentItem = getCartItems.findIndex(
    //     (item) => item.productId === getCurrentProductId
    //   );
    //   if (indexOfCurrentItem > -1) {
    //     const getQuantity = getCartItems[indexOfCurrentItem].quantity;
    //     if (getQuantity + 1 > getTotalStock) {
    //       toast({
    //         title: `Only ${getQuantity} quantity can be added for this item`,
    //         variant: "destructive",
    //       });

    //       return;
    //     }
    //   }
    // }

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

  useEffect(() => {
    if (filter && Object.keys(filter).length > 0) {
      const creatQueryString = handlecreateSerachParams(filter);
      setsearchParams(new URLSearchParams(creatQueryString));
    }
  }, [filter]);

  // sort default option setup when page is loaded
  useEffect(() => {
    setsort("price-lowtohigh");
    setfilter(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    if (filter !== null && sort !== null)
      dispatch(fetchUserShopingProducts({ filter: filter, sortParams: sort }));
  }, [dispatch, sort, filter]);


  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-5 p-4 md:p-6 ">
      {/* sidebar of filter */}
      <FilterProductsList filter={filter} handleFilter={handleFilter} />

      {/* main dev */}
      <div className="pl-3">
        <div className="top-sec flex items-center justify-between border-b">
          <div className="font-medium underline capitalize">All </div>
          <div className="flex items-center gap-4">
            <p className="font-medium">
              {" "}
              {productList.length} <span className="underline">Results</span>
            </p>
            {/* dropdown for sort */}
            <div className="mb-2">
              {" "}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Sort By</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 py-4 pb-3">
                  <DropdownMenuRadioGroup
                    onValueChange={handleSort}
                    value={sort}
                  >
                    {SortOptions.map((op) => (
                      <DropdownMenuRadioItem key={op.id} value={op.id}>
                        {op.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        <div className="">
          {/* product card */}
          <UserProductCardBox
            products={productList}
            isLoading={isLoading}
            handleDetailsPage={handleDetailsPage}
            handleAddToCart={handleAddToCart}
            text={"Customers also purchased"}
          />
        </div>
      </div>
      {oepnDetailsDiallog && (
        <ProductDetails
          open={oepnDetailsDiallog}
          setopen={setoepnDetailsDiallog}
          ProductDetails={productDetails}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default AllProducts;
