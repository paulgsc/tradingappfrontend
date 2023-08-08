import { useNavigate } from "react-router";
import { Code } from "./Code";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { notify } from "../../../../../../lib/utils";
import {
  useCurrentUser,
  verifyUserEnrolled,
} from "../../../../../../hooks/firebase-hooks";
import { gmailLogin } from "../../../../../../contexts/redux/actions/userActions";

export function CodeSignIn({ verificationId, resolver, redirect }) {
  const user = useCurrentUser();
  const dispatch = useDispatch();
  const { loading, userInfo: { token = "" } = {} } = useSelector(
    (state) => state.userAuth
  );
  const navigate = useNavigate();

  async function getCode(code) {
    const response = await verifyUserEnrolled(
      {
        verificationId,
        resolver,
      },
      code
    );

    if (response) {
      notify("Two factor success");
    } else {
      notify("Something went wrong.");
    }
  }
  useEffect(() => {
    if (token) {
      navigate(redirect);
    }
    if (user?.email) {
      dispatch(gmailLogin(user));
    }
  }, [token, user]);
  return <Code getCode={getCode} />;
}
