import { useNavigate } from "react-router";
import { Code } from "./Code";
import { notify } from "../../lib/utils";
import { enrollUser } from "../../hooks/firebase-hooks";

export function CodeSignup({ currentUser, verificationCodeId }) {
  const navigate = useNavigate();

  async function getCode(code) {
    const response = await enrollUser(currentUser, verificationCodeId, code);

    if (response) {
      navigate("/user");
    } else {
      notify("Something went wrong.");
    }
  }

  return <Code getCode={getCode} />;
}
