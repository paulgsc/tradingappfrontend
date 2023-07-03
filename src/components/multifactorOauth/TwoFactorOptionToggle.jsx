import React from "react";
import { Card } from "../cards/Card";
import ToggleButton from "../ui/ToggleButton";

function TwoFactorOptionToggle({ handleClick, checked }) {
  return (
    <Card>
      <h3>Security Settings</h3>
      <span>Two-factor authentication</span>
      <span>
        Kepp your leafi account safe by adding multiple layers of protection.
        This helps prevent anyone from accessing your Robinhood account, even if
        they know your password. Learn more
      </span>
      <ToggleButton handleClick={handleClick} checked={checked} />
    </Card>
  );
}

export default TwoFactorOptionToggle;
