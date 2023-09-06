import React from "react";

function Testimonials() {
  return (
    <section className="">
      <div className="mx-auto max-w-[1340px] px-4 py-16 sm:px-6 sm:py-24 lg:me-0 lg:pe-0 lg:ps-8">
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-3 lg:items-center lg:gap-x-16">
          <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Pellentesque vel metus....
              <br className="hidden sm:block lg:hidden" />
              Pellentesque vel leo malesuada
            </h2>

            <p className="mt-4 text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas
              veritatis illo placeat harum porro optio fugit a culpa sunt id!
            </p>

            <div className="hidden lg:mt-8 lg:flex lg:gap-4">
              <button className="prev-button rounded-full border border-teal-600 p-3 text-teal-600 hover:bg-teal-600 hover:text-white">
                <span className="sr-only">Previous Slide</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-5 w-5 rtl:rotate-180"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>

              <button className="next-button rounded-full border border-teal-600 p-3 text-teal-600 hover:bg-teal-600 hover:text-white">
                <span className="sr-only">Next Slide</span>
                <svg
                  className="h-5 w-5 rtl:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke-width="2"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="">
            <div className="swiper-container !overflow-hidden">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <blockquote className="flex h-full flex-col justify-between bg-white p-6 space-y-4">
                    <div>
                      <div className="flex gap-0.5 text-green-500">
                        {Array(5)
                          .fill("")
                          .map((_, i) => (
                            <React.Fragment key={i}>
                              <svg
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </React.Fragment>
                          ))}
                      </div>

                      <div className="mt-4">
                        <p className="text-2xl font-bold text-lime-600 sm:text-3xl">
                          Lorem ipsum...
                        </p>

                        <p className="mt-4 leading-relaxed text-gray-500 break-words h-40 xl:h-56 overflow-clip">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Sed hendrerit volutpat nulla, quis tristique
                          arcu euismod nec. Sed nec leo purus. Quisque lacinia
                          sit amet mi eu iaculis. Vivamus sit amet fermentum
                          quam. Curabitur dignissim arcu ut orci tristique
                          hendrerit. In varius vestibulum libero, at venenatis
                          tortor suscipit ut. Ut nec augue ac eros tincidunt
                          facilisis. Fusce a sapien ac mi consectetur
                          vestibulum. Sed feugiat arcu eu metus condimentum, vel
                          dignissim tellus interdum. Integer dignissim semper
                          velit, ac bibendum libero convallis a. Aliquam
                          vestibulum bibendum nisi, vel efficitur libero
                          consectetur at. Proin dapibus, mi at dapibus sagittis,
                          metus neque blandit quam, ut condimentum justo neque
                          vel lectus. Vivamus semper tellus ac elit sodales, a
                          bibendum libero congue. Proin id sapien purus. Nam sit
                          amet malesuada dolor. Curabitur et urna fermentum,
                          hendrerit purus at, tempus est. Sed laoreet sapien vel
                          bibendum scelerisque. Fusce quis dapibus justo. Sed
                          eleifend velit sed lacus lacinia viverra. Ut efficitur
                          gravida neque a mattis. In fermentum libero quis urna
                          varius, ut ultricies elit suscipit. Nunc nec bibendum
                          orci. Nulla facilisi. Nam sed turpis vel sapien
                          faucibus hendrerit. Sed sit amet nunc eu orci iaculis
                          convallis in quis augue. Curabitur aliquam eleifend
                          nisl at scelerisque. Maecenas ut lectus nec elit
                          consequat cursus. Nullam venenatis justo id nulla
                          hendrerit iaculis. Vivamus ac est vel arcu congue
                          facilisis. Vestibulum interdum nunc et ipsum iaculis,
                          nec bibendum dolor efficitur. Nulla facilisi.
                          Pellentesque ac dapibus nunc. Donec id ex ac sapien
                          faucibus dignissim in id justo. Sed eu erat et elit
                          feugiat pharetra vel ac lorem. Pellentesque habitant
                          morbi tristique senectus et netus et malesuada fames
                          ac turpis egestas. Nullam in mi leo. Etiam ac felis eu
                          nulla congue hendrerit ac vel erat. Pellentesque vel
                          leo malesuada, facilisis felis nec, lacinia metus.
                          Fusce a libero sed odio tempus rhoncus. Quisque
                          ultricies finibus dui, nec suscipit ligula iaculis
                          vel. Aliquam id urna euismod, hendrerit elit a,
                          sollicitudin risus. Nunc at libero eu urna tincidunt
                          tincidunt id at ex. Curabitur euismod bibendum nunc at
                          consequat. Pellentesque habitant morbi tristique
                          senectus et netus et malesuada fames ac turpis
                          egestas. Sed lacinia nulla at tortor suscipit, a
                          blandit arcu volutpat. Integer tristique justo ac
                          augue elementum, a bibendum arcu consequat. Ut congue,
                          arcu vel bibendum aliquam, odio tellus semper nisl, eu
                          facilisis erat libero id nulla. Vivamus pellentesque
                          mi id nisl commodo, sit amet scelerisque dui sodales.
                          Sed auctor, arcu nec venenatis pharetra, tortor odio
                          cursus urna, eu venenatis est sapien ac dolor. Sed
                          pharetra dui in urna lacinia, at mattis orci dictum.
                          Aliquam ac bibendum tellus.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="w-fit text-white bg-teal-500 hover:bg-teal-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center"
                    >
                      <svg
                        className="-ml-0.5 mr-2 h-3 w-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 14"
                      >
                        <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                      </svg>
                      View more
                    </button>
                    <footer className="text-sm text-gray-500">
                      &mdash; real human
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-4 lg:hidden">
          <button
            aria-label="Previous slide"
            className="prev-button rounded-full border border-pink-600 p-4 text-pink-600 hover:bg-pink-600 hover:text-white"
          >
            <svg
              className="h-5 w-5 -rotate-180 transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>

          <button
            aria-label="Next slide"
            className="next-button rounded-full border border-pink-600 p-4 text-pink-600 hover:bg-pink-600 hover:text-white"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke-width="2"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
