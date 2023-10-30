import { useLocation, useNavigate } from "react-router";
import Dialog from "../../../../components/ui/Dialog";
import { fetchDjangoAdminLink } from "../../hooks/react_query";
import { useSelector } from "react-redux";

function DjangoLink() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo: { token } = {} } = useSelector((state) => state.userAuth);

  const { data: { admin_link } = {} } = fetchDjangoAdminLink(token);
  const onClose = () => {
    navigate(location.pathname);
  };
  return (
    <Dialog onClose={onClose}>
      <section className="bg-white w-full max-w-md h-full max-h-32 rounded-lg p-6 shadow-lg outline outline-neutral-200">
        <div className="w-full items-start">
          <div>
            <label
              htmlFor="django-link"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Link to Django Admin
            </label>
            <input
              type="text"
              name="django-link"
              id="django-link"
              defaultValue={admin_link}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              disabled
            />
          </div>
        </div>
      </section>
    </Dialog>
  );
}

export default DjangoLink;
