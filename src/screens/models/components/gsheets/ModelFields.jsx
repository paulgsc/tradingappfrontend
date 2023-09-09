import SheetsUrl from "./SheetsUrl";
import SheetsTemplate from "./SheetsTemplate";
import LinkGsheet from "./LinkGsheet";
import MetaContent from "./MetaContent";
import SendFieldsMetaToSheets from "../actions/SendFieldsMetaToSheets";
import { useState } from "react";

function ModelFields() {
  const [spreadsheetUrl, setSpreadsheetUrl] = useState("");
  return (
    <section className="space-y-6">
      <header className="inline-flex items-center justify-between p-2 w-full">
        <div>
          <h1 className="sticky left-0 font-bold text-lg xl:text-2xl">
            Below are the fields for the model
          </h1>
          <p>
            Included is the metadata, specifiying the type of field, whether
            it&apos;s required etc.
          </p>
        </div>
        <SendFieldsMetaToSheets
          spreadsheetUrl={spreadsheetUrl}
          setSpreadsheetUrl={setSpreadsheetUrl}
        />
      </header>
      <main className="overflow-auto">
        <SheetsUrl url={spreadsheetUrl} />
        <SheetsTemplate>
          <MetaContent />
        </SheetsTemplate>
      </main>
      <LinkGsheet />
    </section>
  );
}

export default ModelFields;
