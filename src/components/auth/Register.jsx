import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  gmailRegister,
  register,
} from "../../contexts/redux/actions/userActions";
import { auth, handleSignInWithGoogle } from "../../../firebase";
import { GoogleIcon } from "../../constants/svgs/Svg";
import { firebaseLogout, useCurrentUser } from "../../hooks/firebase-hooks";
import SkeletonLoading from "../loading/SkeletonLoading";
import { notify } from "../../lib/utils";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { Toaster } from "react-hot-toast";

function Register() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newUser = useCurrentUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firebaseError, setFirebaseError] = useState(null);

  const { userInfo: { loading, token = "" } = {} } = useSelector(
    (state) => state.userAuth
  );
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const handleGmail = async () => {
    const result = await handleSignInWithGoogle();
    setFirebaseError(result);
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
    if (token) {
      navigate(redirect);
    }
  }, [token, redirect]);

  useEffect(() => {
    if (newUser?.email) {
      dispatch(gmailRegister(newUser));
    }
  }, [newUser]);

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (firebaseError?.code) {
          notify("Something went wrong!");
        }
      });

      return () => unsubscribe();
    } catch (error) {}
  }, [firebaseError]);
  if (loading) {
    return (
      <div className="min-h-sceen flex items-center justify-center">
        <SkeletonLoading.Basic />
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="bg-white max-w-xl rounded-xl p-8">
        <hr className="mt-1" />
        <Register.Title />
        <div className="shadow-md rounded-md px-4">
          <Register.Oauth handleSignInWithGoogle={handleGmail} />
          <hr className="mt-4" />
          <Register.Input setEmail={setEmail} setPassword={setPassword} />
          <hr className="mt-8" />
          <Register.Submit handleSignUp={handleSignUp} />

          <Link to={`/login/?redirect=${redirect}`} className="">
            <p className="mt-2 h-8 text-xs xl:text-sm font-medium text-blue-800">
              Already have an account?
            </p>
          </Link>
        </div>
      </div>
      <div id="sign-up"></div>
      <Toaster />
    </div>
  );
}

Register.Title = () => (
  <h2 className="py-6 text-3xl font-bold text-center text-gray-800">
    Create Account
  </h2>
);

Register.Oauth = ({ handleSignInWithGoogle }) => (
  <>
    <button
      onClick={handleSignInWithGoogle}
      className="rounded-md flex gap-x-4 mb-2 text-black h-11 w-full items-center justify-center px-6 border-indigo-200 border"
    >
      <span className="relative text-sm font-semibold">Sign up with</span>
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

Register.Input = ({ setEmail, setPassword }) => (
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

Register.Submit = ({ handleSignUp }) => (
  <div className="w-full">
    <button
      type="button"
      onClick={handleSignUp}
      className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm xl:text-base px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Sign up
    </button>
  </div>
);

export default Register;
