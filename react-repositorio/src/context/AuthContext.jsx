import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const INTRANET_USER = 'INTRANET_USER';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [user, setUser] = useState(() =>
        window.localStorage.getItem(INTRANET_USER) ? JSON.parse(window.localStorage.getItem(INTRANET_USER)) : null
    );

    /* const changeUser = (newUser) => {
        setUser(newUser);
        }
    */



    /**
     * Realiza la petición de login 
     */
    const login = useCallback(({ username, password }) => {

        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({
                username: username,
                password: password
            }),
        };

        fetch("http://iesjulianmarias.ddnsking.com/intranet/api/index.php/login", requestOptions)
            .then(response => response.json())
            .then(userData => {
                if (userData.token) {
                    // Guarda sessión del usuario en el localStorage
                    window.localStorage.setItem(INTRANET_USER, JSON.stringify(userData));
                    // Cambia el state del usuario en la aplicación
                    setUser(userData);
                }

            })
            .catch(error => console.log('error', error));


    }, []);


    /**
     * Realiza la petición de logout
     */
    const logout = useCallback((user) => {
        let tokenUser = user.token;
        let requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tokenUser
            },
            body: JSON.stringify({})
        };

        console.log(requestOptions)

        fetch("http://iesjulianmarias.ddnsking.com/intranet/api/index.php/logout", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.success == 1) {
                    window.localStorage.removeItem(INTRANET_USER);
                    setUser(null);
                } else {
                    console.log('error: Logout');
                }
            })
            .catch(error => console.log('error', error));
    }, []);

    const value = useMemo(
        () => ({
            login,
            logout,
            user
        }),
        [user, login, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
    return useContext(AuthContext);
}