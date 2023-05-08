import { InputGroup, Input, Button, InputRightElement } from "@chakra-ui/react"
import { useState } from "react"

export function PasswordInput(props) {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const { handlePasswordChange } = props;
    /* const handlePasswordChange = (event) => {
        console.log('e.target.value: ', event.target.value)
        handlePassword(event.target.value)
    } */
    return (
        <>
            <InputGroup size='md'>
                <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password'
                    bgColor={'#FFFFFF'}
                    onChange={(e) => handlePasswordChange(e)}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </>

    )
}