import { useSelector } from "react-redux";
import Step2 from "../ui/Step2";
import { useState } from "react";

function ValidateStep2({ setAdditionalIPs, setDisableContinue }) {
  const [isValid, setIsValid] = useState(false);
  const { userInfo: { ip_address } = {} } = useSelector(
    (state) => state.userAuth
  );

  const ipRegex =
    /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$|^::1$|^(?:(?:[a-fA-F0-9]{1,4}:){6}(?:(?:25[0-5]|(?:2[0-4]|1?[0-9])?[0-9])\.?){4}|(?=(?:[a-fA-F0-9]{1,4}:){0,5}[a-fA-F0-9]{1,4}$)(([0-9a-fA-F]{1,4}:){1,5}|:)((:[0-9a-fA-F]{1,4}){1,5}:|:)((25[0-5]|(2[0-4]|1?[0-9])?[0-9])\.?){4}|(?=(?:[a-fA-F0-9]{1,4}:){0,3}[a-fA-F0-9]{1,4}$)([0-9a-fA-F]{1,4}:){0,4}:((25[0-5]|(2[0-4]|1?[0-9])?[0-9])\.?){4})$/;

  // Function to validate if the input is a valid IP address
  const isValidIP = (input) => {
    return ipRegex.test(input);
  };

  const handleInput = (e) => {
    e.preventDefault();
    const storedIp = isValidIP(ip_address);
    if (storedIp && !e.target.value.includes(ip_address)) {
      return;
    }
    const addresses = e.target.value.split(",");
    const invalidInput = addresses.find((address) => {
      return !isValidIP(address);
    });
    setIsValid(invalidInput === undefined);
    setDisableContinue(typeof invalidInput !== "undefined");
    if (typeof invalidInput !== "undefined") return;
    setAdditionalIPs(e.target.value);
  };
  return <Step2 handleInput={handleInput} isValid={isValid} />;
}

export default ValidateStep2;
