import UpdateBooleanField from "../../../models/components/actions/UpdateBooleanField";
import InputField from "./InputField";
import UpdateSelection from "./UpdateSelection";

function NewNotifications() {
  const settings = [
    {
      id: 1,
      type: "selection",
      field: "name",
      label: "Signal",
      placeholder: "Upload Job Name",
    },
    {
      id: 2,
      type: "selection",
      field: "sheet_url",
      label: "Model",
      placeholder: "Enter the url for your google spreadsheet",
    },
    {
      id: 3,
      type: "selection",
      field: "data_range",
      label: "Delay",
      placeholder: 'Enter range i.e "A:E", "D3:H12"',
    },
    {
      id: 4,
      type: "switch",
      field: "frequency",
      label: "Can Unsubscribe",
    },
    {
      id: 5,
      type: "selection",
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
    <section className="w-full  space-y-12 p-2 mb-6">
      <ul className="grid grid-cols-3 items-center justify-center gap-4 shadowm-inners rounded-t-md px-6 py-2 bg-gradient-to-br from-blue-100 via-stone-200 to-blue-100">
        {settings.map((setting, i) => (
          <li
            key={i}
            className={` ${
              setting?.type === "switch"
                ? " bg-white rounded-xl w-11/12 ml-3"
                : ""
            } h-28 flex items-center justify-center border-b`}
          >
            {setting.type === "input" ? (
              <InputField
                field={setting.field}
                label={setting.label}
                placeholder={setting?.placeholder}
              />
            ) : setting?.type === "switch" ? (
              <UpdateBooleanField field={setting.field} label={setting.label} />
            ) : (
              <UpdateSelection />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default NewNotifications;
