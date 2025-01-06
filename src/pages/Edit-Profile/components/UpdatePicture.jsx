import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdDeleteOutline, MdModeEdit } from "react-icons/md";

function UpdatePicture() {
  const [seledctedPicture, setSelectedPicture] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedPicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  //Deleting the picture
  const handleDeletingPicture = () => {};

  return (
    <div className="mt-4 flex items-center justify-center flex-col">
      <div className="h-36 md:h-44 w-36 md:w-44 rounded-full border-2 border-[var(--main-color)]">
        {seledctedPicture ? (
          <img
            className="w-full h-full rounded-full"
            src={seledctedPicture}
            alt="..."
          />
        ) : (
          <FaUserCircle className="h-full w-full" />
        )}
      </div>
      <div className="mt-4 flex items-center justify-center gap-4">
        <label htmlFor="image-upload">
          <Button
            onClick={() => document.getElementById("image-upload").click()}
            variant="bordered"
            radius="full"
            className="text-lg"
          >
            <MdModeEdit />
            Edit
          </Button>
        </label>
        <Button
          onClick={() => handleDeletingPicture()}
          className="text-lg text-red-500"
          radius="full"
          variant="bordered"
        >
          <MdDeleteOutline />
          Remove
        </Button>
      </div>
      <input
        onChange={handleImageChange}
        id="image-upload"
        name="image-upload"
        type="file"
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}

export default UpdatePicture;
