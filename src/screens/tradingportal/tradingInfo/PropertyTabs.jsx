import React from "react";
import PropertyOverview from "./PropertyOverview";
import PropertyHeader from "./PropertyHeader";
import TabWidget from "../../../components/ui/TabWidget";

function PropertyTabs() {
  const headers = [
    {
      id: "1_1",
      title: "Overview",
      content: <PropertyOverview />,
    },
    {
      id: "1_2",
      title: "Facts",
      content: "",
    },
    {
      id: "1_3",
      title: "Home value",
      content: "",
    },
  ];
  const getClassname = (name) => {
    switch (name) {
      case "main-container":
        return "relative";
      default:
        return "";
    }
  };
  return (
    <div className="flex flex-col w-11/12">
      <PropertyHeader />
      <TabWidget
        getclassName={getClassname}
        active="Overview"
        tabHeaders={headers}
      />
    </div>
  );
}

export default PropertyTabs;
