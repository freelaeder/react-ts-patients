/* eslint-disable react/no-children-prop */
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import React, {lazy} from "react";
import AuthRoute from "@router/authRoute";
import loadable from "@shared/loadable";
import Fast from "@pages/fast";
import Department from "@pages/department";
import Illness from "@pages/illness";
import {Loading} from "react-vant";
import ConsultPay from "@pages/consultPay";
import ConsultPayGuard from "@router/consultPayGuard";
import ConsultRecord from "@pages/consultRecord";
import FastRecord from "@pages/consultRecord/widgets/fast";
import DoctorRecord from "@pages/consultRecord/widgets/doctor";
import MedicinalRecord from "@pages/consultRecord/widgets/medicinal";

const Home = loadable(lazy(() => import("@pages/home")));
const Login = loadable(lazy(() => import("@pages/login")));
const Personal = loadable(lazy(() => import("@pages/personal")));
const Layout = loadable(lazy(() => import("@shared/layout")));
const Notice = loadable(lazy(() => import("@pages/notice")));
const Article = loadable(lazy(() => import("@pages/article")));
const Patient = loadable(lazy(() => import("@pages/patient")));


const style: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
};
export const router = createBrowserRouter([
    {
        path: '',
        element: <AuthRoute children={<Layout/>}/>,
        errorElement: <Loading style={style} type="ball"/>,
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
    {
        path: 'patient', element: <Patient/>
    },
    {
        path: 'fast', element: <Fast/>
    },
    {
        path: 'department', element: <Department/>
    },
    {
        path: 'illness', element: <Illness/>
    },
    {
        path: 'consultPay', element: <ConsultPayGuard children={<ConsultPay/>}/>
    },
    {
        path:'record',element:<ConsultRecord />,
        children:[
            {
                path: '',element: <Navigate to={'/record/fast'} />
            },
            {
                path: 'fast',element: <FastRecord />
            },
            {
                path: 'doctor',element: <DoctorRecord />
            },
            {
                path:'medicinal',element: <MedicinalRecord />
            }
        ]
    }


]);
export default function AppRouter() {

    return <RouterProvider router={router}/>
}