import React from "react";
import { cn } from "../../lib/utils";
import { Icons } from "../../constants/icons/icons";

export default function PlaceHolder({ className, ...props }) {
  return <div className={cn(className)} {...props}></div>;
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

PlaceHolder.Title = function PlaceHolderTitle({ className, ...props }) {
  return <h2 className={cn(className)} {...props} />;
};

PlaceHolder.Description = function PlaceHolderDescription({
  className,
  ...props
}) {
  return <p className={cn(className)} {...props} />;
};
