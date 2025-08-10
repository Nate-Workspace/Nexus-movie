"use client"

import type React from "react"

import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"
import type { Movie } from "@/lib/types"
import { getImageUrl } from "@/lib/api"
import { useFavorites } from "@/hooks/use-favourites"
import { Heart } from "lucide-react"

const Card = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
`

const CardContent = styled.div`
  padding: 1rem;
`

const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
`

const RatingBadge = styled.span<{ $rating: number }>`
  background: ${(props) => (props.$rating >= 7 ? "#10b981" : props.$rating >= 5 ? "#f59e0b" : "#ef4444")};
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.8rem;
`

const FavoriteButton = styled.button<{ $isFavorite: boolean }>`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 2;

  &:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: scale(1.1);
  }

  svg {
    width: 20px;
    height: 20px;
    color: ${(props) => (props.$isFavorite ? "#ef4444" : "white")};
    fill: ${(props) => (props.$isFavorite ? "#ef4444" : "none")};
  }
`

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
      <Card>
        <ImageContainer>
          <Image
            src={getImageUrl(movie.poster_path) || "/placeholder.svg"}
            alt={movie.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <FavoriteButton
            $isFavorite={isFavorite(movie.id)}
            onClick={handleFavoriteClick}
            aria-label={isFavorite(movie.id) ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart />
          </FavoriteButton>
        </ImageContainer>
        <CardContent>
          <Title>{movie.title}</Title>
          <Rating>
            <RatingBadge $rating={movie.vote_average}>{movie.vote_average.toFixed(1)}</RatingBadge>
            <span>({movie.vote_count} votes)</span>
          </Rating>
        </CardContent>
      </Card>
    </Link>
  )
}
