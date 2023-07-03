import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CrossSign, HorizontalLine } from "../../constants/svgs/Svg";

function FAQ({ ...props }) {
  return (
    <div className="min-h-screen flex mx-auto">
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-12 mx-auto" {...props} />
      </section>
    </div>
  );
}

FAQ.Body = ({ ...props }) => (
  <div className="mt-8 xl:mt-16 lg:flex lg:-mx-12" {...props} />
);

FAQ.Header = ({ ...props }) => (
  <h1
    className="text-2xl font-semibold text-center text-gray-800 lg:text-3xl dark:text-white"
    {...props}
  />
);

FAQ.SideMenu = ({ items }) => (
  <div className="lg:mx-12">
    <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
      {items?.title}
    </h1>

    <div className="mt-4 space-y-4 lg:mt-8">
      {items?.content.map((item) => (
        <span key={item?.id}>
          <Link
            to={item?.path}
            className="block text-gray-500 active:text-blue-500  dark:text-blue-400 hover:underline"
          >
            {item?.title}
          </Link>
        </span>
      ))}
    </div>
  </div>
);

FAQ.Content = ({ faqItems }) => {
  const [faqVisibility, setFAQVisibility] = useState({});

  const toggleFAQ = (faqId) => {
    setFAQVisibility((prevState) => ({
      ...prevState,
      [faqId]: !prevState[faqId],
    }));
  };

  return (
    <div className="flex-1 mt-8 lg:mx-12 lg:mt-0">
      {faqItems &&
        faqItems.map((faqItem) => (
          <div key={faqItem?.id}>
            <button
              className="flex items-center focus:outline-none"
              onClick={() => toggleFAQ(faqItem.id)}
            >
              {faqVisibility[faqItem.id] ? <HorizontalLine /> : <CrossSign />}
              <h1 className="mx-4 text-xl text-gray-700 dark:text-white">
                {faqItem?.question}
              </h1>
            </button>
            {faqVisibility[faqItem?.id] && (
              <div className="flex mt-8 md:mx-10">
                <span className="border border-blue-500"></span>
                <p className="max-w-3xl px-4 text-gray-500 dark:text-gray-300">
                  {faqItem?.answer}
                </p>
              </div>
            )}
            <hr className="my-8 border-gray-200 dark:border-gray-700" />
          </div>
        ))}
    </div>
  );
};

export default FAQ;
