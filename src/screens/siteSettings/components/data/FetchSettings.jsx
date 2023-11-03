import { useSelector } from "react-redux";
import { fetchSiteSettings } from "../../hooks/reactQuery";
import SkeletonLoading from "../../../../components/loading/SkeletonLoading";

function FetchSettings({ children }) {
  const { userInfo: { token = "" } = {} } = useSelector(
    (state) => state.userAuth
  );
  const { isLoading } = fetchSiteSettings(token);
  if (isLoading) return <SkeletonLoading size={12} />;
  return <>{children}</>;
}

export default FetchSettings;
