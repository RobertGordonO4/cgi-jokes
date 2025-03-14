import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ChuckState {
  joke: string
  category: string
  phrase: string
  statusMessage: string
}

const initialState: ChuckState = {
  joke: "",
  category: "",
  phrase: "",
  statusMessage: "",
}

const chuckSlice = createSlice({
  name: "chuck",
  initialState,
  reducers: {
    setJoke: (state, action: PayloadAction<string>) => {
      state.joke = action.payload
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload
    },
    setPhrase: (state, action: PayloadAction<string>) => {
      state.phrase = action.payload
    },
    setStatusMessage: (state, action) => {
      state.statusMessage = action.payload
    },
  },
})

export const { setJoke, setCategory, setPhrase, setStatusMessage } =
  chuckSlice.actions
export default chuckSlice.reducer
