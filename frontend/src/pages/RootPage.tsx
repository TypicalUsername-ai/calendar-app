import Navbar from "@components/Navbar"
import { Outlet } from "react-router-dom"

export default () => {
    return (
        <div className="w-full h-full flex flex-col">
            <Navbar />
            <Outlet />
        </div>
    )
}
