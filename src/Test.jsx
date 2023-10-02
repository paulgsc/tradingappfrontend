import { getIdToken } from "firebase/auth";
import { useCurrentUser } from "./hooks/firebase-hooks";
import Dialog from "./components/ui/Dialog";

function Test() {
  const { user, loading } = useCurrentUser();

  console.log(user, loading);
  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center">
      foo foo
      <Dialog />
    </div>
  );
}

export default Test;
