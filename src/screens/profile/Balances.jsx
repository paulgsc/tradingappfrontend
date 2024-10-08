import React from "react";
import { Card } from "../../components/cards/Card";
import { balances } from "../../constants/profile/balances";
import currency from "currency.js";
import "./balances.css";

function Balances({ transersTotal }) {
  return (
    <Card className="balances__container">
      <Card.Title>{currency(transersTotal).format()} Total in app.</Card.Title>

      {balances.map((item) => {
        return (
          <React.Fragment key={item.id}>
            <Card.Header className="rt-lft-mg-container-8">
              <h4>{item.title}</h4>
            </Card.Header>
            {item.content.map((item) => (
              <Card.Content
                className="flx-btw-container rt-lft-mg-container-8 bm-brd-container-gr wd-container-40vw"
                key={item.id}
              >
                <Card.Description className="ft-container-12">
                  {item.label}
                </Card.Description>
                <Card.Description className="ft-container-12 wd-container-10-abs">
                  $.02
                </Card.Description>
              </Card.Content>
            ))}
          </React.Fragment>
        );
      })}
    </Card>
  );
}

export default Balances;
