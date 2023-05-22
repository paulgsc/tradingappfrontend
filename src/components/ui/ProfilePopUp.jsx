import React from "react";
import PlaceHolder from "../loading/PlaceHolder";
import "./profilepopup.css";
import { useEffect } from "react";
import { useState } from "react";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import { useRef } from "react";
const iconStyle = {
  color: "#FFF",
  bgcolor: "red",
  width: {
    xs: 200,
    sm: 200,
    md: 200,
    lg: 200,
    xlg: 200,
  },
  Height: {
    xs: 200,
    sm: 200,
    md: 200,
    lg: 200,
    xlg: 200,
  },
};

function ProfilePopUp() {
  const [isActive, setIsActive] = useState(false);
  const [fileSelected, setFileSelected] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];
    const isValidFileType = allowedFileTypes.includes(selectedFile.type);

    if (!isValidFileType) {
      alert("Please select an image file (JPEG, PNG, GIF).");
      fileInputRef.current.value = ""; // Clear the file input
      return;
    }

    // Validate file size
    const maxSizeInBytes = 850 * 1024; // 850 MB
    const isValidFileSize = selectedFile.size <= maxSizeInBytes;

    if (!isValidFileSize) {
      alert("File size exceeds the maximum limit (850 KB).");
      fileInputRef.current.value = ""; // Clear the file input
      return;
    }
    setFileSelected(URL.createObjectURL(selectedFile));
  };
  useEffect(() => {
    function handleClickOutside(event) {
      const container = document.getElementById("profile-popup");
      const button = document.getElementById("profile-icon-button");
      if (container && !container.contains(event.target) && isActive) {
        container.style.display = "none";
        setIsActive(false);
      } else if (!isActive && button && button.contains(event.target)) {
        setIsActive(true);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isActive]);

  return (
    <div id="profile-popup" className="hidden profile-popup__container">
      <div className="profile-popup__icon">
        {fileSelected ? (
          <img src={fileSelected} alt="selected" />
        ) : (
          <AddReactionIcon
            sx={{
              color: "#FFF",
              width: {
                xs: 20,
                sm: 40,
                md: 60,
                lg: 180,
                xlg: 200,
              },
              height: {
                xs: 20,
                sm: 40,
                md: 60,
                lg: 180,
                xlg: 200,
              },
            }}
          />
        )}
      </div>
      <div className="profile-poppup__button">
        {fileSelected ? (
          <button onClick={handleSubmit}>Confirm</button>
        ) : (
          <button>
            <i className="fa-solid fa-image"></i>
            <input
              type="file"
              accept="image/*"
              size="850000"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfilePopUp;
