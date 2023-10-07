import { useDispatch, useSelector } from "react-redux";
import { addIPAddress } from "../../../../contexts/redux/actions/adminActions";
import Step3 from "../ui/Step3";
import { useEffect } from "react";

function ValidateStep3({ additionalIPs }) {
  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector(
    (state) => state.adminActions
  );

  useEffect(() => {
    if (additionalIPs) dispatch(addIPAddress(additionalIPs));
  }, [dispatch, additionalIPs]);

  return (
    <Step3 loading={loading} successMessage={successMessage} error={error} />
  );
}

export default ValidateStep3;
