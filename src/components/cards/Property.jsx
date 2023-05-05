import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import PurchasePopUp from "../ui/PurchasePopUp";

function Property({
  thumbnail,
  title,
  street,
  shares,
  income,
  expense,
  classId,
  propertyValue,
}) {
  const [popup, setPopup] = useState("");
  const [popupButton, setPopupButton] = useState("");
  const testing = (e) => {
    e.preventDefault();
    const element = document.getElementsByClassName(
      `_${classId}purchase-popup`
    )[0];
    setPopup(element);
    setPopupButton(e.target);
    element.style.position = "fixed";
    element.style.top = "50%";
    element.style.left = "50%";
    element.style.transform = "translate(-50%, -50%)";
    element.style.width = "max-content";
    element.style.height = "max-content";
    element.style.padding = "40px 60px 40px 60px";
    element.style.display = "block";
    element.style.justifyContent = "center";
    element.style.alignItems = "center";
    element.style.backgroundColor = "rgb(247, 250, 228)";
    element.style.transform = "translate(-50%, -50%)";
    element.style.boxShadow = "0 7px 100px 0 rgba(0,0,0,.40)";
    element.style.borderRadius = "4px";
    element.style.zIndex = "calc(var(--max-z-index) + 100)";
  };

  useEffect(() => {
    if (!popup) {
      return;
    }

    const handleClickOutside = (event) => {
      // Check if clicked element is inside the popup
      if (event.target !== popupButton && !popup.contains(event.target)) {
        // Clicked outside popup, hide it
        popup.style.display = "none";
        console.log("why this ran?");
        setPopup(null);
        setPopupButton("");
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [popup, popupButton]);

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
      <Card.Footer className="flx-btw-container">
        <div>
          <p>current Value: {propertyValue}</p>
          <p>shares: {shares}</p>
          <p>income: {income}</p>
          <p>expense: {expense}</p>
        </div>
        <div className="flex-col-container">
          <button id={classId} onClick={testing}>
            add shares
          </button>
          <button>add to favorites</button>
        </div>
      </Card.Footer>
      <PurchasePopUp classId={classId} />
    </Card>
  );
}

export default Property;
