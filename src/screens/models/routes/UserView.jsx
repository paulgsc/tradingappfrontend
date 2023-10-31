import { useLocation, useParams } from "react-router";
import Navbar from "../../adminDashboard/components/ui/Navbar";
import UserProfilePage from "../components/ui/UserProfilePage";
import NavLayout from "../../../components/ui/NavLayout";

function UserView() {
  const location = useLocation();
  const { model } = useParams();

  if (
    model === "UserProfile" &&
    location.pathname === `/models/${model}/user/form-view`
  )
    return (
      <>
        <NavLayout>
          <Navbar />
        </NavLayout>
        <main className="flex justify-center p-1">
          <UserProfilePage />
        </main>
      </>
    );
}

export default UserView;
