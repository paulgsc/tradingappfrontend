import React from "react";
import FaqSkeleton from "../ui/FaqSkeleton";

function SideMenuItems() {
  const items = {
    title: "foo",
    content: [
      {
        id: 1,
        title: "foo",
        path: "foo",
      },
    ],
  };
  return <FaqSkeleton.SideMenu items={items} />;
}

export default SideMenuItems;
