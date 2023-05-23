import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build';
import { Button, Center, HStack, useToast, Tabs, Tab, TabList, TabPanels, TabPanel } from '@chakra-ui/react';
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
        fetchData(part);

    }, []);

    // Petición que se carga al crear el componente
    const fetchData = async (n) => {
        try {
            setPart(n)
            const num = n != null ? n : 1
            const url = 'http://iesjulianmarias.ddnsking.com/intranet/api/index.php/obtenerTablonAnuncios/' + num
            const response = await fetch(url, {
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

    const handleTabClick = (e, n) => {
        e.preventDefault();
        fetchData(n);
    }

    // Cuando clica en guardar, envía petición POST a la api
    const handleGuardarClick = (e) => {
        setIsLoading(true);
        console.log('esto es part ahora mismo guardar', part)
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
            <Tabs isFitted variant='enclosed'>
                <TabList mb='1em'>
                    <Tab onClick={(e) => handleTabClick(e, 1)}>
                        ESO/BACHILLERATO
                    </Tab>
                    <Tab onClick={(e) => handleTabClick(e, 2)}>
                        NOVEDADES
                    </Tab>
                    <Tab onClick={(e) => handleTabClick(e, 3)}>
                        FP
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <CKEditor
                            editor={Editor}
                            data={data}
                            onChange={(event, editor) => handleDataChange(event, editor)}
                        />
                    </TabPanel>
                    <TabPanel >
                        <CKEditor
                            editor={Editor}
                            data={data}
                            onChange={(event, editor) => handleDataChange(event, editor)}
                        />
                    </TabPanel>
                    <TabPanel >
                        <CKEditor
                            editor={Editor}
                            data={data}
                            onChange={(event, editor) => handleDataChange(event, editor)}
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>

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