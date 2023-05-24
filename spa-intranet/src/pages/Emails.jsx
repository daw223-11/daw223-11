import { Header } from "../components/Header"
import { NavBar } from "../components/NavBar"
import { Center } from "@chakra-ui/react"
import { MainEmails } from "../components/MainEmails"

export function Emails() {
    return (
        <div className='page'>
            <Header />
            <Center>
                <NavBar />
            </Center>
            <Center className='main'>
                <MainEmails />
            </Center>
        </div>
    )
}