import React from 'react'
import { Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { purple, white } from '../utils/colors'

const styles = StyleSheet.create({
    submitBtnText: {
        // color: ,
        fontSize: 22,
        textAlign: 'center',        
    }
})


const SubmitBtn = ({ style, onPress, text }) => {
        return(
            <TouchableOpacity onPress={onPress}
            style={style}>
                <Text style={styles.submitBtnText}>{text}</Text>
            </TouchableOpacity>
        )
}

export default SubmitBtn;