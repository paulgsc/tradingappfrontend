import FieldSections from "../../../../components/ui/FieldSections";
import InputField from "../../../../components/ui/InputField";

function ModelEditForm() {
  return (
    <form className="w-full flex flex-col justify-between px-12 py-6 space-y-6">
      <section className="flex flex-col h-fit">
        <h1 className="mb-6 capitalize leading-normal font-semibold text-base lg:text-lg xl:text-xl">
          Header
        </h1>
        <div className="space-y-6">
          <FieldSections fieldsMetaData={Array(6).fill("")} count={2} />
        </div>
      </section>
      <section className="h-fit">
        <h1 className="mb-6 capitalize leading-normal font-semibold text-base lg:text-lg xl:text-xl">
          Header
        </h1>
        <div className="space-y-6">
          <FieldSections fieldsMetaData={Array(1).fill("")} count={1} />
          <FieldSections fieldsMetaData={Array(3).fill("")} count={3} />
        </div>
      </section>
      <section id="settings" className="h-fit">
        <h1 className="mb-6 capitalize leading-normal font-semibold text-base lg:text-lg xl:text-xl">
          Header
        </h1>
        <div className="space-y-6">
          <FieldSections fieldsMetaData={Array(8).fill("")} count={2} />
        </div>
      </section>
      <section className="h-fit">
        <h1 className="mb-6 capitalize leading-normal font-semibold text-base lg:text-lg xl:text-xl">
          Header
        </h1>
        <InputField />
      </section>
      <section id="bottom" className="h-fit">
        <h1 className="mb-6 capitalize leading-normal font-semibold text-base lg:text-lg xl:text-xl">
          Header
        </h1>
        <InputField />
      </section>
    </form>
  );
}

export default ModelEditForm;
