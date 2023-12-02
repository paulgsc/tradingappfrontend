import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Bug } from "../../constants/svgs/Svg";

function DebugMode() {
  const location = useLocation();
  const [queryParameters] = useSearchParams();
  const currentSearchParams = new URLSearchParams(queryParameters);
  currentSearchParams.has("debug")
    ? currentSearchParams.delete("debug")
    : currentSearchParams.append("debug", 1);
  return (
    <div
      title="debug mode"
      className="rotate-90 hidden lg:flex items-center justify-center relative w-12 h-12"
    >
      <Link to={`${location.pathname}?${currentSearchParams.toString()}`}>
        <Bug className={"w-3 h-3 -rotate-45"} />
      </Link>
    </div>
  );
}

export default DebugMode;
