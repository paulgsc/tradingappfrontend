import { Link, useParams } from "react-router-dom";

function LinkGsheet() {
  const { model } = useParams();
  return (
    <footer className="flex justify-end px-8 pb-8 pt-4">
      <Link
        to={`/models/${model}/uploads/gsheets/setup`}
        type="submit"
        className="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none"
      >
        Schedule upload
      </Link>
    </footer>
  );
}

export default LinkGsheet;
