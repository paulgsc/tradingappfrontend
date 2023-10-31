import { useSelector } from "react-redux";
import Orders from "./screens/userHistory/routes/orders/Orders";
import jwtDecode from "jwt-decode";

function Test() {
  console.log("component rendered");
  const { userInfo: { token } = {} } = useSelector((state) => state.userAuth);
  const { exp, email_verified, session_id } =
    typeof token === "string" ? jwtDecode(token) : {};
  console.log("token: ", token, "verified: ", email_verified);

  return (
    <main>
      <Orders />
    </main>
  );
}

export default Test;
