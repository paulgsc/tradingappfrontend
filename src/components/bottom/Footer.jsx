import React from "react";
import { svgList } from "../../constants/svgs/Svg";
import { Link, useNavigate } from "react-router-dom";
import { footerLinks } from "../../constants/footer/footerConstants";

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-neutral-100 text-center text-neutral-600 dark:bg-neutral-600 dark:text-neutral-200 lg:text-left">
      <Footer.Links navigate={navigate} />
      <Footer.Copyright />
    </footer>
  );
}

Footer.Copyright = () => (
  <div className="flex items-center justify-between bg-neutral-50 h-12 px-12 text-center">
    <hr className=" invisible" />
    <div>
      <span>© 2023 Copyright:</span>

      <Link>
        <span className="text-sm font-bold">Leafiproperties.com</span>
      </Link>
    </div>
    <Footer.SocialIcons />
  </div>
);

Footer.SocialIcons = () => (
  <div className="flex items-center justify-end gap-4">
    {svgList.map((item) => (
      <span key={item.id}>{item.svg}</span>
    ))}
  </div>
);

Footer.Contact = () => (
  <div>
    <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
      Contact
    </h6>
    <p className="mb-4 flex items-center justify-center md:justify-start">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="mr-3 h-5 w-5"
      >
        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
      </svg>
      New York, NY 10012, US
    </p>
    <p className="mb-4 flex items-center justify-center md:justify-start">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="mr-3 h-5 w-5"
      >
        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
      </svg>
      info@example.com
    </p>
    <p className="mb-4 flex items-center justify-center md:justify-start">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="mr-3 h-5 w-5"
      >
        <path
          fill-rule="evenodd"
          d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
          clip-rule="evenodd"
        />
      </svg>
      + 01 234 567 88
    </p>
    <p className="flex items-center justify-center md:justify-start">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="mr-3 h-5 w-5"
      >
        <path
          fill-rule="evenodd"
          d="M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.426.053-.851.11-1.274.174-1.454.218-2.476 1.483-2.476 2.917v6.294a3 3 0 003 3h.27l-.155 1.705A1.875 1.875 0 007.232 22.5h9.536a1.875 1.875 0 001.867-2.045l-.155-1.705h.27a3 3 0 003-3V9.456c0-1.434-1.022-2.7-2.476-2.917A48.716 48.716 0 0018 6.366V3.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM16.5 6.205v-2.83A.375.375 0 0016.125 3h-8.25a.375.375 0 00-.375.375v2.83a49.353 49.353 0 019 0zm-.217 8.265c.178.018.317.16.333.337l.526 5.784a.375.375 0 01-.374.409H7.232a.375.375 0 01-.374-.409l.526-5.784a.373.373 0 01.333-.337 41.741 41.741 0 018.566 0zm.967-3.97a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H18a.75.75 0 01-.75-.75V10.5zM15 9.75a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V10.5a.75.75 0 00-.75-.75H15z"
          clip-rule="evenodd"
        />
      </svg>
      + 01 234 567 89
    </p>
  </div>
);

Footer.Links = ({ navigate }) => (
  <div className="h-full border-b">
    <div className="flex justify-center w-full h-full">
      {footerLinks.map((item) => (
        <div key={item.id} className="flex flex-col items-start h-full w-1/6">
          <span className="py-2 h-full w-full text-base xl:text-lg text-slate-900">
            {item.title}
          </span>
          <div className="flex flex-col items-start w-full ml-2 gap-3">
            {item.content.map((item) => (
              <span
                className="flex items-center mb-1 gap-1 w-full text-xs xl:text-base cursor-pointer hover:text-slate-950"
                key={item.id}
                onClick={(e) => {
                  e.preventDefault();
                  if (item.link) {
                    window.open(item.link);
                  } else {
                    navigate(item.path);
                  }
                }}
              >
                {item.title}
                {item.link && (
                  <i className="fas fa-external-link-alt fa-sm text-blue-400"></i>
                )}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Footer;
