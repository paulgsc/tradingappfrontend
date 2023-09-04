import SheetsUrl from "./SheetsUrl";
import SheetsTemplate from "./SheetsTemplate";
import LinkGsheet from "./LinkGsheet";
import { getActionTrace } from "../../hooks/reactQuery";
import PreviewContent from "./PreviewContent";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

function RangePreview() {
  const [queryParameters] = useSearchParams();
  const { userInfo: { token = null } = {} } = useSelector(
    (state) => state.userAuth
  );

  const { data: { sheet_url = "" } = {} } = getActionTrace(token, {
    job_id: queryParameters.get("jobId"),
  });
  return (
    <section className="space-y-6">
      <header className="p-2">
        <h1 className="font-bold text-lg xl:text-2xl">
          Below is a preview of the spreadsheet linked
        </h1>
        <p>
          the preview uses the range provided, and display a result of the first
          10 records
        </p>
      </header>
      <main>
        <SheetsUrl url={sheet_url} />
        <SheetsTemplate>
          <PreviewContent />
        </SheetsTemplate>
      </main>
      <LinkGsheet />
    </section>
  );
}

export default RangePreview;
