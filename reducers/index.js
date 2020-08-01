import {
  RECEIVE_DECKS,
  ADD_DECK,
  REMOVE_DECK,
  ADD_CARD_TO_DECK,
} from '../actions/index';

export default function entries (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    case ADD_DECK:
      const {title, questions} = action.deck;
      return {
        ...state,
        [title]: {
          title,
          questions: [],
        },
      };
    case REMOVE_DECK:
      const {key} = action;
      let new_state = {...state};
      new_state[key] = undefined;
      delete new_state[key];
      return new_state;
    case ADD_CARD_TO_DECK:
      const {deckTitle, card} = action;
      return {
        ...state,
        [deckTitle]: {
          ...state[deckTitle],
          questions: [...state[deckTitle].questions, card],
        },
      };
    default:
      return state;
  }
}
