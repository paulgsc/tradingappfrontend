import React from "react";
import { cn } from "../../lib/utils";
import { Icons } from "../../constants/icons/icons";

export default function PlaceHolder({ classname, ...props }) {
  return <div className={cn(classname)} {...props}></div>;
}

PlaceHolder.Icon = function PlaceHolderIcon({ name, ...props }) {
  const Icon = Icons[name];

  if (!Icon) {
    return null;
  }

  return (
    <div>
      <Icon {...props} />
    </div>
  );
};

PlaceHolder.Title = function PlaceHolderTitle({ classname, ...props }) {
  return <h2 className={cn(classname)} {...props} />;
};

PlaceHolder.Description = function PlaceHolderDescription({
  classname,
  ...props
}) {
  return <p className={cn(classname)} {...props} />;
};
