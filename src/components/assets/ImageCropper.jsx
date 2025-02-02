import { Button } from "@nextui-org/react";
import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ImageCropper = ({ image, setImage, setIsCroperOpen }) => {
  const [crop, setCrop] = useState({
    unit: "px", // Can be 'px' or '%'
    x: 0,
    y: 0,
    width: 300,
    height: 300,
  });
  const imgRef = useRef(null);

  // Handle crop completion
  const onCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  // Generate cropped image
  const getCroppedImg = () => {
    if (!imgRef.current) {
      console.error("Image reference is null");
      return;
    }

    const canvas = document.createElement("canvas");
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

    // Ensure the crop area does not exceed the image boundaries
    const cropX = Math.max(0, crop.x * scaleX);
    const cropY = Math.max(0, crop.y * scaleY);
    const cropWidth = Math.min(
      imgRef.current.naturalWidth - cropX,
      crop.width * scaleX
    );
    const cropHeight = Math.min(
      imgRef.current.naturalHeight - cropY,
      crop.height * scaleY
    );

    // Set canvas dimensions to match the crop area
    canvas.width = cropWidth;
    canvas.height = cropHeight;

    const ctx = canvas.getContext("2d");

    // Draw only the visible part of the image
    ctx.drawImage(
      imgRef.current,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    );

    // Convert canvas to blob and then to URL
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Canvas to Blob conversion failed");
          return;
        }
        resolve(URL.createObjectURL(blob));
      }, "image/jpeg"); // Use "image/png" if you want to preserve transparency
    });
  };

  // Handle crop completion and set the cropped image
  const handleCropComplete = async () => {
    if (!imgRef) {
      console.error("Image is not loaded yet");
      return;
    }

    if (
      !crop.width ||
      !crop.height ||
      isNaN(crop.width) ||
      isNaN(crop.height)
    ) {
      console.error("Invalid crop dimensions");
      return;
    }

    try {
      const croppedImageUrl = await getCroppedImg();
      const response = await fetch(croppedImageUrl);
      const blob = await response.blob();
      const file = new File([blob], "cropped-image.jpg", {
        type: "image/jpeg",
      });

      setImage(file);
      setIsCroperOpen(false);
    } catch (error) {
      console.error("Error cropping image:", error);
    }
  };

  return ReactDOM.createPortal(
    <div className="mx-auto w-screen h-screen fixed backdrop-brightness-50 top-0 left-0 z-[999] flex items-center justify-center">
      <div className="relative p-4  flex flex-col bg-black rounded-2xl border border-color">
        <div>
          <ReactCrop
            className="h-full w-auto"
            circularCrop
            aspect={1}
            crop={crop}
            keepSelection
            onChange={onCropChange}
          >
            <div>
              <img
                className="sm:max-w-[700px] max-h-[60vh] sm:max-h-[50vh]"
                src={image}
                ref={imgRef}
              />
            </div>
          </ReactCrop>
        </div>
        <div className="mt-2 flex items-center justify-end gap-2">
          <Button
            variant="bordered"
            radius="full"
            className="border-red-500 text-red-500"
            onPress={() => {
              setImage(null);
              setIsCroperOpen(false);
            }}
          >
            Cencel
          </Button>
          <Button
            onPress={handleCropComplete}
            radius="full"
            className="bg-[var(--main-color)] text-black"
          >
            Save
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ImageCropper;
