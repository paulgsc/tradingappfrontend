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
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl p-4 py-6 space-y-8 rounded-md shadow-sm bg-zinc-100"
    >
      <span className=" font-semibold text-neutral-600">
        enter <strong>{confirmation}</strong> to confirm
      </span>
      <div className="relative group bg">
        <input
          id="filenameInput"
          type="text"
          placeholder="Enter image title to confirm"
          required
          onChange={(e) => {
            setConfirm(e.target.value);
          }}
          className="peer w-full focus:outline-none input active:outline-none focus:ring-1 ring-blue-600 bg-zinc-100 border rounded-sm p-2 text-sm xl:text-base"
        />
      </div>
      <button
        type="submit"
        className="w-5/12 ml-6 shadow-md rounded-md bg-gradient-to-b from-pink-500 to-red-900 text-white text-base font-bold p-2 hover:ring-1 hover:ring-orange-600"
      >
        Delete image
      </button>
    </form>
  );
}

export default ImageDeleteForm;
