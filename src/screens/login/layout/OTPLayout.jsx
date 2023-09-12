import EmailOTP from "../component/clients/sendgrid/EmailOTP";
import { useSelector } from "react-redux";
import WiggleLoader from "../../../components/loading/WiggleLoader";
import OTPAttempts from "../component/clients/sendgrid/OTPAttempts";

function OTPLayout() {
  const { loading = false } = useSelector((state) => state.userAuth);
  if (loading) {
    return (
      <div className="fixed inset-0 min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-200 via-stone-100 to-stone-300">
        <WiggleLoader />
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center space-x-4">
      <EmailOTP />
      <OTPAttempts />
    </div>
  );
}

export default OTPLayout;
