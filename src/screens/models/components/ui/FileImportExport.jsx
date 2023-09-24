import { Link, useParams } from "react-router-dom";

function FileImportExport() {
  const { model } = useParams();

  return (
    <Link
      to={
        model.toLowerCase().includes("propertyimage")
          ? `/models/${model}/images/uploads`
          : `/models/${model}/uploads`
      }
      className=" inline-flex items-center justify-center space-x-2 bg-blue-600  text-white rounded-lg p-2"
    >
      <span>import</span>
      <svg
        className="w-4 h-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 18 20"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 8V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 7.828 1h8.239A.969.969 0 0 1 17 2v16a.969.969 0 0 1-.933 1H3.933A.97.97 0 0 1 3 18v-2M8 1v4a1 1 0 0 1-1 1H3m-2 6h10M9.061 9.232 11.828 12l-2.767 2.768"
        />
      </svg>
    </Link>
  );
}

export default FileImportExport;
