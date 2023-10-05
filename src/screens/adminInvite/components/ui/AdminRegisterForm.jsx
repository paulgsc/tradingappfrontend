import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarLogo from "../../../../components/navbar/navlogo/NavbarLogo";

function AdminRegisterForm({ handleSubmit, adminEmail }) {
  const [pwdMatches, setPwdMatches] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    password && setPwdMatches(password === confirmPassword);
  }, [password, confirmPassword]);
  return (
    <section className="grid grid-cols-4 items-center bg-gray-50 dark:bg-gray-900">
      <div className=" col-span-1 flex flex-col max-w-lg min-h-screen justify-center p-6 bg-white border border-gray-50 shadow">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Admin Setup
        </h5>

        <p className="mb-3 font-thin text-small text-gray-700">
          Use this page to setup admin account for{" "}
          <strong className="font-bold">{adminEmail}</strong>
        </p>
        <Link
          to={"/"}
          className="max-w-fit inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-zinc-600/80 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Back to home page
          <svg
            className="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>

      <div className=" col-span-3 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-full">
        <header className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <NavbarLogo />
        </header>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create Admin Password
            </h1>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                handleSubmit(e, password);
              }}
            >
              <div className="space-y-1">
                <label
                  htmlFor="adminpassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="adminpassword"
                  id="adminpassword"
                  placeholder="••••••••"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
                <div className="flex items-center ">
                  <div className="flex items-center">
                    <input
                      id="showpassword"
                      aria-describedby="remember"
                      type="checkbox"
                      onChange={(e) => {
                        setShowPassword(e.target.checked);
                      }}
                      className="w-3 h-3 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-xs">
                    <label htmlFor="showpassword" className="text-gray-500 0">
                      Show Password
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="confirmpassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmpassword"
                  id="confirmpassword"
                  placeholder="••••••••"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
                <div className="flex items-center">
                  <div className="flex items-center">
                    <input
                      id="showconfirmpassword"
                      aria-describedby="remember"
                      type="checkbox"
                      onChange={(e) => {
                        setShowConfirmPassword(e.target.checked);
                      }}
                      className="w-3 h-3 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-xs">
                    <label
                      htmlFor="showconfirmpassword"
                      className="text-gray-500 0"
                    >
                      Show Password
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between"></div>
              <button
                type="submit"
                disabled={!pwdMatches}
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-blue-200/80 disabled:scale-95 transition-all duration-200 ease-in-out"
              >
                Next
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminRegisterForm;
