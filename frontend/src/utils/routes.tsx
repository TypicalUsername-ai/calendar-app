import { RouteObject } from "react-router-dom";
import RootPage from '@pages/RootPage'
import LoginPage from "@pages/LoginPage";
import RegisterPage from "@pages/RegisterPage";
import CalendarPage from "@pages/CalendarPage";
import ProfilePage from "@/pages/ProfilePage";
import PasswordRemindPage from "@/pages/PasswordRemindPage";
import NewPasswordPage from "@/pages/NewPasswordPage";
import HomePage from "@pages/HomePage"



export default [
    {
        path: "/",
        element: <RootPage />,
        children: [
            {
                path: "",
                element: <HomePage />
            },
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
            },
            {
                path: "profile",
                element: <ProfilePage />
            },
            {
                path: "forgot-password",
                element: <PasswordRemindPage />
            },
            {
                path: "new-password",
                element: <NewPasswordPage />
            }
        ]
    }
] satisfies RouteObject[]
