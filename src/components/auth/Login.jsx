import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import GoogleSignIn from "../ui/GoogleSignIn";
import { login } from "../../contexts/redux/actions/userActions";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, toggleAlert] = useState(false);

  const { userInfo: { token = "" } = {}, error = null } = useSelector(
    (state) => state.userAuth
  );

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const handleGoBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      const formData = {
        username: email,
        password: password,
      };
      dispatch(login(formData));
    }
  };

  useEffect(() => {
    if (token) {
      navigate(redirect);
    }
  }, [token, redirect]);

  return (
    <div className="flex items-center justify-center h-screen">
      <Login.Nav handleGoBack={handleGoBack} />
      <div className="flex items-center justify-center h-full w-full ">
        <div className="grid grid-cols-9 w-full h-full items-stretch justify-center">
          <div className="invisible col-span-3 flex flex-col items-center justify-center ">
            +
          </div>
          <div className="col-span-3 flex flex-col items-center justify-center w-full bg-transparent ">
            <div className="flex flex-col items-center justify-center shadow-lg rounded-md lg:w-3/5 xl:w-[45%]">
              <div className="invisible grid grid-rows-1 items-center justify-center">
                Logo
              </div>
              <div className="flex w-4/5 xl:w-3/5">
                <Login.Oauth />
              </div>
              <div className="invisible grid grid-rows-1 items-center justify-center">
                +
              </div>
              <div className="flex w-4/5 xk:w-3/5">
                <Login.Input setEmail={setEmail} setPassword={setPassword} />
              </div>
              <div className="invisible grid grid-rows-1 h-6 xl:h-10 items-center justify-center">
                +
              </div>
              <div className="flex w-4/5 xk:w-3/5">
                <Login.Submit handleLogin={handleLogin} />
              </div>
              <div className="invisible grid h-4 items-center justify-center">
                +
              </div>
              <div className=" grid grid-rows-1 items-center justify-center">
                <Link to={`/register/?redirect=${redirect}`} className="">
                  <p className="text-xs xl:text-sm font-medium text-blue-800">
                    Don't have an account yet?
                  </p>
                </Link>
              </div>
              <div className="invisible grid grid-rows-1 items-center justify-center">
                +
              </div>
            </div>
          </div>

          <div className="invisible flex flex-col items-center justify-center">
            +
          </div>
        </div>
      </div>
    </div>
  );
};

Login.Nav = ({ handleGoBack }) => {
  return (
    <div>
      <nav className="fixed flex items-center justify-start top-0 w-full bg-transparent">
        <div className="flex items-center justify-center gap-16 p-6">
          <div className="flex items-center justify-center text-center border rounded-full h-full w-full px-[14px] py-[12px] xl:px-[14px] xl:py-[14px] border-gray-400 border-opacity-10 hover:bg-gray-100 hover:border-opacity-100">
            <Link to={"/"}>
              <HomeIcon
                sx={{
                  color: "white",
                  fill: "black",
                  width: {
                    xs: 12,
                    sm: 16,
                    md: 16,
                    lg: 20,
                  },
                  height: {
                    xs: 12,
                    sm: 16,
                    md: 16,
                    lg: 20,
                  },
                }}
              />
            </Link>
          </div>

          <button
            className="flex items-center justify-center text-center border rounded-full h-full w-full px-[8px] py-[12px] border-gray-400 border-opacity-10 hover:bg-gray-100 hover:border-opacity-100"
            onClick={handleGoBack}
          >
            <svg
              fill="inherit"
              className="h-4 w-6  "
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 330 330"
              xmlSpace="preserve"
            >
              <path
                id="XMLID_92_"
                d="M111.213,165.004L250.607,25.607c5.858-5.858,5.858-15.355,0-21.213c-5.858-5.858-15.355-5.858-21.213,0.001
	l-150,150.004C76.58,157.211,75,161.026,75,165.004c0,3.979,1.581,7.794,4.394,10.607l150,149.996
	C232.322,328.536,236.161,330,240,330s7.678-1.464,10.607-4.394c5.858-5.858,5.858-15.355,0-21.213L111.213,165.004z"
              />
            </svg>
          </button>
        </div>
      </nav>
    </div>
  );
};

Login.ContentGrid = () => (
  <div className="flex flex-col items-center justify-center h-full w-full flex-1 p-2 bg-gray-600">
    <div className="grid grid-cols-9 w-full h-full items-stretch justify-center">
      <div className="invisible col-span-3 flex flex-col items-center justify-center ">
        +
      </div>
      <div className="col-span-3 flex flex-col items-center justify-center bg-transparent">
        +
      </div>
      <div className="invisible flex flex-col items-center justify-center">
        +
      </div>
    </div>
  </div>
);

Login.Oauth = () => (
  <div className="flex flex-col w-full px-2">
    <div className="flex items-center justify-center w-full">
      <GoogleSignIn />
    </div>
    <div className="flex items-center w-full">
      <div className="flex-1 w-full h-0.5 bg-gray-400 mr-2"></div>
      <p className="text-sm xl:text-base text-gray-400 dark:text-gray-500">
        or
      </p>
      <div className="flex-1 w-full h-0.5 bg-gray-400 ml-2"></div>
    </div>
  </div>
);

Login.Input = ({ setEmail, setPassword }) => (
  <div className="flex flex-col gap-4 items-center justify-center w-full">
    <div className="flex flex-col items-end text-end w-full h-8">
      <input
        type="email"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        onInput={(e) => setEmail(e.target.value)}
        className=" items-end h-full bg-gray-50 border border-gray-300 text-gray-900 text-sm xl:text-base rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter Email"
        required=""
      />
    </div>
    <div className="flex flex-col items-end text-end w-full h-8">
      <input
        type="password"
        name="password"
        id="password"
        placeholder="••••••••"
        onChange={(e) => setPassword(e.target.value)}
        onInput={(e) => setPassword(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm xl:text-base rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full h-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required={true}
      />
    </div>
  </div>
);

Login.Submit = ({ handleLogin }) => (
  <div className=" w-full">
    <button
      type="button"
      onClick={handleLogin}
      className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm xl:text-base px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Sign in
    </button>
  </div>
);

export default Login;
