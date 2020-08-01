export const RECEIVE_DECKS = 'RECEIVE DECKS';
export const ADD_DECK = 'ADD DECK';
export const REMOVE_DECK = 'REMOVE DECK';
export const ADD_CARD_TO_DECK = 'ADD CARD TO DECK';

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck,
  };
}

export function removeDeck (key) {
  return {
    type: REMOVE_DECK,
    key,
  };
}

export function addCardToDeck (deckTitle, card) {
  return {
    type: ADD_CARD_TO_DECK,
    deckTitle,
    card,
  };
}
