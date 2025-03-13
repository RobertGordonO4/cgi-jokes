import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ChuckState {
  joke: string
  category: string
  phrase: string
}

const initialState: ChuckState = {
  joke: "",
  category: "",
  phrase: "",
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
  },
})

export const { setJoke, setCategory, setPhrase } = chuckSlice.actions
export default chuckSlice.reducer
