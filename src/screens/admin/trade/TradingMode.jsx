import ToggleButton from "../../../components/ui/ToggleButton";
import { AngleDownSVG } from "../../../constants/svgs/Svg";
import { useLocation, useNavigate } from "react-router";
import Alert from "../../../components/alerts/Alert";
import { useDispatch, useSelector } from "react-redux";
import { setActiveProperty } from "../../../contexts/redux/actions/adminActions";
import { useQueryClient } from "@tanstack/react-query";

function TradingMode() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const redirect = location.pathname;
  const { property_address = "" } = queryClient.getQueryData([
    "active-property",
  ]);

  const { tradingActions: { propertyId } = {} } = useSelector(
    (state) => state.adminActions
  );

  const handleSave = () => {
    dispatch(setActiveProperty());
  };

  return (
    <div className="space-y-6">
      <div
        tabIndex={-1}
        className="relative group peer flex items-center text-center shadow-sm bg-stone-100 w-full h-16 px-6 gap-2 cursor-pointer focus:ring-2 focus:ring-gray-900 focus:rounded-t-md"
      >
        <AngleDownSVG
          className={
            "text-sm w-3 h-3 xl:w-4 xl:h-4 group-focus-within:-rotate-90 transition-transform duration-300 ease-in-out"
          }
        />
        <h3 className="text-base xl:text-xl font-bold">
          Set Property Listing mode
        </h3>
      </div>
      <div className="flex flex-1 items-center justify-evenly mx-auto my-auto px-2 py-6 peer-focus-within:hidden transition-transform duration-150 ease-in-out">
        <div className="flex w-10/12 justify-between gap-2 text-sm lg:text-base font-normal text-neutral-600">
          <span>Allow trading multiple properties</span>
          <ToggleButton />
        </div>
      </div>
      <div
        tabIndex={-1}
        className="group flex items-center text-center shadow-sm bg-stone-100 w-full h-16 px-6 gap-2 cursor-pointer focus:ring-2 focus:ring-gray-900 focus:rounded-t-md"
      >
        <AngleDownSVG
          className={
            "text-sm w-3 h-3 xl:w-4 xl:h-4 group-focus-within:-rotate-90 transition-transform duration-300 ease-in-out"
          }
        />
        <h3 className="text-base xl:text-xl font-bold">Set Active Property</h3>
      </div>
      <div className="transition-transform duration-200 ease-in-out flex flex-col flex-1 items-center justify-evenly mx-auto my-auto px-2 py-6 space-y-6">
        <div
          className={`${
            propertyId
              ? "block scale-90"
              : "hidden scale-75 pointer-events-none"
          } w-full transition-all duration-300 ease-in-out`}
        >
          <Alert
            getClassName={alertClassNames}
            title={"Update alert!"}
            alertMsg={alertMsg}
            proceedMsg={"Save changes"}
            clcMsg={"Cancel changes"}
            handleProceed={handleSave}
          />
        </div>
        <div className="flex w-10/12 justify-between gap-2 text-sm lg:text-base font-normal text-neutral-600">
          <span>Active property listing</span>
          <input
            type="text"
            disabled
            placeholder="No active property set"
            value={property_address}
            className="bg-green-50 placeholder-shown:bg-neutral-100 shadow-inner rounded-md h-8 w-72 px-2 focus:outline-none ring-2 ring-gray-50 font-bold capitalize placeholder:font-thin"
          />
        </div>
      </div>
      <div
        tabIndex={-1}
        className="relative group peer flex items-center justify-center text-center shadow-sm bg-stone-100 w-full h-16 px-6 gap-2 cursor-pointer focus:ring-2 focus:ring-gray-900 focus:rounded-t-md"
      >
        <div className="w-5/12 relative">
          <button
            onClick={() => {
              navigate(`/admin/listings?redirect=${redirect}`);
            }}
            className="w-full p-2 border border-neutral-200 rounded-xl scale-95 bg-gradient-to-tr from-pink-100 to-gray-400 hover:scale-100 hover:ring-2 hover:ring-red-600 transition-all duration-200 ease-in-out font-thin hover:font-semibold"
          >
            Edit Active Property
          </button>
          <i className=" z-50 absolute left-3/4 top-1/2 fas fa-external-link-alt fa-sm text-white font-extrabold"></i>
        </div>
      </div>
    </div>
  );
}

const alertClassNames = (name) => {
  switch (name) {
    case "main-container":
      return " text-blue-800 border border-blue-300 bg-blue-50";
    default:
      return "";
  }
};

const alertMsg = "You are updating the default active property. This means ...";

export default TradingMode;
