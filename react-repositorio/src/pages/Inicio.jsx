/* import { Grid, GridItem, Flex, Box, Heading, Spacer, Menu, MenuButton, MenuItem, MenuList, IconButton, Avatar } from '@chakra-ui/react' */
/* import { AddIcon, ExternalLinkIcon, RepeatIcon, EditIcon, HamburgerIcon } from '@chakra-ui/icons' */
import { Center } from '@chakra-ui/react'
import { NavBar } from '../components/NavBar'
import { Header } from '../components/Header'
import { MainInicio } from '../components/MainInicio'
import { Navigate } from 'react-router-dom'

export function Inicio(props) {



    /* if (!props.user) {
        return <Navigate to='/login' replace />
    } */
    return (
        <div className='page inicio'>
            <Header />
            <Center>
                <NavBar />
            </Center>
            <Center>
                <MainInicio />
            </Center>
        </div>
    )
}