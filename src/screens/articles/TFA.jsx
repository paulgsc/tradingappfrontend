import React from "react";
import FAQ from "../../components/ui/FAQ";

function TFA() {
  const sideMenu = {
    title: "Some Title",
    content: [
      {
        title: "Two-factor authentication",
        id: "two-factor",
        path: "twofactor-auth",
      },
    ],
  };
  const faqItems = [
    {
      id: 1,
      question: "How can I pay for my appointment?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, eum quae. Harum officiis reprehenderit ex quia ducimus minima id provident molestias optio nam vel, quidem iure voluptatem, repellat et ipsa.",
    },
    {
      id: 2,
      question: "What can I expect at my first consultation?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, eum quae. Harum officiis reprehenderit ex quia ducimus minima id provident molestias optio nam vel, quidem iure voluptatem, repellat et ipsa.",
    },
    // Add more FAQ items here
  ];
  return (
    <div>
      <FAQ>
        <FAQ.Header>Two Factor Authentification</FAQ.Header>
        <FAQ.Body>
          <FAQ.SideMenu items={sideMenu} />
          <FAQ.Content faqItems={faqItems} />
        </FAQ.Body>
      </FAQ>
    </div>
  );
}

export default TFA;
