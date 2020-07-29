import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { saveCardToDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addCardToDeck } from '../actions'
import { white, green, red } from '../utils/colors'
import { NavigationActions } from 'react-navigation'
import SubmitBtn from './SubmitBtn'
import QuestionCard from './QuestionCard'
import ScoreCard from './ScoreCard'

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
    correctButton: {
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        borderWidth: 1, 
        borderRadius: 2,
        height: 45,
        backgroundColor: green,
        alignItems: 'center',
        marginBottom: 30
    },
    incorrectButton: {
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        borderWidth: 1, 
        borderRadius: 2,
        height: 45,
        backgroundColor: red,
        alignItems: 'center',
        marginBottom: 30
    },
    questionCard: {
        flex: 1,
        backgroundColor: white,
        padding: 5,
        justifyContent: 'center'
    },
})

class Quiz extends Component {
    state = {
        score: 0,
        currentQuestionNo: 0
    }

    toHome = () => {
        this.props.navigation.goBack()
    }

    onCorrectAnswer() {
      this.setState((currState) => ({
        score: currState.score + 1,
        currentQuestionNo: currState.currentQuestionNo + 1
      }))
    }

    onIncorrectAnswer() {
      this.setState((currState) => ({
        score: currState.score != 0 ? currState.score - 1 : 0,
        currentQuestionNo: currState.currentQuestionNo + 1
      }))
    }

    resetScore() {
        this.setState({
            score: 0,
            currentQuestionNo: 0
        })
    }

    render() {
      const { deck } = this.props
      const { score, currentQuestionNo } = this.state
      return(
          <View style={styles.container}>
            {currentQuestionNo < deck.questions.length && (
            <View style={styles.container}>
                <View>
                    <Text>
                        {`${currentQuestionNo + 1}/${deck.questions.length}`}
                    </Text>
                </View>
                <QuestionCard 
                style={styles.questionCard} 
                question={deck.questions[currentQuestionNo]}
                onCorrectAnswer={() => this.onCorrectAnswer()}
                onIncorrectAnswer={() => this.onIncorrectAnswer()} />            
            </View>
            )}
            {currentQuestionNo >= deck.questions.length && (
                <ScoreCard 
                score={score} 
                maxScore={deck.questions.length} 
                resetScore={() => this.resetScore()} />
            )}
        </View>
      )
    }
}

function mapStateToProps(state, { route }) {
    const { deckTitle } = route.params
    return {
        deck: deckTitle in state ? state[deckTitle]: null,
    }
}

export default connect(mapStateToProps)(Quiz);