import { useSelector } from "react-redux";

function LoginTitle() {
  const { login_route: { password_required } = {} } = useSelector(
    (state) => state.userAuth
  );

  if (password_required) {
    return (
      <header className="py-4 px-2 space-y-2">
        <h2 className=" text-3xl font-bold text-center text-gray-800">
          Admin User
        </h2>
        <p className="text-xs font-thin italic text-center">
          a password is required for admin user login
        </p>
      </header>
    );
  }
  return (
    <h2 className="py-6 text-3xl font-bold text-center text-gray-800">
      Welcome back
    </h2>
  );
}

export default LoginTitle;
