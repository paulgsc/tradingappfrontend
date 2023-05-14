import React from "react";
import "./resultlist.css";
import { useDispatch, useSelector } from "react-redux";
import { storeOrderInfo } from "../../reducers/tradingReducers";

function ResultList({ propertyData }) {
  const dispatch = useDispatch();
  const {
    orderInfo: {
      amount = "",
      shares = "",
      pricePerShare = "",
      propertyId = "",
    } = {},
  } = useSelector((state) => state.trade);
  const handleClick = (e, id) => {
    e.preventDefault();
    const payload = {
      amount: amount,
      shares: shares,
      pricePerShare: pricePerShare,
      propertyId: id,
    };
    dispatch(storeOrderInfo(payload));
    const element = document.getElementById("trade_searchResultList");
    element.style.display = "none";
  };
  return (
    <div id="trade_searchResultList" className="resultList-container">
      <ul className="resultList__content">
        {propertyData.map((item, index) => (
          <li
            onClick={(e) => handleClick(e, item.id)}
            key={index}
            className="resultList__row-container"
          >
            <img src={item.url} onClick={(e) => handleClick(e, item.id)} />
            <h3 onClick={(e) => handleClick(e, item.id)}>
              {item.property_name}
            </h3>
            <span onClick={(e) => handleClick(e, item.id)}>
              {item.price_per_share}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResultList;
