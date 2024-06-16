import Navbar from "@components/Navbar"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import { useContext, useEffect } from "react"
import authContext from "@/utils/authContext"
import { useToast } from "@/components/ui/use-toast"

export default () => {

    const auth = useContext(authContext);
    const navigate = useNavigate();
    const path = useLocation()
    const { toast } = useToast();
    useEffect(() => {
        if (path.hash != "") {
            const params = new URLSearchParams(path.hash.substring(1))
            var data: any = {};
            for (const [key, val] of params) {
                data[key] = val;
            }

            if (data.access_token) auth.createUser(data, true);

            if (data.message) {
                toast({
                    title: data.message
                })
            }
            console.warn(params.get("type"))
            switch (params.get("type")) {
                case "recovery": {
                    navigate("/new-password")
                    break
                }
                case "email_change": {
                    navigate("/profile")
                    break
                }
                default: {
                    navigate("/")
                }
            }
        }

    }, [location])


    return (
        <div className="w-full h-full flex flex-col">
            <Navbar />
            <Outlet />
            <Toaster />
        </div>
    )
}
