import React from 'react'
import { View, Image, Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import Author from './Author';
import Comments from './Comments';


import ContextLogged from '../services/ContextUser';
import { StackActions } from '@react-navigation/native';

const Post = (props) => {
    const navigation = useNavigation();

    const onNavComment = (nav) => {

        navigation.navigate('AddPhoto', {
            screen: 'Home',
            post: {
                idpost: nav.idpost,
                subtitle: nav.subtitle,
                comments: nav.comments,
                img: nav.img,
            }
        })

    }

    //    <Image source={{ uri: `data:image/jpeg;base64,${props.img}` }} style={styles.image} />

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => { onNavComment(props) }}>
                <Author email={props.email} nickname={props.nickname} img={props.imgUser}  demo={props.idpost.length <= 5} ></Author>

                {props.idpost.length <= 5 ?
                    <Image source={props.img} style={styles.image} />
                    :
                    <Image source={{ uri: `data:image/jpeg;base64,${props.img}` }} style={styles.image} />
                }

                <Comments idpost={props.idpost} comments={props.comments} />
            </TouchableOpacity>
        </View>
    );
    ;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0,
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 3 / 4,
        justifyContent: 'center',
        alignItems: 'center',
    }

})

export default Post;