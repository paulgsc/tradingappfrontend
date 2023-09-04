import InputField from "./InputField";

function FieldSections({ count, fieldsMetaData }) {
  const SectionItems = [];
  let index = 0;

  if (Array.isArray(fieldsMetaData)) {
    while (index < fieldsMetaData.length && count > 0) {
      const Items = fieldsMetaData
        .slice(index, index + count)
        .map((_, i) => (
          <InputField
            key={`field_${i}_${i + count}_${i + count + index}_${index}`}
          />
        ));
      index += count;
      SectionItems.push(
        <div key={index} className=" flex flex-grow items-center gap-4">
          {Items}
        </div>
      );
    }
  }
  return SectionItems;
}

export default FieldSections;
