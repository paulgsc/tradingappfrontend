import React, { useState } from "react";
import ImageDeleteForm from "./ImageDeleteForm";
import Dialog from "../../../components/ui/Dialog";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePropertyImages,
  removePreviewImageFile,
} from "../../../contexts/redux/actions/adminActions";
import { useLocation } from "react-router";
import { Toaster } from "react-hot-toast";

function DeleteImagesDialog({ rowIds, handleClose, clearIds }) {
  const [actionCount, setActionCount] = useState(0);
  const dispatch = useDispatch();
  const location = useLocation();
  const { imageUpload = [] } = useSelector((state) => state.adminFetchData);

  const imageNames = rowIds.map(
    (rowId) => imageUpload.find((image) => image?.id === rowId)?.imageName
  );

  const confirmation = "Confirm";
  const handleDelete = () => {
    setActionCount(1);

    if (location.pathname.includes("published")) {
      const formData = {
        image_ids: rowIds,
      };
      dispatch(deletePropertyImages(formData));
    }
    if (location.pathname.includes("uploads")) {
      imageNames.forEach((imageName) => {
        dispatch(removePreviewImageFile(imageName));
      });
    }
    clearIds();
    handleClose();
  };

  return (
    <>
      <Dialog onClose={handleClose}>
        <ImageDeleteForm
          confirmation={confirmation}
          handleDelete={handleDelete}
        />
      </Dialog>
      <Toaster />
    </>
  );
}

export default DeleteImagesDialog;
