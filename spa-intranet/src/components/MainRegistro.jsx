
import { Center, Container, Stack, FormControl, FormLabel, Input, Button, useToast } from "@chakra-ui/react";
import { PasswordInput } from './PasswordInput';
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import { SpinnerMod } from "./SpinnerMod";
export function MainRegistro() {
    const toast = useToast();
    const { user } = useAuthContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [rol, setRol] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(null);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const handleRolChange = (e) => {
        setRol(e.target.value)
    }

    const handleNombreChange = (e) => {
        setNombre(e.target.value)
    }

    const handleApellidosChange = (e) => {
        setApellidos(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()
        setIsLoading(true);
        fetch('http://iesjulianmarias.ddnsking.com/intranet/api/index.php/register', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token,
            }),
            body: JSON.stringify({
                username: username,
                password: password,
                id_rol: rol,
                name: nombre,
                lastname1: apellidos,
                email: email,
            })
        })
            .then(response => response.json())
            .then(dataJson => {
                setIsLoading(false)
                if (dataJson.success) {
                    toast({
                        title: dataJson.success,
                        position: 'top',
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    })
                }
                if (dataJson.message) {
                    toast({
                        title: dataJson.message,
                        position: 'top',
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    })
                }
            })
            .catch(error => {
                setIsLoading(false);
                toast({
                    title: 'ERROR FATAL EN LA PETICIÓN',
                    position: 'top',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            })
    }
    return (

        <Center h={'100vh'} bgColor={'#DAE9FF'}>
            <Container bgColor={'#001F4D'} centerContent='true' className="login-container" borderRadius={'8px'} paddingBottom={'50px'} paddingTop={'50px'}>
                <form action="post" onSubmit={(e) => handleSubmitForm(e)}>
                    <Center paddingBottom={'20px'}>
                        <img src="http://iesjulianmarias.ddnsking.com/wp-content/uploads/logo-1024x695.png" width={'45%'} />
                    </Center>
                    <Center>
                        <Stack w={'70%'} spacing={3}>
                            <FormControl action="post" className="login-form" isRequired>
                                <FormLabel color={'white'}>Username</FormLabel>
                                <Input bgColor={'#FFFFFF'} type="text" placeholder="Username" onChange={(e) => handleUsernameChange(e)} />
                            </FormControl>
                            <FormControl action="post" className="login-form" isRequired>
                                <FormLabel color={'white'}>Password</FormLabel>
                                <PasswordInput handlePasswordChange={handlePasswordChange} />
                            </FormControl>
                            <FormControl action="post" className="login-form" isRequired>
                                <FormLabel color={'white'}>Rol</FormLabel>
                                <Input bgColor={'#FFFFFF'} type="text" placeholder="1 = sec || 2 = jef" onChange={(e) => handleRolChange(e)} />
                            </FormControl>
                            <FormControl action="post" className="login-form" isRequired>
                                <FormLabel color={'white'}>Nombre</FormLabel>
                                <Input bgColor={'#FFFFFF'} type="text" placeholder="Nombre" onChange={(e) => handleNombreChange(e)} />
                            </FormControl>
                            <FormControl action="post" className="login-form" isRequired>
                                <FormLabel color={'white'}>Apellidos</FormLabel>
                                <Input bgColor={'#FFFFFF'} type="text" placeholder="Apellidos" onChange={(e) => handleApellidosChange(e)} />
                            </FormControl>
                            <FormControl action="post" className="login-form" isRequired>
                                <FormLabel color={'white'}>Email</FormLabel>
                                <Input bgColor={'#FFFFFF'} type="text" placeholder="Email" onChange={(e) => handleEmailChange(e)} />
                            </FormControl>
                            <Button type="submit" isDisabled={isLoading}>
                                {isLoading
                                    ? <SpinnerMod />
                                    : 'CREAR USUARIO'
                                }
                            </Button>
                        </Stack>
                    </Center>
                </form>
            </Container>
        </Center>)
}