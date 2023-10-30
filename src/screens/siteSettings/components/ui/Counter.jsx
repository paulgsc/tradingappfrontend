import { useEffect, useState } from "react";
import { reduceTokenDuration } from "../../../../lib/utils";

function Counter({ handleSubmit = () => {}, initial = 0 }) {
  const { title, duration } = reduceTokenDuration(initial);
  const [counter, setCounter] = useState(duration);
  const [type, setType] = useState(title);

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "" || (value >= 0 && value <= 1000)) {
      if (isNaN(parseInt(value))) {
        setCounter(0);
        return;
      }
      setCounter(parseInt(value));
      return;
    }
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    setCounter((prevCounter) =>
      prevCounter >= 5000 ? prevCounter : prevCounter + 1
    );
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    setCounter((prevCounter) =>
      prevCounter <= 0 ? prevCounter : prevCounter - 1
    );
  };

  useEffect(() => {
    setCounter(duration);
    setType(title);
  }, [initial, duration, title]);

  const counterType = ["seconds", "minutes", "hours", "days", "weeks"];

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e, { units: type, duration: counter });
      }}
      className="flex items-center  p-2"
    >
      <div
        tabIndex={-1}
        className="relative group mr-6 capitalize font-semibold leading-3 border rounded-lg p-2 bg-slate-200  cursor-pointer w-28 focus:border-2 focus:border-black "
      >
        <span className="w-20 text-center"> {type}</span>
        <ul className="hidden  absolute group-focus-within:flex flex-col gap-2 top-12 bg-white z-50 shadow-lg rounded-md h-32 w-20">
          {[...counterType.filter((item) => item !== type)].map((item, i) => (
            <li
              key={i}
              onClick={() => setType(item)}
              className="z-50 px-2 hover:text-white hover:bg-slate-400 border-b cursor-pointer text-base"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleIncrement}
        className="hover:shadow-md h-8 w-8 text-center text-xl hover:text-white hover:bg-orange-300"
      >
        +
      </button>
      <input
        className="border h-8 w-20 focus:ring-2 ring-blue-400 text-end text-xl p-1 bg-gray-200 focus:bg-transparent"
        type="text"
        onChange={handleChange}
        value={counter}
      />
      <button
        onClick={handleDecrement}
        className="hover:shadow-md h-8 w-8 text-xl text-center hover:text-white hover:bg-orange-300"
      >
        -
      </button>
      <button
        type="submit"
        disabled={counter === initial}
        className=" disabled:cursor-not-allowed disabled:opacity-20 ml-12 p-2 bg-indigo-600 hover:bg-indigo-800 rounded-md text-white text-sm w-16 h-10"
      >
        Save
      </button>
    </form>
  );
}

export default Counter;
