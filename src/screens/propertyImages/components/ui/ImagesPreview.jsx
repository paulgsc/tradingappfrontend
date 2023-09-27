import { DeleteIcon } from "../../../../constants/svgs/Svg";
import { useDispatch, useSelector } from "react-redux";
import { removePreviewImageFile } from "../../../../contexts/redux/actions/adminActions";

function ImagesPreview() {
  const { imageUpload = [] } = useSelector((state) => state.adminFetchData);
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center items-center w-full h-full border border-gray-600 rounded">
      {imageUpload.length === 1 ? (
        <>
          {imageUpload.map((item, i) => (
            <img
              key={`${i}_image_preview`}
              src={item?.imageUrl}
              className="w-full h-full bg-cover"
              alt="preview"
            />
          ))}
        </>
      ) : imageUpload.length >= 2 ? (
        <div
          className={`grid-flow-row grid  w-full h-full ${
            imageUpload.length > 2 ? "overflow-y-scroll" : ""
          }`}
        >
          {imageUpload.map((item, i) => (
            <div key={`${i}_image_preview`} className="grid grid-cols-7">
              <div className="flex px-2 gap-2 justify-between items-center col-span-2 text-base font-semibold text-slate-400">
                <span className="">{item?.imageName}</span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(removePreviewImageFile(item?.imageName));
                  }}
                  className="text-white"
                >
                  <DeleteIcon />
                </button>
              </div>

              <div className=" flex items-center justify-end w-full h-full p-2 col-span-5 overflow-hidden">
                <img
                  src={item?.imageUrl}
                  className="w-9/12 h-40 object-cover rounded-md shadow-md"
                  alt="preview"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ImagesPreview;
