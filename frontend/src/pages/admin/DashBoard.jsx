import React, { useState } from "react";
import ImageUplaod from "./ImageUplaod";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  addFeatureImage,
  getFeatureImage,
} from "@/store/userView/featureImages";

const AdminDashBoard = () => {
  const [imageFile, setimageFile] = useState(null);
  const [uploadImageUrl, setuploadImageUrl] = useState("");
  const [imageUploadLoading, setimageUploadLoading] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, images } = useSelector((state) => state.feature);
  const handleToaddFeatureImage = () => {
    dispatch(addFeatureImage({ image: uploadImageUrl })).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImage());
        setimageFile(null);
        setimageUploadLoading("");
      }
    });
  };

  return (
    <div>
      <ImageUplaod
        imageUploadLoading={imageUploadLoading}
        setimageUploadLoading={setimageUploadLoading}
        uploadImageUrl={uploadImageUrl}
        setuploadImageUrl={setuploadImageUrl}
        imageFile={imageFile}
        setImageFile={setimageFile}
      />
      <Button className="w-full mt-3" onClick={() => handleToaddFeatureImage()}>
        {isLoading ? "Please wait Uploading image...." : "Upload image"}
      </Button>

      <div className="mt-4 ">
        {images && images.length > 0 ? (
          images.map((image, i) => (
            <div className="relative " key={i}>
              <img
                src={image.image}
                className="w-full h-[300px] object-cover mt-2 "
              />
            </div>
          ))
        ) : (
          <h2>No images</h2>
        )}
      </div>
    </div>
  );
};

export default AdminDashBoard;
