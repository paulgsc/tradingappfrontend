import { useQueryClient } from "@tanstack/react-query";

function PriceInfo() {
  const queryClient = useQueryClient();
  const { price_per_share_formated = 0 } =
    queryClient.getQueryData(["active-property"]) || {};

  return (
    <div className="flex flex-col items-center text-xs text-blue-900 h-full bg-gradient-to-b from-white via-stone-100 to-white">
      <span>{price_per_share_formated}</span>
      <small className=" text-[11px] font-semibold">per/share</small>
    </div>
  );
}

export default PriceInfo;
