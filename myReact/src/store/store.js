import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import  userReducer from '../features/userSlice';
import  recreationReducer from '../features/recreationSlice';
import  commentReducer from '../features/commentSlice';


export const store = configureStore({
  reducer: { users: userReducer, 
             recreation : recreationReducer,
             comment: commentReducer
  },
});

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch

// store.getState()
// store.dispatch()
export  default store;