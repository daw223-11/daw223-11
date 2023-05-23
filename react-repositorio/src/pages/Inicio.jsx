import { Center } from '@chakra-ui/react'
import { NavBar } from '../components/NavBar'
import { Header } from '../components/Header'
import { MainInicio } from '../components/MainInicio'

export function Inicio(props) {

    return (
        <div className='page'>
            <Header />
            <Center>
                <NavBar />
            </Center>
            <Center className='main'>
                <MainInicio />
            </Center>
        </div>
    )
}