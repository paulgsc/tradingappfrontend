import { useSelector } from "react-redux";
import OuathLinkCard from "../ui/OuathLinkCard";
import { useQueryClient } from "@tanstack/react-query";

function Step3() {
  const { actionIds } = useSelector((state) => state.coinbaseActions);
  const queryClient = useQueryClient();
  const coinbaseActions = queryClient.getQueryData(["coinbase-scopes"]) || {};
  const grantedActions = coinbaseActions.filter((action) =>
    actionIds.includes(action.id)
  );
  console.log(grantedActions, coinbaseActions);

  return <OuathLinkCard grantedActions={grantedActions} />;
}

export default Step3;
