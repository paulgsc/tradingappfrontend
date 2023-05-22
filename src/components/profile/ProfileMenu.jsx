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
    <div className="block text-center items-center justify-center rounded-lg bg-white ">
      <ul className="flex flex-col items-start p-0 py-2 m-0">
        {quickActionMenu.map((item) => (
          <li className="flex items-center py-4 px-0 m-0 w-full" key={item.id}>
            <button
              className="flex items-center text-center gap-4 px-4  space-x-2 hover:bg-gray-200 w-full md:gap-6 md:px-6 lg:gap-8 lg:px-8 xl:gap-10 xl:px-8"
              onClick={(e) =>
                handleAuthentication(e, item.path, item.containerId)
              }
            >
              <div className="w-10 h-20 flex items-center justify-center">
                <PlaceHolder.Icon name={item.icon} />
              </div>
              <span className="text-xl lg:text-2xl">{item.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfileMenu;
