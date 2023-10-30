import API from "../../../api/django";
import {
  adminDeleteImagesFailed,
  adminDeleteImagesSuccessful,
  adminRequestImageDeletion,
  adminSetImageIdsFailed,
  adminSetImageIdsSuccess,
  adminStartUpdate,
} from "../../../reducers/adminActionsReducers";
import {
  addSelectedImagesSuccess,
  adminPostPropertyImagesSuccess,
  adminRequestData,
  cancelUploadingImages,
  imageUploadActionFailed,
  removeSelectedImagesSuccess,
} from "../../../reducers/adminFetchDataReducers";

export const previewUploadedFiles = (files) => async (dispatch) => {
  try {
    dispatch(addSelectedImagesSuccess(files));
  } catch (error) {
    dispatch(imageUploadActionFailed(error.message));
  }
};

export const removePreviewImageFile =
  (fileName) => async (dispatch, getState) => {
    try {
      dispatch(adminRequestData());
      const { adminFetchData: { imageUpload = [] } = {} } = getState();
      const updatedImages = imageUpload.filter(
        (imageFile) => imageFile.imageName !== fileName
      );
      if (updatedImages.length === 0) {
        dispatch(cancelUploadingImages());
      }
      dispatch(removeSelectedImagesSuccess(updatedImages));
    } catch (error) {
      dispatch(imageUploadActionFailed(error.message));
    }
  };

export const publishImageFiles =
  (propertyId, replaceImageIds = []) =>
  async (dispatch, getState) => {
    try {
      const path = "rental_photos/create-images/";

      const {
        userAuth: { userInfo },
      } = getState();

      const retrieveStagedFilesFromSessionStorage = () => {
        const fileDataArray = JSON.parse(
          sessionStorage.getItem("stagedImageFiles")
        );
        return fileDataArray || [];
      };

      // Usage:
      const stagedImageFiles = [];
      retrieveStagedFilesFromSessionStorage().forEach((fileData) => {
        const byteString = atob(fileData.data.split(",")[1]);
        const mimeString = fileData.type;
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([ab], { type: mimeString });
        const file = new File([blob], fileData.name, { type: mimeString });
        stagedImageFiles.push(file);
      });

      // Client-side code
      const formDataArray = stagedImageFiles.map((file, i) => {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("property", propertyId);
        formData.append("image_title", file.name);
        formData.append("object_key", file.name);
        formData.append("bucket_name", "leafiproperty-images");

        if (replaceImageIds.length > i) {
          console.log(replaceImageIds[i]);
          formData.append("id", replaceImageIds[i]);
        }

        return formData;
      });

      // Now 'formDataArray' will be an array of FormData objects to send to the server
      // Make the API call using 'formDataArray'

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const responseArray = await Promise.all(
        formDataArray.map((formData) =>
          API.post(path, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              ...config.headers,
            },
          })
        )
      );

      dispatch(adminPostPropertyImagesSuccess());
    } catch (error) {
      dispatch(imageUploadActionFailed(error.message));
    }
  };

export const stageImageIds = (type, imageIds) => (dispatch, getState) => {
  try {
    dispatch(adminStartUpdate());

    const {
      adminActions: {
        imageActions: { publish, overwrite },
      },
    } = getState();

    const payload = () => {
      switch (type) {
        case "uploads":
          return { publish: imageIds, overwrite: overwrite };
        case "published":
          return { publish: publish, overwrite: imageIds };
        default:
          return { publish: publish, overwrite: overwrite };
      }
    };

    dispatch(adminSetImageIdsSuccess(payload()));
  } catch (error) {
    dispatch(adminSetImageIdsFailed(error.message));
  }
};

export const deletePropertyImages = () => async (dispatch, getState) => {
  try {
    dispatch(adminRequestImageDeletion());

    const path = "rental_photos/delete-images/";

    const {
      userAuth: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const response = await API.delete(path, config);

    dispatch(adminDeleteImagesSuccessful(response.data));
  } catch (error) {
    dispatch(adminDeleteImagesFailed(error.message));
  }
};
