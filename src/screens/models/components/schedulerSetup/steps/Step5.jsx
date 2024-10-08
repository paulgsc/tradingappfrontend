function Step5() {
  return (
    <div className="bg-green-100 rounded-md p-3 flex">
      <svg
        className="stroke-2 stroke-current text-green-600 h-8 w-8 mr-2 flex-shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M0 0h24v24H0z" stroke="none" />
        <circle cx="12" cy="12" r="9" />
        <path d="M9 12l2 2 4-4" />
      </svg>

      <div className="text-green-700">
        <div className="font-bold text-xl">Your settings has been saved!</div>

        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut facilisis
          sollicitudin dui vel gravida. Fusce faucibus, elit sit amet porttitor
          vehicula, urna nisi dapibus tellus, a tincidunt velit mi quis nulla.
        </div>
      </div>
    </div>
  );
}

export default Step5;
