import { AlertTriangleSvg } from "../../../../constants/svgs/Svg";
import useScopesSelection from "../../hooks/useScopeSelection";

function AddScopeCard({ required_scopes = [], suggested_scopes = [] }) {
  const { handleToggleScope, isChecked } = useScopesSelection();
  return (
    <div>
      <div
        className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-amber-50 dark:bg-gray-800 dark:text-red-400"
        role="alert"
      >
        <AlertTriangleSvg
          className={"flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"}
        />
        <span className="sr-only">Danger</span>
        <div>
          <span className="font-medium">
            By default the minimum required permissions are selected:
          </span>
          <ul className="mt-1.5 list-disc list-inside text-xs 2xl:text-sm tracking-tighter 2xl:font-thin">
            <li>
              By selecting this action, you will be granting this application
              the permission listed below
            </li>
            <li>These permission are required and are already preselected</li>
            <li>
              In addition to the required permissions, you may authorize
              additional suggested scopes as well
            </li>
          </ul>
        </div>
      </div>
      <ul className=" w-screen max-w-2xl max-h-96 overflow-y-auto no-scrollbar">
        {required_scopes.map((scope) => (
          <li key={scope.id}>
            <div className="flex items-center ps-4 border-t border-l border-gray-200 rounded dark:border-gray-700">
              <input
                checked
                readOnly
                id="bordered-checkbox-2"
                type="checkbox"
                name="bordered-checkbox"
                className="w-4 h-4 text-blue-600 opacity-60 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="bordered-checkbox-2"
                className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {scope.description}
              </label>
            </div>
          </li>
        ))}
        <hr className="mb-2.5 mt-2.5 border-2 border-gray-300" />
        <li className="sticky top-0 z-50 my-2.5 ps-2.5 py-2.5 bg-stone-50 ">
          <h3 className="text-lg font-medium text-neutral-500 ">
            Suggested Optional permissions
          </h3>
        </li>
        {suggested_scopes.map((scope) => (
          <li key={scope.id}>
            <div className="flex items-center ps-4 border-t border-l border-gray-200 rounded dark:border-gray-700">
              <input
                checked={isChecked(scope.id)}
                onChange={() => handleToggleScope(scope.id)}
                id="bordered-checkbox-2"
                type="checkbox"
                value=""
                name="bordered-checkbox"
                className="w-4 h-4 text-blue-600 opacity-60 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="bordered-checkbox-2"
                className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {scope.description}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddScopeCard;
