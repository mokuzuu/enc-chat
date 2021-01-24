import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  name: string | null
}
const initialState: UserState = {
  name: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName: (
      state,
      action: PayloadAction<{
        name: string
      }>
    ) => {
      state.name = action.payload.name
    },
  },
})

export default userSlice.reducer
export const userActions = userSlice.actions
