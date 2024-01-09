import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

const useTabNavigation = (tabParam, defaultTab) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [queryParameters] = useSearchParams();

  const handleTabClick = (tabId) => {
    const currentSearchParams = new URLSearchParams(queryParameters);
    if (currentSearchParams.has(tabParam)) {
      currentSearchParams.set(tabParam, tabId);
    } else {
      currentSearchParams.append(tabParam, tabId);
    }
    navigate(`${location.pathname}?${currentSearchParams.toString()}`);
  };

  const selectedTab = queryParameters.get(tabParam) || defaultTab;

  const isTabActive = (tabId) => {
    return selectedTab === tabId;
  };

  return {
    handleTabClick,
    isTabActive,
    selectedTab,
  };
};

export default useTabNavigation;
