import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cards: {}
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state, action) => {
      const { id, front, back } = action.payload;
      state.cards[id] = {
        id,
        front,
        back
      };
    }
  }
});

// Selector
export const selectCards = (state) => state.cards.cards;

// Export actions and reducer
export const { addCard } = cardsSlice.actions;
export default cardsSlice.reducer; 