import SheetsUrl from "./SheetsUrl";
import SheetsTemplate from "./SheetsTemplate";
import LinkGsheet from "./LinkGsheet";
import MetaContent from "./MetaContent";

function ModelFields() {
  return (
    <section className="space-y-6">
      <header className="p-2">
        <h1 className="font-bold text-lg xl:text-2xl">
          Below are the fields for the model
        </h1>
        <p>
          Included is the metadata, specifiying the type of field, whether
          it&apos;s required etc.
        </p>
      </header>
      <main>
        <SheetsUrl />
        <SheetsTemplate>
          <MetaContent />
        </SheetsTemplate>
      </main>
      <LinkGsheet />
    </section>
  );
}

export default ModelFields;
