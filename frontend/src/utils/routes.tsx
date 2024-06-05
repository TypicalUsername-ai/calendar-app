import { RouteObject } from "react-router-dom";
import RootPage from '@pages/RootPage'
import CalendarPage from "@/pages/CalendarPage";

export default [
    {
        path: "/",
        element: <RootPage />,
        children: [
            {
                path: "/calendar",
                element: <CalendarPage/>
            }
        ]
    }
] satisfies RouteObject[]
