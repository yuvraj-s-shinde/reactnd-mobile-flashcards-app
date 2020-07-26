import { AsyncStorage } from 'react-native'
import { deckResults } from './helpers'

const DECKS_STORAGE_KEY = 'MobileFlashcards:decks'

export function getDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(deckResults)
}

export function getDeck(id) {
    getDecks().then((results) => {
        const decks = JSON.parse(results)
        return decks[id]
    })
}

export function saveDeckTitle(title) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [title]: {
            title,
            questions: []
        }
    }))
}

export function saveCardToDeck(title, card) {
    getDeck(title).then((deck) => {
        return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [title]: {
            questions: [...deck.questions].concat(card)
        }
    }))
    })
    // const deck = getDeck(title)
    // return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    //     [title]: {
    //         questions: [...deck.questions, card]
    //     }
    // }))

}

export function deleteDeck(key) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((results) => {
        const decks = JSON.parse(results)
        decks[key] = undefined
        delete decks[key]
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
    })
}
