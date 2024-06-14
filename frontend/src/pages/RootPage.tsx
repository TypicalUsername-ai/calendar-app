import Navbar from "@components/Navbar"
import { Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"

export default () => {
    return (
        <div className="w-full h-full flex flex-col">
            <Navbar />
            <Outlet />
            <Toaster />
        </div>
    )
}
