import * as React from 'react'
import { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, TouchableOpacity, TextInput, Text } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import ContextLogged from "../services/ContextUser.js";

import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { sendPassword } from '../services/Auth';


import ButtonPadrao from '../components/Button';
import stylesDefault from '../../styles/styles';
import Colors from '../../styles/Colors'

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Loading, setLoading] = useState(false);
    const [isLogged, logoff, dataUser, setUser, login] = useContext(ContextLogged);

    navigation = useNavigation();
    useFocusEffect(
        React.useCallback(() => {

            async function checkLoginInit() {
                navigation.setOptions({ title: 'Login' })
            }
            checkLoginInit()

           // return () => checkLogin = null;
        }, [dataUser.id])
    )


    const onLoginNav = async () => {
        if (email == undefined || email.toString() === "") {
            alert("E-mail inavalido")
            return (false);
        }
        if (password == undefined || password.toString() === "") {
            alert("Senha invalida")
            return (false);
        }
        let ret = null;
        try {

            setLoading(true);
            ret = await login(email, password);
            if (ret == false)
                throw Error('Falha na autenticação')
        
        } catch (e) {
            console.log(' catch', e)
            Alert.alert('Atenção', e.message)
        } finally {
            setLoading(false);
            console.log('finally')
            if (ret == true) {
                Alert.alert('Atenção', 'loagado com suesso');
                navigation.push('Home')
            }

        }
    }


    const onRegisterNav = () => {
        navigation.navigate('Registro')
    }


    const onRecoverPassword = () => {
        sendPassword(email)
    }


    return (
        <View style={styles.container} >
            <View style={styles.formview} >
                <TextInput placeholder='Email' style={stylesDefault.input}
                    value={email}
                    onChangeText={email => { setEmail(email) }} />
                <TextInput placeholder='Senha' style={stylesDefault.input}
                    valeu={password}
                    secureTextEntry={true}
                    onChangeText={password => { setPassword(password) }} />

                <ButtonPadrao title='Login' onPress={onLoginNav} Loading={Loading} />


                <ButtonPadrao title='Não tem login?' onPress={onRegisterNav} Loading={false} />

                <TouchableOpacity onPress={onRecoverPassword}
                    style={[stylesDefault.buttom, stylesDefault.buttomEsqueci]}>
                    <Text style={stylesDefault.buttomTextEsqueci}>Esqueci minha senha</Text>
                </TouchableOpacity>
            </View>

        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    formview: {
        width: '100%',
        marginTop: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
export default Login