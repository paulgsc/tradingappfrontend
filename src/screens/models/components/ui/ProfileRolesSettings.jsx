import { useQueryClient } from "@tanstack/react-query";
import ToggleButton from "../../../../components/ui/ToggleButton";
import SettingsCard from "../../../siteSettings/components/ui/SettingsCard";
import Arcodian from "./Arcodian";

function ProfileRolesSettings() {
  const queryClient = useQueryClient();
  const { data: { groups: { value = [] } = {} } = {} } =
    queryClient.getQueryData(["userprofile-row-record"]) || {};

  const roles = [
    {
      id: 1,
      title: "Site Admin",
      field_name: "site_admin",
      info: "lorem ipsum...",
    },
    {
      id: 2,
      title: "Can Make Admin Acct",
      field_name: "pending_site_admin",
      info: "lorem ipsum...",
    },
    {
      id: 3,
      title: "Can Sell Shares",
      field_name: "can_sell_shares",
      info: "lorem ipsum...",
    },
    {
      id: 4,
      title: "Can Make Transfers",
      field_name: "can_make_transfers",
      info: "lorem ipsum...",
    },
    {
      id: 5,
      title: "Can Access Acct",
      field_name: "can_access_acct",
      info: "lorem ipsum...",
    },
  ];
  const content = [
    {
      title: "User Roles",
      content: (
        <ul>
          {roles.map((item, i) => (
            <li key={i}>
              <SettingsCard description={item?.title} info={item?.info}>
                <ToggleButton />
              </SettingsCard>
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return <Arcodian content={content} />;
}

export default ProfileRolesSettings;
