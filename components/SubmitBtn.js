import React from 'react'
import { Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { purple, white } from '../utils/colors'

const SubmitBtn = ({ style, onPress, text }) => {
    return(
        <TouchableOpacity onPress={onPress}
        style={style}>
            <Text style={styles.submitBtnText}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    submitBtnText: {
        fontSize: 22,
        textAlign: 'center',        
    }
})

export default SubmitBtn;