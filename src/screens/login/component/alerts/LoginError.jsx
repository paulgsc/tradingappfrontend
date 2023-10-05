import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useSelector } from "react-redux";

function LoginError() {
  const { error = null } = useSelector((state) => state.userAuth);
  const regex = /(status code)/i;
  const msg = regex.test(error) ? "Invalid request" : error;
  useEffect(() => {
    error &&
      toast.error(msg, {
        duration: 5000,
        position: "top-center",
        className: "bg-gradient-to-r from-pink-100 to-red-500",
      });
  }, [error, msg]);
  return (
    <>
      <Toaster />
    </>
  );
}

export default LoginError;
