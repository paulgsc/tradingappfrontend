import React from "react";
import { Link, useLocation } from "react-router-dom";

function LoginFooter() {
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  return (
    <div className="flex flex-1 justify-between">
      <p className="flex flex-1 justify-between p-2 h-8 w-full text-xs xl:text-sm font-medium text-blue-800">
        <span> Don't have an account?</span>
        <Link to={`/register/?redirect=${redirect}`} className="">
          <strong className="text-end mr-4">Sign up</strong>{" "}
        </Link>
      </p>
    </div>
  );
}

export default LoginFooter;
