import { Link } from "react-router-dom";
import { appIcon } from "../../../../assets";

function ModelsCard({ model }) {
  return (
    <Link
      to={`/models/${model?.name}/list-view`}
      className="relative group bg-gray-900 py-10 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-lg shadow-inner outline outline-neutral-800/60 scale-75 hover:scale-95 hover:bg-pink-900/40 hover:outline-neutral-100/20 hover:smooth-hover transition-all duration-300 ease-in-out"
    >
      <img
        className="w-20 h-20 object-cover object-center rounded-full"
        src={appIcon}
        alt="cuisine"
      />
      <h4 className="text-white text-2xl font-bold capitalize text-center">
        {model?.name}
      </h4>
      <p className="text-white/50">{`${model?.record_count || 0} records`}</p>
      <p className="absolute top-2 text-white/20 inline-flex items-center text-xs">
        {" "}
        <span className="ml-2 w-2 h-2 block bg-green-500 rounded-full group-hover:animate-pulse"></span>
      </p>
    </Link>
  );
}

export default ModelsCard;
