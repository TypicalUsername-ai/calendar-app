import {
    NavigationMenu as Menu,
    NavigationMenuContent as MenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem as Item,
    NavigationMenuLink as NavLink,
    NavigationMenuList as MenuList,
    NavigationMenuTrigger as MenuTrigger,
    NavigationMenuViewport,
} from "@components/ui/navigation-menu"
import { Button } from '@components/ui/button'
import AccountCard from '@components/AccountCard'
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import authContext from "@/utils/authContext"
import { useQuery } from "@tanstack/react-query";

export default () => {

    const navigate = useNavigate();
    const auth = useContext(authContext);
    const { toast } = useToast();

    const session = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const user = auth.currentUser();
            if (user == null) {
                throw new Error("no current user")
            }
            const data = await user.getUserData();
            return data
        }
    })

    async function logout() {
        try {

            await auth.currentUser()!.logout()

            toast({
                title: "Hooray!",
                description: `Logged out successfully.`
            });
            navigate("/")
        } catch (error: any) {
            console.error(error);
            toast({
                title: "Something went wrong...",
                description: error.response?.data?.error_description || error.message,
                variant: 'destructive'
            });
        }
    }


    return (
        <>
            <Menu className="p-2 border-2 rounded-md">
                <MenuList>
                    <Item> <Button variant="link" onClick={() => navigate('/')} > <NavLink> Home </NavLink> </Button> </Item>
                    {session.isSuccess && (
                        <>
                            <Item> <Button variant="link" onClick={() => navigate('/calendar')} > <NavLink> Calendar </NavLink> </Button> </Item>
                            <Item> <Button variant="link" onClick={() => logout()} > <NavLink> Logout </NavLink> </Button> </Item>
                        </>
                    )}
                    <Item> <NavLink>
                        <MenuTrigger className="text-primary"> Account </MenuTrigger>
                        <MenuContent> <AccountCard /> </MenuContent>
                    </NavLink> </Item>
                </MenuList>
            </Menu>
            <Toaster />
        </>
    )
}
