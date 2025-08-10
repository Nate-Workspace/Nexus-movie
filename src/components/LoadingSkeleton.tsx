"use client"

import styled, { keyframes } from "styled-components"

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`

const SkeletonCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const SkeletonImage = styled.div`
  width: 100%;
  height: 300px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 400% 100%;
  animation: ${shimmer} 1.2s ease-in-out infinite;
`

const SkeletonContent = styled.div`
  padding: 1rem;
`

const SkeletonTitle = styled.div`
  height: 1.2rem;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 400% 100%;
  animation: ${shimmer} 1.2s ease-in-out infinite;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`

const SkeletonRating = styled.div`
  height: 1rem;
  width: 60%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 400% 100%;
  animation: ${shimmer} 1.2s ease-in-out infinite;
  border-radius: 4px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
`

export function LoadingSkeleton({ count = 8 }: { count?: number }) {
  return (
    <Grid>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index}>
          <SkeletonImage />
          <SkeletonContent>
            <SkeletonTitle />
            <SkeletonRating />
          </SkeletonContent>
        </SkeletonCard>
      ))}
    </Grid>
  )
}
