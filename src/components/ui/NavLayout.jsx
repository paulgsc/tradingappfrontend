import BannerNotification from "./BannerNotification";

function NavLayout({ children }) {
  return (
    <section className="w-full sticky top-0 z-50 bg-white">
      {children}
      <BannerNotification />
    </section>
  );
}

export default NavLayout;
