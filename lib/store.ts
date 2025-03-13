import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { chuckApiSlice } from "./features/jokes/chuckApiSlice"
import chuckReducer from "./features/jokes/chuckSlice"

const rootReducer = combineReducers({
  [chuckApiSlice.reducerPath]: chuckApiSlice.reducer,
  chuck: chuckReducer,
})
export type RootState = ReturnType<typeof rootReducer>

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(chuckApiSlice.middleware)
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
