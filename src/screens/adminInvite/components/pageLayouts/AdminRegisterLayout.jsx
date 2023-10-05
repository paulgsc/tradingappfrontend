import { useSelector } from "react-redux";
import WiggleLoader from "../../../../components/loading/WiggleLoader";
import AdminRegisterForm from "../ui/AdminRegisterForm";
import ErrorToast from "../ui/ErrorToast";
import AdminRegisterSuccess from "../validations/AdminRegisterSuccess";

function AdminRegisterLayout({ handleSubmit, adminEmail }) {
  const { loading, createAdminResult } = useSelector(
    (state) => state.adminActions
  );

  if (loading) {
    return (
      <div className="fixed inset-0 min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-200 via-stone-100 to-stone-300">
        <WiggleLoader />
      </div>
    );
  }

  if (createAdminResult) return <AdminRegisterSuccess />;

  return (
    <>
      <AdminRegisterForm handleSubmit={handleSubmit} adminEmail={adminEmail} />
      <ErrorToast />
    </>
  );
}

export default AdminRegisterLayout;
