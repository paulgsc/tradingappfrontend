import { useParams, useSearchParams } from "react-router-dom";
import NewAdminUserCard from "./NewAdminUserCard";
import ProfileCard from "./ProfileCard";
import SendInviteDialog from "./SendInviteDialog";
import UserDetailsCard from "./UserDetailsCard";
import { getModelRowRecord } from "../../hooks/reactQuery";
import { useSelector } from "react-redux";

function UserSettingsCard() {
  const { model } = useParams();
  const [queryParameters] = useSearchParams();
  const { userInfo: { token = null } = {} } = useSelector(
    (state) => state.userAuth
  );

  const { data: { data } = {} } = getModelRowRecord(
    token,
    model.toLowerCase(),
    {
      model_name: model,
      record_id: queryParameters.get("recordId"),
    }
  );

  return (
    <section className="w-full lg:max-w-6xl xl:max-w-full max-h-fit">
      <header>
        {queryParameters.get("sendInvite") && (
          <SendInviteDialog userData={data} />
        )}
      </header>
      <main className="flex items-start w-full space-x-2 p-2">
        <section className="w-full max-w-fit">
          <ProfileCard userData={data} />{" "}
        </section>
        <section className=" w-full">
          <UserDetailsCard userData={data} />
        </section>
      </main>
      <footer>
        <NewAdminUserCard />
      </footer>
    </section>
  );
}

export default UserSettingsCard;
