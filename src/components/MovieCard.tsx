"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import type { Movie } from "@/lib/types"
import { getImageUrl } from "@/lib/api"
import { useFavorites } from "@/hooks/use-favourites"
import { Heart } from "lucide-react"

const cardStyles = {
  background: "white",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  position: "relative" as const,
  cursor: "pointer",
}

const imageContainerStyles = {
  position: "relative" as const,
  width: "100%",
  height: "300px",
  overflow: "hidden",
}

const contentStyles = {
  padding: "1rem",
}

const titleStyles = {
  fontSize: "1.1rem",
  fontWeight: "600",
  marginBottom: "0.5rem",
  color: "#333",
  lineHeight: "1.3",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical" as const,
  overflow: "hidden",
}

const ratingStyles = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  color: "#666",
  fontSize: "0.9rem",
}

const getRatingBadgeStyles = (rating: number) => ({
  background: rating >= 7 ? "#10b981" : rating >= 5 ? "#f59e0b" : "#ef4444",
  color: "white",
  padding: "0.2rem 0.5rem",
  borderRadius: "6px",
  fontWeight: "600",
  fontSize: "0.8rem",
})

const getFavoriteButtonStyles = (isFavorite: boolean) => ({
  position: "absolute" as const,
  top: "0.75rem",
  right: "0.75rem",
  background: "rgba(0, 0, 0, 0.7)",
  border: "none",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.2s ease",
  zIndex: 2,
})

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites()

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(movie)
  }

  return (
    <Link href={`/movie/${movie.id}`}>
      <div
        style={cardStyles}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-8px)"
          e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.15)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)"
          e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"
        }}
      >
        <div style={imageContainerStyles}>
          <Image
            src={getImageUrl(movie.poster_path) || "/placeholder.svg"}
            alt={movie.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
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
              size={20}
              color={isFavorite(movie.id) ? "#ef4444" : "white"}
              fill={isFavorite(movie.id) ? "#ef4444" : "none"}
            />
          </button>
        </div>
        <div style={contentStyles}>
          <h3 style={titleStyles}>{movie.title}</h3>
          <div style={ratingStyles}>
            <span style={getRatingBadgeStyles(movie.vote_average)}>{movie.vote_average.toFixed(1)}</span>
            <span>({movie.vote_count} votes)</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
