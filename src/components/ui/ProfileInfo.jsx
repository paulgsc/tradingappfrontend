import React from "react";
import { cn } from "../../lib/utils";

function ProfileInfo({ className, ...props }) {
  return <div className={cn(`${className}`)} {...props} />;
}

ProfileInfo.Background = ({ className, ...props }) => {
  return <div className={cn(`${className}`)} {...props} />;
};

ProfileInfo.Card = ({ className, ...props }) => {
  return <div className={cn(`${className}`)} {...props} />;
};

ProfileInfo.Button = ({ className, ...props }) => {
  return <button className={cn(`${className}`)} {...props} />;
};

ProfileInfo.BacgroundImage = ({ className, ...props }) => {
  return <img className={cn(`${className}`)} {...props} />;
};

ProfileInfo.ProfileImageCard = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        `${className} text-stone-100 flex items-center justify-center rounded-full bg-stone-300`
      )}
      {...props}
    />
  );
};

export default ProfileInfo;
