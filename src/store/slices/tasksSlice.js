import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

// Load data from localStorage or use default
const loadStateFromStorage = () => {
  try {
    const serializedState = localStorage.getItem('taskManagerState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.warn('Could not load state from localStorage:', err);
    return undefined;
  }
};

const saveStateToStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('taskManagerState', serializedState);
  } catch (err) {
    console.warn('Could not save state to localStorage:', err);
  }
};

const initialState = {
  tasks: [
    {
      id: '1',
      title: 'Sample Task',
      description: 'This is a sample task',
      date: dayjs().format('YYYY-MM-DD'),
      category: 'info',
      createdAt: dayjs().toISOString(),
    },
  ],
  selectedDate: dayjs().format('YYYY-MM-DD'),
  filterCategory: 'all',
  ...loadStateFromStorage(),
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now().toString(),
        ...action.payload,
        createdAt: dayjs().toISOString(),
      };
      state.tasks.push(newTask);
      saveStateToStorage(state);
    },
    editTask: (state, action) => {
      const { id, ...updatedTask } = action.payload;
      const index = state.tasks.findIndex(task => task.id === id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...updatedTask };
        saveStateToStorage(state);
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveStateToStorage(state);
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
      saveStateToStorage(state);
    },
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
      saveStateToStorage(state);
    },
  },
});

export const { addTask, editTask, deleteTask, setSelectedDate, setFilterCategory } = tasksSlice.actions;

export default tasksSlice.reducer;
