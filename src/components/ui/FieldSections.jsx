import { djangoToReactTypes } from "../../lib/utils";
import InputField from "./InputField";

function FieldSections({ count, fieldsMetaData, records, disabled }) {
  const SectionItems = [];
  let index = 0;
  if (Array.isArray(fieldsMetaData) && typeof records === "object") {
    while (index < fieldsMetaData.length && count > 0) {
      const Items = fieldsMetaData
        .slice(index, index + count)
        .map((field, i) => (
          <InputField
            key={`${field}_${i}`}
            label={records[field]?.label}
            name={records[field]?.name}
            required={records[field]?.required}
            type={djangoToReactTypes[records[field]?.field_type]}
            value={records[field]?.value}
            handleChange={() => {}}
            disabled={disabled}
          />
        ));

      index += count;

      SectionItems.push(
        <div key={index} className="flex flex-grow items-center gap-4">
          {Items}
        </div>
      );
    }
  }
  return SectionItems;
}

export default FieldSections;
