import React, { useEffect, useState } from "react";
import s1 from "../../assets/sl1.webp";
import s2 from "../../assets/sl2.webp";
import s3 from "../../assets/sl3.webp";
import { Button } from "@/components/ui/button";
import {
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Shirt,
  UmbrellaIcon,
  WatchIcon,
} from "lucide-react";
import Categories from "@/components/user_view/Categories";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchUserShopingProducts,
} from "@/store/userView";
import UserProductCardBox from "@/components/user_view/UserProductCardBox";
import Brands from "@/components/Brands";
import b1 from "../../assets/b1.jpg";
import b2 from "../../assets/b2.png";
import b3 from "../../assets/b3.png";
import b4 from "../../assets/b4.png";
import b5 from "../../assets/b5.png";
import b6 from "../../assets/b6.jpg";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchAllCartItems } from "@/store/userView/cart";
import ProductDetails from "./ProductDetails";
import { getFeatureImage } from "@/store/userView/featureImages";

const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { images } = useSelector((state) => state.feature);
  const { user } = useSelector((state) => state.auth);
  const [currentSlide, setcurrentSlide] = useState(0);
  const [oepnDetailsDiallog, setoepnDetailsDiallog] = useState(false);
  const slidesImages = [s1, s2, s3];
  const categories = [
    { id: "men", label: "Men", icon: Shirt },
    { id: "women", label: "Women", icon: CloudLightning },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
  ];
  const brands = [
    { id: "nike", label: "Nike", image: b1 },
    { id: "adidas", label: "Adidas", image: b2 },
    { id: "puma", label: "Puma", image: b3 },
    { id: "levi", label: "Levi's", image: b4 },
    { id: "zara", label: "Zara", image: b5 },
    { id: "h&m", label: "H&M", image: b6 },
  ];
  const { productList, isLoading, productDetails } = useSelector(
    (state) => state.shopProducts
  );

  const handleDetailsPage = (id) => {
    setoepnDetailsDiallog(true);
    dispatch(fetchProductDetails(id));
  };

  const handleToNavigateProductsPage = (getCurrentItem, category) => {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [category]: [getCurrentItem],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/products");
  };

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

  useEffect(() => {
    dispatch(
      fetchUserShopingProducts({ filter: {}, sortParams: "price-lowtohigh" })
    );
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      setcurrentSlide((prev) => (prev + 1) % images?.data.length);
    }, 3000);

    return () => clearInterval(timer);
  });

  useEffect(()=>{
        dispatch(getFeatureImage())
  },[])

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[700px] overflow-hidden">
        {images?.data && images?.data.length > 0
          ? images?.data.map((image, i) => (
              <img
                key={i}
                src={image.image}
                className={`${
                  i === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full  object-cover transition-opacity duration-1000`}
              />
            ))
          : []}
        <Button
          className="top-1/2 absolute left-4 transform -translate-y-1/2  bg-white/80 "
          variant="outline"
          onClick={() =>
            setcurrentSlide(
              (prevSlide) => (prevSlide - 1 + images?.data?.length) % images?.data?.length
            )
          }
        >
          <ChevronLeftIcon className="w-4" />
        </Button>
        <Button
          onClick={() =>
            setcurrentSlide((prevSlide) => (prevSlide + 1) % images?.data?.length)
          }
          className="top-1/2 absolute right-4 transform -translate-y-1/2  bg-white/80 "
          variant="outline"
        >
          <ChevronRightIcon className="w-4" />
        </Button>
      </div>

      {/* category  */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 ">
          <h2 className="text-2xl font-bold text-center  uppercase">
            Shop By Category
          </h2>
          <Categories
            categories={categories}
            handleToNavigateProductsPage={handleToNavigateProductsPage}
          />
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 ">
          <h2 className="text-2xl font-bold text-center  uppercase">Brands</h2>
          <Brands
            brands={brands}
            handleToNavigateProductsPage={handleToNavigateProductsPage}
          />
        </div>
      </section>

      {/* products */}
      <section className="py-12">
        <div className="container mx-auto px-2">
          <p className="text-center text-2xl uppercase  font-bold">
            Products For You
          </p>
          <div className="">
            {
              <UserProductCardBox
                products={productList}
                isLoading={isLoading}
                handleDetailsPage={handleDetailsPage}
                handleAddToCart={handleAddToCart}
              />
            }
          </div>
        </div>
      </section>
      <ProductDetails
        open={oepnDetailsDiallog}
        setopen={setoepnDetailsDiallog}
        ProductDetails={productDetails}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Home;
