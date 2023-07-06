import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { notify } from "../../lib/utils";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedImagesSuccess } from "../../reducers/adminFetchDataReducers";

function UploadButton() {
  const fileInputRef = useRef(null);
  const [filename, setFileName] = useState(null);
  const dispatch = useDispatch();
  const { imageUpload = [] } = useSelector((state) => state.adminFetchData);

  const handleFileChange = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);

    if (fileArray.length > 7) {
      fileArray.splice(7);
      notify("Can only upload at most 7 images per property!");
    }

    const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];
    const invalidFileType = fileArray.find((file) => {
      return !allowedFileTypes.includes(file.type);
    });

    if (!!invalidFileType) {
      alert("Please select an image file (JPEG, PNG, GIF).");
      fileInputRef.current.value = ""; // Clear the file input
      return;
    }

    // Validate file size
    const maxSizeInBytes = 850 * 1024; // 850 MB
    const invalidFileSize = fileArray.find(
      (file) => file.size > maxSizeInBytes
    );

    if (!!invalidFileSize) {
      alert("File size exceeds the maximum limit (850 KB).");
      fileInputRef.current.value = ""; // Clear the file input
      return;
    }
    const fileUrls = fileArray.map((file) => ({
      imageUrl: URL.createObjectURL(file),
      imageName: file.name,
    }));

    setFileName(fileArray[0].name);
    dispatch(addSelectedImagesSuccess(fileUrls));
  };

  return (
    <>
      <label htmlFor="fileInput" className="file-input-label cursor-pointer">
        {(filename &&
          `${filename} ${
            imageUpload.length > 1 ? `+ ${imageUpload.length - 1} more...` : ""
          }`) ||
          "Choose an image"}
      </label>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        size="850000"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
      />
      <Toaster />
    </>
  );
}

export default UploadButton;
