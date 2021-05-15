import React, { useState, useEffect } from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import Comments from '../components/Comments';

const ListComments = ({ navigation, route }) => {
    const [posts, setposts] = useState()
    const [comments, setcomments] = useState([]);
  
    
       
    React.useEffect(() => {
        const loadData = () => {
            setcomments(route.params.comments)
        }
        loadData();

    }, [comments]);


    return (
        <View style={styles.container}>
            <Comments  myself={route.params.myself} idpost={route.params.idpost} comments={comments} />

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#F5FCFF'
    }
})

export default ListComments;