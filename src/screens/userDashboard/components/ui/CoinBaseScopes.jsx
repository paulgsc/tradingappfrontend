import useTabNavigation from "../../../../hooks/useTabNavigation";
import ItemSelector from "./ItemSelector";
import ScopesAccordian from "./ScopesAccordian";

function CoinBaseScopes({ data = [] }) {
  const { handleTabClick, selectedTab } = useTabNavigation("action");
  const selectedAction = data?.find(
    (item) => item.id === parseInt(selectedTab)
  );
  return (
    <div className=" max-md:hidden relative w-full overflow-auto  shadow-inner border rounded-t-[2rem]">
      <div className="ps-6 py-6 border-b">
        <h1 className="font-bold text-xl 2xl:text-2xl tracking-wide capitalize my-0.5">
          Permission Scopes
        </h1>
      </div>
      <div className="flex">
        <aside className=" mx-auto py-2.5 bg-gray-50">
          <ItemSelector allItems={data} handleTabClick={handleTabClick} />
        </aside>
        <div className="w-full ps-6">
          <div className="mx-auto pt-2.5">
            <h3 className="text-lg tracking-wide font-semibold">
              {selectedAction?.action_name}
            </h3>
            <h6 className="text-sm font-thin">
              Select below to grant this action
            </h6>
          </div>
          <ScopesAccordian
            required_scopes={selectedAction?.required_scopes}
            suggested_scopes={selectedAction?.suggested_scopes}
          />
        </div>
      </div>
    </div>
  );
}

export default CoinBaseScopes;
