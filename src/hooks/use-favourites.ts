"use client"

import { useState, useEffect } from "react"
import type { Movie } from "@/lib/types"

const FAVORITES_KEY = "movie-favorites"

export function useFavorites() {
  const [favorites, setFavorites] = useState<Movie[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem(FAVORITES_KEY)
        if (stored) {
          const parsed = JSON.parse(stored)
          if (Array.isArray(parsed)) {
            setFavorites(parsed)
          }
        }
      }
    } catch (error) {
      console.error("Error loading favorites from localStorage:", error)
      setFavorites([])
    } finally {
      setIsLoaded(true)
    }
  }, [])

  const addToFavorites = (movie: Movie) => {
    try {
      const newFavorites = [...favorites, movie]
      setFavorites(newFavorites)
      if (typeof window !== "undefined") {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites))
      }
    } catch (error) {
      console.error("Error saving to favorites:", error)
    }
  }

  const removeFromFavorites = (movieId: number) => {
    try {
      const newFavorites = favorites.filter((movie) => movie.id !== movieId)
      setFavorites(newFavorites)
      if (typeof window !== "undefined") {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites))
      }
    } catch (error) {
      console.error("Error removing from favorites:", error)
    }
  }

  const isFavorite = (movieId: number) => {
    return favorites.some((movie) => movie.id === movieId)
  }

  const toggleFavorite = (movie: Movie) => {
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id)
    } else {
      addToFavorites(movie)
    }
  }

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    isLoaded,
  }
}
