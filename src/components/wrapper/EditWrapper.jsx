import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";

function EditWrapper({ path, children }) {
  const [queryParameters] = useSearchParams();
  const { userInfo: { token, is_admin } = {} } = useSelector(
    (state) => state.userAuth
  );

  if (is_admin && token && queryParameters.get("debug")) {
    return (
      <div
        tabIndex={-1}
        className="relative w-full group after:absolute after:inset-0 after:opacity-0 focus-within:after:opacity-100 after:hover:opacity-100 after:hover:scale-[88%] focus-within:after:scale-[88%] after:backdrop-blur-sm after:hover:brightness-90 focus-within:after:brightness-90 transition-all duration-500 ease-in-out"
      >
        <Link
          to={path}
          className="absolute hidden group-focus-within:block group-hover:block right-6 top-0.5 flex-none rounded-full bg-gradient-to-tr from-purple-400 via-blue-600 to-purple-600 px-3.5 py-1 text-sm font-semibold text-white shadow-sm"
        >
          edit item <span aria-hidden="true">&rarr;</span>
        </Link>
        <div className="w-full group-hover:scale-[86%] group-focus-within:scale-[86%] hover:scale-[86%] transition-all duration-500 ease-in-out">
          <div className="w-full pointer-events-none cursor-none">
            {children}
          </div>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}

export default EditWrapper;
