import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userSlice from './user'
import messageSlice from './message'

const rootReducer = combineReducers({
  user: userSlice,
  message: messageSlice,
})

const store = configureStore({
  reducer: rootReducer,
})
export default store

export type RootState = ReturnType<typeof store.getState>
