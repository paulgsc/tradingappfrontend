function SheetsUrl({ url }) {
  return (
    <div className="container sticky left-0 mb-2 p-2">
      <a className="mb-6 ">
        <label
          htmlFor="large-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        ></label>
        <input
          disabled
          type="text"
          id="large-input"
          value={url && url}
          placeholder="Enter the spreadsheet url where the data exists here."
          className="block w-full p-2 placeholder:text-blue-900 text-blue-900 border border-gray-300 rounded-full bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
        />
      </a>
    </div>
  );
}

export default SheetsUrl;
