import { useSelector } from "react-redux";
import { fetchUserProfile } from "../../hooks/reactQuery";
import ProfileCard from "../ui/ProfileCard";

function ProfileData() {
  const { userInfo: { token, profile } = {} } = useSelector(
    (state) => state.userAuth
  );
  const { data } = fetchUserProfile(token, profile);
  return <ProfileCard userData={data} />;
}

export default ProfileData;
