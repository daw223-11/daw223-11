import { PasswordInput } from "../components/PasswordInput"
import { Center, Container, Stack, Input, Button, FormControl, FormLabel } from '@chakra-ui/react'
import { useState } from "react"
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext.jsx";
export function Login(props) {
    const { login, user } = useAuthContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();

        // Se realiza el login
        login({
            username: username,
            password: password
        })


    }


    if (user) {
        return <Navigate to='/inicio' replace />
    }

    return (
        <div className="login-body">
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
                                    <Input name="inputUsername" bgColor={'#FFFFFF'} type="text" placeholder="Username" onChange={(e) => handleUsernameChange(e)} />
                                </FormControl>
                                <FormControl action="post" className="login-form" isRequired>
                                    <FormLabel color={'white'}>Password</FormLabel>
                                    <PasswordInput handlePasswordChange={handlePasswordChange} />
                                </FormControl>
                                <Button type="submit">
                                    Enviar
                                </Button>
                            </Stack>
                        </Center>
                    </form>
                </Container>
            </Center>
        </div>
    )
}
