function Test() {
  return (
    <main className="w-full h-full min-h-screen">
      <aside className="fixed left-0 w-40 p-2 h-full bg-gray-500">
        <nav className="w-full flex justify-end mt-12">
          <ul>
            <li className="group relative flex justify-center items-center bg-white h-24 w-24 rounded-full animate-[bouncy_2s_ease-in-out_infinite]">
              <svg
                className="w-12 h-12 text-gray-600 group-hover:animate-[tada_2s_ease-in-out]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 21"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m9.046 3.59-.435-2.324m.435 2.324a5.338 5.338 0 0 1 6.033 4.333l.331 1.77c.439 2.344 2.383 2.587 2.599 3.76.11.586.22 1.171-.309 1.271L5 17.101c-.529.1-.639-.488-.749-1.074-.219-1.172 1.506-2.102 1.067-4.447l-.331-1.769a5.338 5.338 0 0 1 4.059-6.22Zm-7.13 4.602a8.472 8.472 0 0 1 2.17-5.048m2.646 13.633A3.472 3.472 0 0 0 13.46 16l.089-.5-6.817 1.277Z"
                />
              </svg>
              <span className="  group-hover:animate-[rubberBand_2s_ease-in-out] absolute -top-2.5 left-0 w-10 h-10 inline-flex justify-center items-center rounded-full text-center text-lg font-bold text-white bg-red-600 ring ring-white">
                23
              </span>
            </li>
          </ul>
        </nav>
      </aside>
    </main>
  );
}

export default Test;
