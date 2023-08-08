import React from "react";
import ToggleButton from "../../../../../../components/ui/ToggleButton";
import { Card } from "../../../../../../components/cards/Card";

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
