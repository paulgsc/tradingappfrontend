import React, { useState } from "react";
import { CrossSign, HorizontalLine } from "../../../../constants/svgs/Svg";

function FaqContent() {
  const [faqVisibility, setFAQVisibility] = useState({});
  const faqItems = [
    {
      id: 1,
      question: "What Are Property Shares?",
      answer:
        "Property shares represent ownership in real estate properties. Investors can purchase fractional ownership, receive dividends from rental income, and potentially benefit from property appreciation.",
    },
    {
      id: 2,
      question: "How Does Property Share Trading Work?",
      answer:
        "Property share trading involves selecting properties listed on our platform, investing in shares, and receiving dividends based on rental income. Shares can be bought and sold similar to stocks, providing liquidity and flexibility.",
    },
    {
      id: 3,
      question:
        "Is Property Share Trading Different from Traditional Real Estate Investment?",
      answer:
        "Yes, property share trading offers lower entry barriers, allowing a wider range of investors to participate. Unlike traditional ownership, property shares offer easy diversification and the ability to trade without the complexities of property management.",
    },
    {
      id: 4,
      question: "What Types of Properties Can I Invest in Through Shares?",
      answer:
        "Our platform offers a variety of property types, including residential homes, commercial buildings, and even vacation properties. You can choose the properties that align with your investment goals.",
    },
    {
      id: 5,
      question: "How Do I Buy Property Shares?",
      answer:
        "To buy property shares, sign up on our platform, explore available properties, choose the ones you're interested in, and invest the desired amount. The process is user-friendly, and you can monitor your investments in your account.",
    },
    {
      id: 6,
      question: "What Are Dividends in Property Share Trading?",
      answer:
        "Dividends are a portion of the property's rental income distributed to investors. Dividends are typically paid regularly and provide a source of passive income from your property investments.",
    },
    {
      id: 7,
      question: "Can I Trade Property Shares on Your Platform 24/7?",
      answer:
        "While our platform operates around the clock, property share trading might have specific trading hours to ensure smooth processing. However, you can access your account and monitor investments at any time.",
    },
    {
      id: 8,
      question: "What Are the Risks Associated with Property Share Trading?",
      answer:
        "Like all investments, property share trading carries risks. Market fluctuations, property performance, and economic changes can impact returns. It's important to review our risk disclosure and make informed decisions.",
    },
    {
      id: 9,
      question: "Are Property Shares Regulated?",
      answer:
        "Yes, property share trading is subject to regulatory oversight to ensure investor protection. Our platform operates in compliance with relevant financial and securities regulations to provide a secure trading environment.",
    },
    {
      id: 10,
      question: "How Do I Sell Property Shares?",
      answer:
        "To sell property shares, log in to your account, list the shares you want to sell, and find potential buyers. Once matched, the transaction can be completed, and you can access the proceeds in your account.",
    },
  ];
  const toggleFAQ = (faqId) => {
    setFAQVisibility((prevState) => ({
      ...prevState,
      [faqId]: !prevState[faqId],
    }));
  };

  return (
    <div className="space-y-4 flex-1 my-12 ">
      {faqItems &&
        faqItems.map((faqItem) => (
          <div key={faqItem?.id} className="w-full ">
            <button
              className="flex flex-grow w-full  items-center focus:outline-none px-2 py-4 border-b border-l rounded-b-md shadow-inner"
              onClick={() => toggleFAQ(faqItem.id)}
            >
              {faqVisibility[faqItem.id] ? <HorizontalLine /> : <CrossSign />}
              <h1 className="mx-4 text-xl text-gray-700 text-start">
                {faqItem?.question}
              </h1>
            </button>
            {faqVisibility[faqItem?.id] && (
              <div className="flex mx-6 my-2 p-2 bg-neutral-100/60">
                <span className="border border-blue-500"></span>
                <p className="max-w-3xl px-4 text-gray-500 dark:text-gray-300">
                  {faqItem?.answer}
                </p>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

export default FaqContent;
