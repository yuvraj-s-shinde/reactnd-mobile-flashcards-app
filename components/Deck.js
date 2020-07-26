import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import TextButton from './TextButton'
import { white } from '../utils/colors'
import { connect } from 'react-redux'
import { removeDeck, receiveDecks } from '../actions'
// import { getDailyReminderValue, timeToString } from '../utils/helpers'
import { deleteDeck, getDecks } from '../utils/api'
import SubmitBtn from './SubmitBtn'

class Deck extends Component {

    // shouldComponentUpdate (nextProps) {
    //     return nextProps.metrics.length !== 0 && !nextProps.metrics[0].today
    // }
    toHome = () => {
        this.props.navigation.goBack()
    }

    handleRemoveDeck = () => {
        const { goBack, deck } = this.props
        deleteDeck(deck.title)
        removeDeck(deck.title)
        toHome()
        getDecks()
        .then((decks) => {
        console.log("decks db after remove:", decks)
        })
    }

    handleAddCard() {
        
    }

    render() {
        const { title, questions } = this.props.deck
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.noDataText}>
                        {title}
                    </Text>
                </View>
                <View>
                    <Text style={styles.noDataText}>
                        {questions.length} Cards
                    </Text>
                </View>
                <SubmitBtn onPress={() => this.props.navigation.navigate('New Question', { deckTitle: title })} text='Add Card'/>
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
        }
})

function mapStateToProps(state, { route }) {
    const { deckTitle } = route.params
    return {
        deck: state[deckTitle],
    }
}

// function mapDispatchToProps (dispatch, {route, navigation}) {
//     return {
//         goBack: () => navigation.goBack()
//     }
// }

export default connect(mapStateToProps)(Deck);