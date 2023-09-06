import React from "react";

function Documents() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <section className="container space-y-2 outline outline-neutral-200/60 shadow-inner rounded-md p-4">
        <header>
          <h3 className="font-bold">Property Deed</h3>
        </header>
        <summary className="h-28 overflow-clip">
          This legal document proves ownership of the property. It contains the
          property's legal description, the names of the owners, and any liens
          or encumbrances on the property. Disclosing the property deed ensures
          transparency about the property's ownership status.
        </summary>
        <footer className="container inline-flex space-x-12 p-2">
          <button
            type="button"
            className="w-fit text-white bg-blue-500/80 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center"
          >
            <svg
              className="-ml-0.5 mr-2 h-3 w-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 14"
            >
              <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
            </svg>
            View more
          </button>
          <button className="inline-flex items-center space-x-1 hover:bg-indigo-50">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 18a.969.969 0 0 0 .933 1h12.134A.97.97 0 0 0 15 18M1 7V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2v5M6 1v4a1 1 0 0 1-1 1H1m0 9v-5h1.5a1.5 1.5 0 1 1 0 3H1m12 2v-5h2m-2 3h2m-8-3v5h1.375A1.626 1.626 0 0 0 10 13.375v-1.75A1.626 1.626 0 0 0 8.375 10H7Z"
              />
            </svg>
            <i className="fas fa-external-link-alt fa-sm text-blue-400"></i>
          </button>
        </footer>
      </section>
      <section className="container space-y-2 outline outline-neutral-200/60 shadow-inner rounded-md p-4">
        <header>
          <h3 className="font-bold">Lease Agreements</h3>
        </header>
        <summary className="h-28 overflow-clip">
          Any active lease agreements between the property owner and current
          tenants should be disclosed. Lease agreements outline the terms,
          conditions, and responsibilities of both the landlord and tenant.
          Sharing this information helps potential investors understand the
          rental income and tenant-related obligations.
        </summary>
        <footer className="container inline-flex space-x-12 p-2">
          <button
            type="button"
            className="w-fit text-white bg-blue-500/80 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center"
          >
            <svg
              className="-ml-0.5 mr-2 h-3 w-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 14"
            >
              <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
            </svg>
            View more
          </button>
          <button className="inline-flex items-center space-x-1 hover:bg-indigo-50">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 18a.969.969 0 0 0 .933 1h12.134A.97.97 0 0 0 15 18M1 7V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2v5M6 1v4a1 1 0 0 1-1 1H1m0 9v-5h1.5a1.5 1.5 0 1 1 0 3H1m12 2v-5h2m-2 3h2m-8-3v5h1.375A1.626 1.626 0 0 0 10 13.375v-1.75A1.626 1.626 0 0 0 8.375 10H7Z"
              />
            </svg>
            <i className="fas fa-external-link-alt fa-sm text-blue-400"></i>
          </button>
        </footer>
      </section>
      <section className="container space-y-2 outline outline-neutral-200/60 shadow-inner rounded-md p-4">
        <header>
          <h3 className="font-bold">Financial Statements</h3>
        </header>
        <summary className="h-28 overflow-clip">
          Providing financial statements such as profit and loss statements,
          balance sheets, and cash flow reports gives investors insights into
          the property's financial performance. This includes details on rental
          income, expenses, and net profit, helping them make informed
          investment decisions.
        </summary>
        <footer className="container inline-flex space-x-12 p-2">
          <button
            type="button"
            className="w-fit text-white bg-blue-500/80 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center"
          >
            <svg
              className="-ml-0.5 mr-2 h-3 w-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 14"
            >
              <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
            </svg>
            View more
          </button>
          <button className="inline-flex items-center space-x-1 hover:bg-indigo-50">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 18a.969.969 0 0 0 .933 1h12.134A.97.97 0 0 0 15 18M1 7V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2v5M6 1v4a1 1 0 0 1-1 1H1m0 9v-5h1.5a1.5 1.5 0 1 1 0 3H1m12 2v-5h2m-2 3h2m-8-3v5h1.375A1.626 1.626 0 0 0 10 13.375v-1.75A1.626 1.626 0 0 0 8.375 10H7Z"
              />
            </svg>
            <i className="fas fa-external-link-alt fa-sm text-blue-400"></i>
          </button>
        </footer>
      </section>
      <section className="container space-y-2 outline outline-neutral-200/60 shadow-inner rounded-md p-4">
        <header>
          <h3 className="font-bold">Property Inspection Reports</h3>
        </header>
        <summary className="h-28 overflow-clip">
          Inspection reports, including recent assessments of the property's
          condition and any repairs or maintenance done, help potential
          investors understand the property's physical condition. This
          transparency can build trust and provide insights into potential
          maintenance costs.
        </summary>
        <footer className="container inline-flex space-x-12 p-2">
          <button
            type="button"
            className="w-fit text-white bg-blue-500/80 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center"
          >
            <svg
              className="-ml-0.5 mr-2 h-3 w-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 14"
            >
              <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
            </svg>
            View more
          </button>
          <button className="inline-flex items-center space-x-1 hover:bg-indigo-50">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 18a.969.969 0 0 0 .933 1h12.134A.97.97 0 0 0 15 18M1 7V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2v5M6 1v4a1 1 0 0 1-1 1H1m0 9v-5h1.5a1.5 1.5 0 1 1 0 3H1m12 2v-5h2m-2 3h2m-8-3v5h1.375A1.626 1.626 0 0 0 10 13.375v-1.75A1.626 1.626 0 0 0 8.375 10H7Z"
              />
            </svg>
            <i className="fas fa-external-link-alt fa-sm text-blue-400"></i>
          </button>
        </footer>
      </section>
      <section className="container space-y-2 outline outline-neutral-200/60 shadow-inner rounded-md p-4">
        <header>
          <h3 className="font-bold">Offering Memorandum or Prospectus</h3>
        </header>
        <summary className="h-28 overflow-clip">
          If you're allowing users to buy shares of the rental property, you
          should provide an offering memorandum or prospectus. This document
          outlines details about the investment opportunity, property details,
          potential risks, expected returns, ownership structure, and legal
          considerations. It helps investors understand the investment
          opportunity thoroughly.
        </summary>
        <footer className="container inline-flex space-x-12 p-2">
          <button
            type="button"
            className="w-fit text-white bg-blue-500/80 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center"
          >
            <svg
              className="-ml-0.5 mr-2 h-3 w-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 14"
            >
              <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
            </svg>
            View more
          </button>
          <button className="inline-flex items-center space-x-1 hover:bg-indigo-50">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 18a.969.969 0 0 0 .933 1h12.134A.97.97 0 0 0 15 18M1 7V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2v5M6 1v4a1 1 0 0 1-1 1H1m0 9v-5h1.5a1.5 1.5 0 1 1 0 3H1m12 2v-5h2m-2 3h2m-8-3v5h1.375A1.626 1.626 0 0 0 10 13.375v-1.75A1.626 1.626 0 0 0 8.375 10H7Z"
              />
            </svg>
            <i className="fas fa-external-link-alt fa-sm text-blue-400"></i>
          </button>
        </footer>
      </section>
    </div>
  );
}

export default Documents;
