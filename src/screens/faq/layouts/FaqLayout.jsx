import React from "react";
import FaqSkeleton from "../components/ui/FaqSkeleton";
import SideMenuItems from "../components/sidebar/SideMenuItems";
import FaqContent from "../components/questions/FaqContent";

function FaqLayout() {
  return (
    <FaqSkeleton>
      <FaqSkeleton.Header>Frequently Asked Questions</FaqSkeleton.Header>
      <FaqSkeleton.Body>
        <SideMenuItems />
        <FaqContent />
      </FaqSkeleton.Body>
    </FaqSkeleton>
  );
}

export default FaqLayout;
