import BalanceBreakdownData from "../data/BalanceBreakdownData";
import ProfileData from "../data/ProfileData";
import UserEvents from "../data/UserEvents";
import BalanceCard from "./BalanceCard";
import PortfolioCard from "./PortfolioCard";
import QuickAccess from "./QuickAccess";
import UserTitleCard from "./UserTitleCard";

function DashboardLayout() {
  return (
    <section className="z-10 min-w-full min-h-screen bg-gradient-to-tl from-blue-50 via-white to-blue-50 p-12">
      <div className="flex bg-white max-h-full h-[720px] rounded-[2rem] border-2 shadow-sm ">
        <aside className="w-72 h-full max-w-xs bg-white py-12 rounded-[2rem]">
          <nav className="w-full h-full flex flex-col items-center gap-12 border-r-2">
            <ProfileData />
            <QuickAccess />
          </nav>
        </aside>
        <section className="flex w-full h-full rounded-[2rem] bg-[#e6f7e0] overflow-hidden">
          <main className="w-full h-full px-6 py-12 rounded-r-[2rem] bg-slate-50">
            <UserTitleCard />
            <section className="w-full h-full  space-y-4 py-6 overflow-auto no-scrollbar">
              <aside className="flex max-2xl:flex-col max-2xl:items-center items-end justify-center gap-4 ">
                <BalanceCard />
                <BalanceBreakdownData />
              </aside>
              <PortfolioCard />
            </section>
          </main>
          <aside className="w-96 max-w-sm  h-full overflow-y-auto no-scrollbar">
            <article className="flex flex-col gap-2 items-center">
              <header className="sticky top-0 z-10 w-full py-2 text-center h-12 bg-[#e6f7e0]">
                <h1 className="font-medium text-lg text-teal-700 w-full h-full mt-2">
                  My Timeline
                </h1>
              </header>
              <UserEvents />
            </article>
          </aside>
        </section>
      </div>
    </section>
  );
}

export default DashboardLayout;
