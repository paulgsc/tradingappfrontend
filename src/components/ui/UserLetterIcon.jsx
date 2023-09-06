import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

function UserLetterIcon() {
  const { userInfo: { token = "" } = {} } = useSelector(
    (state) => state.userAuth
  );
  const initLetter = () =>
    JSON.parse(localStorage.getItem("userInfo"))?.email?.charAt(0) || "";
  const [profileInitial, setProfileInitial] = useState(initLetter());

  useEffect(() => {
    if (typeof initLetter === "function") {
      setProfileInitial(initLetter());
    }
  }, [token]);
  return (
    <span
      className={` flex items-center justify-center cursor-pointer uppercase bg-teal-600 rounded-full w-9 h-9 text-white`}
      tabIndex="0"
    >
      {profileInitial}
    </span>
  );
}

export default UserLetterIcon;
