import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { handleImageUploadToCloudinaryService } from "@/services";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import { useEffect } from "react";

const ImageUplaod = ({
  setuploadImageUrl,
  imageFile,
  setImageFile,
  imageUploadLoading,
  setimageUploadLoading
}) => {
  const imageRef = useRef(null);

  const handleImageFileChange = (e) => {
    console.log(e.target.files);
    const selectFile = e.target.files?.[0];
    if (selectFile) setImageFile(selectFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropfile = e.dataTransfer.files?.[0];
    if (dropfile) setImageFile(dropfile);
  };

  const handleRemoveImage = (e) => {
    setImageFile(null);
    if (imageRef.current) {
      imageRef.current.value = "";
    }
  };

  const handleImageUploadToCloudinary = async () => {
    try {
      setimageUploadLoading(true)
      const formdata = new FormData();

      formdata.append("image", imageFile);

      const res = await handleImageUploadToCloudinaryService(formdata);
      if (res.sucess) {
        setimageUploadLoading(false)
        setuploadImageUrl(res?.result?.url);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    if (imageFile !== null) handleImageUploadToCloudinary();
  }, [imageFile]);
  return (
    <div>
      <Label>Upload Image</Label>
      <div onDragOver={handleDragOver} onDrop={handleDrop}>
        <Input
          type="file"
          className="hidden"
          id="image"
          ref={imageRef}
          onChange={handleImageFileChange}
        />
        {!imageFile ? (
          <Label
            htmlFor="image"
            className="flex flex-col items-center justify-center h-32 cursor-pointer border mt-2"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground" />
            <span>Drag image to Upload</span>
          </Label>
        ) : (
          imageUploadLoading ? <Skeleton className={'w-full h-16 mt-4'}/> :
          <div className="border h-16 flex flex-col justify-center mt-4">
            <div className="flex items-center justify-between px-2">
              <FileIcon size={"18"} />
              <p className="text-sm ">{`${imageFile.name.slice(0, 25)}..`}</p>
              <div>
                <XIcon
                  size={"14"}
                  onClick={handleRemoveImage}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUplaod;
