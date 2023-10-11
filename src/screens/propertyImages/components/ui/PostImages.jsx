import { useDispatch, useSelector } from "react-redux";
import { publishImageFiles } from "../../hooks/reduxActions";
import { showNotify } from "../../../../lib/utils";

function PostImages() {
  const dispatch = useDispatch();
  const { imagesSelectedQuery: { id = null } = {} } = useSelector(
    (state) => state.adminFetchData
  );
  const { imageActions: { overwrite = [] } = {} } = useSelector(
    (state) => state.adminActions
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id) {
      return showNotify(
        "error",
        "bg-gradient-to-r from-pink-100 to-red-500",
        "The property address to update is not set!",
        "bottom-right"
      );
    }
    id && dispatch(publishImageFiles(id, overwrite));
  };

  return (
    <div className="p-6 border border-gray-300 sm:rounded-md">
      <form method="POST" onSubmit={handleSubmit}>
        <label className="block mb-6">
          <span className="text-gray-700">Update Name</span>
          <input
            type="text"
            name="name"
            className="
          block
          w-full
          mt-1
          border-gray-300
          rounded-md
          shadow-sm
          focus:border-indigo-300
          focus:ring
          focus:ring-indigo-200
          focus:ring-opacity-50
        "
            placeholder="Full name"
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700">Brief</span>
          <textarea
            name="message"
            className="
          block
          w-full
          mt-1
          border-gray-300
          rounded-md
          shadow-sm
          focus:border-indigo-300
          focus:ring
          focus:ring-indigo-200
          focus:ring-opacity-50
        "
            rows="3"
            placeholder=""
          ></textarea>
        </label>
        <div className="mb-6">
          <button
            type="submit"
            className="
          h-10
          px-5
          text-indigo-100
          bg-indigo-700
          rounded-lg
          transition-colors
          duration-150
          focus:shadow-outline
          hover:bg-indigo-800
        "
          >
            Post update
          </button>
        </div>
        <div></div>
      </form>
    </div>
  );
}

export default PostImages;
