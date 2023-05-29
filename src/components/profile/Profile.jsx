import React from "react";
import ProfileMenu from "./ProfileMenu";

function Profile({ user, className }) {
  return (
    <div className="prof-focus ">
      <span
        className={`flex items-center justify-center cursor-pointer uppercase bg-teal-600 rounded-full w-12 h-12 text-white ${className}`}
        tabIndex="0"
      >
        {user}
      </span>
      <div className="prof-menu absolute top-16 right-10  rounded p-0 m-0  text-center items-center">
        <ProfileMenu />
      </div>
    </div>
  );
}

export default Profile;
