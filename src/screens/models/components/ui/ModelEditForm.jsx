import { useParams } from "react-router";
import FieldSections from "../../../../components/ui/FieldSections";
import InputField from "../../../../components/ui/InputField";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getModelRowRecord } from "../../hooks/reactQuery";
import { useEffect } from "react";

function ModelEditForm() {
  const { model } = useParams();
  const [queryParameters] = useSearchParams();
  const { userInfo: { token = null } = {} } = useSelector(
    (state) => state.userAuth
  );

  const {
    data: { data, sections = {}, import_enabled } = {},
    error,
    refetch,
  } = getModelRowRecord(token, model.toLowerCase(), {
    model_name: model,
    record_id: queryParameters.get("recordId"),
  });

  useEffect(() => {
    if (data === undefined && error === null) {
      refetch();
    }
  }, [data, error, refetch]);

  return (
    <form className="w-full flex flex-col justify-between px-12 py-6 space-y-6">
      <section
        id={`${model}_${sections?.overview?.title}`}
        className="flex flex-col h-fit"
      >
        <h1 className="mb-6 capitalize leading-normal font-semibold text-base lg:text-lg xl:text-xl">
          {`${model} ${sections?.overview?.title}`}
        </h1>
        <div className="space-y-6">
          <FieldSections
            fieldsMetaData={sections?.overview?.fields || []}
            records={data}
            disabled={import_enabled}
            count={2}
          />
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
