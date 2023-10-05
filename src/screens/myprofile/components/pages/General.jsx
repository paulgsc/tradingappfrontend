import ProfileHome from "../ui/ProfileHome";
import SideNav from "../ui/SideNav";

function General() {
  return (
    <main className="grid grid-cols-6">
      <SideNav />
      <ProfileHome />
    </main>
  );
}

export default General;
