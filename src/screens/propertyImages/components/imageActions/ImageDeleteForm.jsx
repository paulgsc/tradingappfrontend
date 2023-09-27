import { useState } from "react";

function ImageDeleteForm({ confirmation, handleDelete }) {
  const [confirm, setConfirm] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (confirm === confirmation) {
      handleDelete();
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-10/12">
      <span className=" font-semibold text-neutral-600">
        enter {confirmation} to confirm
      </span>
      <div className="relative group bg">
        <input
          id="filenameInput"
          type="text"
          required
          onChange={(e) => {
            setConfirm(e.target.value);
          }}
          className="peer w-full focus:outline-none input active:outline-none focus:ring-1 ring-blue-600 bg-gray-50 border rounded-sm p-2 text-sm xl:text-base"
        />
        <label
          htmlFor="filenameInput"
          className="peer-valid:invisible peer-invalid:-translate-y-7 peer-invalid:text-xs peer-invalid:text-red-600 pointer-events-none absolute left-1 top-4 transition-all ease-in-out duration-200 group-focus-within:-translate-y-7 group-focus-within:text-xs group-focus-within:bg-white  text-neutral-400"
        >
          enter filename to confirm
        </label>
      </div>
      <button
        type="submit"
        className=" shadow-md rounded-md bg-gradient-to-b from-pink-500 to-red-900 text-white text-base font-bold p-2 hover:ring-1 hover:ring-orange-600"
      >
        Delete image
      </button>
    </form>
  );
}

export default ImageDeleteForm;
