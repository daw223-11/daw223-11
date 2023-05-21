import "../App.css";
import { useState } from "react";
import { Button, Center, useToast } from "@chakra-ui/react";
import { SpinnerMod } from "./SpinnerMod";
import { useAuthContext } from "../context/AuthContext";
export function MainEmails() {
    const { user } = useAuthContext();
    const [isLoading, setIsLoading] = useState(null);
    const toast = useToast();
    const handleClick = (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            fetch('http://iesjulianmarias.ddnsking.com/intranet/api/index.php/enviarEmails', {
                method: 'POST',
                body: JSON.stringify({}),
                headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + user.token }
            })
                .then(response => response.json())
                .then(data => {
                    console.log('response', data);
                    setIsLoading(false);
                    if (data.success) {
                        toast({
                            title: data.success,
                            position: 'top',
                            status: 'success',
                            duration: 9000,
                            isClosable: true,
                        })
                    }
                    if (data.message) {
                        toast({
                            title: data.message,
                            position: 'top',
                            status: 'error',
                            duration: 9000,
                            isClosable: true,
                        })
                    }
                });
        } catch (error) {
            console.error('ERROR EN LA PETICIÓN DEL CSV', error);
        }
    }


    return (
        <div className="mainEmails">
            <Center>
                <Button onClick={(e) => handleClick(e)} isDisabled={isLoading}>
                    {isLoading
                        ? <SpinnerMod />
                        : 'ENVIAR LISTA DE ALUMNOS SEGÚN MÓDULO'
                    }
                </Button>
            </Center>
        </div>
    )
}