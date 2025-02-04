import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { IoDocumentText } from "react-icons/io5";
import { MdDeleteOutline, MdUpload } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import { uploadFileToCloudinary } from "../../../utils/uploadFileToCloudinary";
import API from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserSuccess } from "../../../app/slices/user";
import { RESUMES_FOLDER } from "../../../utils/contants";

function Resume() {
  const resume = useSelector((state) => state.user.data.resume);
  const [fileInfo, setFileInfo] = useState(null);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  //Handling file changing in the input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileInfo({
        name: file.name,
        size: (file.size / 1024).toFixed(2) + " KB",
      });
      setFile(file);
    }
  };

  //Handling file uploading
  const handleFileUpload = async () => {
    if (file === null) {
      toast.error("Please PDF file");
    }

    toast.promise(
      async () => {
        const uploadedUrl = await uploadFileToCloudinary(file, RESUMES_FOLDER);
        const response = await API.put("/api/user/profile/resume", {
          resume: uploadedUrl,
        });
        dispatch(fetchUserSuccess(response.data.data));
        setFile(null);
        setFileInfo(null);
      },
      {
        loading: "Updating Resume",
        success: "Resume Updated Successfully",
        error: "Failed to Add Resume",
      }
    );
  };

  //Handling resume deleting
  const handleDeleteResume = () => {
    toast.promise(
      async () => {
        const response = await API.put("/api/user/profile/resume", {
          resume: "",
        });
        dispatch(fetchUserSuccess(response.data.data));
      },
      {
        loading: "Deleting Resume",
        success: "Resume Deleted Successfully",
        error: "Failed to Delete Resume",
      }
    );
  };

  return (
    <div className="mt-16">
      <h1 className="text-2xl font-semibold">Resume</h1>
      <div className="mt-4 flex flex-col items-start">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
          id="resume-upload"
        />
        <Button variant="outline" className="border">
          <label
            htmlFor="resume-upload"
            className="cursor-pointer flex items-center justify-center gap-2"
          >
            <MdUpload size={20} />
            Select Resume
          </label>
        </Button>
        <span className="mt-1 text-sm">file size should be less than 2 MB</span>
        <span className="text-sm">Only PDF file are allowed</span>

        {fileInfo && (
          <div className="mt-4 p-4 border rounded-md">
            <div className="flex items-center gap-2">
              <IoDocumentText size={20} />
              <span className="text-sm font-medium">{fileInfo.name}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Size: {fileInfo.size}</p>
            <Button
              size="sm"
              variant="bordered"
              className="mt-2 w-full border-[red] text-[red]"
              onClick={() => {
                setFile(null);
                setFileInfo(null);
              }}
            >
              <MdDeleteOutline size={18} />
            </Button>
          </div>
        )}
        <Button
          disabled={!file}
          onClick={handleFileUpload}
          radius="full"
          className={`mt-4 bg-[var(--main-color)] ${
            !file && "opacity-60"
          } text-black`}
        >
          Upload
        </Button>
      </div>

      {resume && (
        <div className="flex flex-col items-start">
          <iframe
            className="mt-4"
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(
              resume
            )}&embedded=true`}
            frameBorder={0}
          ></iframe>
          <Button
            onClick={handleDeleteResume}
            variant="bordered"
            className="mt-2 border-red-500 text-red-500"
          >
            Delete Resume
          </Button>
        </div>
      )}
    </div>
  );
}

export default Resume;
