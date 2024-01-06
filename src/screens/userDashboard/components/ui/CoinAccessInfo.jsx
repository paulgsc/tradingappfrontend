function CoinAccessInfo() {
  return (
    <div>
      <section>
        <div>
          <h1>Third-Party App Permissons</h1>
          <h6>
            <span>
              This application has been given access to your account through
              Coinbase API
            </span>
            <span>
              This application has the permssions to perform the actions listed
              below
            </span>
          </h6>
        </div>
        <ul className="grid grid-cols-2">
          {Array.from({ length: 6 }, (_, i) => (
            <li key={i}>
              <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                <input
                  id="bordered-checkbox-1"
                  type="checkbox"
                  value=""
                  name="bordered-checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="bordered-checkbox-1"
                  className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Default radio
                </label>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h1>Provied Permissions</h1>
      </section>
      <section>
        <h1>Activity</h1>
        <h6>
          The following is a list of the most recent actions performed by the
          application on your account.
        </h6>
      </section>
    </div>
  );
}

export default CoinAccessInfo;
