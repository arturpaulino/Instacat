import React, { useState, useEffect, useContext } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    Alert
} from 'react-native'

import * as ImagePicker from 'react-native-image-picker';
import  ContextLogged  from "../services/ContextUser";

import stylesDefault from '../../styles/styles';
import Colors from '../../styles/Colors'
import Icon from 'react-native-vector-icons/FontAwesome';


const AddPhotos = (props) => {
    const [image, setimage] = useState({ uri: null, base64: null });
    const [comment, setcomment] = useState();
    const [isLogged, logoff, dataUser, setUser, login] = useContext(ContextLogged);
   
    useEffect(() => {
        console.log('AddPhotos')
        setimage({ uri: props.img.uri, base64: props.img.base64 });
    
    }, [props]);

    const onPickImage = () => {
        try {
            const imageFunc = (res) => {
               // console.log('res', res)

                if (res.didCancel) {
                    console.log('User cancelled image picker');
                    return () => (Alert('Não possivel capturar a imagem'))
                } else if (res.error) {
                    ('ImagePicker Error: ', response.error);
                } else if (res.customButton) {
                    console.log('User tapped custom button: ', response.customButton);

                } else {
                    setimage({ uri: res.uri, base64: res.base64 });
                    props.oncallBack(res)
                }
            }

            ImagePicker.launchCamera(
                {
                    mediaType: 'photo',
                    includeBase64: true,
                    maxHeight: (props.maxHeight) ? props.maxHeight : 100,
                    maxWidth:  (props.maxWidth) ?  props.maxWidth : 100,
                }, imageFunc)


        } catch (e) {
            Alert('Não possivel capturar a imagem')
        }
      
    }

   return (
        <View style={ [   props.maxWidth == undefined ?   styles.imageProfiletitulo : styles.container] } >

            <View style={styles.title}>
                <Text style={stylesDefault.inputTitle} >{props.title}</Text>
            </View>
            <TouchableOpacity onPress={onPickImage}>
                { ( ( image.uri != null )  ) ?
                    <Image source={  {uri: `data:image/jpeg;base64,${image.uri }` }}  style={ props.maxWidth == undefined ?   styles.imageProfile : styles.imageFeed   } /> :
                    <Icon name='camera' size={60} color={Colors.blue} />
                }
                
              

            </TouchableOpacity >
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
   },
    title: {
        alignSelf : 'center',
        margin:0,
        padding: 0,
    },
    imageFeed: {
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 3 / 4,
    },
    imageProfile: {
       alignSelf : 'center',
        alignItems: 'center',
        marginBottom:10,
        width: 100,
        height:100,
        borderRadius:50,
    },
    imageProfiletitulo:  {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        width: 300,
      
    },
})

export default AddPhotos;