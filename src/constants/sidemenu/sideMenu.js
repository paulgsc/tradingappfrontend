
export const sideMenuItems = [
    {
        id: 'side_1',
        title: 'Profile Overview',
        content: [
            {
                id: 'side_1-1',
                icon: "notification",
                className: "fill-stroke",
                title: "Messages",
                subtitle: "",
                path: "/personal",
            },
            {
                id: 'side_1-2',
                icon: "history",
                className: "",
                title: "History",
                subtitle: "Account Activities",
                path: "/personal/history",
            },

        ]
    },
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
    {

        id: 'side_4',
        title: 'Documents',
        content: [
            {
                id: 'side_4-1',
                icon: "securityKey",
                className: "",
                title: "Security and password",
                subtitle: "",
                path: "/personal/register",

            }

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
    {
        title: "Membership",
        icon: "accountIcon",
        id: 'side-navs_2',
        path: '/personal',
    }
]