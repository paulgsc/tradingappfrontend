import LoginSettings from "../data/LoginSettings";
import AuthenticationSideMenu from "../ui/AuthenticationSideMenu";

function Authentication() {
  return (
    <section className="flex flex-1 items-start justify-center mx-6 mt-2 space-x-4">
      <AuthenticationSideMenu />
      <LoginSettings />
    </section>
  );
}

export default Authentication;
