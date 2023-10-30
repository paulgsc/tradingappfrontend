import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function Pagination({ data, next, previous, numPages = 6 }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const initialPage = isNaN(parseInt(searchParams.get("page")))
    ? 0
    : Math.min(numPages, Math.max(0, parseInt(searchParams.get("page")) - 1));
  const [currentPage, setCurrentPage] = useState(initialPage);
  const updateUrlParams = (page) => {
    const currentSearchParams = new URLSearchParams(searchParams);
    currentSearchParams.has("page")
      ? currentSearchParams.set("page", page)
      : currentSearchParams.append("page", page);
    navigate(`${location.pathname}?${currentSearchParams.toString()}`);
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="inline-flex -space-x-px text-sm transform">
        <li>
          <button
            disabled={!previous}
            onClick={() => {
              setCurrentPage((prevCurrentPage) =>
                Math.max(0, prevCurrentPage - 1)
              );
              const page = isNaN(parseInt(searchParams.get("page")))
                ? 1
                : parseInt(searchParams.get("page"));
              updateUrlParams(Math.max(1, page - 1));
            }}
            className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:pointer-events-none disabled:bg-gray-100 disabled:opacity-60"
          >
            Previous
          </button>
        </li>
        <section className="inline-flex items-center max-w-[192px] overflow-hidden">
          {Array(Math.min(numPages, numPages + currentPage))
            .fill("")
            .map((_, i) => (
              <li
                key={i}
                style={{
                  transform: `translateX(${
                    -100 * Math.max(0, currentPage - numPages)
                  }%)`,
                }}
              >
                <button
                  disabled={
                    !Array.isArray(data)
                      ? true
                      : i > currentPage && next === null
                      ? true
                      : false
                  }
                  onClick={() => {
                    setCurrentPage(i);
                    updateUrlParams(i + 1);
                  }}
                  className={`${
                    currentPage === i
                      ? "bg-blue-600/20 shadow-inner"
                      : "bg-white border-[#564d4f]"
                  } flex items-center justify-center px-3 h-8 w-8 leading-tight text-gray-500 border border-zinc-300 hover:bg-gray-100 hover:text-gray-700 disabled:pointer-events-none disabled:bg-gray-100 disabled:opacity-60`}
                >
                  {i + 1}
                </button>
              </li>
            ))}
        </section>

        <li>
          <button
            disabled={!next}
            onClick={() => {
              setCurrentPage((prevCurrentPage) =>
                Math.min(numPages, prevCurrentPage + 1)
              );
              const page = isNaN(parseInt(searchParams.get("page")))
                ? 1
                : parseInt(searchParams.get("page"));
              updateUrlParams(Math.min(numPages, page + 1));
            }}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:pointer-events-none disabled:bg-gray-100 disabled:opacity-60"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
