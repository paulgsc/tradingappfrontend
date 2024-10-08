import { useSearchParams } from "react-router-dom";
import LoadingBtn from "../../../../components/ui/LoadingBtn";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicPDFs } from "../../../../contexts/redux/actions/fetchDataActions";

function PDFViewer({ pdfName }) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { pdfUrl, loading } = useSelector((state) => state.userActions);

  const handleFetchPDF = () => {
    dispatch(fetchPublicPDFs(pdfName, setSearchParams));
  };

  if (loading) {
    <LoadingBtn />;
  }

  if (pdfUrl && searchParams.get("viewPdf") === pdfName) {
    return (
      <iframe
        src={pdfUrl}
        className="z-50 fixed inset-0 min-h-screen min-w-full p-0 m-0"
        style={{
          margin: "0", // Remove margin
          padding: "0", // Remove padding
        }}
      />
    );
  }

  return (
    <button
      onClick={handleFetchPDF}
      className="inline-flex items-center space-x-1 hover:bg-indigo-50"
    >
      <svg
        className="w-6 h-6 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 16 20"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 18a.969.969 0 0 0 .933 1h12.134A.97.97 0 0 0 15 18M1 7V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2v5M6 1v4a1 1 0 0 1-1 1H1m0 9v-5h1.5a1.5 1.5 0 1 1 0 3H1m12 2v-5h2m-2 3h2m-8-3v5h1.375A1.626 1.626 0 0 0 10 13.375v-1.75A1.626 1.626 0 0 0 8.375 10H7Z"
        />
      </svg>
      <i className="fas fa-external-link-alt fa-sm text-blue-400"></i>
    </button>
  );
}

export default PDFViewer;
