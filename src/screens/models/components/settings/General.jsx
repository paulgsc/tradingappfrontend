import { useSelector } from "react-redux";
import { getCronActionById } from "../../hooks/reactQuery";
import InputField from "../ui/InputField";
import { useSearchParams } from "react-router-dom";
import UpdateInteral from "../actions/UpdateInteral";
import UpdateBooleanField from "../actions/UpdateBooleanField";

function General() {
  const [queryParameters] = useSearchParams();
  const { userInfo: { token = null } = {} } = useSelector(
    (state) => state.userAuth
  );
  const { data = {} } = getCronActionById(
    token,
    { job_id: queryParameters.get("jobId") },
    null
  );
  const settings = [
    {
      id: 1,
      type: "input",
      field: "name",
      label: "Name",
      placeholder: "Upload Job Name",
    },
    {
      id: 2,
      type: "input",
      field: "sheet_url",
      label: "Spreadsheet Url",
      placeholder: "Enter the url for your google spreadsheet",
    },
    {
      id: 3,
      type: "input",
      field: "data_range",
      label: "Data Range",
      placeholder: 'Enter range i.e "A:E", "D3:H12"',
    },
    {
      id: 4,
      type: "selection",
      field: "frequency",
      label: "Job Schedule",
    },
    {
      id: 5,
      type: "input",
      field: "notify_email",
      label: "Send notifications to",
      placeholder: "enter email address",
    },

    {
      id: 6,
      type: "switch",
      field: "active",
      label: "Active",
    },
  ];

  return (
    <section className="flex flex-col space-y-12 p-2 mb-6">
      {settings.map((setting, i) =>
        setting.type === "input" ? (
          <InputField
            field={setting.field}
            label={setting.label}
            placeholder={setting?.placeholder}
            value={data[setting.field]}
            key={i}
          />
        ) : setting.type === "selection" ? (
          <UpdateInteral
            field={setting.field}
            value={data[setting.field]}
            key={i}
          />
        ) : (
          <UpdateBooleanField
            field={setting.field}
            value={data[setting.field]}
            label={setting.label}
            key={i}
          />
        )
      )}
    </section>
  );
}

export default General;
