import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PlaceHolder from "../loading/PlaceHolder";
import {
  gmailRegister,
  register,
} from "../../contexts/redux/actions/userActions";
import GoogleSignIn from "../ui/GoogleSignIn";

function Register() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { userInfo: { firebaseInfo = "", token = "" } = {} } = useSelector(
    (state) => state.userAuth
  );
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const handleGmail = (e) => {
    e.preventDefault();
    dispatch(gmailRegister());
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (email && password) {
      const formData = {
        username: email,
        password: password,
        email: email,
      };
      dispatch(register(formData));
    }
  };

  useEffect(() => {
    if (firebaseInfo) {
      const formData = {
        ...firebaseInfo,
        username: firebaseInfo.email,
        password: firebaseInfo.uid,
      };
      dispatch(register(formData));
    }
    if (token) {
      navigate(redirect);
    }
  }, [firebaseInfo, token, redirect]);

  return (
    <div className="">
      <div className=" flex-row-container align-items-container-center screen-container-1">
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
        <form classsName="flex-col-container">
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
                onClick={handleSignUp}
                className="tp-bm-mg-container-1"
              >
                Sign up
              </button>
              <div className="flx-end">
                <span className="ft-small txt-al-ct">
                  Have an account?
                  <Link
                    to={"/login"}
                    className="left-margin-container-1 blu-900"
                  >
                    sign in
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
