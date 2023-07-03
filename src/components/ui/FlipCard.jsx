import React, { useState } from "react";
import TradeSlider from "./TradeSlider";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../contexts/redux/actions/fetchDataActions";
import {
  clearOrderInfo,
  showSummaryPortal,
} from "../../reducers/tradingReducers";
import { excersiseTrade } from "../../contexts/redux/actions/tradingActions";
import OrderSummary from "./OrderSummary";
import ProfileInfo from "./ProfileInfo";
import { ProfileSvg } from "../../constants/svgs/Svg";

function FlipCard() {
  const [flipped, setFlipped] = useState(true);
  const dispatch = useDispatch();
  const {
    orderInfo: {
      amount = "",
      shares = "",
      pricePerShare = "",
      propertyId = "",
      isValid = false,
    } = {},
  } = useSelector((state) => state.trade);

  const { userInfo: { token = "" } = {} } = useSelector(
    (state) => state.userAuth
  );

  const handleClick = () => {
    setFlipped(!flipped);
    dispatch(
      showSummaryPortal({
        showSummaryPortal: !!flipped,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (token && amount) {
      const syncActions = () => async (dispatch) => {
        await dispatch(excersiseTrade());
        dispatch(fetchOrders());
        dispatch(clearOrderInfo());
        setFlipped(!flipped);
      };
      dispatch(syncActions());
    }
  };

  return (
    <div className="relative w-full">
      <div
        className={`${
          flipped ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
        } transition-all duration-1000 ease-in-out absolute top-0 left-0 w-full`}
      >
        <TradeSlider handleReview={handleClick} propertyId={propertyId} />
      </div>

      <div
        className={`${
          flipped ? "opacity-0 translate-y-full" : "opacity-100 translate-y-0"
        } transition-all duration-1000 ease-in-out absolute top-0 left-0 w-full`}
      >
        <FlippedSide handleClick={handleClick} />
      </div>
    </div>
  );
}

const FlippedSide = ({ handleClick }) => {
  return (
    <OrderSummary className={""}>
      <OrderSummary.Title className={""}>User Snapshot</OrderSummary.Title>
      <div className="flex gap-4 border-t p-2 ">
        <ProfileInfo.ProfileImageCard
          className={" border-slate-600 w-12 h-12 "}
        >
          <ProfileSvg />
        </ProfileInfo.ProfileImageCard>
        <div className="flex flex-col">
          <span className="font-bold text-neutral-600 text-base xl:text-lg">
            John Doe
          </span>
          <span className="font-normal text-sm xl:text-base text-neutral-400">
            0 Property Shares Owned
          </span>
        </div>
      </div>
      <div className="mt-2">
        <OrderSummary.Title>Order Amount</OrderSummary.Title>
        <div className="border-t">
          <div>
            <span>Cash: </span>
            <span>$ 0.00</span>
          </div>
          <div>
            <span>Shares: </span>
            <span>0.00</span>
          </div>
        </div>
        <div className="mt-6 w-full flex justify-center items-center">
          <OrderSummary.Button handleClick={handleClick}>
            Submit Order
          </OrderSummary.Button>
        </div>
      </div>
    </OrderSummary>
  );
};

export default FlipCard;
