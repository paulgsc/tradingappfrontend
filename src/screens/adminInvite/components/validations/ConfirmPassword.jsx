import { useDispatch } from "react-redux";
import AdminRegisterLayout from "../pageLayouts/AdminRegisterLayout";
import { createAdminUser } from "../../../../contexts/redux/actions/adminActions";
import { useSearchParams } from "react-router-dom";

function ConfirmPassword({ adminEmail }) {
  const dispatch = useDispatch();
  const [queryParameters] = useSearchParams();
  const handleSubmit = (e, password) => {
    e.preventDefault();
    const formdata = {
      admin_token: queryParameters.get("sessionId"),
      password: password,
    };
    dispatch(createAdminUser(formdata));
  };
  return (
    <AdminRegisterLayout handleSubmit={handleSubmit} adminEmail={adminEmail} />
  );
}

export default ConfirmPassword;
