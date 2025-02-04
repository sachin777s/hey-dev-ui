import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdDeleteOutline, MdModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import API from "../../../api";
import axios from "axios";
import ImageCropper from "../../../components/assets/ImageCropper";
import toast from "react-hot-toast";
import { uploadFileToCloudinary } from "../../../utils/uploadFileToCloudinary";
import { fetchUserSuccess } from "../../../app/slices/user";
import { PROFILE_PICTURES_FOLDER } from "../../../utils/contants";

function UpdatePicture() {
  const [seledctedPicture, setSelectedPicture] = useState(null);
  const user = useSelector((state) => state.user.data);
  const [isCroperOpen, setIsCroperOpen] = useState(false);
  const [croppedPicture, setCroppedPicture] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (croppedPicture !== null) {
      const updateProfilePicture = async () => {
        toast.promise(
          async () => {
            const uploadedURL = await uploadFileToCloudinary(
              croppedPicture,
              PROFILE_PICTURES_FOLDER
            );
            if (!uploadedURL) {
            }
            const response = await API.put(
              "/api/user/profile/profile-picture",
              {
                profilePicture: uploadedURL,
              }
            );
            dispatch(fetchUserSuccess(response.data.data));
          },
          {
            loading: "Loading...",
            success: "Profile Picture Uploaded Successfully",
            error: "Uploading Profile Picture Failed",
          }
        );
      };
      updateProfilePicture();
    }
    setSelectedPicture(null);
    setCroppedPicture(null);
  }, [croppedPicture]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedPicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setIsCroperOpen(true);
  };

  //Deleting the picture
  const handleDeletingPicture = () => {
    toast.promise(
      async () => {
        const response = await API.put("/api/user/profile/profile-picture", {
          profilePicture: "",
        });
        dispatch(fetchUserSuccess(response.data.data));
      },
      {
        loading: "Loading...",
        success: "Profile Picture Deleted Successfully",
        error: "Deleting Profile Picture Failed",
      }
    );
    setSelectedPicture(null);
    setCroppedPicture(null);
  };

  return (
    <div className="mt-4 flex items-center justify-center flex-col">
      <div className="h-36 md:h-44 w-36 md:w-44 rounded-full border-2 border-[var(--main-color)]">
        <input
          onChange={handleImageChange}
          id="image-upload"
          name="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
        />
        <>
          {user.profilePicture ? (
            <img
              className="w-full h-full rounded-full"
              src={user.profilePicture}
              alt="..."
            />
          ) : (
            <FaUserCircle className="h-full w-full" />
          )}
        </>
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
      {isCroperOpen && (
        <ImageCropper
          image={seledctedPicture}
          setImage={setCroppedPicture}
          setIsCroperOpen={setIsCroperOpen}
        />
      )}
    </div>
  );
}

export default UpdatePicture;
