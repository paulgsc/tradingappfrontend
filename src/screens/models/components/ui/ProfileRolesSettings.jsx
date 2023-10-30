import ToggleButton from "../../../../components/ui/ToggleButton";
import SettingsCard from "../../../siteSettings/components/ui/SettingsCard";
import Arcodian from "./Arcodian";

function ProfileRolesSettings() {
  const content = [
    {
      title: "User Roles",
      content: (
        <ul>
          {Array(6)
            .fill("")
            .map((item, i) => (
              <li key={i}>
                <SettingsCard
                  description={"some description"}
                  info={"some info"}
                >
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
