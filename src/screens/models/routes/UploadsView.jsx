import { useLocation, useParams } from "react-router";
import UploadNavs from "../components/ui/UploadNavs";
import Navbar from "../components/ui/Navbar";
import UploadForm from "../components/ui/UploadForm";
import AutoUploadTabs from "../components/ui/AutoUploadTabs";
import WorkFlows from "../components/gsheets/WorkFlows";
import SchedulerSetup from "../components/schedulerSetup/SchedulerSetup";
import { useState } from "react";

function UploadsView() {
  const locaton = useLocation();
  const { model, params } = useParams();
  const [globalFilter, setGlobalFilter] = useState("");
  if (locaton.pathname.includes(`/models/${model}/uploads`)) {
    return (
      <>
        <section>
          <Navbar
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </section>
        <div className="min-h-screen xl:m-12 space-x-4">
          <section className="relative w-full rounded-md outline outline-neutral-200 shadow-inner p-4 ">
            <header className=" flex flex-col flex-1 space-y-2 m-2 border-b border-neutral-200">
              <h1 className="font-bold text-lg md:text-xl xl:text-2xl">
                File Uploads
              </h1>
              <h3 className="font-normal text-base xl:text-lg text-neutral-400">
                Manage your database uploads from spreadsheets
              </h3>
            </header>
            <main className="grid grid-cols-12 space-x-2 m-2">
              <UploadNavs />
              {model && locaton.pathname === `/models/${model}/uploads` && (
                <UploadForm />
              )}
              {locaton.pathname.includes(
                `/models/${model}/uploads/gsheets`
              ) && (
                <>
                  <AutoUploadTabs />
                  {params === "setup" && <SchedulerSetup />}
                </>
              )}
              {locaton.pathname ===
                `/models/${model}/uploads/scheduled-actions` && <WorkFlows />}
            </main>
          </section>
        </div>
      </>
    );
  }
  return <></>;
}

export default UploadsView;
