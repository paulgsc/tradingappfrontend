import ProfileInfo from "../../../../components/ui/ProfileInfo";
import { CameraSvg, ProfileSvg } from "../../../../constants/svgs/Svg";

function ProfileHome() {
  return (
    <ProfileInfo className={"relative col-span-5 w-full h-full bg-white"}>
      <ProfileInfo.Background
        className={
          "flex justify-end items-end w-full h-1/5 px-4 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
        }
      >
        <ProfileInfo.Button
          className={
            "  hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-mediu items-end gap-2 w-20 p-1 bg-blue-600 rounded-sm shadow-md text-sm text-white flex  justify-center"
          }
        >
          <span>
            <CameraSvg />
          </span>
          <span>Edit</span>
        </ProfileInfo.Button>
      </ProfileInfo.Background>
      <ProfileInfo.Card className={"border "}>
        <ProfileInfo.ProfileImageCard
          className={
            "absolute top-11  xl:top-28 left-[45%] ring-4  w-28 h-28 xl:w-36 xl:h-36 "
          }
        >
          <ProfileSvg />
        </ProfileInfo.ProfileImageCard>
      </ProfileInfo.Card>
      <ProfileInfo.Card
        className={"h-36 flex items-start mx-auto p-2 bg-slate-50"}
      >
        <ProfileInfo.ProfileImageCard className={" w-24 h-24 xl:w-28 xl:h-28 "}>
          <ProfileSvg />
        </ProfileInfo.ProfileImageCard>
        <div className="flex flex-col justify-center gap-6 h-full ml-12">
          <span className="flex items-center font-semibold gap-2">
            pgathondu
            <i className="text-xs text-green-500 fa-solid fa-check"></i>
          </span>
          <div className="flex gap-8 items-end text-end text-xs xl:text-sm text-neutral-600 font-light">
            <span>account owner</span>
            <span>Joined July 2, 2023</span>
          </div>
        </div>
      </ProfileInfo.Card>
    </ProfileInfo>
  );
}

export default ProfileHome;
