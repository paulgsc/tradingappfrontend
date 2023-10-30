import SkeletonLoading from "../../../../components/loading/SkeletonLoading";
import Table from "../../../../components/tables/Table";

function RecentOrders({
  containerRef,
  lastRowRef,
  isLoading,
  orders,
  columns,
  token,
}) {
  const getClassName = (componentType) => {
    switch (componentType) {
      case "table":
        return "h-fit w-full max-w-full ";
      case "header-row":
        return "flex xl:flex-1 w-full bg-stone-100 shadow-inner rounded-t-sm ";
      case "header":
        return "flex flex-1 text-sm xl:text-base font-semibold p-2";
      case "tbody":
        return "h-fit w-full outline outline-gray-50";
      case "row":
        return "flex xl:flex-1 w-full  space-x-2 p-2 even:bg-stone-100 border-b border-neutral-300";
      case "cell":
        return "flex-1 flex items-center  h-8 text-sm xl:text-base font-normal hover:underline hover:text-emerald-500";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-1 justify-center w-full h-full max-w-full">
      <div className="w-full flex justify-center">
        {isLoading && token ? (
          <div className="w-4/5">
            <SkeletonLoading size={6} />
          </div>
        ) : (
          <div
            ref={containerRef}
            className="max-h-[546px] overflow-y-auto scroll-m-0 container mx-auto"
          >
            <div
              className={`${
                token && Array.isArray(orders) && orders.length > 0
                  ? "h-full min-h-screen"
                  : "h-fit"
              } w-full max-w-full`}
            >
              <Table
                history={orders}
                columnData={columns}
                getClassName={getClassName}
                showCheckboxColumn={false}
                tbodyId={"orders-table-container"}
              />
              {Array.isArray(orders) && orders.length > 0 && (
                <hr className="bg-red-600 w-full h-6" ref={lastRowRef} />
              )}
            </div>
            {!Array.isArray(orders) ||
              (orders.length <= 0 && (
                <div className="flex flex-col items-center justify-center border shadow-sm w-full h-32 xl:h-40 bg-gray-50">
                  <span className="text-sm xl:text-base leading-4 text-gray-600">
                    You have no orders
                  </span>
                  <span className="text-sm xl:text-base leading-4 text-gray-600">
                    Your recent orders will appear here.
                  </span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentOrders;
