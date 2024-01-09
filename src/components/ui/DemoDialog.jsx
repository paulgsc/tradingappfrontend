import { useEffect } from "react";
import { CloseSvg } from "../../constants/svgs/Svg";

// Usage
function DemoDialog({
  step,
  maxStep,
  handleBack,
  handleContinue,
  disableContinue = false,
  handleClose = () => {},
  children,
}) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.keyCode === 27) {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [handleClose]);

  return (
    <div className="fixed bg-none backdrop-blur-sm backdrop-brightness-90 z-[1000] flex flex-1 min-h-screen w-full items-center justify-center">
      <button
        onClick={handleClose}
        title="finish setup later"
        className="bg-gray-400/80 fixed top-8 right-12 z-50 rounded-sm scale-90 hover:scale-100 transition-all duration-200 ease-in-out hover:rounded-md hover:bg-white"
      >
        <CloseSvg />
      </button>
      <div className="mx-auto w-fit max-w-4xl h-fit max-h-[80vh] rounded-lg bg-white shadow-xl overflow-y-auto ">
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
              disabled={disableContinue}
              onClick={() => {
                handleContinue(maxStep);
              }}
              className={`${
                step === maxStep ? "pointer-events-none opacity-20" : ""
              } bg duration-350 flex items-center justify-center rounded-full bg-blue-500 py-1.5 px-3.5 font-medium tracking-tight text-white transition-all hover:bg-blue-600 active:bg-blue-700 disabled:bg-blue-200/60 disabled:scale-90 disabled:pointer-events-none transform duration-200 ease-in-out`}
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
