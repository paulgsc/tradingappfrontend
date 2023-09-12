import { useSearchParams } from "react-router-dom";

function Test() {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleViewPdf = () => {
    setSearchParams((prevSearchParams) => ({
      ...prevSearchParams,
      viewPdf: "test.pdf",
    }));
  };
  return (
    <div className="min-h-screen flex flex-1 items-center justify-center">
      {searchParams.get("viewPdf") && (
        <iframe
          src={somePdf}
          className="fixed inset-0 min-h-screen min-w-full"
        />
      )}
      <button onClick={handleViewPdf} className="p-2 bg-stone-100 rounded-md">
        view pdf
      </button>
    </div>
  );
}

export default Test;
