"use client"

import {
  useGetCategoriesQuery,
  useGetJokeByCategoryQuery,
  useGetRandomJokeQuery,
  useSearchJokesQuery,
} from "@/lib/features/jokes/chuckApiSlice"
import {
  setCategory,
  setJoke,
  setPhrase,
  setStatusMessage
} from "@/lib/features/jokes/chuckSlice"
import { RootState } from "@/lib/store"
import { Button, Stack, TextField, Typography, MenuItem } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function IndexPage() {
  const dispatch = useDispatch()
  const { category, joke, phrase, statusMessage } = useSelector(
    (state: RootState) => state.chuck,
  )

  const { data: jokeRandomData, isLoading: jokeLoading } =
    useGetRandomJokeQuery()
  const { data: categories = [] } = useGetCategoriesQuery()

  const { data: jokeCategoryData } = useGetJokeByCategoryQuery(category, {
    skip: !category,
  })
  const { data: jokePhraseData } = useSearchJokesQuery(phrase, {
    skip: !phrase,
  })

  useEffect(() => {
    if (jokeRandomData) {
      dispatch(setJoke(jokeRandomData.value))
    }
  }, [jokeRandomData, dispatch])

  const handleSearchCategory = () => {
    if (jokeCategoryData) {
      dispatch(setJoke(jokeCategoryData.value))
      dispatch(setStatusMessage(`Joke from category: ${category}`))
    } else {
      dispatch(setStatusMessage(`No jokes found for this category: ${category}`))
    }
  }

  const handleSearchPhrase = () => {
    if (jokePhraseData?.result.length) {
      dispatch(setJoke(jokePhraseData.result[0].value))
    } else {
      dispatch(setStatusMessage(`No jokes found for this phrase: ${phrase}`))
    }
  }

  const handleChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCategory(event.target.value))
  }

  const handleChangePhrase = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPhrase(event.target.value))
  }

  return (
    <Stack className="items-center w-[40vw]" spacing={2}>
      <Typography variant="h5" className="text-chuck-black">
        Here is a joke from Chuck's collection:
      </Typography>
      <Typography
        variant="h6"
        className="text-chuck-orange self-center !font-bold"
      >
        {jokeLoading ? "Loading joke..." : joke}
      </Typography>
      {statusMessage && (
        <Typography variant="body2" className="text-chuck-brown">
          {statusMessage}
        </Typography>
      )}
      <Stack className="!mt-8 w-full" spacing={2}>
        <Typography variant="body2" className="text-chuck-black">
          Want more jokes? Try searching by phrase or category.
        </Typography>
        {/* Search by phrase */}
        <Stack direction="row" spacing={1} className="w-full items-center">
          <TextField
            label="Phrase"
            variant="outlined"
            className="w-full"
            size="small"
            value={phrase}
            onChange={handleChangePhrase}
          />
          <Button
            variant="outlined"
            className="w-[35%]"
            onClick={handleSearchPhrase}
          >
            Search by phrase
          </Button>
        </Stack>
        {/* Search by category */}
        <Stack direction="row" spacing={1} className="w-full items-center">
          <TextField
            label="Categories"
            select
            variant="outlined"
            className="w-full"
            size="small"
            value={category}
            onChange={handleChangeCategory}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="outlined"
            className="w-[35%]"
            onClick={handleSearchCategory}
          >
            Search by category
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}
