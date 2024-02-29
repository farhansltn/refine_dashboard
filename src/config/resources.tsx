
import { BankFilled, FileFilled, HomeFilled } from "@ant-design/icons";
import { IResourceItem } from "@refinedev/core";

export const resources: IResourceItem[]=[
    {
        name: 'dashboard',
        list: '/',
        meta: {
            label:'Dashoard',
            icon:<HomeFilled />
        }
    },
    {
        name:'companies',
        list: '/companies',
        show: '/companies/:id',
        create: '/companies/new',
        edit:'/companies/edit/:id',
        meta: {
            label:'Companies',
            icon: <BankFilled />
        }
    },
    {
        name:'tasks',
        list: '/tasks',
        show: '/tasks/:id',
        create: '/tasks/new',
        edit:'/tasks/edit/:id',
        meta: {
            label:'Tasks',
            icon: <FileFilled />
        }
    }
]