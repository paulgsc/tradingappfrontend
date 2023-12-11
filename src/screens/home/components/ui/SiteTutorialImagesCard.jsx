import useTimeout from "../../../../hooks/useTimeout";
import "../../../../test.css";
import ImageCycle from "./ImageCycle";
function SiteTutorialImagesCard({ openIndex, currentImageIndex }) {
  const isVisible = useTimeout(openIndex, 2000);
  return (
    <div className="relative w-11/12 md:w-5/12 2xl:w-full 2xl:max-w-screen-md border border-slate-300 shadow-inner rounded-lg">
      <div className="relative w-full h-full max-md:h-72 overflow-hidden rounded-lg">
        {isVisible && (
          <>
            <svg
              className="absolute inset-0 w-full h-full z-10 text-zinc-200"
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
              aria-expanded={isVisible}
            >
              <defs>
                <radialGradient
                  id="shiny"
                  cx="50%"
                  cy="50%"
                  r="85%"
                  fx="50%"
                  fy="50%"
                >
                  <stop offset="0" stopColor="transparent">
                    <animate
                      attributeName="offset"
                      values="0;0.95"
                      dur="2.2s"
                      repeatCount="indefinite"
                    />
                  </stop>
                  <stop offset="0.1" stopColor="transparent">
                    <animate
                      attributeName="offset"
                      values="0;1"
                      dur="2.2s"
                      repeatCount="indefinite"
                    />
                  </stop>
                  <stop offset="0.1" stopColor="currentColor">
                    <animate
                      attributeName="offset"
                      values="0.05;1"
                      dur="2.2s"
                      repeatCount="indefinite"
                    />
                  </stop>
                </radialGradient>
              </defs>
              <rect
                width="50%"
                height="50%"
                stroke="url(#shiny)"
                fill="url(#shiny)"
              />
              <rect
                width="50%"
                height="50%"
                x="50%"
                stroke="url(#shiny)"
                fill="url(#shiny)"
              />
              <rect
                width="50%"
                height="50%"
                y="50%"
                stroke="url(#shiny)"
                fill="url(#shiny)"
              />
              <rect
                width="50%"
                height="50%"
                y="50%"
                x="50%"
                stroke="url(#shiny)"
                fill="url(#shiny)"
              />
            </svg>
            {Math.random() < openIndex / 3 && (
              <>
                <svg
                  className=" absolute left-1/2 bottom-1/2 z-20"
                  viewBox="0 0 100 10"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g className="sparkles">
                    <path d="M2.5740361 5.33344622s1.1875777-6.20179466 2.24320232 0c0 0 5.9378885 1.05562462 0 2.11124925 0 0-1.05562463 6.33374774-2.24320233 0-3.5627331-.6597654-3.29882695-1.31953078 0-2.11124925z" />
                  </g>
                </svg>
                <svg
                  className=" absolute left-20 bottom-1/4 z-20"
                  viewBox="0 0 100 10"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g className="sparkles">
                    <path
                      transform="translate(90, 5)"
                      d="M2.5740361 5.33344622s1.1875777-6.20179466 2.24320232 0c0 0 5.9378885 1.05562462 0 2.11124925 0 0-1.05562463 6.33374774-2.24320233 0-3.5627331-.6597654-3.29882695-1.31953078 0-2.11124925z"
                    />
                  </g>
                </svg>
                <svg
                  className=" absolute left-2/3 top-12 z-20"
                  viewBox="0 0 100 10"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g className="sparkles">
                    <path
                      transform="translate(90, 5)"
                      d="M2.5740361 5.33344622s1.1875777-6.20179466 2.24320232 0c0 0 5.9378885 1.05562462 0 2.11124925 0 0-1.05562463 6.33374774-2.24320233 0-3.5627331-.6597654-3.29882695-1.31953078 0-2.11124925z"
                    />
                  </g>
                </svg>
              </>
            )}
          </>
        )}

        <ImageCycle
          openIndex={openIndex}
          currentImageIndex={currentImageIndex}
        />
      </div>
    </div>
  );
}

export default SiteTutorialImagesCard;
