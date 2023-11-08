import Input from "../firebase/multifactorOauth/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  broadcastLogout,
  verifyLoginEmail,
} from "../../../../../contexts/redux/actions/userActions";
import { useLocation } from "react-router-dom";
import WiggleLoader from "../../../../../components/loading/WiggleLoader";

function EmailOTP() {
  const dispatch = useDispatch();
  const location = useLocation();
  const redirect = location.search
    ? location.search.split("redirect=")[1]
    : "/";
  const { loading, userInfo: { email = "" } = {} } = useSelector(
    (state) => state.userAuth
  );
  let code = new Array(6).fill("");

  function handleClick() {
    const finalCode = code.reduce((previousValue, currentValue) => {
      return previousValue.concat(currentValue);
    });

    const isValid = /^\d{6}$/.test(finalCode);

    const handleOtp = (otp) => async (dispatch) => {
      await dispatch(verifyLoginEmail(otp, location.pathname));
    };
    isValid && dispatch(handleOtp(finalCode));
  }

  if (loading) {
    return <WiggleLoader />;
  }

  return (
    <div className="bg-white flex flex-col p-5 md:p-6  border-2 border-palladium rounded-xl w-full sm:max-w-[440px]">
      <div className="flex justify-between">
        <div>
          <h1 className="font-medium text-[22px] leading-[130%] md:mr-8">
            Enter OTP to complete sign in.
          </h1>
          <p className="text-slate-500 mt-2 text-base">
            An email containing the OTP code for verification has been sent to{" "}
            <strong>{email}</strong>
          </p>
        </div>
      </div>
      <div className="flex gap-x-4 mt-6 md:mt-8 pb-4">
        {code.map((value, index) => {
          return (
            <Input
              key={index}
              index={index}
              getValue={(value, index) => {
                code[index] = value;
              }}
            />
          );
        })}
      </div>
      <div className="flex mt-4 gap-x-4">
        <button
          onClick={() => {
            dispatch(broadcastLogout());
            window.location.href = "/login";
          }}
          className="rounded-xl flex gap-x-4 mb-8 text-black h-11 w-1/2 items-center justify-center px-6 border border-gray-500"
        >
          Cancel
        </button>
        <button
          onClick={handleClick}
          className="bg-black rounded-xl flex h-11 w-1/2 items-center justify-center px-6"
        >
          <span className="text-base font-light text-white">Submit</span>
        </button>
      </div>
    </div>
  );
}

export default EmailOTP;
