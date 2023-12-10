import { questions } from "../constants/data";

function FrequentQuestionsCard() {
  const headers = [
    {
      id: 1,
      title: "Topic",
    },
    {
      id: 2,
      title: "Question",
    },
    {
      id: 3,
      title: "What we offer",
    },
    {
      id: 4,
      title: "Latest user feedback",
    },
  ];

  return (
    <div className="grid grid-rows-5 w-full h-96">
      <ul className="relative row-span-1 w-full grid grid-cols-7 items-center border-b bg-stone-50">
        {headers.map((header) => (
          <li
            key={header.id}
            className="w-full col-span-2 first:col-span-1 after:absolute after:inset-y-0 after:border-r after:first:border-r-0"
          >
            <h3 className="text-center">{header.title}</h3>
          </li>
        ))}
      </ul>
      <div className="row-span-4 w-full overflow-y-auto no-scrollbar">
        {questions.map((question) => (
          <ul key={question.id} className="w-full grid grid-cols-7">
            {Object.keys(question)
              .slice(1, 5)
              .map((key) => (
                <li
                  key={key}
                  className="group w-full h-32 col-span-2 first:col-span-1 m-auto border-b-2 border-r last:border-r-0 border-slate-400 even:bg-emerald-100 bg-purple-100 first:bg-stone-50"
                >
                  <p className="inline-flex group-first:items-center justify-center w-full h-full flex-shrink tracking-tight group-first:tracking-normal text-center break-words text-base group-first:font-medium">
                    <span>{question[key]}</span>
                  </p>
                </li>
              ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default FrequentQuestionsCard;
