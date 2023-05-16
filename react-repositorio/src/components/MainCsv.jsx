import '../App.css'
import { useState } from 'react';
import { Center, Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useAuthContext } from '../context/AuthContext';

export function MainCsv() {
    const { user } = useAuthContext();
    const [file, setFile] = useState(null);

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
            console.log('Archivo no seleccionado');
        }



        const base64 = await convertBase64(file);
        console.log('base64ej', base64)

        try {
            fetch('http://iesjulianmarias.ddnsking.com/intranet/api/index.php/subirCsv', {
                method: 'POST',
                body: JSON.stringify({ file: base64 }),
                headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + user.token }
            })
                .then(response => response.json())
                .then(data => console.log('response', data));
        } catch (error) {
            console.error('ERROR EN LA PETICIÓN DEL CSV', error);
        }
    };

    return (
        <Box w="full" maxW="sm" borderWidth="1px" borderRadius="lg" p={4}>
            <form method='post' onSubmit={(e) => handleSubmit(e)}>
                <FormControl>
                    <FormLabel>SUBIR CSV</FormLabel>
                    <Input type="file" accept=".csv" onChange={(e) => handleFileChange(e)} />
                </FormControl>

                <Button type="submit" mt={4}>
                    Subir
                </Button>
            </form>
        </Box>
    );
}
