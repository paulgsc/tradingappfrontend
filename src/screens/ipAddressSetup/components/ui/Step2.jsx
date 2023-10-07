function Step2({ isValid, handleInput }) {
  return (
    <div className="">
      <div className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Device IP address -{" "}
        <small> to add more devices, separate by comma</small>
      </div>

      <textarea
        id="message"
        rows="3"
        className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  ${
          !isValid
            ? "focus:outline-none focus:ring-2 ring-red-600"
            : "focus:ring-blue-500 focus:border-blue-500"
        }`}
        placeholder="Write additional IP addresses here, separated by comma..."
        onChange={handleInput}
      ></textarea>
    </div>
  );
}

export default Step2;
