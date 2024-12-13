import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import commonReducer from './Redux/commonSlice'
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
  app: changeState, 
  common: commonReducer, 
});

// Configure store with rootReducer
const store = configureStore({
  reducer: rootReducer, // Pass the combined reducer object here
});

export default store;
