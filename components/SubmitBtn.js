import React from 'react'
import { Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { purple, white } from '../utils/colors'

const styles = StyleSheet.create({
    submitButtonIos : {
        padding: 10,
        marginLeft: 40,
        marginRight: 40,
        borderRadius: 7,
        height: 45,
        backgroundColor: purple,
        marginBottom: 30
    },
    submitButtonAndroid: {
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        borderRadius: 2,
        height: 45,
        backgroundColor: purple,
        alignItems: 'center',
        marginBottom: 30
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',        
    }
})


const SubmitBtn = ({ onPress, text }) => {
        return(
            <TouchableOpacity onPress={onPress}
            style={Platform.OS === 'ios' ? styles.submitButtonIos : styles.submitButtonAndroid}>
                <Text style={styles.submitBtnText}>{text}</Text>
            </TouchableOpacity>
        )
}

export default SubmitBtn;