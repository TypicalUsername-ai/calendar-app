import { RouteObject } from "react-router-dom";
import RootPage from '@pages/RootPage'

export default [
    {
        path: "/",
        element: <RootPage />,
        children: [

        ]
    }
] satisfies RouteObject[]
