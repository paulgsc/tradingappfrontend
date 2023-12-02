import LoginTitle from "../component/ui/LoginTitle";
import LoginForm from "../component/ui/LoginForm";
import LoginFooter from "../component/ui/LoginFooter";
import { Toaster } from "react-hot-toast";
import FirebaseLogin from "../component/clients/firebase/FirebaseLogin";
import LoginError from "../component/alerts/LoginError";
import WiggleLoader from "../../../components/loading/WiggleLoader";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import BackBtn from "../component/ui/BackBtn";

function LoginFormLayout() {
  const [queryParameters] = useSearchParams();
  const {
    loading = false,
    login_route: { password_required } = {},
    userInfo: { token = null } = {},
  } = useSelector((state) => state.userAuth);

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
        <LoginTitle />
        {queryParameters.get("vfPath") && !password_required ? (
          <div className="px-4">
            <FirebaseLogin />
            <hr className="mt-4" />
            <BackBtn />
          </div>
        ) : (
          <div className="px-4">
            {!password_required && <FirebaseLogin />}
            <hr className="mt-4" />
            <LoginForm />
            <hr className="mt-4" />
            <LoginFooter />
          </div>
        )}
      </div>
      <div id="sign-in"></div>
      <LoginError />
      <Toaster />
    </div>
  );
}

export default LoginFormLayout;
