import { PasswordInput } from "../components/PasswordInput"
import { Center, Container, Stack, Input, Button, FormControl, FormLabel } from '@chakra-ui/react'
import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext.jsx";
export function Login(props) {
    const { login, user } = useAuthContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handlePasswordChange = (e) => {
        console.log('password: ', e.target.value)
        setPassword(e.target.value);
    }

    const handleUsernameChange = (e) => {
        console.log('username', e.target.value)
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
            <Center h={'100vh'} bgColor={'#121212'}>
                <Container bgColor={'#E9E9E9'} centerContent='true' className="login-container" borderRadius={'8px'} paddingTop={'20px'} paddingBottom={'20px'}>
                    <form action="post" onSubmit={(e) => handleSubmitForm(e)}>
                        <Stack w={'100%'} spacing={3}>
                            <FormControl action="post" className="login-form" isRequired>
                                <FormLabel>Username</FormLabel>
                                <Input name="inputUsername" bgColor={'#FFFFFF'} type="text" placeholder="Username" onChange={(e) => handleUsernameChange(e)} />
                            </FormControl>
                            <FormControl action="post" className="login-form" isRequired>
                                <FormLabel>Password</FormLabel>
                                <PasswordInput handlePasswordChange={handlePasswordChange} />
                            </FormControl>
                            <Button colorScheme='teal' variant='outline' type="submit">
                                Enviar
                            </Button>
                        </Stack>
                    </form>
                </Container>
            </Center>
        </div>
    )
}
