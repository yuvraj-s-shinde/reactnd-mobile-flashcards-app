import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import Decks from './components/Decks'
import Deck from './components/Deck'
import AddDeck from './components/AddDeck'
import NewQuestion from './components/NewQuestion'
import Quiz from './components/Quiz'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { FontAwesome, Ionicons} from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import Constants from 'expo-constants'
import { purple, white } from './utils/colors';
 
const FlashcardStatusBar = ({backgroundColor, ...props}) => (
  <View style={{backgroundColor, height: Constants.statusBarHeight}}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
  </View>
)

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const NavTab = () => (
  <Tab.Navigator tabBarOptions={{
    activeTintColor: white,
    style: {
      backgroundColor: purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }}>
    <Tab.Screen name="Decks" component={Decks} options={{
          tabBarLabel: 'Decks',
          tabBarIcon: ({ tintColor }) => (
            <Ionicons name="ios-bookmarks" size={30} color={tintColor}/>
          ),
        }}/>
    <Tab.Screen name="Add Deck" component={AddDeck} options={{
          tabBarLabel: 'Add Deck',
          tabBarIcon: ({ tintColor }) => (
            <FontAwesome name="plus-square" size={30} color={tintColor}/>
          ),
        }}/>
  </Tab.Navigator>
)
 
const NavStack = () => (
  <Stack.Navigator>
    <Stack.Screen name='Decks' component={NavTab}/>
    <Stack.Screen name='Deck' component={Deck} options={{
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
      }}/>
    <Stack.Screen name='New Question' component={NewQuestion} options={{
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
      }}/>
    <Stack.Screen name='Start Quiz' component={Quiz} options={{
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
      }}/>
  </Stack.Navigator>
)

export default class App extends React.Component {
  componentDidMount () {
      debugger
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}} >
          <FlashcardStatusBar backgroundColor={purple} barStyle='light-content' />
          <NavigationContainer>
            <NavStack/>
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}