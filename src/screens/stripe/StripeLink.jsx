import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startStripeSession } from "../../contexts/redux/actions/stripeAction";

function StripeLink() {
  const dispatch = useDispatch();
  const {
    stripeInfo: {
      url: { url },
    },
  } = useSelector((state) => state.stripe);

  // useEffect(() => {
  //   dispatch(startStripeSession(1));
  // }, []);

  useEffect(() => {
    if (false) {
      window.location.href = url;
    }
  }, [url]);

  return <div>foo</div>;
}

export default StripeLink;
