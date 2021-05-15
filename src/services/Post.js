import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage'
import UUIDGenerator from 'react-native-uuid-generator';



export const salveComment = async (data, id) => {
    if (id == undefined || id.toString() === "") {
        throw Error('ID do Post invalido é um paramentro obrigatorio')
    }
    try {
        const dataPost = {
            comments: data
        }
        await firestore()
            .collection('posts')
            .doc(id)
            .update(dataPost);



        return { registerSuccess: true, user: [] }

    } catch (e) {
        Alert.alert('Erro ao Criar um usuário', e.message);
        return { registerSuccess: false, user: [] }
    }
}


export const deletePost = async (id) => {
    if (id == undefined || id.toString() === "") {
        throw Error('ID do Post invalido é um paramentro obrigatorio')
    }
    try {
        await firestore()
            .collection('posts')
            .doc(id)
            .delete();

        return { registerSuccess: true, user: [] }

    } catch (e) {
        Alert.alert('Erro ao Criar um usuário', e.message);
        return { registerSuccess: false, user: [] }
    }
}


export const getPots = async (posts, id) => {
    try {
        const dadosRetorno = []
        const dadosUsers = []
        const snapshot = await firestore().collection('posts').get();
        var result = '';
        snapshot.forEach(doc => {

            dadosRetorno.push(
                {
                    date: doc.data().date,
                    idpost: doc.data().idpost,
                    user: doc.data().user,
                    subtitle: doc.data().subtitle,
                    nickname: doc.data().nickname,
                    img: doc.data().img,
                    imgUser: null,
                    comments: doc.data().comments,
                });
        });

        var dadosTem = [];
        var dadosRetorno2 = [];
        for (dadosTem of dadosRetorno) {
            let result = dadosUsers.find(user => user.id === dadosTem.user);

            if (result == undefined) {
                var refUsers = firestore().collection('users').doc(dadosTem.user)
                var docUsers = await refUsers.get();
                if (docUsers.exists) {
                    result = {
                        id: dadosTem.user,
                        img: docUsers.data().img,
                    }
                    dadosUsers.push(result);
                    dadosTem.imgUser = result.img
                }
            } else {
                dadosTem.imgUser = result.img
            }
            dadosRetorno2.push(dadosTem)


        }
        return { data: dadosRetorno2 }

    } catch (e) {
        Alert.alert('Erro ao carregas dados', e.message);
        return { data: [] }
    }
}




export const updatePots = async (data, id) => {
   // console.log('updatePots', data)
    if (id == undefined || id.toString() === "") {

        id = await UUIDGenerator.getRandomUUID()
        console.log('updatePots id gerado', id)
    }

    if (id == null || id.toString() === '') {
        throw Error('ID do Post invalido é um paramentro obrigatorio')
    }

    try {

        await firestore()
            .collection('posts')
            .doc(id)
            .set({
                date: new Date(),
                idpost: id,
                user: data.user,
                nickname: data.nickname,
                img: data.img,
                subtitle: data.subtitle,
                comments: [
                    {
                        user: data.user,
                        nickname: data.nickname,
                        comment: data.comments.[0].comment,

                    }
                ]
            })


        return { registerSuccess: true, user: [] }

    } catch (e) {
        Alert.alert('Erro ao Criar um usuário', e.message);
        return { registerSuccess: false, user: [] }
    }
}

