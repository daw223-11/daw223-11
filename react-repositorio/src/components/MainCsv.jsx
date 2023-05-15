import '../App.css'
import { useState } from 'react';
import { Center, Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useAuthContext } from '../context/AuthContext';

export function MainCsv() {
    const { user } = useAuthContext();
    const [file, setFile] = useState(null);
    const [form, setForm] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            console.log('Archivo no seleccionado');
        }

        const formData = new FormData();
        formData.append('file', file);
        /* headers: { "Content-Type": "multipart/form-data" } */

        try {
            const response = await fetch('http://iesjulianmarias.ddnsking.com/intranet/api/index.php/subirCsv', {
                method: 'POST',
                body: formData,
                headers: { "Content-Type": "multipart/form-data", 'Authorization': 'Bearer ' + user.token }
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('error', error);
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
