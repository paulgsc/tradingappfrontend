import { AngleDownSVG } from "../../../../constants/svgs/Svg";
import NewNotifications from "./notification/NewNotifications";

function AddNewArcodian() {
  return (
    <section
      className={
        "flex flex-row-reverse  items-start gap-12 w-full border-gray-600/60"
      }
    >
      <details
        open
        className="relative peer group list-none  p-2 lg:p-3 xl:p-4 cursor-pointer w-full open:max-w-fit"
      >
        <summary className="inline-flex items-center w-full justify-end text-center gap-4 p-2 ">
          <h6 className="text-base font-normal capitalize">
            Add new notificatio
          </h6>{" "}
          <AngleDownSVG
            className={
              "w-3 h-3 text-neutral-400 rotate-180 group-open:rotate-0 transition-all duration-500"
            }
          />
        </summary>
      </details>
      <main className="hidden w-full peer-open:block p-2 blur-sm opacity-50 peer-open:blur-none peer-open:opacity-100 transition-all duration-500">
        <NewNotifications />
      </main>
    </section>
  );
}

export default AddNewArcodian;
