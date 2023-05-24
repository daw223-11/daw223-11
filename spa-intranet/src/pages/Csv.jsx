import { Header } from "../components/Header"
import { NavBar } from "../components/NavBar"
import { MainCsv } from "../components/MainCsv"
import { Center } from "@chakra-ui/react"

export function Csv() {

    return (
        <div className='page'>
            <Header />
            <Center>
                <NavBar />
            </Center>
            <Center className='main'>
                <MainCsv />
            </Center>
        </div>
    )
}