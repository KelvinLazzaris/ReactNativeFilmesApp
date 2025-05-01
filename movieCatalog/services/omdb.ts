import axios, { AxiosError } from 'axios'
import { OMDB_API_KEY } from '@env'

const API_KEY = OMDB_API_KEY
const BASE_URL = 'https://www.omdbapi.com/'

export interface MovieSummary {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export interface MovieDetail extends MovieSummary {
  Genre: string
  Director: string
  Actors: string
  Plot: string
}

export const searchMovies = async (query: string): Promise<MovieSummary[]> => {
  try {
    const { data } = await axios.get(BASE_URL, {
      params: { apikey: API_KEY, s: query },
    })
    return data.Search || []
  } catch (error: any) {
    throw error
  }
}

export const getMovieDetails = async (imdbID: string): Promise<MovieDetail> => {
  try {
    const { data } = await axios.get(BASE_URL, {
      params: { apikey: API_KEY, i: imdbID, plot: 'full' },
    })
    return data
  } catch (error: any) {
    throw error
  }
}