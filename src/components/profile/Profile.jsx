import React from "react";
import ProfileMenu from "./ProfileMenu";

function Profile({ user, className }) {
  return (
    <div className="prof-focus">
      <span className={`prof-icon ${className}`} tabIndex="0">
        {user}
      </span>
      <div className="prof-menu">
        <ProfileMenu />
      </div>
    </div>
  );
}

export default Profile;
