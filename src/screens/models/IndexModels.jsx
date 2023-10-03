import FormView from "./routes/FormView";
import Home from "./routes/Home";
import ListView from "./routes/ListView";
import UploadsView from "./routes/UploadsView";
import UserView from "./routes/UserView";

function IndexModels() {
  return (
    <>
      <Home />
      <ListView />
      <UploadsView />
      <FormView />
      <UserView />
    </>
  );
}

export default IndexModels;
