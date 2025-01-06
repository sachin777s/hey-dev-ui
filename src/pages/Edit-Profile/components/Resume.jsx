import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { IoDocumentText } from "react-icons/io5";
import { MdDeleteOutline, MdUpload } from "react-icons/md";

function Resume() {
  const [fileInfo, setFileInfo] = useState();
  const [file, setFile] = useState();

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
  const handleFileUpload = () => {};

  //Handling resume deleting
  const handleDeleteResume = () => {};

  return (
    <div className="mt-16">
      <h1 className="text-2xl font-semibold">Resume</h1>
      <div className="mt-4 flex flex-col items-start">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
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
        <span className="text-sm">file size should be less than 2 MB</span>

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
              onClick={handleDeleteResume}
            >
              <MdDeleteOutline size={18} />
            </Button>
          </div>
        )}
        <Button
          onClick={handleFileUpload}
          radius="full"
          className="mt-4 bg-[var(--main-color)] text-black"
        >
          Upload
        </Button>
      </div>
    </div>
  );
}

export default Resume;
