import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../../contexts/redux/actions/userActions";

function SignUpForm() {
  const [email, setEmail] = useState("");
  const redirect = location.search
    ? location.search.split("redirect=")[1]
    : "/";

  const dispatch = useDispatch();
  const { userInfo: { token = null } = {} } = useSelector(
    (state) => state.userAuth
  );

  const handleSignUp = (e) => {
    e.preventDefault();
    if (email && !token) {
      const formData = {
        username: email,
        email: email,
        redirect: redirect,
      };
      dispatch(register(formData));
    }
  };
  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <div className="space-y-4">
        <div className="relative flex items-center">
          <div className="w-6 h-6 absolute left-4 inset-y-0 my-auto" />
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            onInput={(e) => setEmail(e.target.value)}
            className="focus:outline-none
          block w-full rounded-md placeholder-gray-500
          bg-gray-100 pl-12 pr-4 h-12 text-gray-600 transition
          duration-300 invalid:ring-2 invalid:ring-red-400
          focus:ring-2 focus:ring-black"
            placeholder="Enter Email"
            required=""
          />
        </div>
        <hr className="mt-6" />
      </div>
      <div className="w-full">
        <button
          type="submit"
          className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm xl:text-base px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Sign up
        </button>
      </div>
    </form>
  );
}

export default SignUpForm;
