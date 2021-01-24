import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { Message } from '../types'

interface MessageState {
  messages: Message[]
}
const initialState: MessageState = {
  messages: [],
}

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<{ message: Message }>) => {
      const { message } = action.payload
      state.messages.push(message)
    },
  },
})

export default messageSlice.reducer

export const messageActions = messageSlice.actions
