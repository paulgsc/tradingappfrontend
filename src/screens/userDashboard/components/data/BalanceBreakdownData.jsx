import { useQueryClient } from "@tanstack/react-query";
import BalanceBreakDownCard from "../ui/BalanceBreakDownCard";

function BalanceBreakdownData() {
  const queryClient = useQueryClient();
  const {
    transfer_remaining = 0,
    amount_purchased = 0,
    transfer_remaining_formated,
    amount_purchased_formated,
  } = queryClient.getQueryData(["user-balance"]) || {};
  const breakdown = [
    {
      id: 1,
      title: "Balance Breakdown",
      period: "all",
      default: true,
      data: [amount_purchased, transfer_remaining],
      formated_data: [amount_purchased_formated, transfer_remaining_formated],
      labels: ["Investments", "Cash"],
    },
    {
      id: 2,
      title: "Earnings Overview",
      period: "last month",
      data: [],
    },
  ];

  return <BalanceBreakDownCard breakdown={breakdown} />;
}

export default BalanceBreakdownData;
