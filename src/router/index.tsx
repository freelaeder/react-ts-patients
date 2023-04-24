/* eslint-disable react/no-children-prop */
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "@pages/home";
import Login from "@pages/login";
import Personal from "@pages/personal";
import Layout from "@shared/layout";
import Notice from "@pages/notice";
import Article from "@pages/article";
import AuthRoute from "@router/authRoute";


export const router = createBrowserRouter([
    {
        path: '',
        element: <AuthRoute children={<Layout/>}/>,
        children: [
            {path: "", element: <Home/>},
            {
                path: 'personal', element: <Personal/>
            },
            {
                path: 'notify', element: <Notice/>
            },
            {
                path: 'article', element: <Article/>
            }

        ]
    },
    {path: "/login", element: <Login/>},


]);
export default function AppRouter() {

    return <RouterProvider router={router}/>
}