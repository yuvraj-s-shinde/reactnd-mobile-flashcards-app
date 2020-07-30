import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { saveDeckTitle, getDeck } from '../utils/api'
import { white, purple } from '../utils/colors'
import { addDeck } from '../actions'
import SubmitBtn from './SubmitBtn'

class AddDeck extends Component {
    state = {
        deckTitle: ''
    }

    toHome = () => {
        this.props.navigation.goBack()
    }

    onChangeText(text) {
      this.setState({
        deckTitle: text
      })
    }

    submit = () => {
        const { deckTitle } = this.state
        const deck = {
          title: deckTitle,
          questions: []
        }

        //update redux
        this.props.dispatch(addDeck(deck))

        //update db
        saveDeckTitle(deckTitle)

        //reset state
        this.setState({
            deckTitle: ''
        })

        // navigate to home
        this.toHome()
    }

    render() {
      return(
          <View style={styles.container}>
            <View>
                <Text style={styles.title}>
                    What is the title of your new deck?
                </Text>
            </View>
            <View style={styles.textInput}>
                <TextInput
                onChangeText={text => this.onChangeText(text)}
                placeholder='DECK TITLE'
                value={this.state.deckTitle}
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
    title: {
        fontSize: 40,
        alignSelf: 'center',
        fontWeight: "bold",
        justifyContent: 'center',
        marginLeft: 15,
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

export default connect()(AddDeck);