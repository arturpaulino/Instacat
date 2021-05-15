import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, View, Image, Dimensions, Text } from 'react-native'


import icon from '../../assets/img/icon.png'
import { Gravatar } from 'react-native-gravatar'
import ContextLogged from "../services/ContextUser";


const Header = (props) => {
    const [isLogged, logoff, dataUser, setUser, login] = useContext(ContextLogged);
    // console.log(dataUser);
    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <Image source={icon} style={styles.image} />


            </View>

            <View style={styles.userContainer}>
                <Text style={styles.user}>{dataUser.name}</Text>
                {(dataUser !== null) ?
                    <Image source={{ uri: `data:image/jpeg;base64,${dataUser.img}` }} style={styles.avatar} />
                    : null}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#BBB',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        height: 60,
        width: 60,
        resizeMode: 'contain'
    },
    title: {
        color: '#000',
        //  fontFamily: 'shelter',
        height: 36,
        fontSize: 26
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    user: {
        fontSize: 10,
        color: '#888',
    },
    avatar: {
        width: 40,
        height: 40,
        marginLeft: 10,
        borderRadius: 40,
    }
})

export default Header;
