import React from "react";
import WiggleLoader from "../../../components/loading/WiggleLoader";
import SignUpTitle from "../component/ui/SignUpTitle";
import FirebaseSignUp from "../component/clients/firebase/FirebaseSignUp";
import SignUpFooter from "../component/ui/SignUpFooter";
import SignUpForm from "../component/ui/SignUpForm";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import SignUpError from "../component/alerts/SignUpError";

function SignUpFormLayout() {
  const { loading = false, userInfo: { token = null } = {} } = useSelector(
    (state) => state.userAuth
  );
  if (loading && !token) {
    return (
      <div className="fixed inset-0 min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-200 via-stone-100 to-stone-300">
        <WiggleLoader />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-200 via-stone-100 to-stone-300">
      <div className="bg-white mx-auto rounded-xl p-8 ">
        <hr className="mt-1" />
        <SignUpTitle />
        <div className="px-4">
          <FirebaseSignUp />
          <hr className="mt-4" />
          <SignUpForm />
          <hr className="mt-4" />
          <SignUpFooter />
        </div>
      </div>
      <div id="sign-up"></div>
      <SignUpError />
      <Toaster />
    </div>
  );
}

export default SignUpFormLayout;
