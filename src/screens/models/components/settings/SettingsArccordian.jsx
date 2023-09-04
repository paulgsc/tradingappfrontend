import Arcodian from "../ui/Arcodian";
import General from "./General";

function SettingsArccordian() {
  const content = [
    {
      title: "General",
      content: <General />,
    },
  ];
  return <Arcodian content={content} />;
}

export default SettingsArccordian;
