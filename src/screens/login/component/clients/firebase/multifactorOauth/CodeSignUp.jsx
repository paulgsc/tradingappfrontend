import { useNavigate } from "react-router";
import { Code } from "./Code";
import { enrollUser } from "../../../../../../hooks/firebase-hooks";
import { notify } from "../../../../../../lib/utils";

export function CodeSignup({ currentUser, verificationCodeId }) {
  const navigate = useNavigate();

  async function getCode(code) {
    try {
      const response = await enrollUser(currentUser, verificationCodeId, code);
      console.log("foo");
      if (response) {
        navigate("/personal/settings");
      } else {
        notify("Something went wrong.");
      }
    } catch (error) {
      notify(error?.code);
      throw error;
    }
  }

  return <Code getCode={getCode} />;
}
