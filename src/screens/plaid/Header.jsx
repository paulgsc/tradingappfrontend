import React from "react";
import { Link } from "react-router-dom";
import Callout from "plaid-threads/Callout";
import Button from "plaid-threads/Button";
import InlineLink from "plaid-threads/InlineLink";
import { useSelector } from "react-redux";
import AuthLink from "./AuthLink";

const Header = () => {
  const {
    plaidInfo: {
      itemId,
      accessToken,
      linkToken,
      linkSuccess,
      isItemAccess,
      backend,
      linkTokenError,
      isPaymentInitiation,
    },
  } = useSelector((state) => state.plaid);
  return (
    <div className="grid_">
      <h3 className="plaid-app_title">Transfers with Plaid</h3>
      {!linkSuccess ? (
        <>
          <h4 className="plaid-app_subtitle">
            A sample end-to-end integration with Plaid
          </h4>
          <p className="introPar">
            The Plaid flow begins when your user wants to connect their bank
            account to your app. Simulate this by clicking the button below to
            launch Link - the client-side component that your users will
            interact with in order to link their accounts to Plaid and allow you
            to access their accounts via the Plaid API.
          </p>
          {/* message if backend is not running and there is no link token */}
          {!backend ? (
            <Callout warning>
              Unable to fetch link_token: please make sure your backend server
              is running and that your .env file has been configured with your
              <code>PLAID_CLIENT_ID</code> and <code>PLAID_SECRET</code>.
            </Callout>
          ) : /* message if backend is running and there is no link token */
          linkToken == null && backend ? (
            <Callout warning>
              <div>
                Unable to fetch link_token: please make sure your backend server
                is running and that your .env file has been configured
                correctly.
              </div>
              <div>
                If you are on a Windows machine, please ensure that you have
                cloned the repo with{" "}
                <InlineLink
                  href="https://github.com/plaid/quickstart#special-instructions-for-windows"
                  target="_blank"
                >
                  symlinks turned on.
                </InlineLink>{" "}
                You can also try checking your{" "}
                <InlineLink
                  href="https://dashboard.plaid.com/activity/logs"
                  target="_blank"
                >
                  activity log
                </InlineLink>{" "}
                on your Plaid dashboard.
              </div>
              <div>
                Error Code: <code>{linkTokenError.error_code}</code>
              </div>
              <div>
                Error Type: <code>{linkTokenError.error_type}</code>{" "}
              </div>
              <div>Error Message: {linkTokenError.error_message}</div>
            </Callout>
          ) : linkToken === "" ? (
            <div className="linkButton">
              <Button large disabled>
                Loading...
              </Button>
            </div>
          ) : (
            <div className="linkButton">
              <AuthLink />
            </div>
          )}
        </>
      ) : (
        <>
          {isPaymentInitiation ? (
            <>
              <h4 className="subtitle">
                Congrats! Your payment is now confirmed.
                <p />
                <Callout>
                  You can see information of all your payments in the{" "}
                  <InlineLink
                    href="https://dashboard.plaid.com/activity/payments"
                    target="_blank"
                  >
                    Payments Dashboard
                  </InlineLink>
                  .
                </Callout>
              </h4>
              <p className="requests">
                Now that the 'payment_id' stored in your server, you can use it
                to access the payment information:
              </p>
            </>
          ) : (
            /* If not using the payment_initiation product, show the item_id and access_token information */ <>
              {isItemAccess ? (
                <h4 className="subtitle">
                  Congrats! Your Transfer is all set. Here are the details. ....
                  add details table below
                  <Link to={"/personal"}>
                    <button>Back to your account</button>
                  </Link>
                </h4>
              ) : (
                <h4 className="subtitle">
                  <Callout warning>
                    Unable to create an item. Please check your backend server
                  </Callout>
                </h4>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

Header.displayName = "Header";

export default Header;
