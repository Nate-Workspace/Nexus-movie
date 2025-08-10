"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Star, Heart } from "lucide-react"
import type { MovieDetails } from "@/lib/types"
import { getMovieDetails, getImageUrl } from "@/lib/api"
import { useFavorites } from "@/hooks/use-favourites"
import { LoadingSkeleton } from "@/components/LoadingSkeleton"
import { ErrorMessage } from "@/components/ErrorMessage"

const containerStyles = {
  minHeight: "100vh",
  background: "#f8f9fa",
}

const contentSectionStyles = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 1rem",
}

const backButtonStyles = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
  color: "#667eea",
  fontWeight: "500",
  marginBottom: "2rem",
  transition: "color 0.2s ease",
  textDecoration: "none",
}

const movieHeaderStyles = {
  background: "white",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  marginBottom: "2rem",
}

const heroSectionStyles = {
  position: "relative" as const,
  height: "400px",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
}

const backdropImageStyles = {
  position: "absolute" as const,
  inset: "0",
  opacity: 0.3,
}

const heroContentStyles = {
  position: "relative" as const,
  zIndex: 2,
  height: "100%",
  display: "flex",
  alignItems: "center",
  padding: "2rem",
  color: "white",
}

const posterContainerStyles = {
  position: "relative" as const,
  width: "200px",
  height: "300px",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
  flexShrink: 0,
}

const movieInfoStyles = {
  marginLeft: "2rem",
  flex: 1,
}

const titleStyles = {
  fontSize: "2.5rem",
  fontWeight: "700",
  marginBottom: "1rem",
  lineHeight: "1.2",
}

const metaInfoStyles = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "1.5rem",
  marginBottom: "1rem",
  fontSize: "0.9rem",
  opacity: 0.9,
}

const metaItemStyles = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
}

const ratingStyles = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  fontSize: "1.1rem",
  fontWeight: "600",
}

const getFavoriteButtonStyles = (isFavorite: boolean) => ({
  position: "absolute" as const,
  top: "1rem",
  right: "1rem",
  background: "rgba(0, 0, 0, 0.7)",
  border: "none",
  borderRadius: "50%",
  width: "50px",
  height: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.2s ease",
  zIndex: 3,
})

const overviewStyles = {
  background: "white",
  padding: "2rem",
  borderRadius: "12px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  marginBottom: "2rem",
}

const overviewTitleStyles = {
  fontSize: "1.5rem",
  fontWeight: "600",
  marginBottom: "1rem",
  color: "#333",
}

const overviewTextStyles = {
  color: "#666",
  lineHeight: "1.6",
  fontSize: "1rem",
}

const genreListStyles = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "0.5rem",
  marginTop: "1rem",
}

const genreTagStyles = {
  background: "#667eea",
  color: "white",
  padding: "0.3rem 0.8rem",
  borderRadius: "20px",
  fontSize: "0.8rem",
  fontWeight: "500",
}

const detailsSkeletonStyles = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "2rem 1rem",
}

// Responsive styles for mobile
const mobileHeroContentStyles = {
  ...heroContentStyles,
  flexDirection: "column" as const,
  textAlign: "center" as const,
  padding: "1rem",
}

const mobilePosterContainerStyles = {
  ...posterContainerStyles,
  width: "150px",
  height: "225px",
  marginBottom: "1rem",
}

const mobileMovieInfoStyles = {
  marginLeft: "0",
  flex: 1,
}

const mobileTitleStyles = {
  ...titleStyles,
  fontSize: "2rem",
}

const mobileMetaInfoStyles = {
  ...metaInfoStyles,
  justifyContent: "center",
}

interface MovieDetailContentProps {
  id: string
}

export function MovieDetailContent({ id }: MovieDetailContentProps) {
  const [movie, setMovie] = useState<MovieDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  const { isFavorite, toggleFavorite } = useFavorites()

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const fetchMovie = async () => {
    try {
      setLoading(true)
      setError(null)
      const movieData = await getMovieDetails(id)
      setMovie(movieData)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to fetch movie details")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovie()
  }, [id])

  if (loading) {
    return (
      <div style={containerStyles}>
        <div style={detailsSkeletonStyles}>
          <LoadingSkeleton count={1} />
        </div>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div style={containerStyles}>
        <div style={detailsSkeletonStyles}>
          <ErrorMessage
            title="Failed to load movie details"
            message={error || "Movie not found"}
            onRetry={fetchMovie}
          />
        </div>
      </div>
    )
  }

  const handleFavoriteClick = () => {
    toggleFavorite(movie)
  }

  return (
    <div style={containerStyles}>
      <div style={contentSectionStyles}>
        <Link
          href="/"
          style={backButtonStyles}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#5a67d8"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#667eea"
          }}
        >
          <ArrowLeft size={20} />
          Back to Movies
        </Link>

        <div style={movieHeaderStyles}>
          <div style={{ ...heroSectionStyles, height: isMobile ? "300px" : "400px" }}>
            {movie.backdrop_path && (
              <div style={backdropImageStyles}>
                <Image
                  src={getImageUrl(movie.backdrop_path, "w1280") || "/placeholder.svg"}
                  alt={movie.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}

            <button
              style={getFavoriteButtonStyles(isFavorite(movie.id))}
              onClick={handleFavoriteClick}
              aria-label={isFavorite(movie.id) ? "Remove from favorites" : "Add to favorites"}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0, 0, 0, 0.9)"
                e.currentTarget.style.transform = "scale(1.1)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0, 0, 0, 0.7)"
                e.currentTarget.style.transform = "scale(1)"
              }}
            >
              <Heart
                size={24}
                color={isFavorite(movie.id) ? "#ef4444" : "white"}
                fill={isFavorite(movie.id) ? "#ef4444" : "none"}
              />
            </button>

            <div style={isMobile ? mobileHeroContentStyles : heroContentStyles}>
              <div style={isMobile ? mobilePosterContainerStyles : posterContainerStyles}>
                <Image
                  src={getImageUrl(movie.poster_path) || "/placeholder.svg"}
                  alt={movie.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div style={isMobile ? mobileMovieInfoStyles : movieInfoStyles}>
                <h1 style={isMobile ? mobileTitleStyles : titleStyles}>{movie.title}</h1>
                <div style={isMobile ? mobileMetaInfoStyles : metaInfoStyles}>
                  <div style={metaItemStyles}>
                    <Calendar size={16} />
                    {new Date(movie.release_date).getFullYear()}
                  </div>
                  {movie.runtime && (
                    <div style={metaItemStyles}>
                      <Clock size={16} />
                      {movie.runtime} min
                    </div>
                  )}
                  <div style={ratingStyles}>
                    <Star size={16} fill="currentColor" />
                    {movie.vote_average.toFixed(1)} ({movie.vote_count} votes)
                  </div>
                </div>
                {movie.genres && movie.genres.length > 0 && (
                  <div style={genreListStyles}>
                    {movie.genres.map((genre) => (
                      <span key={genre.id} style={genreTagStyles}>
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div style={overviewStyles}>
          <h2 style={overviewTitleStyles}>Overview</h2>
          <p style={overviewTextStyles}>{movie.overview || "No overview available."}</p>
        </div>
      </div>
    </div>
  )
}
