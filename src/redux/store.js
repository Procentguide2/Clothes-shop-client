import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appSlice from './slices/appSlice';

const rootReducer = combineReducers({
  app: appSlice,
})

const store = configureStore({
  reducer: rootReducer
})

export default store;