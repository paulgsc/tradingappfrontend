import React, { useState } from "react";
import ImageDeleteForm from "./ImageDeleteForm";
import Dialog from "../../../components/ui/Dialog";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePropertyImages,
  removePreviewImageFile,
} from "../../../contexts/redux/actions/adminActions";
import DeleteSingleImage from "./DeleteSingleImage";
import { useLocation } from "react-router";

function DeleteImageDialog({ rowId }) {
  const [showDialog, setShowDialog] = useState(false);
  const [actionCount, setActionCount] = useState(0);
  const dispatch = useDispatch();
  const location = useLocation();
  const { imagesSelectedQuery: { images = [] } = {}, imageUpload = [] } =
    useSelector((state) => state.adminFetchData);
  const handleClose = () => {
    setShowDialog(false);
  };
  const handleOpen = () => {
    setShowDialog(true);
  };
  const { image_title = "", id = null } =
    images.find((image) => image?.id === rowId) || {};
  const { imageName = "" } =
    imageUpload.find((image) => image?.id === rowId) || {};

  const confirmation = location.pathname.includes("published")
    ? image_title
    : imageName;
  const handleDelete = () => {
    if (location.pathname.includes("published")) {
      const formData = {
        image_ids: [id],
      };
      dispatch(deletePropertyImages(formData));
    }
    if (location.pathname.includes("uploads")) {
      dispatch(removePreviewImageFile(imageName));
    }
  };

  return (
    <>
      {!showDialog ? (
        <DeleteSingleImage handleOpen={handleOpen} />
      ) : (
        <Dialog onClose={handleClose}>
          <ImageDeleteForm
            confirmation={confirmation}
            handleDelete={handleDelete}
          />
        </Dialog>
      )}
    </>
  );
}

export default DeleteImageDialog;
