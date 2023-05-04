import React, { useEffect, useState } from "react";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  gmailLogin,
  login,
  logout,
} from "../../contexts/redux/actions/userActions";
import PlaceHolder from "../loading/PlaceHolder";
import GoogleSignIn from "../ui/GoogleSignIn";

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, toggleAlert] = useState(false);

  const { userInfo: { firebaseInfo = "", token = "" } = {}, error = null } =
    useSelector((state) => state.userAuth);

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
  }, [token, redirect, error]);

  return (
    <div className="">
      <div className=" flex-row-container align-items-container-center screen-container-1 ">
        <Link to={"/"}>
          <div className="flex-col-container left-margin-container-5 left-margin-container-5-ms">
            <PlaceHolder.Icon name="faHome" />
            <span className="label-zr-ms">Home Page</span>
          </div>
        </Link>
        <button onClick={handleGoBack} className="btn-container-zero">
          <div className="flex-col-container left-margin-container-5 ">
            <PlaceHolder.Icon name="chevronLeft" />
            <span>Go back</span>
          </div>
        </button>
      </div>
      <div className="login-pos round-corner-container-1 box-shadow-container-1 login-pos-ms">
        <form className="">
          {!alert ? (
            <div className="flex-col-container">
              <GoogleSignIn />

              <div className="line-eff-container txt-container-gr100">or</div>
              <div className="flex-col-container">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Email"
                  onChange={(e) => setEmail(e.target.value)}
                  onInput={(e) => setEmail(e.target.value)}
                  className="tp-bm-mg-container-1 ht-container-3 rd-crn-container-1 no-border-container bx-shd-container bg-inpt-container-bl100"
                ></input>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                  onInput={(e) => setPassword(e.target.value)}
                  className="tp-bm-mg-container-1 ht-container-3 rd-crn-container-1 no-border-container bx-shd-container bg-inpt-container-bl100"
                ></input>
                <button
                  type="button"
                  onClick={handleLogin}
                  className="tp-bm-mg-container-1"
                >
                  Sign in
                </button>
                <div className="flx-end">
                  <span className="ft-small txt-al-ct">
                    New to site?
                    <Link
                      to={"/register"}
                      className="left-margin-container-1 blu-900"
                    >
                      sign up
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="">
              <div className="alert">
                <span className="circ-1px rt-mg-hlf">i</span>
                <p className="font-9">User not found in system!</p>
              </div>
              <p className="prompt">Trying to create an account?</p>
              <button className="btn-prompt">Yes</button>
              <button className="btn-prompt">Maybe later</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
