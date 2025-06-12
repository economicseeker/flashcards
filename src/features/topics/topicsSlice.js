import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  topics: {}
};

export const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    addTopic: (state, action) => {
      const { id, name, icon } = action.payload;
      state.topics[id] = {
        id,
        name,
        icon,
        quizIds: []
      };
    },
    addQuizId: (state, action) => {
      const { topicId, quizId } = action.payload;
      if (state.topics[topicId]) {
        state.topics[topicId].quizIds.push(quizId);
      }
    }
  }
});

// Selector
export const selectTopics = (state) => state.topics.topics;

// Export actions and reducer
export const { addTopic, addQuizId } = topicsSlice.actions;
export default topicsSlice.reducer; 