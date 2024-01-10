import { useDispatch, useSelector } from "react-redux";
import {
  userAddCoinbaseOuathScopes,
  userRemoveCoinbaseOuathScopes,
} from "../../../reducers/coinbaseSlice";

const useScopesSelection = () => {
  const dispatch = useDispatch();
  const { suggestedScopeIds } = useSelector((state) => state.coinbaseActions);
  const handleToggleScope = (scopeId) => {
    if (suggestedScopeIds.includes(scopeId)) {
      dispatch(userRemoveCoinbaseOuathScopes(scopeId));
    } else {
      dispatch(userAddCoinbaseOuathScopes(scopeId));
    }
  };

  const isChecked = (scopeId) => suggestedScopeIds.includes(scopeId);

  return { handleToggleScope, isChecked };
};

export default useScopesSelection;
