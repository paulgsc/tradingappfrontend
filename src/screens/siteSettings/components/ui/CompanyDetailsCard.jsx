function CompanyDetailsCard({ companyDetails = [] }) {
  return (
    <div className="w-full h-full max-h-96 overflow-hidden p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Company Details
        </h5>
        <button className="text-sm font-medium text-blue-600 hover:underline">
          View all
        </button>
      </div>
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {companyDetails.map((detail, i) => (
            <div className="overflow-hidden h-20" key={i}>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {detail?.title}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {detail?.content || "not set"}
                    </p>
                  </div>
                  <button className="text-sm font-medium text-blue-600 hover:underline">
                    Edit
                  </button>
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CompanyDetailsCard;
