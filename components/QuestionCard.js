import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { darkgray, white } from '../utils/colors'
import SubmitBtn from './SubmitBtn'
import TextButton from './TextButton'

const styles = StyleSheet.create({
    title: {
        fontSize: 35,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    cardCount: {
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 20,
        color: darkgray,
        alignSelf: 'center'
    }
})

const ToggleQuestionAnswer = (props) => {
    let content, buttonText;
    const { question, renderQuestion, toggle } = props
    if (renderQuestion) {
        content = question.question
        buttonText = 'Show Answer'
    }
    else {
        content = question.answer
        buttonText = 'Show Question'
    }
    return(
        <View>
            <View>
                <Text style={styles.title}>
                    {content}
                </Text>
            </View>
            <TextButton style={{padding: 10}} onPress={toggle}>
                {buttonText}
            </TextButton>
        </View>
    )
}

class QuestionCard extends Component {
    state = {
        renderQuestion: true
    }

    toggleRenderQuestion() {
        this.setState((currState) => ({
            renderQuestion: !currState.renderQuestion
        }))
    }

    render() {
        const { style, question, onCorrectAnswer, onIncorrectAnswer } = this.props
        const { renderQuestion } = this.state
        return(
            <View style={style}>
                <ToggleQuestionAnswer question={question} renderQuestion={renderQuestion} toggle={() => this.toggleRenderQuestion()} />
                {!renderQuestion && (
                    <View>
                        <SubmitBtn style={styles.correctButton} onPress={() => {
                            this.toggleRenderQuestion()
                            onCorrectAnswer()
                        }} text='Correct'/>
                        <SubmitBtn style={styles.incorrectButton} onPress={() => {
                            this.toggleRenderQuestion()
                            onIncorrectAnswer()
                        }} text='Incorrect'/>
                    </View>
                )}
            </View>
        )
    }
}

export default QuestionCard;