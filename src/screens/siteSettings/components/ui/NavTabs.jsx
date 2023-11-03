import { useLocation, useNavigate } from "react-router-dom";

function NavTabs() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleTab = (path) => {
    navigate(path);
  };
  const headers = [
    {
      id: "overview",
      title: "Company Info",
      path: "/admin/site-settings/overview/info",
    },
    {
      id: "security",
      title: "Security & privacy",
      path: "/admin/site-settings/security/authentication",
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
          aria-selected={location.pathname.includes(link?.id)}
          onClick={() => handleTab(link.path)}
          className="max-h-12 h-16 p-2 cursor-pointer aria-selected:content-none aria-selected:before:absolute aria-selected:before:bottom-0 aria-selected:before:w-10 aria-selected:before:h-1 aria-selected:before:rounded-full aria-selected:before:bg-blue-600 hover:content-none hover:before:absolute hover:before:bottom-0 hover:before:w-10 hover:before:h-1 hover:before:rounded-full hover:before:bg-blue-600/20 hover:outline hover:outline-zinc-100 hover:rounded-t-lg hover:shadow-sm hover:bg-zinc-100 "
        >
          {link.title}
        </li>
      ))}
    </ul>
  );
}

export default NavTabs;
