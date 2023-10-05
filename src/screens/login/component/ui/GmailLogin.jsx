import { GoogleIcon } from "../../../../constants/svgs/Svg";

function GmailLogin({ handleGmail }) {
  return (
    <div>
      <button
        onClick={handleGmail}
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
    </div>
  );
}

export default GmailLogin;
