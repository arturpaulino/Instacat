import React, { useState , useContext } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, TouchableOpacity, Modal, TextInput, Dimensions, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';


import  ContextLogged  from "../services/ContextUser";
import ButtonPadrao from '../components/Button';
import Colors from '../../styles/Colors'
import Icon from 'react-native-vector-icons/FontAwesome';
import stylesDefault from '../../styles/styles';

import { salveComment } from '../services/Post';

const Comments = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [comments, setcomments] = useState([]);

    
    const navigation = useNavigation();
    const [comment, setcomment] = useState();
    const [isLogged, logoff, dataUser, setUser, login] = useContext(ContextLogged);
   

    React.useEffect(() => {
        const loadData = () => {
            setcomments(props.comments)
        }
        loadData();

    }, [comments, dataUser.id]);

   

    const onDelete = async (i) => {
        if ((props.myself) == true) {
            try {
                var update = comments.splice(i, 1)
                setcomments(update);

                await salveComment(comments, props.idpost)
            } catch (e) {
                Alert.alert('Atenção', e.message)
            } finally {
                setModalVisible(false)
            }

        }
    }


    const onAddComment = async () => {
        try {

            if ((comment == null) || (comment.toString() == null)) {
                throw Error('É necessario fazer um comentário na foto .')
            }

            const dataPost = {

                user: dataUser.id,
                nickname: dataUser.name,
                comment: comment,
            }
            const onSalveComment = Object.values(comments.push(dataPost))
            setcomments(onSalveComment)
            setcomment('');
            setModalVisible(false)

            await salveComment(comments, props.idpost)
        } catch (e) {
            Alert.alert('Atenção', e.message)
        } finally {

        }

    }

    const onNavComment = () => {

        if (dataUser.id == null ) {
            Alert.alert('Atenção', 'Você está navegando em modo anônimo, as informação não serão gravadas. Caso queria gravar as informações criei uma conta ou faça login no aplicativo. ')
            navigation.navigate('Feed')
        } else {

            if ((props.myself) != true) {
                navigation.navigate('comentarios', {
                    idpost: props.idpost,
                    comments: comments,
                    myself: true,
                })
            }
        }
    }

    let view = null
    view = comments.map((item, index) => {
        var selftIndex = index;
        if ((index > 0) && (props.myself != true))
            return null;
        else {
            return (
                <View key={index} style={styles.commentContainer} >
                    <View style={styles.commentContainerText}>
                        <Text style={styles.nickname}>{item.nickname}: </Text>
                        <Text style={styles.comment}>{item.comment}</Text>
                    </View>

                    { (item.user == dataUser.id) && (props.myself == true) ?
                        <TouchableOpacity style={styles.commentContainerBt} onPress={(selftIndex) => onDelete(selftIndex)
                        } >
                            <Icon name='trash' size={30} color={Colors.blue} />
                        </TouchableOpacity> : null}
                </View>
            )
        }

    })

    let btpressable = null
    btpressable = () => {
        if (props.myself != true) {
            return (
                <Pressable onPress={() => { onNavComment() }}>


                    <Text style={styles.comment}>Ver todos os {comments.length} comentarios</Text>
                </Pressable>
            )
        } else {
            return (
                <ButtonPadrao title='Adcionar Comentario' onPress={() => setModalVisible(true)} Loading={false} />
            )
        }
    };

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Comentario</Text>

                        <TextInput placeholder='Pode comentar...'
                            style={[stylesDefault.input, { height: 80 }]} autoFocus={true}
                            value={comment}
                            multiline={true}
                            maxLength={140}
                            numberOfLines={3}
                            onChangeText={comment => { setcomment(comment) }}
                            onSubmitEditing={onAddComment} />

                        <ButtonPadrao title='Atualizar Comentario' onPress={onAddComment} Loading={false} />


                    </View>
                </View>
            </Modal>

            <ScrollView >
                {view}
            </ScrollView>
            <View style={styles.containerAddpost}>
                {btpressable()}
            </View>

        </View >

    );
};

const styles = StyleSheet.create({
    commentContainer: {
        flex: 1,
        flexDirection: 'row',
        borderBottomColor: Colors.metal,
        borderBottomWidth: 0.50,
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
    },
    commentContainerText: {
        flex: 6,
        textAlign: 'justify',
        flexDirection: 'row',
        marginBottom: 1,
    },
    commentContainerBt: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    modalView: {
        width: '100%',
        height: Dimensions.get('window').width * 3 / 4,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    container: {
        flex: 1,
        margin: 5,
        backgroundColor: Colors.white,
        width: '100%',
    },
    containerComments: {
        flex: 1,
        height: '100%',
    },
    containerAddpost: {
        margin: 0,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },

    nickname: {
        fontWeight: 'bold',
        color: '#444'
    },
    comment: {
        flex: 1,
        color: '#555',
        textAlign: 'justify',
        marginRight: 5
    },
})
export default Comments;