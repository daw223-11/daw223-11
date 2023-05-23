import { Center } from '@chakra-ui/react'
import { NavBar } from '../components/NavBar'
import { Header } from '../components/Header'
import { MainTablonAnuncios } from '../components/MainTablonAnuncios'

export function TablonAnuncios() {

    return (
        <div className="page main">
            <Header />
            <Center>
                <NavBar />
            </Center>
            <Center>
                <MainTablonAnuncios />
            </Center>
        </div>
    )
}