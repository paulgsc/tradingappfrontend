import { useLocation, useParams } from "react-router";
import Navbar from "../components/ui/Navbar";
import ModelEditSidebar from "../components/ui/ModelEditSidebar";
import ModelEditForm from "../components/ui/ModelEditForm";
import { useState } from "react";
import NavLayout from "../../../components/ui/NavLayout";

function FormView() {
  const location = useLocation();
  const { model } = useParams();

  const [globalFilter, setGlobalFilter] = useState("");
  if (model && location.pathname == `/models/${model}/form-view`) {
    return (
      <div className="w-full">
        <NavLayout>
          <Navbar
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </NavLayout>

        <section className=" min-h-screen flex bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100">
          <nav className="w-56 border-r-2">
            <ModelEditSidebar />
          </nav>
          <ModelEditForm />
        </section>
      </div>
    );
  }
  return <></>;
}

export default FormView;
