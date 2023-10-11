import UploadButton from "../../../../components/ui/UploadButton";
import ImagesPreview from "./ImagesPreview";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelUploadingImages,
  uploadPreviewedImages,
} from "../../../../reducers/adminFetchDataReducers";
import { notify } from "../../../../lib/utils";
import { Toaster } from "react-hot-toast";

function UploadForm() {
  const dispatch = useDispatch();
  const { uploadState: { previewing = false, uploaded = false } = {} } =
    useSelector((state) => state.adminFetchData);
  const handleUploadImages = (e) => {
    e.preventDefault();
    if (previewing) {
      dispatch(uploadPreviewedImages());
      notify("successfully staged images for changes");
      return;
    }
    notify("No images to stage");
  };

  const handleCancelUpload = (e) => {
    e.preventDefault();
    if (previewing || uploaded) {
      dispatch(cancelUploadingImages());
      return;
    }
    notify("No images to remove");
  };
  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="flex items-center justify-center w-11/12 h-32 xl:h-44 border-2 border-dashed border-slate-400">
        <div className="grid grid-row-2">
          <span className=" font-semibold text-gray-900 flex flex-wrap justify-center">
            Drag and drop your files or
          </span>
          <button className="rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
            <UploadButton />
          </button>
        </div>
      </div>
      <hr className="border-2 w-full mt-2 mb-2" />
      <div className="w-11/12 h-72 xl:h-96 bg-stone-50">
        <span className="text-base xl:text-lg text-slate-800 font-bold">
          Preview
        </span>
        <div className="flex flex-col items-center justify-center w-full h-full rounded-md shadow-sm">
          <ImagesPreview />
        </div>
      </div>
      <hr className="mt-2 xl:mt-3 mb-6" />
      <div className="flex justify-end w-10/12 gap-2">
        <button
          onClick={handleUploadImages}
          disabled={uploaded}
          className="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none disabled:scale-95 disabled:brightness-75 disabled:pointer-events-none disabled:opacity-60"
        >
          Upload now
        </button>
        <button onClick={handleCancelUpload}>Cancel</button>
      </div>
      <Toaster />
    </div>
  );
}

export default UploadForm;
