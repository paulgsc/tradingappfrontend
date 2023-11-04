function SelectionField({
  handleFrequencyChange,
  selectedFrequency,
  data = [],
}) {
  return (
    <div className="flex w-full md:max-w-sm xl:max-w-lg">
      <button
        id="states-button"
        data-dropdown-toggle="dropdown-states"
        className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
        type="button"
      >
        Fetch
      </button>

      <label htmlFor="states" className="sr-only">
        Choose a frequency
      </label>
      <select
        id="states"
        className="capitalize bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg border-l-gray-100 dark:border-l-gray-700 border-l-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        value={selectedFrequency}
        onChange={handleFrequencyChange}
      >
        <option value={0}>Choose a frequency</option>
        {data.map((interval) => (
          <option
            key={interval?.id}
            value={interval?.id}
          >{`every ${interval?.interval_unit}`}</option>
        ))}
      </select>
    </div>
  );
}

export default SelectionField;
