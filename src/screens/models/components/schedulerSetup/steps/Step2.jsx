import { useEffect, useState } from "react";
import { getSheetsMetadata } from "../../../hooks/reactQuery";
import LinkSheet from "../../actions/LinkSheet";

function Step2({ setShowContinue }) {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const { data = [] } = getSheetsMetadata("", url) || {};
  const handleInput = (e) => {
    const validGoogleSheetsUrlPattern =
      /^https:\/\/docs\.google\.com\/spreadsheets\/d\/[a-zA-Z0-9_-]+\/edit(#gid=[0-9]+)?$/;
    const isValid = validGoogleSheetsUrlPattern.test(e.target.value);

    if (isValid) {
      setUrl(e.target.value);
      const storedValue = localStorage.getItem("gsheet");
      const gsheet = { ...JSON.parse(storedValue), url: e.target.value };
      localStorage.setItem("gsheet", JSON.stringify(gsheet));
      return;
    }
    setShowContinue(false);
    return;
  };

  const handleNameInput = (e) => {
    setName(e.target.value);
    const storedValue = localStorage.getItem("gsheet");
    const gsheet = { ...JSON.parse(storedValue), name: e.target.value };
    localStorage.setItem("gsheet", JSON.stringify(gsheet));
  };

  useEffect(() => {
    if (data.length && name) {
      setShowContinue(true);
      return;
    } else {
      setShowContinue(false);
    }
  }, [data, setShowContinue, name]);

  useEffect(() => {
    const { name, url } = JSON.parse(localStorage.getItem("gsheet"));
    name && setName(name);
    url && setUrl(url);
  }, []);
  return (
    <div>
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
        Spreadsheet Url
      </h3>
      <div className="p-6 space-y-6">
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          Let&apos;s start by setting the spreadsheet url where the data exists
        </p>
      </div>
      <div className="mb-6">
        <label
          htmlFor="large-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        ></label>
        <input
          type="text"
          onChange={handleInput}
          value={url}
          id="large-input"
          placeholder="Enter the spreadsheet url where the data exists here."
          className="block w-full p-2 placeholder:text-blue-900 text-blue-900 border border-gray-300 rounded-full bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <LinkSheet setShowContinue={setShowContinue} />
      <div className="p-6 space-y-6">
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          and giving a name for the <strong>New</strong> cron action.
        </p>
      </div>
      <div className="mb-6">
        <label
          htmlFor="large-input"
          className="block mb-2 text-sm font-medium text-gray-90"
        >
          Name
        </label>
        <input
          type="text"
          onChange={handleNameInput}
          value={name}
          id="large-input"
          placeholder="Upload action name"
          className="block w-full max-w-xs p-2 placeholder:text-blue-900 text-blue-900 border border-gray-300 rounded-sm bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
}

export default Step2;
