import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { saveCardToDeck } from '../utils/api'
import { addCardToDeck } from '../actions'
import { white, purple } from '../utils/colors'
import SubmitBtn from './SubmitBtn'

class NewQuestion extends Component {
    state = {
        question: '',
        answer: ''
    }

    toHome = () => {
        this.props.navigation.goBack()
    }

    onChangeQuestion(text) {
      this.setState({
        question: text
      })
    }

    onChangeAnswer(text) {
      this.setState({
        answer: text
      })
    }

    submit = () => {
        const { question, answer } = this.state
        const { deckTitle } = this.props
        const card = {
            question: question,
            answer: answer
        }

        //update redux
        this.props.dispatch(addCardToDeck(deckTitle, card))

        //update db
        saveCardToDeck(deckTitle, card)

        //reset state
        this.setState({
            question: '',
            answer: ''
        })

        // navigate to home
        this.toHome()
    }

    render() {
      return(
          <View style={styles.container}>
            <View style={styles.textInput}>
                <TextInput
                onChangeText={text => this.onChangeQuestion(text)}
                placeholder='Question'
                value={this.state.question}
                multiline
                numberOfLines={4}
                maxLength={40}
                />
            </View>
            <View style={styles.textInput}>
                <TextInput
                onChangeText={text => this.onChangeAnswer(text)}
                placeholder='Answer'
                value={this.state.answer}
                multiline
                numberOfLines={4}
                maxLength={40}
                />
            </View>
            <SubmitBtn style={styles.submitButton} onPress={this.submit} text='Submit' />
          </View>
      )
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: white,
        justifyContent: 'space-around'
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30,
        marginLeft: 30,
    },
    title: {
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: "bold",
        justifyContent: 'center'
        },
    textInput: {  
      borderColor: 'gray', 
      marginLeft: 20,
      marginRight: 20,
      borderWidth: 1, 
      alignItems: 'center' ,
      justifyContent: 'center'
    },
    submitButton: {
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        borderWidth: 1, 
        borderRadius: 2,
        height: 45,
        backgroundColor: purple,
        alignItems: 'center',
        marginBottom: 30,
        marginLeft: 15,
        marginRight: 15
    },
})

function mapStateToProps(state, { route }) {
    const { deckTitle } = route.params
    return {
        deckTitle,
    }
}

export default connect(mapStateToProps)(NewQuestion);