import { storage } from "../../../../firebase";
import { ref, uploadBytes, getDownloadURL, listAll, list } from "firebase/storage";
import { clearFirebaseErrorCodes, firebaseStorageRequestFailed, firebaseStorageRequestSuccess, requestFirebaseStorage, setFirebaseErrorCodeReducer } from "../../../reducers/firebaseReducer"
import { v4 } from "uuid";

export const postProfileImage = (imageUpload) => async (dispatch) => {
    requestFirebaseStorage();
    try{
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        const snapshot = await uploadBytes(imageRef, imageUpload)
        const  url  = await getDownloadURL(snapshot.ref)
        dispatch(firebaseStorageRequestSuccess(url))
    } catch (error){
        dispatch(firebaseStorageRequestFailed(error))
    }
    try {
        const imagesListRef = ref(storage, "images/")
        const imagesList = await list(imagesListRef);
        const items = imagesList.items;
    
        if (items.length > 1) {
          const filesToDelete = items.slice(0, -1);
    
          const deletePromises = filesToDelete.map(async (item) => {
            await item.delete();
          });
    
          await Promise.all(deletePromises);
        }
      } catch (error) {
        dispatch(firebaseStorageRequestFailed(error));
      }
    
}


