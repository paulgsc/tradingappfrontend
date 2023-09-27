import { useSelector } from "react-redux";
import { getModelsList } from "../../hooks/reactQuery";
import ModelsCard from "./ModelsCard";
import { filter } from "lodash";
import { useState } from "react";

function Dashboard({ searchQuery }) {
  const { userInfo: { token } = {} } = useSelector((state) => state.userAuth);
  const [readWriteFilter, setReadWriteFilter] = useState(null)
  const { data = [], isLoading } = getModelsList(token);
  const filteredData = filter(data, (item) =>
   {
    if (readWriteFilter !== null) {
      return  item.name.toLowerCase().includes(searchQuery.toLowerCase()) && item.editable === readWriteFilter
    }
    return item.name.toLowerCase().includes(searchQuery.toLowerCase())
   }
  );
  return (
    <div className=" bg-gradient-to-br from-gray-900/60 via-white to-gray-900/40 min-h-screen flex items-start justify-center">
      <div className="bg-gray-800 flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10  sm:p-6 sm:m-12 sm:rounded-2xl">
        <div className="flex-1 px-2 sm:px-0">
          <div className="flex justify-between items-center">
            <h3 className="text-3xl font-extralight text-white/50">Models</h3>
            <ul className="text-white/50 capitalize text-xs flex items-center space-x-12 p-2">
              <li aria-selected={readWriteFilter===false} className="relative before:absolute before:-left-2 before:-translate-x-full before:w-4 before:h-4 before:bg-orange-800 content-none pointer-events-none before:pointer-events-auto before:cursor-pointer aria-selected:before:ring-2 aria-selected:before:ring-white before:scale-90 aria-selected:scale-100 transform transition-all duration-300 ease-in-out before:hover:opacity-80 hover:before:scale-105"
              onClick={() => setReadWriteFilter((prevReadWriteFilter) => prevReadWriteFilter === false ? null : false)}>read only</li>
              <li aria-selected={readWriteFilter} className="relative before:absolute before:-left-2 before:-translate-x-full before:w-4 before:h-4 before:bg-blue-800 content-none pointer-events-none before:pointer-events-auto before:cursor-pointer aria-selected:before:ring-2 aria-selected:before:ring-white before:scale-90 aria-selected:scale-100 transform transition-all duration-300 ease-in-out before:hover:opacity-80 hover:before:scale-105"
               onClick={() => setReadWriteFilter((prevReadWriteFilter) => prevReadWriteFilter  ? null : true)}>read / write</li>
            </ul>
          </div>
          <div className="mb-10 sm:mb-0 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-h-96 xl:max-h-[75vh] overflow-y-auto no-scrollbar">
            {!isLoading
              ? filteredData.map((item, i) => (
                  <ModelsCard key={i} model={item} />
                ))
              : Array(10)
                  .fill("")
                  .map((_, i) => (
                    <div
                      key={i}
                      className=" animate-pulse w-60 bg-gray-600 py-10 px-4 mx-6 flex flex-col items-center rounded-lg shadow-inner"
                    >
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-4"></div>
                      <div className="w-20 h-20 object-cover object-center rounded-full bg-gray-200" />
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-28 m-4"></div>
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-16 "></div>
                    </div>
                  ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
