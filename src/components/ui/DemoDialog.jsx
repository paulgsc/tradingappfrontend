import { useEffect } from "react";
import { CloseSvg } from "../../constants/svgs/Svg";
import { useLocation } from "react-router";

// Usage
function DemoDialog({ step, maxStep, handleBack, handleContinue, children }) {
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const handleClose = () => {
    window.location.href = redirect;
  };
  const handleEsc = (e) => {
    if (e.keyCode === 27) {
      handleClose();
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div className="relative flex min-h-full flex-1 flex-col items-center justify-center bg-gray-900/90 p-4 backdrop-blur-xl sm:aspect-[4/3] md:aspect-[2/1]">
      <button
        onClick={handleClose}
        title="finish setup later"
        className="bg-gray-400/80 absolute right-8 top-4 z-50 rounded-sm scale-90 hover:scale-100 transition-all duration-200 ease-in-out hover:rounded-md hover:bg-white"
      >
        <CloseSvg />
      </button>
      <div className="mx-auto w-full max-w-xl rounded-lg bg-white shadow-xl">
        {children}

        <div className="px-8 pb-8">
          <div className="mt-10 flex justify-between">
            <button
              onClick={handleBack}
              className={`${
                step === 1 ? "pointer-events-none opacity-50" : ""
              } duration-350 rounded px-2 py-1 text-neutral-400 transition hover:text-neutral-700`}
            >
              Back
            </button>
            <button
              onClick={() => {
                handleContinue(maxStep);
              }}
              className={`${
                step === maxStep ? "pointer-events-none opacity-20" : ""
              } bg duration-350 flex items-center justify-center rounded-full bg-blue-500 py-1.5 px-3.5 font-medium tracking-tight text-white transition hover:bg-blue-600 active:bg-blue-700`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemoDialog;
