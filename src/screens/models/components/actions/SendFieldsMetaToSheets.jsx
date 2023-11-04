import SwitchBtn from "../../../../components/ui/SwitchBtn";
import { useSelector } from "react-redux";
import API from "../../../../api/django";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";

function SendFieldsMetaToSheets({ spreadsheetUrl, setSpreadsheetUrl }) {
  const [fetchError, setFetchError] = useState(null);
  const { model } = useParams();
  const { userInfo: { token = null } = {} } = useSelector(
    (state) => state.userAuth
  );
  const createSpreadsheet = async () => {
    try {
      const path = `model-data/send/${model}/fields_meta/to_gsheet/`;
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await API.get(path, config);
      const { spreadsheet_url } = response.data;
      if (!spreadsheet_url) {
        throw new Error("error creating spreadsheet");
      }
      localStorage.setItem(
        "meta_spreadsheet",
        JSON.stringify({ spreadsheetLink: spreadsheet_url })
      );
      setSpreadsheetUrl(spreadsheet_url);
    } catch (error) {
      console.log(error);
      setFetchError(error.message);
    }
  };

  useEffect(() => {
    const getSpreadsheetUrl = () => {
      const storedValue = JSON.parse(localStorage.getItem("meta_spreadsheet"));
      if (typeof storedValue === "object" && storedValue !== null) {
        const { spreadsheetLink } = storedValue;
        setSpreadsheetUrl(spreadsheetLink);
      }
    };
    getSpreadsheetUrl();
  }, []);

  if (!spreadsheetUrl) {
    return (
      <SwitchBtn
        label={"View in spreadsheet"}
        result={spreadsheetUrl}
        error={fetchError}
        handleChecked={createSpreadsheet}
      />
    );
  }
  return <></>;
}

export default SendFieldsMetaToSheets;
