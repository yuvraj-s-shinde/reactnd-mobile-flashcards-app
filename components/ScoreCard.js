import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {white, purple} from '../utils/colors';
import {clearLocalNotification, setLocalNotification} from '../utils/helpers';
import SubmitBtn from './SubmitBtn';

class ScoreCard extends Component {
  componentDidMount () {
    // This component will load when user finishes a quiz.
    // Clear notification when user completes a quiz and set notification for next day
    clearLocalNotification ().then (setLocalNotification);
  }

  render () {
    const {score, maxScore, resetScore, deckTitle, navigation} = this.props;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>
            SCORE:
          </Text>
          <Text style={styles.title}>
            {(score / maxScore * 100).toFixed (2)} %
          </Text>
        </View>
        <View style={{justifycontent: 'flex-end'}}>
          <SubmitBtn
            style={styles.restartQuizButton}
            onPress={() => {
              resetScore ();
              navigation.navigate ('Quiz', {deckTitle: deckTitle});
            }}
            text="Restart Quiz"
          />
          <SubmitBtn
            style={styles.backToDeckButton}
            onPress={() => {
              resetScore ();
              navigation.navigate ('Deck', {deckTitle: deckTitle});
            }}
            text="Back to Deck"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 40,
    alignSelf: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
    marginLeft: 15,
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
    marginBottom: 30,
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
    marginBottom: 30,
  },
});

export default connect () (ScoreCard);
