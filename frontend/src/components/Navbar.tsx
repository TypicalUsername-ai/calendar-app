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

export default () => {

    const navigate = useNavigate();

    return (
        <Menu className="p-2 border-2 rounded-md">
            <MenuList>
                <Item> <Button variant="link" onClick={() => navigate('/')} > <NavLink> Home </NavLink> </Button> </Item>
                <Item> <Button variant="link" onClick={() => navigate('/calendar')} > <NavLink> Calendar </NavLink> </Button> </Item>
                <Item> <NavLink>
                    <MenuTrigger className="text-primary"> Account </MenuTrigger>
                    <MenuContent> <AccountCard /> </MenuContent>
                </NavLink> </Item>
            </MenuList>
        </Menu>

    )
}
