import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// Define a response type (modify based on API response structure)
interface Joke {
  icon_url: string
  id: string
  url: string
  value: string
}

// Define the API slice
export const chuckApiSlice = createApi({
  reducerPath: "chuckApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.chucknorris.io/jokes" }),
  endpoints: (build) => ({
    getRandomJoke: build.query<Joke, void>({
      query: () => "/random",
    }),
    getCategories: build.query<string[], void>({
      query: () => "/categories",
    }),
    getJokeByCategory: build.query<Joke, string>({
      query: (category) => `/random?category=${category}`,
    }),
    searchJokes: build.query<{ total: number; result: Joke[] }, string>({
      query: (query) => `/search?query=${query}`,
    }),
  }),
})

// Export auto-generated hooks
export const {
  useGetRandomJokeQuery,
  useGetCategoriesQuery,
  useGetJokeByCategoryQuery,
  useSearchJokesQuery,
} = chuckApiSlice
