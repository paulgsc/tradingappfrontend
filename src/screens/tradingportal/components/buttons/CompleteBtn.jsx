import { useDispatch } from "react-redux";
import { resetTradingState } from "../../../../reducers/tradingReducers";

function CompleteBtn() {
  const dispatch = useDispatch();
  const handleGoBack = () => {
    dispatch(resetTradingState());
  };
  return (
    <button
      onClick={handleGoBack}
      className="flex flex-1 justify-center items-center shadow-inner rounded-md p-2 text-font-thin text-neutral-500 hover:ring-1 hover:ring-neutral-300 bg-gradient-to-tr from-lime-400 to-green-400 transition-all duration-300 ease-in-out hover:text-neutral-900 hover:font-semibold  scale-95 hover:scale-100 opacity-80 hover:opacity-100"
    >
      Go back
    </button>
  );
}

export default CompleteBtn;
