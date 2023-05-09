import { Header } from "../components/Header";
import { MainMatriculaciones } from "../components/MainMatriculaciones"
import { NavBar } from "../components/NavBar";
import { Center } from "@chakra-ui/react";


export function Matriculaciones() {

    return (
        <div className="page">
            <Header />
            <Center>
                <NavBar />
            </Center>
            <Center>
                <MainMatriculaciones />
            </Center>
        </div>
    )
}