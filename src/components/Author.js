import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const Author = (props) => {
    return (
        <View style={styles.container}>

            { (props.demo == true) ?
                <Image source={props.img} style={styles.avatar} />
                :
                <Image source={{ uri: `data:image/jpeg;base64,${props.img}` }} style={styles.avatar} />
            }
            <Text style={styles.nickname}>{props.nickname}</Text>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 10
    },
    nickname: {
        color: '#444',
        marginVertical: 10,
        fontSize: 15,
        fontWeight: 'bold'
    }
})

export default Author;