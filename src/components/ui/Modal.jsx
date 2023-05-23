import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

const Modal = ({ title, body, Footer }) => {
  const [showModal, setShowModal] = useState(true);
  const modalRef = useRef(null);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const hanldeClickOutsideModal = (event) => {
    const input = document.getElementById("inputshares");
    const slider = document.getElementById("inputSlider");
    if (input.contains(event.target) || slider.contains(event.target)) {
      setShowModal(true);
      return;
    }
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      showModal && setShowModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", hanldeClickOutsideModal);

    return () => {
      document.removeEventListener("click", hanldeClickOutsideModal);
    };
  }, []);

  return (
    <div className="absolute flex items-center justify-center">
      {showModal && (
        <div
          id="defaultModal"
          tabIndex="-1"
          aria-hidden="true"
          className="z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full"
          ref={modalRef}
        >
          <div className="relative w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <Modal.Header handleCloseModal={handleCloseModal} title={title} />

              <Modal.Content body={body} />
              <Modal.Footer Footer={Footer} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Modal.Header = ({ handleCloseModal, title }) => (
  <div className=" flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
    <h3 className="text-xl xl:text-2xl font-semibold text-gray-900 dark:text-white">
      {title}
    </h3>
    <button
      type="button"
      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
      data-modal-hide="defaultModal"
      onClick={handleCloseModal}
    >
      <svg
        aria-hidden="true"
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span className="sr-only">Close modal</span>
    </button>
  </div>
);

Modal.Content = ({ body }) => <div className="p-6 space-y-6">{body}</div>;

Modal.Footer = ({ Footer }) => <>{Footer}</>;

export default Modal;
