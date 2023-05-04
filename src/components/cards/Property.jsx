import React from "react";
import { Card } from "./Card";
import PurchasePopUp from "../ui/PurchasePopUp";

function Property({ thumbnail, title, street, shares, income, expense }) {
  const testing = (e) => {
    e.preventDefault();
  };
  return (
    <Card className="mg-auto block not-ready">
      <Card.Content className={""}>
        <img
          src={thumbnail}
          alt={title}
          className="image-bx-rd not-ready image-bx-rd-ms"
        />
      </Card.Content>
      <Card.Title className="ft-sz-14-ms">{street}</Card.Title>
      <Card.Description>{title}</Card.Description>
      <Card.Footer className="ft-sz-12-ms">
        <div>
          <p>shares: {shares}</p>
          <p>income: {income}</p>
          <p>expense: {expense}</p>
        </div>
        <div>
          <button onClick={testing}>add shares</button>
          <button>add to favorites</button>
        </div>
      </Card.Footer>
      <PurchasePopUp />
    </Card>
  );
}

export default Property;
