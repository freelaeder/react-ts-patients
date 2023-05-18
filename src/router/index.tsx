/* eslint-disable react/no-children-prop */
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {lazy} from "react";
import AuthRoute from "@router/authRoute";
import loadable from "@shared/loadable";
import Fast from "@pages/fast";

const Home = loadable(lazy(() => import("@pages/home")));
const Login = loadable(lazy(() => import("@pages/login")));
const Personal = loadable(lazy(() => import("@pages/personal")));
const Layout = loadable(lazy(() => import("@shared/layout")));
const Notice = loadable(lazy(() => import("@pages/notice")));
const Article = loadable(lazy(() => import("@pages/article")));
const Patient = loadable(lazy(() => import("@pages/patient")));


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
            },
            {
                path:'fast',element:<Fast />
            }


        ]
    },
    {path: "/login", element: <Login/>},
    {
        path: 'patient', element: <Patient/>
    }


]);
export default function AppRouter() {

    return <RouterProvider router={router}/>
}