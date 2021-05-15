import React, { createContext, useState } from "react";
import { isLogged as loadUser, getUserAuthData, cleanUserAuth, singIn, singUp } from './Auth';

const valeuUserDetails =
{
    id: null,
    name: 'Anonymous',
    email: null,
    img: null,
}

const valueDefaults = {
    isLogged: async () => { return false; },
    logoff: async () => { },
    dataUser:
    {
        id: null,
        name: 'Anonymous',
        email: null,
        img: null,
    },
    setUser: async () => { },
}
const ContextLogged = createContext(valueDefaults);


export const AuthProvider = ({ children }) => {
    const [dataUser, setDataUser] = useState([]);

    isLogged = async () => {
        const data = await loadUser()
        console.log('ConextUser data', data)
        if (data == false ) {
            await setUser(valeuUserDetails)
        }
        return data
    }

    creatUser = async (data) => {
        await singUp(
            data
        ).then(({ registerSuccess, user }) => {
            ('Register', registerSuccess, user)
            if (registerSuccess === true) {
                setUser(user)
            }
        })
    }

    logoff = async () => {
        console.log('logoff ')
        await cleanUserAuth()
        await setUser(valeuUserDetails)
    }

    setUser = async (data) => {
        setDataUser(data)
        console.log('setUser ', data.name)
    }

    login = async (email, password) => {
        const { loginSuccess, user } = await singIn({ email, password })
        console.log('const login ', loginSuccess, user.name)
        if (loginSuccess === true) {
            await setUser(user)
            return true;
        } else {
            throw Error('usuario ou senha errado. Por favor tente novamente')
            await cleanUserAuth()
            await setUser(valeuUserDetails)
            return false;
        }
    }

    return (

        <ContextLogged.Provider value={[isLogged, logoff, dataUser, setUser, login, creatUser]} >
            {children}
        </ContextLogged.Provider >
    )
}
export default ContextLogged;
