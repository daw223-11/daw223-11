import { Avatar, Menu, MenuItem, MenuButton, MenuList, MenuDivider, MenuGroup, Center } from "@chakra-ui/react"
import '../App.css'
import { useAuthContext } from "../context/AuthContext";
export function Header() {

    const { logout, user } = useAuthContext();

    return (
        <div className="header">
            <div className="header-logo">
                <img src="http://iesjulianmarias.ddnsking.com/wp-content/uploads/logo-1024x695.png" />
            </div>
            <div className="header-avatar">
                <Menu>
                    <MenuButton>
                        <Avatar name={user.user.name} />
                    </MenuButton>
                    <MenuList>
                        <MenuGroup title={user.user.name}>
                            <MenuItem onClick={() => logout(user)}>Cerrar sesión</MenuItem>
                        </MenuGroup>
                        <MenuDivider />
                        {/* <MenuGroup title='Soporte'>
                            <MenuItem>Documentación</MenuItem>
                            <MenuItem>FAQ</MenuItem>
                            <MenuItem>Contacto</MenuItem>
                        </MenuGroup> */}
                    </MenuList>
                </Menu>

            </div>
        </div>
    )
}