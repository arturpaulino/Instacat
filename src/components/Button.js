import * as React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

import stylesDefault from '../../styles/styles';
import Colors from '../../styles/Colors'
import Loading from '../components/Loading';

const ButtonPadrao = (props) => {

  
    return (

        <TouchableOpacity onPress={props.onPress} style={stylesDefault.buttom} >
            { props.Loading ?
                <Loading  size={30} />  : <Text style={stylesDefault.buttomText}> {props.title} </Text>}
        </TouchableOpacity>
    )
}

export default ButtonPadrao;