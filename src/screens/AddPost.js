import React, { useState, useContext } from 'react'
import {
    View,
    StyleSheet,
    TextInput,
    Dimensions,
    Platform,
    KeyboardAvoidingView,
    Keyboard,
    Alert,
    TouchableWithoutFeedback
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native';

import ContextLogged from "../services/ContextUser.js";
import { updatePots, deletePost } from '../services/Post';

import ButtonPadrao from '../components/Button';
import AddPhotoImg from '../components/AddPhotos';
import stylesDefault from '../../styles/styles';
import Colors from '../../styles/Colors'



const AddPost = ({ navigation, route }) => {
    const [image, setimage] = useState({ uri: null, base64: null });
    const [comment, setcomment] = useState();
    const [isLogged, logoff, dataUser, setUser, login] = useContext(ContextLogged);

    useFocusEffect(
        React.useCallback(() => {
            async function checkLoginInit() {
                console.log('checkLoginInit')

                 if (dataUser.id == null) {
                     Alert.alert('Atenção', 'Você está navegando em modo anônimo, as informação não serão gravadas. Caso queria gravar as informações criei uma conta ou faça login no aplicativo. ')
                  }


                setimage({ uri: null, base64: null });
                setcomment('')

                if (route.params != undefined) {
                    if (route.params.post.idpost != null) {
                        /// console.log('passando aaqui', route.params)
                        setimage({ uri: route.params.post.img, base64: null })
                        setcomment(route.params.post.subtitle)
                    }
                }
            }
            checkLoginInit()
            return () => {
                console.log('Saind Return')
                navigation.setParams({
                    post: {
                        idpost: null,
                        subtitle: null,
                        comments: null,
                        img: { uri: null, base64: null },
                    }
                })

            }
        }, [route, dataUser.id])
    )


    const onDeletePost = async () => {
        try {
            await deletePost(route.params.post.idpost)
            navigation.push('Home')
        } catch (e) {
            Alert.alert('Atenção', e.message)
        } finally {
            //
        }
    }


    const onSavePost = async () => {
        console.log('onSavePost')
        try {
            if (image.uri == null) {
                throw Error('É necessario tirar uma foto para gravar o pots.')
            }
            if (image.uri.toString() == '') {
                throw Error('É necessario tirar uma foto para gravar o pots.')
            }

            if ((comment == null) || (comment.toString() == '')) {
                throw Error('É necessario fazer um comentário na foto .')
            }
            let base64 = ((route.params != undefined) && (route.params != null), image.uri, image.base64)
            let idpost = null;
            let comments = ([])

            if (route.params != undefined) {
                idpost = (route.params.post.idpost != null ? route.params.post.idpost : null)
                comments = (idpost ? route.params.post.comments : [])
            }
            comments.unshift({
                nickname: dataUser.name,
                user: dataUser.id,
                comment: comment
            });


            const dataPost = {
                date: new Date(),
                idpost: idpost,
                user: dataUser.id,
                nickname: dataUser.name,
                subtitle: comment,
                img: image.uri,
                comments: comments,
                imgUser: null,
            }
            setcomment('')
            if (dataUser.id == null) {
                dataPost.imgUser = image.uri,
                dataPost.idpost = Math.random(1000)
                const jsonString = JSON.stringify(dataPost);
                navigation.push('Home', {
                    screen: 'Feed',
                    params: { postDemo: jsonString },
                });
            } else {
                await updatePots(dataPost, idpost)
                navigation.push('Home')
            }


        } catch (e) {
            Alert.alert('Atenção', e.message)
        } finally {
            //
        }
    }

    const onSalveImg = (img) => {
        setimage({ uri: img.base64, base64: img.base64 })
    }


    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={styles.container}>

                    <View style={styles.containerText}>

                        <AddPhotoImg title='Compartilhe uma imagem'
                            maxWidth={Dimensions.get('window').width}
                            maxHeight={Dimensions.get('window').width * 3 / 4}
                            img={image} oncallBack={(img) => onSalveImg(img)}  ></AddPhotoImg>

                    </View >

                    <View style={[styles.containerText, styles.input]}>
                        <TextInput placeholder='Algum comentário para a foto?'
                            style={[stylesDefault.input, styles.input]} value={comment}
                            onChangeText={comment => setcomment(comment)} />


                        <ButtonPadrao title='Salvar Post' onPress={onSavePost} Loading={false} />

                        {((route.params != undefined) && (route.params.post.idpost != null)) ?
                            <ButtonPadrao title='Excluir Post' onPress={onDeletePost} Loading={false} /> : null}

                    </View>
                </View>

            </TouchableWithoutFeedback>

        </KeyboardAvoidingView>

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
    containerText: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: Dimensions.get('window').width,
    },
    input: {
        marginTop: 20,
    }
})

export default AddPost;