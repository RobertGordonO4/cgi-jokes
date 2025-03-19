"use client"

import {
  useGetCategoriesQuery,
  useGetJokeByCategoryQuery,
  useGetRandomJokeQuery,
  useSearchJokesQuery,
} from "@/data/api/jokes/chuckApiSlice"
import {
  setCategory,
  setJoke,
  setPhrase,
  setStatusMessage,
} from "@/data/api/jokes/chuckSlice"
import { RootState } from "@/data/store"
import { Button, Stack, TextField, Typography, MenuItem } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function IndexPage() {
  const dispatch = useDispatch()
  const { category, joke, phrase, statusMessage } = useSelector(
    (state: RootState) => state.chuck,
  )
  const [inputPhrase, setInputPhrase] = useState('')
  const [inputCategory, setInputCategory] = useState('')

  const { data: jokeRandomData, isLoading: jokeLoading } =
    useGetRandomJokeQuery()
  const { data: categories = [] } = useGetCategoriesQuery()
  const { data: jokeCategoryData } = useGetJokeByCategoryQuery(category, {
    skip: !category,
  })
  const { data: jokePhraseData } = useSearchJokesQuery(phrase, {
    skip: !phrase || phrase.length < 3,
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
      dispatch(setCategory(inputCategory))
    } else {
      dispatch(
        setStatusMessage(`No jokes found for this category: ${category}`),
      )
    }
  }

  const handleSearchPhrase = () => {
    if (jokePhraseData?.result.length) {
      dispatch(setJoke(jokePhraseData.result[0].value))
      dispatch(setPhrase(inputPhrase))
    } else {
      dispatch(setStatusMessage(`No jokes found for this phrase: ${phrase}`))
    }
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
        <Typography
          variant="body2"
          className="text-chuck-brown"
          data-testid="status-message"
        >
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
            value={inputPhrase}
            onChange={(e) => setInputPhrase(e.target.value)}
          />
          <Button
            variant="outlined"
            className="w-[35%]"
            onClick={handleSearchPhrase}
            disabled={!phrase || phrase.length < 3}
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
            value={inputCategory}
            onChange={(e) => setInputCategory(e.target.value)}
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
