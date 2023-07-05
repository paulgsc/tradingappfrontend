import React from "react";
import { quickActionMenu } from "../../constants/navbar/profileMenu";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../contexts/redux/actions/userActions";
import PlaceHolder from "../loading/PlaceHolder";

function ProfileMenu({ user }) {
  const { userInfo: { email, username } = {}, error = null } = useSelector(
    (state) => state.userAuth
  );
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
    <div className="z-50 block w-full text-center items-center justify-center rounded-lg bg-white shadow-lg">
      <hr className="w-full border-t h-4 " />
      <div className="flex justify-center mx-auto w-full h-16 border-b border-gray-400">
        <div className="flex items-start mx-auto gap-6 w-11/12">
          <span
            className={`flex items-center justify-center cursor-pointer uppercase bg-teal-600 rounded-full w-9 h-9 text-white`}
            tabIndex="0"
          >
            {user}
          </span>
          <div className="flex flex-col mb-4">
            <span className="text-xs text-left text-slate-400">{username}</span>
            <span className="text-base text-left">{email}</span>
            <span className="text-base text-blue-600 hover:text-blue-800">
              <Link to={"/personal/settings"}>account settings</Link>
            </span>
          </div>
        </div>
      </div>

      <ul className="flex flex-col items-start p-0 py-2 m-0">
        {quickActionMenu.map((item) => (
          <li
            className="flex items-center xl:py-4 py-0 px-0 m-0 w-full"
            key={item.id}
          >
            <button
              className="flex items-center text-center gap-4 px-4  space-x-2 hover:bg-gray-200 w-full md:gap-6 md:px-6 lg:gap-8 lg:px-8 xl:gap-10 xl:px-8"
              onClick={(e) =>
                handleAuthentication(e, item.path, item.containerId)
              }
            >
              <div className="w-10 h-16 flex items-center justify-center">
                <PlaceHolder.Icon name={item.icon} />
              </div>
              <span className="text-base">{item.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfileMenu;
