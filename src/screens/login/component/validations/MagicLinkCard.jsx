import { useEffect, useState } from "react";
import SuccessCard from "../../../../components/ui/SuccessCard";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

function MagicLinkCard() {
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams();
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    let timeoutId;

    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(countdown); // Stop the countdown when it reaches 0
      }
    }, 1000); // Update every 1 second (1000 milliseconds)
    const path = queryParameters.get("redirect") || "/";
    timeoutId = setTimeout(() => navigate(path), 3000);
    return () => {
      clearTimeout(timeoutId);
      clearInterval(countdown);
    };
  }, [navigate, queryParameters, seconds]);

  return <SuccessCard timer={seconds} />;
}

export default MagicLinkCard;
