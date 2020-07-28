import { AsyncStorage } from 'react-native'
import { deckResults } from './helpers'

const DECKS_STORAGE_KEY = 'MobileFlashcards:decks'

export function getDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((deckResults) => JSON.parse(deckResults))
}

export function getDeck(id) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((deck) => {
        return JSON.parse(deck)[id]})
        .catch((e) => console.log("Error occured while fetching deck from db: ", e))
}

export function saveDeckTitle(title) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [title]: {
            title,
            questions: []
        }
    }))
}

export function saveCardToDeck(deckTitle, card) {
    getDeck(deckTitle).then((deck) => {
        return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [deckTitle]: {
                ...deck,
                questions: [
                            ...deck.questions,
                            card
                            ]
                }
        }))
    })
}

export function deleteDeck(key) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((results) => {
        const decks = JSON.parse(results)
        decks[key] = undefined
        delete decks[key]
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
    })
}