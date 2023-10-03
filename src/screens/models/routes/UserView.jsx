import { useLocation, useParams } from "react-router";
import Navbar from "../../adminDashboard/components/ui/Navbar";
import UserProfilePage from "../components/ui/UserProfilePage";

function UserView() {
  const location = useLocation();
  const { model } = useParams();

  if (
    model === "UserProfile" &&
    location.pathname === `/models/${model}/user/form-view`
  )
    return (
      <>
        <section className="bg-white sticky top-0 z-50">
          <Navbar />
        </section>
        <main className="flex justify-center p-1">
          <UserProfilePage />
        </main>
      </>
    );
}

export default UserView;
