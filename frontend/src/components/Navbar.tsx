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

export default () => {
    return (
        <Menu className="p-2 border-2 rounded-md">
            <MenuList>
                <Item> <Button variant="link"> <NavLink> Home </NavLink> </Button> </Item>
                <Item> <Button variant="link"> <NavLink> Calendar </NavLink> </Button> </Item>
                <Item> <NavLink>
                    <MenuTrigger className="text-primary"> Account </MenuTrigger>
                    <MenuContent> <AccountCard /> </MenuContent>
                </NavLink> </Item>
            </MenuList>
        </Menu>

    )
}
