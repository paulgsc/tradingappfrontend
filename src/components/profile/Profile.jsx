import React from "react";
import ProfileMenu from "./ProfileMenu";

function Profile({ user, className }) {
  return (
    <div className="prof-focus">
      <span
        className={`flex items-center justify-center cursor-pointer uppercase bg-teal-600 rounded-full w-9 h-9 text-white ${className}`}
        tabIndex="0"
      >
        {user}
      </span>
      <div className="hidden prof-menu focus:block absolute top-16 right-10  rounded p-0 m-0  text-center items-center">
        <ProfileMenu />
      </div>
    </div>
  );
}

export default Profile;
