import { useSelector } from "react-redux";
import OrderSummary from "../../../components/ui/OrderSummary";
import { ProfileSvg } from "../../../constants/svgs/Svg";
import ProfileInfo from "../../../components/ui/ProfileInfo";
import BuyBtn from "../components/buttons/BuyBtn";
import Goback from "../components/buttons/Goback";

function SummaryPageLayout() {
  const { orderInfo: { amount = 0, shares = 0 } = {} } = useSelector(
    (state) => state.trade
  );

  return (
    <OrderSummary className={"relative border h-full z-50 "}>
      <Goback />
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
      <div className="w-full">
        <OrderSummary.Title className={""}>Order Amount</OrderSummary.Title>
        <div className="border-t mb-2">
          <div>
            <span>You're paying: </span>
            <span>{amount}</span>
          </div>
          <div>
            <span>You're receiving: </span>
            <span>{shares} shares</span>
          </div>
        </div>
      </div>
      <BuyBtn />
    </OrderSummary>
  );
}

export default SummaryPageLayout;
