import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks, addDeck, removeDeck } from '../actions'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { getDecks } from '../utils/api'
import { white, lightPurp } from '../utils/colors'
import { AppLoading } from 'expo'

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
    //   .then(({ entries }) => {
    //     if (!entries[timeToString()]) {
    //       dispatch(addEntry({
    //         [timeToString()]: getDailyReminderValue()
    //       }))
    //     }
    //   })
      .then(() => this.setState(() => ({ready: true})))
  }

  renderItem = ({ item }) => {
      const [key, value] = item

      return (
          <View key={key} style={styles.container}>
            <TouchableOpacity style={styles.item} onPress={()=> this.props.navigation.navigate('Deck',
            { deckTitle: value.title })}>
            <View style={styles.row}>
                <View>
                    <Text style={styles.title}>
                        {value.title}
                    </Text>
                </View>
                <View>
                    <Text style={styles.noDataText}>
                        {value.questions.length} Cards
                    </Text>
                </View>
            </View>
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
        // style={styles.container}
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
        backgroundColor: lightPurp
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
    noDataText: {
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 20,
        alignSelf: 'center'
    }
})

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps,
)(Decks)