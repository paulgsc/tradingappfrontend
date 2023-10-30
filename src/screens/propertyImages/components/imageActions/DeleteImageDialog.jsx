import ImageDeleteForm from "./ImageDeleteForm";
import Dialog from "../../../../components/ui/Dialog";
import { useDispatch } from "react-redux";

import DeleteSingleImage from "./DeleteSingleImage";
import { useLocation, useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import {
  deletePropertyImages,
  removePreviewImageFile,
} from "../../hooks/reduxActions";

function DeleteImageDialog({ rowId, imageTitle = "image" }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams();

  const handleClose = () => {
    const currentSearchParams = new URLSearchParams(queryParameters);
    currentSearchParams.delete("dialogDelete");
    navigate(`${location.pathname}?${currentSearchParams.toString()}`);
  };
  const handleOpen = () => {
    const currentSearchParams = new URLSearchParams(queryParameters);
    currentSearchParams.has("dialogDelete")
      ? currentSearchParams.set("dialogDelete", imageTitle)
      : currentSearchParams.append("dialogDelete", imageTitle);
    navigate(`${location.pathname}?${currentSearchParams.toString()}`);
  };

  const handleDelete = () => {
    if (location.pathname.includes("published")) {
      const formData = {
        image_ids: [rowId],
      };
      dispatch(deletePropertyImages(formData));
    }
    if (location.pathname.includes("uploads")) {
      dispatch(removePreviewImageFile(imageTitle));
    }
  };

  if (queryParameters.get("dialogDelete"))
    return (
      <Dialog onClose={handleClose}>
        <ImageDeleteForm
          confirmation={imageTitle}
          handleDelete={handleDelete}
        />
      </Dialog>
    );
  return <DeleteSingleImage handleOpen={handleOpen} />;
}

export default DeleteImageDialog;
