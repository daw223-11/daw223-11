import { Header } from "../components/Header"
import { NavBar } from "../components/NavBar"
import { Center } from "@chakra-ui/react"
import { MainRegistro } from "../components/MainRegistro"

export function Registro() {
    return (
        <div className='page'>
            <Header />
            <Center>
                <NavBar />
            </Center>
            <Center className='main'>
                <MainRegistro />
            </Center>
        </div>
    )
}