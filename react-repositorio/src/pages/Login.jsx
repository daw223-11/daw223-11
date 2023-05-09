import { PasswordInput } from "../components/PasswordInput"
import { Center, Container, Stack, Input, Button, FormControl, FormLabel } from '@chakra-ui/react'
import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";

export function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    /* const [user, setUser] = useState(null); */
    console.log(props)
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
        /* setUser({ username: 'user' }) */
        // TODO: HACER POST A LA API
        // SI LA PETICIÓN DEVUELVE UN USER (INFO USUARIO) ENTONCES REDIRIGE A INICIO
        /* const options = {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            })
        }

        var raw = JSON.stringify({
            "username": username,
            "password": password
        });

        var requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: raw,
            redirect: 'follow'
        };

        fetch("http://129.151.235.234/intranet/api/index.php/login", requestOptions)
            .then(response => response.json())
            .then(result => {
                useNavigate('/inicio')
                localStorage.setItem('userToken', result.token);
            })
            .catch(error => console.log('error', error)); */

    }
    // TODO: Recuerda cambiar la lógica de esto
    if (props.user) {
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
