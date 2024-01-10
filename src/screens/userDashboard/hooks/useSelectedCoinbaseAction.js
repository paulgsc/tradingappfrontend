import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userSetCoinbaseOauthScopes } from "../../../reducers/coinbaseSlice";

const useSelectedCoinbaseAction = (items) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const { selected } = items;
    if (Array.isArray(selected)) {
      const selectedActions = selected.reduce(
        (acc, curr) => ({
          actionIds: [...acc.actionIds, curr.id],
          requiredScopeIds: [
            ...acc.requiredScopeIds,
            ...curr.required_scopes.map((scope) => scope.id),
          ],
        }),
        { actionIds: [], requiredScopeIds: [] }
      );
      dispatch(userSetCoinbaseOauthScopes(selectedActions));
    }
  }, [dispatch, items]);
};

export default useSelectedCoinbaseAction;
