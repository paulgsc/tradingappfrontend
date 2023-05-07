import React from "react";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { gmailRegister } from "../../contexts/redux/actions/userActions";
import { useEffect } from "react";

function GoogleSignUp() {
  const dispatch = useDispatch();
  function handleCredentialResponse(response) {
    const gmailInfo = jwt_decode(response.credential);
    dispatch(gmailRegister(gmailInfo));
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "583245376877-6o3icnabhu6gqbiabjs22tj6tbs0vuar.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" } // customization attributes
    );
  }, []);

  return <div id="buttonDiv"></div>;
}

export default GoogleSignUp;
