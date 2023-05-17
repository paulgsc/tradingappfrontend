import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import PurchasePopUp from "../ui/PurchasePopUp";
import { useDispatch, useSelector } from "react-redux";
import { popUpClose } from "../../contexts/redux/actions/tradingActions";
import { storeOrderInfo } from "../../reducers/tradingReducers";
import { useNavigate } from "react-router";
import { fetchPropertyQuery } from "../../contexts/redux/actions/fetchDataActions";

function Property({
  thumbnail,
  title,
  street,
  availableshares,
  income,
  expense,
  classId,
  propertyId,
  propertyValue,
}) {
  const [popup, setPopup] = useState("");
  const [popupButton, setPopupButton] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(
      storeOrderInfo({
        propertyId: propertyId,
      })
    );
    dispatch(fetchPropertyQuery(street));
    navigate("/trade");
  };

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
        setPopup(null);
        setPopupButton("");
        dispatch(popUpClose());
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [popup, popupButton]);

  return (
    <Card className="mg-auto block">
      <Card.Content className={""}>
        <img
          src={thumbnail}
          alt={title}
          className="image-bx-rd  image-bx-rd-ms curs-pt"
          onClick={handleClick}
        />
      </Card.Content>
      <Card.Title className="curs-pt ft-sz-14-ms" onClick={handleClick}>
        {street}
      </Card.Title>
      <Card.Description>{title}</Card.Description>
      <Card.Footer className="flx-btw-container">
        <div>
          <p>current Value: {propertyValue}</p>
          <p>shares: {availableshares}</p>
          <p>income: {income}</p>
          <p>expense: {expense}</p>
        </div>
        <div className="flex-col-container">
          <button id={classId} onClick={testing}>
            Quick Trade
          </button>
          <button>add to favorites</button>
        </div>
      </Card.Footer>
      <PurchasePopUp classId={classId} propertyId={propertyId} />
    </Card>
  );
}

export default Property;
