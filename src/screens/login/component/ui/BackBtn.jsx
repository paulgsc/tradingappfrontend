import { useDispatch } from "react-redux";
import { broadcastLogout } from "../../../../contexts/redux/actions/userActions";
import { useLocation, useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

function BackBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [queryParameters] = useSearchParams();
  const handleBack = () => {
    dispatch(broadcastLogout());
    navigate(
      `${location.pathname}?redirect=${queryParameters.get("redirect")}`
    );
  };
  return (
    <div className="w-full">
      <button
        onClick={handleBack}
        className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm xl:text-base px-2 py-2 text-center"
      >
        Back
      </button>
    </div>
  );
}

export default BackBtn;
