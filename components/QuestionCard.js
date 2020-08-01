import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { white, green, red } from '../utils/colors'
import SubmitBtn from './SubmitBtn'
import TextButton from './TextButton'

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
        <View style={styles.questionAnswer}>
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

const styles = StyleSheet.create({
    questionAnswer: {
        flex: 1,
        backgroundColor: white,
        padding: 15,
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 40,
        alignSelf: 'center',
        fontWeight: "bold",
        justifyContent: 'center',
        marginLeft: 15,
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
    }
})

export default QuestionCard;