import React from "react";
import Article from "./Article";
import BarGraph from "../charts/BarGraph";

function FinancialArticle({ data }) {
  return (
    <Article>
      <Article.Section>
        <Article.Title>Some explanation</Article.Title>
        <Article.Content>
          <hr className="my-2 " />

          <div className="text-sm -m-4 -mt-2 p-4 bg-gray-50">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium
            nisi at turpis euismod malesuada. Nulla ultrices ullamcorper justo,
            ut aliquet purus lacinia vitae. Nunc vitae tempus odio, nec molestie
            magna. Proin non tortor enim. Fusce eget dui enim. Phasellus
            tristique vitae arcu molestie porta. Etiam vitae dui sed lorem
            viverra pulvinar ac sed ligula. Etiam hendrerit felis risus, in
            laoreet dui viverra eget. Nunc lobortis turpis tellus, ac dignissim
            felis suscipit sed. Cras consequat, erat eget lobortis vehicula,
            velit justo consectetur dolor, sit amet pretium elit tortor eget
            est. Phasellus ut laoreet lacus, ut tincidunt sem.
          </div>
        </Article.Content>
      </Article.Section>
      <Article.Section>
        <Article.Title>Chart</Article.Title>
        <Article.Content>
          <div className=" min-h-[600px] max-h-[600px] xl:min-h-[800px] xl:max-h-[1000px]">
            <BarGraph data={data} />
          </div>
        </Article.Content>
      </Article.Section>
    </Article>
  );
}

export default FinancialArticle;
