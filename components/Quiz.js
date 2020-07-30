import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { saveCardToDeck } from '../utils/api'
import { white } from '../utils/colors'
import { addCardToDeck } from '../actions'
import SubmitBtn from './SubmitBtn'
import QuestionCard from './QuestionCard'
import ScoreCard from './ScoreCard'

class Quiz extends Component {
    state = {
        score: 0,
        currentQuestionNo: 1
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
        score: currState.score,
        currentQuestionNo: currState.currentQuestionNo + 1
      }))
    }

    resetScore() {
        this.setState({
            score: 0,
            currentQuestionNo: 1
        })
    }

    render() {
      const { deck } = this.props
      const { score, currentQuestionNo } = this.state
      return(
          <View style={styles.container}>
            {currentQuestionNo <= deck.questions.length && (
            <View style={styles.container}>
                <View>
                    <Text>
                        {`${currentQuestionNo}/${deck.questions.length}`}
                    </Text>
                </View>
                <QuestionCard 
                style={styles.questionCard} 
                question={deck.questions[currentQuestionNo - 1]}
                onCorrectAnswer={() => this.onCorrectAnswer()}
                onIncorrectAnswer={() => this.onIncorrectAnswer()} />            
            </View>
            )}
            {currentQuestionNo > deck.questions.length && (
                <ScoreCard 
                deckTitle={deck.title}
                score={score} 
                maxScore={deck.questions.length} 
                resetScore={() => this.resetScore()}
                navigation={this.props.navigation} />
                
            )}
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
    questionCard: {
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

export default connect(mapStateToProps)(Quiz);