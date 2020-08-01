import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {darkgray} from '../utils/colors';

const DeckDetails = ({style, deck}) => {
  return (
    <View style={style}>
      <View>
        <Text style={styles.title}>
          {deck.title}
        </Text>
      </View>
      <View>
        <Text style={styles.cardCount}>
          {deck.questions.length} Cards
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create ({
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
    alignSelf: 'center',
  },
});

export default DeckDetails;
