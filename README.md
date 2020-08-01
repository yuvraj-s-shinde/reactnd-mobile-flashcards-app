# MobileFlashcards Project

This is the Mobile Flashcard Project for Udacity's React-Redux course.
It allows user to creats decks, add question answer cards to the deck and take quiz.

## TL;DR

To get started developing right away:

* install all project dependencies with `yarn install`
* start the development server with `expo start`
* tested on android emulator (Pixel_3a_API_30_x86)

## What You're Getting
```bash
├── README.md - This file.
├── package.json # npm package manager file.
└──components
    ├── AddDeck.js # This is the AddDeck component to add new deck.
    ├── Deck.js # This is the Deck component to render a deck.
    ├── DeckDetails.js # This is the DeckDetails component to render deck title and number of cards in deck.
    ├── Decks.js # This is the Decks component to render list of deck.
    ├── NewQuestion.js # This is the NewQuestion component to add new question/card to deck.
    ├── QuestionCard.js # This is the QuestionCard component to render question card in a quiz.
    ├── Quiz.js # This is the Quiz component to render quiz for selected deck.
    ├── ScoreCard.js # This is the ScoreCard component to render score/results of a quiz.
    ├── SubmitButton.js # This is the SubmitButton component to render button throughout the app.
    ├── TextButton.js # This is the TextButton component to render text button throughout the app.
└──actions
    ├── index.js # These are list of actions
└──reducer
    ├── index.js # These are list of reducers.
└──utils
    ├── colors.js # This is the list of colors used in in the app.
    ├── api.js # These are api calls to interact with AsyncStorage.
    ├── helpers.js # These are helper methods to show notification.        
├── App.js # This is the root of this app.
└── index.js
```

## AsyncStorage

Following are the methods to perform necessary operations on the AsyncStorage:

* [`getDecks`](#getDecks)
* [`getDeck`](#getDeck)
* [`saveDeckTitle`](#saveDeckTitle)
* [`saveCardToDeck`](#saveCardToDeck)
* [`deleteDeck`](#deleteDeck)

### `getDecks`

Method Signature:

```js
getDecks()
```

* Returns a Promise which resolves to a JSON object containing a collection of decks.

### `getDeck`

Method Signature:

```js
getDeck(id)
```

* id: `<String>` id/title of deck
* Returns a Promise which resolves to a JSON object containing the deck.

### `saveDeckTitle`

Method Signature:

```js
saveDeckTitle(title)
```

* title: `<String>` id/title of deck
* Returns a Promise object.

### `saveCardToDeck`

Method Signature:

```js
saveCardToDeck(title, card)
```

* title: `<String>` id/title of deck
* card: `<Object>` question and answer pair
* Returns a Promise object.

### `deleteDeck`

Method Signature:

```js
deleteDeck(key)
```

* key: `<String>` id/title of deck
* Returns a Promise object.

## Create React Native App

This project was bootstrapped with [Create React Native App](https://github.com/expo/create-react-native-app). You can find more information on how to perform common tasks [here](https://github.com/expo/create-react-native-app/blob/master/README.md).
