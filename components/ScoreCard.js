import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import TextButton from './TextButton'
import { white, purple } from '../utils/colors'
import { connect } from 'react-redux'
import { removeDeck, receiveDecks } from '../actions'
import { deleteDeck, getDecks } from '../utils/api'
import SubmitBtn from './SubmitBtn'
import DeckDetails from './DeckDetails'

class ScoreCard extends Component {

    // shouldComponentUpdate(nextProps) {
    //     // Check to avoind render for deleted deck
    //     return nextProps.deck !== null  
    // }


    render() {
        const { score, maxScore, resetScore, deckTitle } = this.props
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.noDataText}>
                        Score: {((score/maxScore)*100).toFixed(2)} %
                    </Text>
                </View>
                <SubmitBtn style={styles.restartQuizButton} onPress={() => {
                    resetScore()
                    this.props.navigation.navigate('Quiz', { deckTitle: title })
                }} text='Restart Quiz'/>
                <SubmitBtn style={styles.backToDeckButton} onPress={() => {
                    resetScore()
                    this.props.navigation.navigate('Deck', { deckTitle: title })
                }} text='Back to Deck'/>
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
    backToDeckButton: {
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
    restartQuizButton: {
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

function mapStateToProps(state, { route, score, maxScore }) {
    const { deckTitle } = route.params
    return {
        deckTitle,
        score,
        maxScore
    }
}

// function mapDispatchToProps (dispatch, {route, navigation}) {
//     return {
//         goBack: () => navigation.goBack()
//     }
// }

export default connect(mapStateToProps)(ScoreCard);