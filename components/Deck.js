import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { removeDeck, receiveDecks } from '../actions'
import { deleteDeck, getDecks } from '../utils/api'
import { white, purple } from '../utils/colors'
import SubmitBtn from './SubmitBtn'
import TextButton from './TextButton'
import DeckDetails from './DeckDetails'

class Deck extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.deck !== null
    }

    toHome = () => {
        this.props.navigation.goBack()
    }

    handleRemoveDeck = () => {
        const { goBack, deck } = this.props
        
        //update db
        this.props.dispatch(removeDeck(deck.title))
        
        //update redux
        deleteDeck(deck.title)

        // navigate to home
        this.toHome()
    }

    render() {
        const { title, questions } = this.props.deck
        return (
            <View style={styles.container}>
                <DeckDetails style={styles.deckDetails} deck={this.props.deck} />
                <SubmitBtn style={styles.addCardButton} onPress={() => this.props.navigation.navigate('New Question', { deckTitle: title })} text='Add Card'/>
                <SubmitBtn style={styles.startQuizButton} onPress={() => this.props.navigation.navigate('Quiz', { deckTitle: title })} text='Start Quiz'/>
                <TextButton style={{padding: 10}} onPress={this.handleRemoveDeck}>
                    Remove Deck
                </TextButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 15,
    },
    noDataText: {
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 20
        },
    addCardButton: {
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        borderWidth: 1, 
        borderRadius: 2,
        height: 45,
        backgroundColor: white,
        alignItems: 'center',
        marginBottom: 30
    },
    startQuizButton: {
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        borderWidth: 1, 
        borderRadius: 2,
        height: 45,
        backgroundColor: purple,
        alignItems: 'center',
        marginBottom: 30
    },
    deckDetails: {
        flex: 1,
        backgroundColor: white,
        padding: 5,
        justifyContent: 'center'
    },
})

function mapStateToProps(state, { route }) {
    const { deckTitle } = route.params
    return {
        deck: deckTitle in state ? state[deckTitle]: null,
    }
}

export default connect(mapStateToProps)(Deck);