
export const sideMenuItems = [
    {

        id: 'side_2',
        title: 'Investing',
        content: [
            {
                id: 'side_2-1',
                icon: "securityKey",
                className: "",
                title: "Balances",
                subtitle: "",
                path: '/personal/balances'
            }

        ]
    },
    {

        id: 'side_3',
        title: 'Transfers',
        content: [
            {
                id: 'side_3-1',
                icon: "bank",
                className: "",
                title: "Transfer Money",
                subtitle: "",
                path: "/personal/banking",
            },
            {
                id: 'side_3-2',
                icon: "bank",
                className: "",
                title: "Linked Accounts",
                subtitle: "",
                path: "/personal/banking/link",
            },

        ]
    },

]

export const adminMenuItems = [
    {
        id: 'side_1',
        title: 'Dashboard',
        path: '/admin',
        content: [],
    },
   
    {

        id: 'side_3',
        title: 'Apps',
        content: [
            {
                id: 'side_3-1',
                icon: "bank",
                className: "",
                title: "Timeline",
                subtitle: "",
                path: "/admin/timeline",
            },
            {
                id: 'side_3-2',
                icon: "bank",
                className: "",
                title: "Data Tables",
                subtitle: "",
                path: "/admin/site/models",
            },

        ]
    },
   
]

export const sideMenuNavs = [
    {
        title: 'Trade',
        icon: "gridView",
        id: 'side-navs_1',
        path: '/trade',
    },
]