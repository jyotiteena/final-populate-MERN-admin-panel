import { combineReducers } from 'redux';
import categoryReducer from './Redux/userSlice';
import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  sidebarShow: true,
  theme: 'light',
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest };
    default:
      return state;
  }
};

// Combine reducers
const rootReducer = combineReducers({
  app: changeState, // Managing app-specific state
  category: categoryReducer, // Managing category-specific state
});

// Configure store with rootReducer
const store = configureStore({
  reducer: rootReducer, // Pass the combined reducer object here
});

export default store;
