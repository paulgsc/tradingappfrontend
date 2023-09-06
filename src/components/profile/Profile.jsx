import ProfileMenu from "./ProfileMenu";
import { Link } from "react-router-dom";
import LiveNotifications from "../alerts/LiveNotifications";

function Profile({ user, is_admin = false, className }) {
  return (
    <div className=" flex items-center gap-8">
      {is_admin && (
        <span className="text-sm underline font-extrabold hover:text-blue-600">
          <Link to={"/admin"}> admin</Link>
        </span>
      )}
      {user && (
        <span className="w-12 flex items-center justify-center">
          <LiveNotifications />
        </span>
      )}
      <div className="prof-focus">
        <span
          className={` flex items-center justify-center cursor-pointer uppercase bg-teal-600 rounded-full w-9 h-9 text-white ${className}`}
          tabIndex="0"
        >
          {user}
        </span>
        <div className="hidden prof-menu focus:block absolute top-16 right-10  rounded p-0 m-0  text-center items-center">
          <ProfileMenu user={user} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
