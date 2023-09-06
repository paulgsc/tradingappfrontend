import FormView from "./routes/FormView";
import Home from "./routes/Home";
import ListView from "./routes/ListView";
import UploadsView from "./routes/UploadsView";

function IndexModels() {
  return (
    <>
      <Home />
      <ListView />
      <UploadsView />
      <FormView />
    </>
  );
}

export default IndexModels;
