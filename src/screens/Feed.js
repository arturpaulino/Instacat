import React, { useState, useEffect, useContext } from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import ContextLogged from "../services/ContextUser.js";

import Post from '../components/Post'
import Header from '../components/Header'

import { getPots } from '../services/Post';
import ButtonPadrao from '../components/Button';
import AddPhotoImg from '../components/AddPhotos';
import stylesDefault from '../../styles/styles';
import Colors from '../../styles/Colors'
import Loading from '../components/Loading';

import gato1 from '../../assets/demo/gato1.png';
import gato2 from '../../assets/demo/gato2.png';

const Feed = ({ navigation, route }) => {
    const [posts, setposts] = useState()
    const [isLoading, setIsLoading] = useState(true);
    const [isLogged, logoff, dataUser, setUser, login] = useContext(ContextLogged);
    useEffect(() => {

        console.log('route.params Feed', route.params)

        if (dataUser.id != null) {
            const loadData = async () => {
                const { data } = await getPots();
                setposts(data)
                setIsLoading(false)
            }

            loadData()
        } else {
            const loadData = async () => {
                console.log('loadData demo')
                let data =
                    [
                        {
                            date: new Date(),
                            idpost: "1",
                            user: dataUser.id,
                            nickname: dataUser.name,
                            subtitle: 'Modo Demostração',
                            img: gato1,
                            imgUser: gato1,
                            comments: [
                                {
                                    nickname: dataUser.name,
                                    user: dataUser.id,
                                    comment: 'Modo Demostração'
                                }
                            ]

                        },
                        {
                            date: new Date(),
                            idpost: "2",
                            user: dataUser.id,
                            nickname: dataUser.name,
                            subtitle: 'Modo Demostração',
                            img: gato2,
                            imgUser: gato2,
                            comments: [
                                {
                                    nickname: dataUser.name,
                                    user: dataUser.id,
                                    comment: 'Modo Demostração'
                                }
                            ]


                        }
                    ]

                    if (route.params?.postDemo != null){
                        const post =JSON.parse(route.params.postDemo) 
                        data.push( post)
                    }   
                setposts(data)
                setIsLoading(false)
            }
            loadData()
        }

    }, [route.params?.postDemo, dataUser.id])


    if (isLoading) {
        return <Loading />
    }



    return (

        < View style={styles.container} >
            <Header />
            <FlatList
                data={posts}
                keyExtractor={item => `${item.idpost}`}
                renderItem={({ item }) =>
                    <Post key={item.idpost} {...item} />} />

        </View >

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
    }
})

export default Feed;