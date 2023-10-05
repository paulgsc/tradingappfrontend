import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  setLoginRoute,
} from "../../../../contexts/redux/actions/userActions";
import { useSearchParams } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(null);
  const [urlParams] = useSearchParams();
  const redirect = location.search
    ? location.search.split("redirect=")[1]
    : "/";

  const dispatch = useDispatch();
  const { password_required, userInfo: { gmailInfo } = {} } = useSelector(
    (state) => state.userAuth
  );

  const handleLogin = async (e) => {
    e.preventDefault();

    if (typeof password_required === "boolean" && !password_required) {
      const formData = {
        username: email,
        email: email,
        redirect: redirect,
      };
      // Dispatch login action
      dispatch(login(formData));
      return;
    }

    if (
      typeof password_required === "boolean" &&
      password_required &&
      typeof password === "string"
    ) {
      const formData = {
        username: urlParams.get("idToken") ? gmailInfo?.email : email,
        email: urlParams.get("idToken") ? gmailInfo?.email : email,
        password: password,
        redirect: redirect,
      };
      // Dispatch login action

      dispatch(login(formData));
    }
  };

  useEffect(() => {
    const emailToCheck = email ? email : gmailInfo?.email;
    if (emailToCheck) dispatch(setLoginRoute(emailToCheck));
  }, [dispatch, email, gmailInfo]);

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-4">
        <div className="relative flex items-center">
          <div className="w-6 h-6 absolute left-4 inset-y-0 my-auto " />
          {!password_required && (
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              onInput={(e) => setEmail(e.target.value)}
              className={`${
                password_required
                  ? "-translate-x-full opacity-0 pointer-events-none z-0"
                  : ""
              } transform transition-all duration-300 ease-in-out focus:outline-none
        peer block w-full rounded-md placeholder-gray-500
        bg-gray-100 pl-12 pr-4 h-12 text-gray-600 invalid:ring-2 invalid:ring-red-400
        focus:ring-2 focus:ring-black`}
              placeholder="Enter Email"
              required=""
            />
          )}
          {password_required && (
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              onInput={(e) => setPassword(e.target.value)}
              className={`${
                !password_required
                  ? "translate-x-full opacity-0 pointer-events-none z-0"
                  : ""
              } transform transition-all duration-300 ease-in-out focus:outline-none
        peer block w-full rounded-md placeholder-gray-500
        bg-gray-100 pl-12 pr-4 h-12 text-gray-600 invalid:ring-2 invalid:ring-red-400
        focus:ring-2 focus:ring-black`}
              placeholder="Enter Password"
              required=""
            />
          )}
        </div>
        <hr className="mt-6" />
      </div>
      <div className="w-full">
        <button
          type="submit"
          className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm xl:text-base px-2 py-2 text-center"
        >
          Next
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
