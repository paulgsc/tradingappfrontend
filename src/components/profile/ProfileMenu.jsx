import React from "react";
import { quickActionMenu } from "../../constants/navbar/profileMenu";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../contexts/redux/actions/userActions";
import PlaceHolder from "../loading/PlaceHolder";

function ProfileMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAuthentication = (e, path, id) => {
    e.preventDefault();
    if (id === "signOut") {
      dispatch(logout());
    } else {
      navigate(path);
    }
  };

  return (
    <div className="blk-center ">
      {quickActionMenu.map((item) => (
        <ul className="ls-none" key={item.id}>
          <button
            className="btn-container-zero flx-st-container flx-st-container"
            onClick={(e) =>
              handleAuthentication(e, item.path, item.containerId)
            }
          >
            <li className="flx-btw-container txt-prop wd-ht-200-mx ft-lgr">
              {item.title}
              <div className="pd-10">
                <PlaceHolder.Icon name={item.icon} />
              </div>
            </li>
          </button>
        </ul>
      ))}
    </div>
  );
}

export default ProfileMenu;
