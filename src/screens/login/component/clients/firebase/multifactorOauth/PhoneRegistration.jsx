import { useRef } from "react";
import { useNavigate } from "react-router";

export function PhoneRegistration({ getPhoneNumber }) {
  const navigate = useNavigate();
  const phoneNumber = useRef(null);

  function handleClick() {
    if (phoneNumber.current) {
      getPhoneNumber(phoneNumber.current.value);
    }
  }

  // phoneInput.addEventListener("input", () => {
  //   const phoneNumber = phoneInput.value.replace(/[^\d]/g, ""); // Remove non-digit characters
  //   if (phoneNumber.length >= 3 && phoneNumber.length <= 9) {
  //     // Format for 3-9 digits: 123456789 -> 123-456-789
  //     phoneInput.value = phoneNumber.replace(/(\d{3})(\d{0,3})(\d{0,4})/, (_, p1, p2, p3) => {
  //       let parts = [p1];
  //       if (p2) parts.push(p2);
  //       if (p3) parts.push(p3);
  //       return parts.join("-");
  //     });
  //   } else if (phoneNumber.length >= 10) {
  //     // Format for 10+ digits: 1234567890 -> 123-456-7890
  //     phoneInput.value = phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  //   }
  // });

  return (
    <div className="flex sm:justify-center items-center px-4 sm:px-0">
      <div className="bg-white flex flex-col p-5 md:p-6  border-2 shadow-md shadow-gray-100/10  border-palladium rounded-xl w-full sm:max-w-[440px]">
        <div className="flex flex-col justify-between">
          <h1 className="font-medium text-[22px] leading-[130%] md:mr-8">
            Provide your phone
          </h1>
          <p className="text-slate-500 mt-2 text-base">
            Enter a phone number to receive an sms code.
          </p>
        </div>
        <div className="space-y-4 my-6">
          <div className="relative flex items-center">
            <div
              weight="fill"
              className="w-6 h-6 absolute left-4 inset-y-0 my-auto"
            />
            <input
              ref={phoneNumber}
              type="text"
              name="password"
              id="password"
              placeholder="Enter phone number"
              className="focus:outline-none block w-full rounded-xl placeholder-gray-500 bg-gray-100 pl-12 pr-4 h-12 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-black"
            />
          </div>
        </div>
        <div className="flex justify-between mt-4 gap-x-4">
          <button
            onClick={() => navigate("/personal")}
            className="rounded-xl flex gap-x-4 mb-8 text-black h-11 w-1/2 items-center justify-center px-6 border border-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleClick}
            className="bg-black rounded-xl flex h-11 w-1/2 items-center justify-center px-6"
          >
            <span className="text-base font-light text-white">Send SMS</span>
          </button>
        </div>
      </div>
    </div>
  );
}
