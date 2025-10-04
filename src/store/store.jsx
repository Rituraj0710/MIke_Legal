import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice.jsx';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default store;
