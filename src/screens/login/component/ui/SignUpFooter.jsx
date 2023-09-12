import { useLocation } from "react-router";
import { Link } from "react-router-dom";

function SignUpFooter() {
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  return (
    <div className="flex flex-1 justify-between">
      <p className="flex flex-1 justify-between p-2 h-8 w-full text-xs xl:text-sm font-medium text-blue-800">
        <span> Have an account?</span>
        <Link to={`/login/?redirect=${redirect}`} className="">
          <strong className="text-end mr-4">Sign in</strong>{" "}
        </Link>
      </p>
    </div>
  );
}

export default SignUpFooter;
