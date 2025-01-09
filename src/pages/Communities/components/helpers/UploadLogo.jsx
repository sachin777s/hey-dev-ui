import React, { useState, useCallback } from "react";
import { MdOutlineFileUpload } from "react-icons/md";

const UploadLogo = ({ setLogoImage }) => {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file) => {
    setError("");

    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 2 * 1024 * 1024) {
      setError("Image size should be less than 2MB");
      return;
    }
    //Sending file to CreateCompany.jsx
    setLogoImage(file);

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, []);

  return (
    <div className="mt-2 w-full max-w-md">
      <div
        className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        } ${
          isDragging ? "border-solid" : "border-dashed"
        } rounded-lg transition-colors duration-200`}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="space-y-2 text-center">
          {preview ? (
            <div className="relative w-32 h-32 mx-auto">
              <img
                src={preview}
                alt="Logo preview"
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => {
                  setPreview(null);
                  setError("");
                }}
                className="w-4 h-4 absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-sm flex items-center justify-center"
                aria-label="Remove image"
              >
                ×
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <MdOutlineFileUpload
                size={20}
                className={`mx-auto h-12 w-12 ${
                  isDragging ? "text-blue-500" : "text-gray-400"
                }`}
              />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer rounded-md font-medium text-[var(--main-color)] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
            </div>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default UploadLogo;
