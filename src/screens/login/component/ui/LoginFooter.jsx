import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { broadcastLogout } from "../../../../contexts/redux/actions/userActions";

function LoginFooter() {
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const dispatch = useDispatch();
  const { login_route: { password_required } = {} } = useSelector(
    (state) => state.userAuth
  );

  if (password_required) {
    return (
      <div className="flex flex-1 justify-between">
        <p className="flex flex-1 justify-between p-2 h-8 w-full text-xs xl:text-sm font-medium text-blue-800">
          <span> Having issues?</span>
          <button
            onClick={() => {
              dispatch(broadcastLogout());
            }}
            className=""
          >
            <strong className="text-end mr-4">Go Back</strong>{" "}
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 justify-between">
      <p className="flex flex-1 justify-between p-2 h-8 w-full text-xs xl:text-sm font-medium text-blue-800">
        <span> Don&apos;t have an account?</span>
        <Link to={`/register/?redirect=${redirect}`} className="">
          <strong className="text-end mr-4">Sign up</strong>{" "}
        </Link>
      </p>
    </div>
  );
}

export default LoginFooter;
