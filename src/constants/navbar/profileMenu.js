import { CiLogin } from "react-icons/ci";
import { Icons } from "../icons/icons";

export const quickActionMenu = [
    {
        id: 'pr_qu_1',
        icon: 'user',
        path: '/personal',
        title: "Manage Account",
        containerId: 'personal',
    },
    {
        id: 'pr_qu_2',
        icon: 'chart',
        path: '/personal',
        title: "Investing",
        containerId: 'pr_qu_2',
    },
    {
        id: 'pr_qu_3',
        icon: 'bank',
        path: '/personal/banking',
        title: "Make Transfer",
        containerId: 'pr_qu_3',
    },
    {
        id: 'pr_qu_4',
        "icon": "logout",
        path: '/',
        title: "Sign out",
        containerId: 'signOut',
    },

];