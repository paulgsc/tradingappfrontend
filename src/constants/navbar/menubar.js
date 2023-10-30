export const menubar = [
  {
    id: 83,
    path: "/trade",
    className: "menu-bar",
    title: "Trade",
  },
];

export const transactionsNavbar = [
  {
    id: "1_tr",
    title: "Activity",
    type: "history",
    icon: "",
    content: [
      {
        id: "tr_1_1",
        title: "All Transactions",
        path: "/personal/history/transactions",
        parent: "1_tr",
      },
      {
        id: "tr_1_2",
        title: "Orders",
        path: "/personal/myhistory/orders",
        parent: "1_tr",
      },
      {
        id: "tr_1_3",
        title: "Transfers",
        path: "/personal/myhistory/transfers",
        parent: "1_tr",
      },
      {
        id: "tr_1_4",
        title: "Dividends",
        path: "/personal/history/dividends",
        parent: "1_tr",
      },
      {
        id: "tr_1_5",
        title: "Payments",
        path: "/personal/history/payments",
        parent: "1_tr",
      },
    ],
  },
  {
    id: "2_tr",
    title: "Account Events",
    type: "events",
    icon: "",
    content: [
      {
        id: "tr_2_1",
        title: "Transfer Events",
        icon: "",
        path: "/personal/history/events",
        parent: "2_tr",
      },
      {
        id: "tr_2_2",
        title: "Account Holds",
        path: "/personal/history/holds",
        parent: "2_tr",
      },
    ],
  },
  {
    id: "3_tr",
    title: "Site Updates",
    type: "updates",
    icon: "",
    path: "/personal/history/updates",
    content: [
      {
        id: "tr_3_1",
        title: "Recent updates",
        icon: "",
        path: "/personal/history/updates",
        parent: "3_tr",
      },
    ],
  },
];
