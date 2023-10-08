import { fetchSiteSettings } from "../../hooks/reactQuery";
import { useSelector } from "react-redux";
import TokenSettings from "../validations/TokenSettings";
import SkeletonLoading from "../../../../components/loading/SkeletonLoading";

function LoginSettings() {
  const { userInfo: { token = "" } = {} } = useSelector(
    (state) => state.userAuth
  );
  const {
    isLoading,
    settings: {
      token_expiration = 0,
      admin_portal_token_expiration = 0,
      create_admin_token_expiration = 0,
    } = {},
  } = fetchSiteSettings(token);
  const tokenSettings = [
    {
      title: "userToken",
      value: token_expiration,
      description: "Set the duration until new login is required",
      info: "after each login, authenticated user is assigned an access token with a given expiration. You can set the duration needed before a new login session is required.",
    },
    {
      title: "adminToken",
      value: admin_portal_token_expiration,
      description: "Set the timer for new login session to django portal",
      info: "after each login, authenticated user is assigned an access token with a given expiration. You can set the duration needed before a new login session is required.",
    },
    {
      title: "createAdminToken",
      value: create_admin_token_expiration,
      description: "Set the timer for new admin invite email",
      info: "after each login, authenticated user is assigned an access token with a given expiration. You can set the duration needed before a new login session is required.",
    },
  ];

  if (isLoading) return <SkeletonLoading size={1} />;

  return (
    <ul className="w-full space-y-2">
      {tokenSettings.map((setting, i) => (
        <li key={`${i}_${setting.title}`}>
          <TokenSettings
            description={setting.description}
            info={setting.info}
            token_duration={setting.value}
          />
        </li>
      ))}
    </ul>
  );
}

export default LoginSettings;
