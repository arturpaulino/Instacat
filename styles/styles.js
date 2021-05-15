import React  from 'react'
import { StyleSheet } from 'react-native'
import Colors      from './Colors'

const stylesDefault = StyleSheet.create({
    input: {
        backgroundColor: Colors.champagne,
        margin:10,
        padding: 10,
        width: '90%',
        height: 38,
        borderRadius: 10,
        borderWidth: 0,
        textAlign: 'left',
        fontSize: Colors.sizeInputext,
    },
    inputTitle: {
        backgroundColor: Colors.champagne,
        margin:10,
        padding: 10,
        width: '80%',
        height: 40,
        borderRadius: 10,
        borderWidth: 0,
        textAlign: 'left',
        fontSize: Colors.sizeTitle,
        fontWeight: 'bold',
        
    },
    buttom: {
        justifyContent: 'center',
        backgroundColor: Colors.blue,
        margin:10,
        width: '90%',
        height: 40,
        borderRadius: 10,
        borderWidth: 0,
    },
    buttomEsqueci: {
        backgroundColor: Colors.width,
    },
    buttomText: {
        fontSize: Colors.sizebuttomText,
        color: Colors.white,
        textAlign: 'center',
    },
    buttomTextEsqueci: {
        fontSize: Colors.sizebuttomText,
        color: Colors.blue,
        textAlign: 'center',
    }
})
export default stylesDefault
