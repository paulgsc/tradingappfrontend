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
            Lorem ipsum dolor sit amet....
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
