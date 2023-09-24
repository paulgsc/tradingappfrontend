import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function Pagination({ data, next, previous }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const updateUrlParams = () => {
    setSearchParams((prevSearchParams) => ({
      ...prevSearchParams,
      page: currentPage + 1,
    }));
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="inline-flex -space-x-px text-sm transform">
        <li>
          <button
            disabled={!previous}
            onClick={() => {
              setCurrentPage((prevCurrentPage) =>
                prevCurrentPage > 1 ? prevCurrentPage - 1 : 1
              );
              updateUrlParams();
            }}
            className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:pointer-events-none disabled:bg-gray-100 disabled:opacity-60"
          >
            Previous
          </button>
        </li>
        <section className="inline-flex items-center max-w-[192px] overflow-hidden">
          {Array(5 + currentPage)
            .fill("")
            .map((_, i) => (
              <li
                key={i}
                style={{
                  transform: `translateX(${
                    -100 * Math.max(0, currentPage - 4)
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
                    updateUrlParams;
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
              setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
              updateUrlParams();
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
