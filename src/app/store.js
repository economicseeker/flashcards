import { configureStore } from "@reduxjs/toolkit";
import topicsReducer from '../features/topics/topicsSlice';
// import reducers

export default configureStore({
  reducer: {
    topics: topicsReducer
  },
});
