import React, { useState } from "react";
import { onAuthStateChanged, RecaptchaVerifier } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { gmailLogin, login } from "../../contexts/redux/actions/userActions";

import { GoogleIcon } from "../../constants/svgs/Svg";
import { auth, handleSignInWithGoogle } from "../../../firebase";
import { useRecaptcha, verifyUserMFA } from "../../hooks/firebase-hooks";
import { CodeSignIn } from "../multifactorOauth/CodeSignIn";
import { notify, removeToast, showNotify } from "../../lib/utils";
import SkeletonLoading from "../loading/SkeletonLoading";
import { Toaster } from "react-hot-toast";
import ToastAlerts from "../ui/ToastAlerts";

const Login = () => {
  const recaptcha = useRecaptcha("sign-in");
  const [verificationId, setVerificationId] = useState();
  const [resolver, setResolver] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firebaseError, setFirebaseError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginAttemptCount, setLoginAttemptCount] = useState(0);

  const {
    userInfo: {
      token = "",
      is_admin = false,
      onboarding: { is_onboarding_completed = true } = {},
    } = {},
    error = null,
  } = useSelector((state) => state.userAuth);

  const redirect = location.search
    ? location.search.split("=")[1] === "/" && is_admin
      ? "/admin"
      : location.search.split("=")[1]
    : is_admin
    ? "/admin"
    : "/";

  async function handleMFA(response) {
    try {
      const recaptchaVerifier = new RecaptchaVerifier(
        "sign-in",
        {
          size: "invisible",
        },
        auth
      );

      if (recaptchaVerifier) {
        try {
          const data = await verifyUserMFA(response, recaptchaVerifier, 0);
          const { verificationId, resolver } = data;
          setVerificationId(verificationId);
          setResolver(resolver);
          recaptchaVerifier.clear();
        } catch (error) {
          throw error;
        }
      }
    } catch (error) {}
  }

  const handleGmail = async () => {
    const result = await handleSignInWithGoogle();
    setFirebaseError(result);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      const formData = {
        username: email,
        password: password,
      };
      dispatch(login(formData));
      setLoginAttemptCount(
        (prevLoginAttemptCount) => prevLoginAttemptCount + 1
      );
    }
  };

  useEffect(() => {
    if (token && is_onboarding_completed) {
      navigate(redirect);
    }
    if (token && is_admin && !is_onboarding_completed) {
      navigate(`/admin/setup/guide?redirect=${redirect}`);
    }
    if (token && !is_admin && !is_onboarding_completed) {
      navigate(`/setup/guide?redirect=${redirect}`);
    }
  }, [token, redirect, is_onboarding_completed]);

  useEffect(() => {
    if (error && loginAttemptCount) {
      showNotify(
        "error",
        "bg-gradient-to-r from-pink-100 to-red-500",
        <ToastAlerts.Success msg={error} removeToast={removeToast} />,
        "top-center"
      );
    }
  }, [error]);

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          dispatch(gmailLogin(user));
          setLoginAttemptCount(
            (prevLoginAttemptCount) => prevLoginAttemptCount + 1
          );
        }
        if (firebaseError) {
          if (firebaseError.code === "auth/web-storage-unsupported") {
            notify("Something went wrong!");
            return;
          }
          if (firebaseError.code === "auth/multi-factor-auth-required") {
            handleMFA(firebaseError);
            return;
          }
        }
      });

      return () => unsubscribe();
    } catch (error) {}
  }, [firebaseError]);

  if (resolver && verificationId) {
    return (
      <CodeSignIn
        verificationId={verificationId}
        resolver={resolver}
        redirect={redirect}
      />
    );
  }

  return (
    <>
      {loading ? (
        <div className="min-h-sceen flex items-center justify-center">
          <SkeletonLoading.Basic />
        </div>
      ) : (
        <div className="flex flex-col min-h-screen items-center justify-center">
          <div className="bg-white max-w-xl rounded-xl p-8">
            <hr className="mt-1" />
            <Login.Title />
            <div className="shadow-md rounded-md px-4">
              <Login.Oauth
                handleSignInWithGoogle={() => {
                  setFirebaseError(handleGmail);
                }}
              />
              <hr className="mt-4" />
              <Login.Input setEmail={setEmail} setPassword={setPassword} />
              <hr className="mt-8" />
              <Login.Submit handleLogin={handleLogin} />

              <Link to={`/register/?redirect=${redirect}`} className="">
                <p className="mt-2 h-8 text-xs xl:text-sm font-medium text-blue-800">
                  Don't have an account yet?
                </p>
              </Link>
            </div>
          </div>
          <div id="sign-in"></div>
          <Toaster />
        </div>
      )}
    </>
  );
};

Login.Title = () => (
  <h2 className="py-6 text-3xl font-bold text-center text-gray-800">
    Welcome back
  </h2>
);

Login.Oauth = ({ handleSignInWithGoogle }) => (
  <>
    <button
      onClick={handleSignInWithGoogle}
      className="rounded-md flex gap-x-4 mb-2 text-black h-11 w-full items-center justify-center px-6 border-indigo-200 border"
    >
      <span className="relative text-sm font-semibold">Sign in with</span>
      <GoogleIcon className="w-6 h-6" />
    </button>
    <div className="flex items-center w-full">
      <div className="flex-1 w-full h-0.5 bg-gray-300 mr-2"></div>
      <p className="text-sm xl:text-base text-gray-400 dark:text-gray-500">
        or
      </p>
      <div className="flex-1 w-full h-0.5 bg-gray-300 ml-2"></div>
    </div>
  </>
);

Login.Input = ({ setEmail, setPassword }) => (
  <div className="space-y-4">
    <div className="relative flex items-center">
      <div className="w-6 h-6 absolute left-4 inset-y-0 my-auto" />
      <input
        type="email"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        onInput={(e) => setEmail(e.target.value)}
        className="focus:outline-none
        block w-full rounded-md placeholder-gray-500
        bg-gray-100 pl-12 pr-4 h-12 text-gray-600 transition
        duration-300 invalid:ring-2 invalid:ring-red-400
        focus:ring-2 focus:ring-black"
        placeholder="Enter Email"
        required=""
      />
    </div>
    <hr className="mt-6" />
    <div className="space-y-4 my-6">
      <div className="relative flex items-center">
        <div className="w-6 h-6 absolute left-4 inset-y-0 my-auto" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          onChange={(e) => setPassword(e.target.value)}
          onInput={(e) => setPassword(e.target.value)}
          className="focus:outline-none block w-full rounded-md placeholder-gray-500 bg-gray-100 pl-12 pr-4 h-12 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-black"
          required={true}
        />
      </div>
    </div>
  </div>
);

Login.Submit = ({ handleLogin }) => (
  <div className="w-full">
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
