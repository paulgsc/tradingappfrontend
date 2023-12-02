import { DotsSvg, PlusSvg } from "../../../../constants/svgs/Svg";

function LinkedAccountsCard() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <section className="w-full max-w-xl space-y-2">
        <h1 className="font-semibold leading-8 text-lg lg:text-2xl text-left">
          Linked Accounts
        </h1>
        <div className="w-full flex justify-center border border-neutral-300 rounded-md px-2 py-4">
          <ul className="w-11/12">
            {Array.from({ length: 4 }, (_, index) => (
              <li
                key={index}
                className="flex items-center justify-between border-b py-2.5"
              >
                <div>
                  <h3 className="capitalize font-medium text-base lg:text-lg">
                    union bank essentials checking
                  </h3>
                  <p className="font-normal text-sm lg:text-base text-slate-400 capitalize ml-1.5">
                    checking*****9055
                  </p>
                </div>
                <div className="inline-flex items-center space-x-2">
                  <span
                    role="text"
                    className="font-thin text-sm pointer-events-none text-emerald-400"
                  >
                    verified
                  </span>
                  <div className="relative group">
                    <button className="p-0.5 scale-90 hover:scale-100 hover:bg-gray-50 group-focus-within:bg-gray-100/60">
                      <DotsSvg className={"w-4 h-5 hover:text-gray-950"} />
                    </button>
                    <button className="hidden absolute left-0 z-50 backdrop-blur-sm group-focus-within:flex items-center justify-center p-2 px-4 shadow-md rounded-lg text-white bg-slate-500 hover:bg-slate-950">
                      <span role="text">unlink</span>
                    </button>
                  </div>
                </div>
              </li>
            ))}
            <li className="flex-none w-full my-2.5 px-2.5 hover:bg-gray-50/60 hover:rounded-md transition-all duration-300 ease-in-out">
              <button className="inline-flex items-center p-2.5 space-x-2.5 text-slate-400 hover:text-black transition-all duration-300 ease-in-out">
                <PlusSvg className={"h-4 w-4"} />{" "}
                <span role="text">Add a new account</span>
              </button>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default LinkedAccountsCard;
