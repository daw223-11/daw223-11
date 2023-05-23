import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build';
import { Button, Center, HStack, useToast } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { SpinnerMod } from './SpinnerMod';
import { useAuthContext } from '../context/AuthContext';

export function CKEditorMod() {
    const { user } = useAuthContext();
    const [data, setData] = useState();
    // Parte del tablón de anuncios
    const [part, setPart] = useState(1);
    const [isLoading, setIsLoading] = useState(null);
    const toast = useToast();
    useEffect(() => {
        fetchData();
    }, []);

    // Petición que se carga al crear el componente
    const fetchData = async () => {
        try {
            const response = await fetch('http://iesjulianmarias.ddnsking.com/intranet/api/index.php/obtenerTablonAnuncios/' + part, {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + user.token }
            });
            const fetchedData = await response.json();

            if (fetchedData.success) {
                setData(atob(fetchedData.data));
                toast({
                    title: fetchedData.success,
                    position: 'top',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            }
            if (fetchedData.message) {
                toast({
                    title: fetchedData.message,
                    position: 'top',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            }
        } catch (error) {
            console.error('Error al cargar los datos:', error);
        }
    };

    const handleDataChange = (event, editor) => {
        setData(editor.getData());
    }

    // Cuando clica en guardar, envía petición POST a la api
    const handleGuardarClick = (e) => {
        setIsLoading(true);
        const base64Data = btoa(data);
        fetch('http://iesjulianmarias.ddnsking.com/intranet/api/index.php/actualizarTablonAnuncios/' + part, {
            method: 'POST',
            body: JSON.stringify({
                data: base64Data
            }),
            headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + user.token }
        })
            .then(response => response.json())
            .then(fetchedData => {
                setIsLoading(false)
                if (fetchedData.message) {
                    toast({
                        title: fetchedData.message,
                        position: 'top',
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    })
                }
                if (fetchedData.success) {

                    toast({
                        title: fetchedData.success,
                        position: 'top',
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    })
                }
            })
            .catch(error => {
                setIsLoading(false)
                'error' + error
            })
    }

    return (
        <>
            <Center>
                <HStack marginBottom={'20px'}>
                    <Button onClick={(e) => {
                        setPart(1);
                        fetchData()
                    }}
                        isDisabled={isLoading}>
                        {isLoading
                            ? <SpinnerMod />
                            : 'ESO/BACHILLERATO'}
                    </Button>
                    <Button onClick={(e) => {
                        setPart(2);
                        fetchData()
                    }}
                        isDisabled={isLoading}>
                        {isLoading
                            ? <SpinnerMod />
                            : 'NOVEDADES'}
                    </Button>
                    <Button onClick={(e) => {
                        setPart(3);
                        fetchData()
                    }}
                        isDisabled={isLoading}>
                        {isLoading
                            ? <SpinnerMod />
                            : 'FP'}
                    </Button>
                </HStack>
            </Center>
            <CKEditor
                editor={Editor}
                data={data}
                onChange={(event, editor) => handleDataChange(event, editor)}
            />
            <Center marginTop={'20px'}>
                <Button onClick={(e) => handleGuardarClick(e)} isDisabled={isLoading}>
                    {isLoading
                        ? <SpinnerMod />
                        : 'GUARDAR'}
                </Button>
            </Center>
        </>
    )
}