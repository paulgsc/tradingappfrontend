import Arcodian from "../../../models/components/ui/Arcodian";
import AddScopeCard from "./AddScopeCard";

function ScopesAccordian({ required_scopes, suggested_scopes }) {
  const content = [
    {
      title: "Granted Permissions",
      content: (
        <AddScopeCard
          required_scopes={required_scopes}
          suggested_scopes={suggested_scopes}
        />
      ),
    },
  ];
  return <Arcodian className={"block"} content={content} />;
}

export default ScopesAccordian;
