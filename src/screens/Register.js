import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native'
import ContextLogged from "../services/ContextUser";
import { Alert } from 'react-native';

import ButtonPadrao from '../components/Button';
import AddPhoto from '../components/AddPhotos';
import stylesDefault from '../../styles/styles';
import Colors from '../../styles/Colors'

const Register = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [Loading, setLoading] = useState(false);

    const [imageProfile, setimageProfile] = useState({ uri: null, base64: null });
    const [isLogged, logoff, dataUser, setUser, login, creatUser] = useContext(ContextLogged);

    const onValidUser = async () => {
        console.log('imageProfile', imageProfile)
        if (email == undefined || email.toString() === "") {
            throw new Error("E-mail inavalido.")
        }
        if (password == undefined || password.toString() === "") {
            throw new Error("Senha invalida.")
        }
        if (password == undefined == password2) {
            throw new Error("senhas não coincidem.")
        }
        if (password.length < 5) {
            throw new Error("Senha invalida, deve ter minimo 6 caracteres.")
        }
    }

    const onCreatUser = async () => {

        try {
            setLoading(true);
            await onValidUser()


            await creatUser({
                email,
                password,
                name,
                imageProfile
            })
            setPassword(null)
            console.log('dataUser.id', dataUser.id)
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }]
            })

        } catch (e) {
            console.log(' catch', e)
            Alert.alert('Atenção', e.message);
        } finally {
            setLoading(false);
        }
    }

    const onSalveImg = (img) => {
        setimageProfile({ uri: img.base64, base64: img.base64 })
    }

    return (
        <View style={styles.container}>
            <View style={styles.formviewimg} >
                <AddPhoto title='Escolha foto de perfil ' img={imageProfile} oncallBack={(img) => onSalveImg(img)}  ></AddPhoto>
            </View>
            <View style={styles.formview} >
                <TextInput placeholder='Nome' style={stylesDefault.input}
                    autoFocus={true} value={name}
                    onChangeText={name => setName(name)} autoFocus={true} />

                <TextInput placeholder='Email' style={stylesDefault.input}
                    value={email}
                    onChangeText={email => setEmail(email)} />

                <TextInput placeholder='Senha' style={stylesDefault.input}
                    secureTextEntry={true}
                    value={password}
                    secureTextEntry={true}
                    onChangeText={password => setPassword(password)} />


                <TextInput placeholder='Confirma a Senha' style={stylesDefault.input}
                    secureTextEntry={true}
                    value={password2}
                    secureTextEntry={true}
                    onChangeText={password2 => setPassword2(password2)} />

                <ButtonPadrao title='Salvar' onPress={onCreatUser} Loading={Loading} />
            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
    formviewimg: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    formview: {
        flex: 4,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 40
    }
})

export default Register;
