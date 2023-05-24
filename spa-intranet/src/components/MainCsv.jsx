import '../App.css'
import { useState } from 'react';
import { SpinnerMod } from './SpinnerMod'
import { Center, Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import { useAuthContext } from '../context/AuthContext';

export function MainCsv() {
    const { user } = useAuthContext();
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const toast = useToast();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            toast({
                title: 'Archivo no selccionado',
                position: 'top',
                status: 'info',
                duration: 9000,
                isClosable: true,
            });
            return
        }



        setIsLoading(true);
        const base64 = await convertBase64(file);

        try {
            fetch('http://iesjulianmarias.ddnsking.com/intranet/api/index.php/subirCsv', {
                method: 'POST',
                body: JSON.stringify({ file: base64 }),
                headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + user.token }
            })
                .then(response => response.json())
                .then(data => {
                    console.log('response', data)
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
            toast({
                title: 'ERROR FATAL',
                position: 'top',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            setIsLoading(false);
        }
    };

    return (
        <Box w="full" maxW="sm" borderWidth="1px" borderRadius="lg" p={4}>
            <form method='post' onSubmit={(e) => handleSubmit(e)}>
                <FormControl marginBottom={'20px'}>
                    <FormLabel>SUBIR CSV</FormLabel>
                    <Input type="file" accept=".csv" onChange={(e) => handleFileChange(e)} border={'1px solid black'} padding={'30px'} />
                </FormControl>
                <Button type="submit" isDisabled={isLoading} p={4}>
                    {isLoading
                        ? <SpinnerMod />
                        : 'SUBIR'}
                </Button>
            </form>
        </Box>
    );
}
