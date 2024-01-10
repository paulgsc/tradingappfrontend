import CoinBaseScopes from "../ui/CoinBaseScopes";

function Step2({
  thirdPartyCoinbaseActions,
  setThridPartyCoinbaseActions,
  data,
}) {
  return (
    <CoinBaseScopes
      thirdPartyCoinbaseActions={thirdPartyCoinbaseActions}
      setThridPartyCoinbaseActions={setThridPartyCoinbaseActions}
      data={data}
    />
  );
}

export default Step2;
