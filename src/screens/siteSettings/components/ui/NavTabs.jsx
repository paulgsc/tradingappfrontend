import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function NavTabs() {
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams();
  const location = useLocation();

  const handleTab = (tabId) => {
    const currentSearchParams = new URLSearchParams(queryParameters);
    currentSearchParams.has("tab")
      ? currentSearchParams.set("tab", tabId)
      : currentSearchParams.append("tab", tabId);
    navigate(`${location.pathname}?${currentSearchParams.toString()}`);
  };
  const headers = [
    {
      id: "tab1",
      title: "Authentication",
      path: "/test",
    },
    {
      id: "tab2",
      title: "Security & privacy",
      path: "/test",
    },
    {
      id: "tab3",
      title: "Personal Info",
      path: "/test",
    },
    {
      id: "tab4",
      title: "Advanced",
      path: "/test",
    },
  ];
  return (
    <ul className="inline-flex items-center space-x-12 p-0 m-0">
      {headers.map((link) => (
        <li
          role="tab"
          key={link.id}
          aria-selected={queryParameters.get("tab") === link.title}
          onClick={() => handleTab(link.title)}
          className="max-h-12 h-16 p-2 cursor-pointer aria-selected:content-none aria-selected:before:absolute aria-selected:before:bottom-0 aria-selected:before:w-10 aria-selected:before:h-1 aria-selected:before:rounded-full aria-selected:before:bg-blue-600 hover:content-none hover:before:absolute hover:before:bottom-0 hover:before:w-10 hover:before:h-1 hover:before:rounded-full hover:before:bg-blue-600/20 hover:outline hover:outline-zinc-100 hover:rounded-t-lg hover:shadow-sm hover:bg-zinc-100 "
        >
          {link.title}
        </li>
      ))}
    </ul>
  );
}

export default NavTabs;
