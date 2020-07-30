import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { getDecks } from '../utils/api'
import { white, lightBlue, darkgray } from '../utils/colors'
import { receiveDecks, addDeck, removeDeck } from '../actions'
import { AppLoading } from 'expo'
import DeckDetails from './DeckDetails'

class Decks extends Component {
  state = {
      ready: false,
  }
  
  componentDidMount () {
    const { dispatch } = this.props

    getDecks()
      .then((decks) => {
          dispatch(receiveDecks(decks))
          console.log("decks db:", decks)
        }
      )
      .then(() => this.setState(() => ({ready: true})))
  }

  renderItem = ({ item }) => {
      const [key, value] = item

      return (
          <View key={key} style={styles.container}>
            <TouchableOpacity style={styles.item} onPress={()=> this.props.navigation.navigate('Deck',
            { deckTitle: value.title })}>
            <DeckDetails style={styles.deckDetails} deck={value}/>
            </TouchableOpacity>
        </View>
      )
  } 

  render() {
    const { decks } = this.props
    const { ready } = this.state
    if (ready === false) {
        return <AppLoading />
    }
    
    return (
      <FlatList 
      data={Object.entries(decks)}
      renderItem={this.renderItem} />
    )
  }
}

const styles = StyleSheet.create({
    item: {
        padding: 20,
        borderRadius: Platform.OS === 'ios' ? 16 : 10,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        shadowRadius: 20,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,24)',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        backgroundColor: lightBlue
    },
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 10,
    },
    title: {
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    cardCount: {
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 20,
        color: darkgray,
        alignSelf: 'center'
    },
    deckDetails: {
        flex: 1,
        padding: 5,
        justifyContent: 'center'
    },
})

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps,
)(Decks)
