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
  const {
    imageUpload = [],
    uploadState: { cancel = false, uploaded = false, posted = false } = {},
  } = useSelector((state) => state.adminFetchData);

  const handleFileChange = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);

    if (fileArray.length > 10) {
      fileArray.splice(10);
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
    const fileUrls = fileArray.map((file, i) => ({
      id: i,
      imageUrl: URL.createObjectURL(file),
      imageName: file.name,
    }));

    setFileName(fileArray[0].name);
    dispatch(addSelectedImagesSuccess(fileUrls));
    storeFilesInSessionStorage(fileArray);
  };

  const storeFilesInSessionStorage = async (files) => {
    const fileDataArray = [];

    await Promise.all(
      files.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const fileData = {
              name: file.name,
              type: file.type,
              data: event.target.result,
            };
            fileDataArray.push(fileData);
            resolve();
          };
          reader.readAsDataURL(file);
        });
      })
    );

    sessionStorage.setItem("stagedImageFiles", JSON.stringify(fileDataArray));
  };

  useEffect(() => {
    if (cancel || posted) {
      fileInputRef.current.value = ""; // Clear the file input
      setFileName(null);
      sessionStorage.removeItem("stagedImageFiles");
    }
  }, [cancel]);

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
