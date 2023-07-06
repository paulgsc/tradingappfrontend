import React, { useRef } from "react";
import UploadButton from "./components/ui/UploadButton";

function FileDropZone({ handleFileChange }) {
  const dropZoneRef = useRef();

  const handleDragEnter = (e) => {
    e.preventDefault();
    dropZoneRef.current.classList.add("drag-over");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    dropZoneRef.current.classList.remove("drag-over");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    dropZoneRef.current.classList.remove("drag-over");

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  return (
    <div
      className="flex items-center justify-center w-11/12 h-32 xl:h-44 border-2 border-dashed border-slate-400"
      ref={dropZoneRef}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="grid grid-row-2">
        <span className="font-semibold text-gray-900 flex flex-wrap justify-center">
          Drag and drop your files or
        </span>
        <button className="rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
          <UploadButton />
        </button>
      </div>
    </div>
  );
}

export default FileDropZone;
