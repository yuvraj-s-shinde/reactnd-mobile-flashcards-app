import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/colors'
import SubmitBtn from './SubmitBtn'
import QuestionCard from './QuestionCard'
import ScoreCard from './ScoreCard'

class Quiz extends Component {
    state = {
        score: 0,
        currentQuestionNo: 1
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
                <View style={{alignSelf: 'flex-end'}}>
                    <Text style={{fontSize:20}}>
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
            {currentQuestionNo > deck.questions.length && deck.questions.length != 0 && (
                <ScoreCard 
                deckTitle={deck.title}
                score={score} 
                maxScore={deck.questions.length} 
                resetScore={() => this.resetScore()}
                navigation={this.props.navigation} />
            )}
            {deck.questions.length == 0 && (
                <View style={styles.noQuestions}>
                    <View>
                        <Text style={{fontSize:30, fontWeight: 'bold'}}>
                            Sorry, you cannot take a quiz because 
                            there are no cards in the deck.
                        </Text>
                    </View>
                </View>
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
    questionCard: {
        flex: 1,
        backgroundColor: white,
        padding: 5,
        justifyContent: 'center'
    },
    noQuestions: {
        flex: 1,
        backgroundColor: white,
        padding: 15,
        justifyContent: 'center'
    }
})

function mapStateToProps(state, { route }) {
    const { deckTitle } = route.params
    return {
        deck: deckTitle in state ? state[deckTitle]: null,
    }
}

export default connect(mapStateToProps)(Quiz);