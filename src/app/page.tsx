"use client"

import { useState, useEffect } from "react"
import type { Movie } from "@/lib/types"
import { getTrendingMovies, getRecommendedMovies } from "@/lib/api"
import { useFavorites } from "@/hooks/use-favourites"
import { Header } from "@/components/Header"
import { Section } from "@/components/Section"
import { MovieGrid } from "@/components/MovieGrid"
import { LoadingSkeleton } from "@/components/LoadingSkeleton"
import { ErrorMessage } from "@/components/ErrorMessage"

const containerStyles = {
  minHeight: "100vh",
  background: "#f8f9fa",
}

const mainStyles = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "2rem 1rem",
}

const emptyStateStyles = {
  textAlign: "center" as const,
  padding: "3rem 1rem",
  background: "white",
  borderRadius: "12px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  marginTop: "1.5rem",
}

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([])
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([])
  const [trendingLoading, setTrendingLoading] = useState(true)
  const [recommendedLoading, setRecommendedLoading] = useState(true)
  const [trendingError, setTrendingError] = useState<string | null>(null)
  const [recommendedError, setRecommendedError] = useState<string | null>(null)

  const { favorites, isLoaded } = useFavorites()

  const fetchTrending = async () => {
    try {
      setTrendingLoading(true)
      setTrendingError(null)
      const movies = await getTrendingMovies()
      setTrendingMovies(movies || [])
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch trending movies"
      setTrendingError(errorMessage)
    } finally {
      setTrendingLoading(false)
    }
  }

  const fetchRecommended = async () => {
    try {
      setRecommendedLoading(true)
      setRecommendedError(null)
      const movies = await getRecommendedMovies()
      setRecommendedMovies(movies || [])
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch recommended movies"
      setRecommendedError(errorMessage)
    } finally {
      setRecommendedLoading(false)
    }
  }

  useEffect(() => {
    fetchTrending()
    fetchRecommended()
  }, [])

  return (
    <div style={containerStyles}>
      <Header />
      <main style={mainStyles}>
        <Section title="Trending Movies" description="Discover what's popular this week">
          {trendingLoading ? (
            <LoadingSkeleton />
          ) : trendingError ? (
            <ErrorMessage title="Failed to load trending movies" message={trendingError} onRetry={fetchTrending} />
          ) : (
            <MovieGrid movies={trendingMovies} />
          )}
        </Section>

        <Section title="Recommended Movies" description="Popular movies you might enjoy">
          {recommendedLoading ? (
            <LoadingSkeleton />
          ) : recommendedError ? (
            <ErrorMessage
              title="Failed to load recommended movies"
              message={recommendedError}
              onRetry={fetchRecommended}
            />
          ) : (
            <MovieGrid movies={recommendedMovies} />
          )}
        </Section>

        <Section title="Your Favorites" description="Movies you've saved for later">
          {!isLoaded ? (
            <LoadingSkeleton count={4} />
          ) : favorites.length === 0 ? (
            <div style={emptyStateStyles}>
              <h3 style={{ color: "#333", marginBottom: "0.5rem" }}>No favorites yet</h3>
              <p style={{ color: "#666" }}>Start adding movies to your favorites by clicking the heart icon!</p>
            </div>
          ) : (
            <MovieGrid movies={favorites} />
          )}
        </Section>
      </main>
    </div>
  )
}
