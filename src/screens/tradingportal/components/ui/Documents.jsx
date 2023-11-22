import PDFViewer from "../documents/PDFViewer";

function Documents() {
  const pdfs = [
    {
      id: 1,
      title: "Property Deed",
      dropboxPath: "property_deed.pdf",
      brief: (
        <>
          This legal document proves ownership of the property. It contains the
          property&apos;s legal description, the names of the owners, and any
          liens or encumbrances on the property. Disclosing the property deed
          ensures transparency about the property&apos;s ownership status.
        </>
      ),
    },
    {
      id: 2,
      title: "Lease Agreements",
      dropboxPath: "lease_agreement.pdf",
      brief: (
        <>
          Any active lease agreements between the property owner and current
          tenants should be disclosed. Lease agreements outline the terms,
          conditions, and responsibilities of both the landlord and tenant.
          Sharing this information helps potential investors understand the
          rental income and tenant-related obligations.
        </>
      ),
    },
    {
      id: 3,
      title: "Financial Statements",
      dropboxPath: "financial_statements.pdf",
      brief: (
        <>
          {" "}
          Providing financial statements such as profit and loss statements,
          balance sheets, and cash flow reports gives investors insights into
          the property&apos;s financial performance. This includes details on
          rental income, expenses, and net profit, helping them make informed
          investment decisions.
        </>
      ),
    },
    {
      id: 4,
      title: "Property Inspection Reports",
      dropboxPath: "property_inspection_report.pdf",
      brief: (
        <>
          Inspection reports, including recent assessments of the
          property&apos;s condition and any repairs or maintenance done, help
          potential investors understand the property&apos;s physical condition.
          This transparency can build trust and provide insights into potential
          maintenance costs.
        </>
      ),
    },
    {
      id: 5,
      title: "Offering Memorandum or Prospectus",
      dropboxPath: "offering_prospectus.pdf",
      brief: (
        <>
          If you&apos;re allowing users to buy shares of the rental property,
          you should provide an offering memorandum or prospectus. This document
          outlines details about the investment opportunity, property details,
          potential risks, expected returns, ownership structure, and legal
          considerations. It helps investors understand the investment
          opportunity thoroughly.
        </>
      ),
    },
  ];
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-3 gap-2 lg:gap-6">
      {pdfs.map((pdf) => (
        <section
          key={pdf.id}
          className="container space-y-2 outline outline-neutral-200/60 shadow-inner rounded-md p-4"
        >
          <header>
            <h3 className="font-bold">{pdf.title}</h3>
          </header>
          <summary className="h-28 overflow-clip">{pdf.brief}</summary>
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
            <PDFViewer pdfName={pdf.dropboxPath} />
          </footer>
        </section>
      ))}
    </div>
  );
}

export default Documents;
