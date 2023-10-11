function DeleteSingleImage({ handleOpen }) {
  return (
    <div className="relative group">
      <button className=" hover:bg-gray-200 hover:ring-1 hover:ring-blue-200 hover:rounded-md ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8  bg-tranparent"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <circle cx="10" cy="4" r="1.5" />
          <circle cx="10" cy="10" r="1.5" />
          <circle cx="10" cy="16" r="1.5" />
        </svg>
      </button>
      <ul className="hidden absolute -right-10 group-focus-within:flex bg-white shadow-lg rounded-lg flex-col  w-20 h-24 hover:ring hover:ring-blue-200 ">
        <li className="w-full h-12 flex items-center hover:bg-gray-200 bg-gray-100 border-b border-gray-700">
          <button className="px-2 font-semibold capitalize">rename</button>
        </li>
        <li className="w-full h-12 flex items-center hover:bg-gray-200">
          <button
            onClick={handleOpen}
            className="px-2 text-red-600 font-semibold capitalize"
          >
            delete
          </button>
        </li>
      </ul>
    </div>
  );
}

export default DeleteSingleImage;
