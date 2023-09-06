import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { getModelRowRecord } from "../../hooks/reactQuery";

function ModelEditSidebar() {
  const { model } = useParams();
  const [queryParameters] = useSearchParams();
  const { userInfo: { token = null } = {} } = useSelector(
    (state) => state.userAuth
  );

  const { data: { sections = {} } = {} } = getModelRowRecord(
    token,
    model.toLowerCase(),
    {
      model_name: model,
      record_id: queryParameters.get("recordId"),
    }
  );
  return (
    <aside className="h-full fixed top-12 left-0 p-6 border-b border-gray-200 ">
      <ul className="flex flex-col flex-wrap w-full -mb-px text-sm font-medium text-center text-gray-500 ">
        {Object.keys(sections).map((key, i) => (
          <li key={i} className="mr-2 w-full">
            <a
              href={`#${model}_${sections?.overview?.title}`}
              className="inline-flex items-center justify-center w-full p-4 border-l-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 group active:text-blue-600"
            >
              <svg
                className="w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
              <span className="capitalize">{sections[key]?.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default ModelEditSidebar;
