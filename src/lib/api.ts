import type { Movie, MovieDetails, TMDBResponse } from "./types"

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
const BASE_URL = "https://api.themoviedb.org/3"

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

class TMDBError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message)
    this.name = "TMDBError"
  }
}

async function fetchFromTMDB<T>(endpoint: string): Promise<T> {
  if (!API_KEY) {
    throw new TMDBError("TMDB API key is not configured. Please add NEXT_PUBLIC_TMDB_API_KEY to your .env.local file.")
  }

  try {
    const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}`
    const response = await fetch(url)

    if (!response.ok) {
      if (response.status === 401) {
        throw new TMDBError("Invalid API key. Please check your TMDB API key.", response.status)
      }
      throw new TMDBError(`Failed to fetch data: ${response.statusText}`, response.status)
    }

    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof TMDBError) {
      throw error
    }
    throw new TMDBError("Network error occurred")
  }
}

export async function getTrendingMovies(): Promise<Movie[]> {
  const data = await fetchFromTMDB<TMDBResponse>("/trending/movie/week")
  return data.results
}

export async function getRecommendedMovies(): Promise<Movie[]> {
  const data = await fetchFromTMDB<TMDBResponse>("/movie/popular")
  return data.results
}

export async function getMovieDetails(id: string): Promise<MovieDetails> {
  return await fetchFromTMDB<MovieDetails>(`/movie/${id}`)
}

export function getImageUrl(path: string | null, size = "w500"): string {
  if (!path) return "/placeholder.svg?height=750&width=500&text=No+Image"
  return `${IMAGE_BASE_URL}/${size}${path}`
}
