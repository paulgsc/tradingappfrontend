import { useEffect } from "react";
import { FaBackspace } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { fetchLinkedAccounts } from "../../contexts/redux/actions/fetchDataActions";

const keyPad = [
  {
    id: "",
    val: "1",
  },
  {
    id: "",
    val: "2",
  },
  {
    id: "",
    val: "3",
  },
  {
    id: "",
    val: "4",
  },
  {
    id: "",
    val: "5",
  },
  {
    id: "",
    val: "6",
  },
  {
    id: "",
    val: "7",
  },
  {
    id: "",
    val: "8",
  },
  {
    id: "",
    val: "9",
  },
  {
    id: "",
    val: "0",
  },
  {
    id: "decimal",
    val: ".",
  },
  {
    id: "erase",
    val: <FaBackspace />,
  },
];

function KeyPad({ amount, setAmount, maxAmount }) {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    const eraaseElement = document.getElementById("erase");
    e.preventDefault();
    const clickedValue = e.target.innerText;

    if (eraaseElement.contains(e.target)) {
      if (amount.length === 1) {
        setAmount("0");
        return;
      }

      const newValue = amount.slice(0, -1);
      setAmount(newValue);
      return;
    } else if (clickedValue === ".") {
      if (amount.includes(".")) return;
      setAmount(amount + e.target.innerText);
    } else if (parseFloat(amount + clickedValue) > maxAmount) {
      return;
    } else if (amount.includes(".")) {
      const [intPart, decimalPart] = amount.split(".");
      if (decimalPart.length >= 2) return;
      setAmount(`${intPart}.${decimalPart}${clickedValue}`);
    } else {
      setAmount(amount === "0" ? clickedValue : amount + clickedValue);
    }
  };

  useEffect(() => {
    dispatch(fetchLinkedAccounts());
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-start w-full h-full ">
      <KeyPad.Amount amount={amount} />

      <KeyPad.Keys handleClick={handleClick} />
    </div>
  );
}

KeyPad.Amount = ({ amount }) => (
  <div className="flex items-center justify-center h-[30%] text-right rounded-xl shadow-xl bg-gray-200">
    <p className="font-thin text-base lg:text-6xl xl:text-8xl text-gray-400 dark:text-gray-500">
      {amount}
    </p>
  </div>
);

KeyPad.ReviewAmount = ({ transferAmount }) => (
  <div className="flex items-center justify-center text-right h-full  bg-transparent">
    <p className="font-thin text-base lg:text-6xl xl:text-8xl text-gray-700 dark:text-gray-900">
      {transferAmount}
    </p>
  </div>
);

KeyPad.Keys = ({ handleClick }) => (
  <div className="flex items-stretch justify-center h-[70%] rounded-3xl shadow-inner bg-gray-100">
    <div className="grid grid-cols-3 grid-rows-4 gap-2 m-0 w-full">
      {keyPad.map((key, index) => (
        <div
          key={index}
          className="flex items-center justify-center rounded p-2 xl:p-6 bg-gray-50 dark:bg-gray-800"
        >
          {key?.id !== "" ? (
            <button
              className="flex items-center justify-center text-center w-12 xl:w-20 h-12 xl:h-20 text-base lg:text-3xl xl:text-5xl  border rounded-full border-gray-200 hover:shadow-inner hover:ring-2 hover:ring-blue-400 hover:ring-opacity-50 hover:bg-indigo-300 hover:text-white text-gray-400 dark:text-gray-500"
              onClick={handleClick}
              id={key?.id}
            >
              {key.val}
            </button>
          ) : (
            <button
              className="flex items-center justify-center text-center w-12 xl:w-20 h-12 xl:h-20 text-base lg:text-4xl xl:text-6xl border rounded-full border-indigo-100 hover:shadow-inner hover:ring-2 hover:ring-blue-400 hover:ring-opacity-50 hover:bg-indigo-300 hover:text-white text-gray-400 dark:text-gray-500"
              onClick={handleClick}
            >
              {key.val}
            </button>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default KeyPad;
