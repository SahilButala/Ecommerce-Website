import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { addToCart, fetchAllCartItems } from "@/store/userView/cart";
import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { MdOutlineStar } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import StarRating from "@/utils/StarRating";
import { addReview, getAllReviews } from "@/store/userView/Review";

const ProductDetails = ({ open, setopen, ProductDetails, isLoading }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const [ratingCount, setratingCount] = useState(0);
  const [reviewText, setreviewText] = useState("");
  const [error, seterror] = useState("");
  //  userId, productId, quantity
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
  const { review } = useSelector((state) => state.review);
  const handlRatingChange = (getRating) => {
    setratingCount(getRating);
  };

  // review handler
  const handleAddReview = () => {
    try {
      dispatch(
        addReview({
          userId: user?._id,
          text: reviewText,
          productId: ProductDetails?._id,
          userName: user?.userName,
          reviewValue: ratingCount,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(getAllReviews(ProductDetails?._id));
          setreviewText("");
          setratingCount(0);
          toast({
            title: "review added successfully...",
          });
        } 
      });
    } catch (error) {
      console.log(error.message, "Sasa");
    }
  };

  useEffect(() => {
    if (ProductDetails !== null) dispatch(getAllReviews(ProductDetails?._id));
  }, [ProductDetails]);

  const averageReview =
    review && review.length > 0
      ? review.reduce((sum, item) => sum + item.reviewValue, 0) / review.length
      : 0;

  return (
    <div>
      <Dialog open={open} onOpenChange={setopen}>
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          <DialogContent className="flex-col md:flex-row flex gap-9 md:max-w-[1300px] ">
            <div className="rounded-lg relative overflow-hidden ">
              <img
                src={ProductDetails?.image}
                alt="image"
                width={400}
                height={400}
                className="aspect-square object-contain border-gray-300 border w-full"
              />
            </div>

            <div className="max-h-[150px] md:max-h-[650px] overflow-y-auto px-6 md:px-2">
              <div className="grid gap-4">
                <div></div>
                <h3 className="text-2xl capitalize font-medium">
                  {ProductDetails?.title}
                </h3>
                <p className="mt-1 text-gray-400 max-w-[480px] font-semibold capitalize">
                  {ProductDetails?.description}
                </p>

                <p className="capitalize font-medium">
                  {" "}
                  Category : {ProductDetails?.category}
                </p>
                <div className="price  flex items-center gap-2 font-medium">
                  ${ProductDetails?.saleprice}{" "}
                  <span className="line-through text-xs">
                    {ProductDetails?.price}
                  </span>
                </div>
                {/* ratings */}

                <div className="ratings flex flex-col  gap-1 ">
                  <div className="flex items-center gap-2">
                    Ratings :
                    <div className="flex items-center gap-3">
                      <StarRating rating={averageReview} />{" "}
                      <span className="text-sm font-bold text-gray-500">
                        {averageReview}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mt-1 text-gray-400 max-w-[480px]">
                  Total Stock {ProductDetails?.totalStock}
                </p>
              </div>

              {ProductDetails?.totalStock === 0 ? (
                <Button
                  className="mt-4 opacity-50"
                  // onClick={() => handleAddToCart(ProductDetails?._id)}
                >
                  Out of the stock
                </Button>
              ) : (
                <Button
                  className="mt-4"
                  onClick={() => handleAddToCart(ProductDetails?._id)}
                >
                  Add To Cart
                </Button>
              )}
              {/* review box */}
              <div className="pr-2 md:pr-0">
                <h1 className="font-medium mt-4">Reviews</h1>
                <div className=" max-h-[350px] overflow-y-auto">
                  {review && review.length > 0 ? (
                    review.map((item, i) => (
                      <div
                        key={i}
                        className="box border mt-3 px-3 py-2 rounded-lg mr-1 "
                      >
                        <div className="details-page flex  gap-4 ">
                          <div className="left">
                            <Avatar>
                              <AvatarImage>image</AvatarImage>
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="right">
                            <div className="name text-sm capitalize font-medium">
                              {item.userName}
                            </div>
                            <div className="star flex mt-1">
                              <StarRating rating={item.reviewValue} />
                            </div>
                            <p className="text-sm text-gray-500  max-w-[330px] max-h-[70px] overflow-y-auto mt-1 font-semibold ">
                              {item.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h2>No revies yet</h2>
                  )}

                  <div className="flex flex-col  space-y-2 mt-4 py-1 px-2">
                    <span className="font-semibold"> Write a Review</span>
                    <Input
                      className=" outline-none mt-1 "
                      name="text"
                      value={reviewText}
                      onChange={({ target }) => setreviewText(target.value)}
                    />
                    <StarRating
                      handlRatingChange={handlRatingChange}
                      rating={ratingCount}
                    />
                    <Button
                      onClick={handleAddReview}
                      disabled={reviewText.trim() === ""}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default ProductDetails;
