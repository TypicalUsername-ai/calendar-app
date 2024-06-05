import { RouteObject } from "react-router-dom";
import RootPage from '@pages/RootPage'
import LoginPage from "@pages/LoginPage";
import RegisterPage from "@pages/RegisterPage";
import CalendarPage from "@pages/CalendarPage";

export default [
    {
        path: "/",
        element: <RootPage />,
        children: [
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "signup",
                element: <RegisterPage />
            },
            {
                path: "calendar",
                element: <CalendarPage />
            }
        ]
    }
] satisfies RouteObject[]
