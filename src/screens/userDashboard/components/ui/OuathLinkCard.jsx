function OuathLinkCard({ grantedActions = [] }) {
  return (
    <div className="w-full max-w-lg mx-auto">
      <img
        src="https://image.freepik.com/free-vector/app-development-illustration_52683-47931.jpg"
        alt=""
        loading="lazy"
        className="rounded-t-2xl shadow-2xl lg:w-full h-28 object-cover"
      />
      <div className="bg-white  rounded-b-3xl">
        <h2 className="text-center text-gray-800 text-2xl font-bold pt-6 tracking-tighter">
          Coinbase Third Party App
        </h2>
        <div className="w-5/6 m-auto">
          <p className="text-center text-sm xl:tracking-tighter text-neutral-500 pt-1.5">
            You are creating a coinbase third party app, click the link begin to
            begin the oauth process.
          </p>
        </div>

        <div className="flex flex-1 justify-center mt-2.5">
          <div className="w-11/12 bg-neutral-100 border border-gray-200 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4 sm:ps-8 sm:pe-8 sm:py-4">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Granted Actions
              </h5>
              <a
                href="#"
                className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                View all
              </a>
            </div>
            <div className="flow-root sm:p-4 shadow-inner">
              <ul
                role="list"
                className="h-20 p-1.5 overflow-clip divide-y divide-gray-200 bg-gray-50"
              >
                {Array.isArray(grantedActions) && grantedActions.length > 0 ? (
                  grantedActions.map((action) => (
                    <li key={action.id} className="py-3 sm:py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <img
                            className="w-8 h-8 rounded-full"
                            src="/docs/images/people/profile-picture-1.jpg"
                            alt="Neil image"
                          />
                        </div>
                        <div className="flex-1 min-w-0 ms-4">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {action.action_name}
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {action.description}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      no actions granted
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      There are no actions granted so far, new actions will
                      appear here.
                    </p>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-blue-500 w-72 lg:w-5/6 m-auto mt-2.5 p-2 hover:bg-blue-700 rounded-2xl  text-white text-center shadow-xl shadow-bg-blue-700">
          <button className="lg:text-sm text-lg font-bold">
            Proceed to Coinbase Oauth
          </button>
        </div>
        <div className="text-center m-auto mt-1.5 w-full">
          <button className="text-neutral-400 tracking-tighter font-bold lg:text-sm hover:text-gray-900">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default OuathLinkCard;
