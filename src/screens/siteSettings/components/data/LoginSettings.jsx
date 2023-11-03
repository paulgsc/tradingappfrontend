import TokenSettings from "../validations/TokenSettings";
import { useQueryClient } from "@tanstack/react-query";

function LoginSettings() {
  const queryClient = useQueryClient();
  const {
    token_expiration = 0,
    admin_portal_token_expiration = 0,
    create_admin_token_expiration = 0,
  } = queryClient.getQueryData(["site-settings"]) || {};

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
