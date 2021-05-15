import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native'
import ContextLogged from "../services/ContextUser.js";

import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';


import { updateUser, cleanUserAuthData, getUserAuthData, isLogged } from '../services/Auth';
import ButtonPadrao from '../components/Button';
import Loading from '../components/Loading';

import AddPhoto from '../components/AddPhotos';
import stylesDefault from '../../styles/styles';
import Colors from '../../styles/Colors'

const Profile = ({ navigation }) => {
    const [isLogged, logoff, dataUser, setUser, login] = useContext(ContextLogged);

    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);



    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();
    const [imageProfile, setimageProfile] = useState(null);
    navigation = useNavigation();


    useFocusEffect(
        React.useCallback(() => {
            async function checkLoginInit() {
                if (dataUser !== null) {
                    setimageProfile({ uri: dataUser.img })
                    setName(dataUser.name);
                    setEmail(dataUser.email);
                    navigation.setOptions({ title: 'Edição de Perfil..' })
                }
                setIsLoading(false);
            }
            checkLoginInit()

        }, [dataUser.name])
    )



    if (isLoading) {
        return <Loading />
    }

    const onupdateUser = async () => {

        try {
            setLoading(true);
            await onValidUser()

            await updateUser({
                id: dataUser.id,
                email: dataUser.email,
                password: password,
                name,
                imageProfile,

            }).then(({ registerSuccess, user }) => {
                // console.log('Register', registerSuccess, user)
                if (registerSuccess === true) {
                    alert("Usuario atualizado com sucesso")
                    setUser(user)
                    setPassword(null)
                    navigation.navigate('Feed')
                }
            })
        } catch (e) {
            console.log(' catch', e)
            Alert.alert('Atenção', e.message);
        } finally {
            setLoading(false);
            if (isLogged) {
                navigation.navigate('Feed')
            }
        }
    }

    const onSalveImg = (img) => {
        setimageProfile({ uri: img.base64, base64: img.base64 })

    }


    const onLogout = async () => {
        await logoff()
        console.log('dataUser.id', dataUser.id)
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }]
        })
    }


const onValidUser = async () => {
    if (name == undefined || name.toString() === "") {
        throw new Error("Nome inavalido.")
    }

    if (email == undefined || email.toString() === "") {
        throw new Error("E-mail inavalido.")
    }

}


return (
    <View style={styles.container}>
        <View style={styles.formviewimg} >
            <AddPhoto title='Escolha foto de perfil ' img={imageProfile} oncallBack={(img) => onSalveImg(img)}  ></AddPhoto>
        </View>

        <View style={styles.formview} >

            <TextInput placeholder='Nome' style={stylesDefault.input}
                autoFocus={true} value={name}
                onChangeText={name => setName(name)} />

            <TextInput placeholder='Email' style={stylesDefault.input}
                value={email}
                onChangeText={email => setEmail(email)} editable = {false}  />

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


            <ButtonPadrao title='Salvar' onPress={onupdateUser} Loading={loading} />


            <ButtonPadrao title='Logout' onPress={onLogout} Loading={false} />



        </View>
    </View>

)

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
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


export default Profile;
