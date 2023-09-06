import { useSelector } from "react-redux";

function ModalMsg() {
  const { userInfo: { token = "" } = {} } = useSelector(
    (state) => state.userAuth
  );
  return (
    <div>
      {token ? (
        <>
          <p className="text-sm xl:text-base leading-relaxed text-gray-500 dark:text-gray-400">
            In order to buy shares of property you need to have a balance in
            your account. Transfer money to you account using your linked banks.
            In you haven&apos;t set up any linked accounts, set up you bank
            links first.
          </p>
          <p className="text-xs xl:text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            Your bank links set up and transfers are handled through plaid.
          </p>
        </>
      ) : (
        <>
          <p className="text-sm xl:text-base leading-relaxed text-gray-500 dark:text-gray-400">
            New user? In order to buy shares of property you need to have an
            account and a valid login session.
          </p>
          <p className="text-xs xl:text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            Please sign in / up, to begin trading.
          </p>
        </>
      )}
    </div>
  );
}

export default ModalMsg;
