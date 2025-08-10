"use client"

const skeletonCardStyles = {
  background: "white",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
}

const skeletonImageStyles = {
  width: "100%",
  height: "300px",
  background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
  backgroundSize: "400% 100%",
  animation: "shimmer 1.2s ease-in-out infinite",
}

const skeletonContentStyles = {
  padding: "1rem",
}

const skeletonTitleStyles = {
  height: "1.2rem",
  background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
  backgroundSize: "400% 100%",
  animation: "shimmer 1.2s ease-in-out infinite",
  borderRadius: "4px",
  marginBottom: "0.5rem",
}

const skeletonRatingStyles = {
  height: "1rem",
  width: "60%",
  background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
  backgroundSize: "400% 100%",
  animation: "shimmer 1.2s ease-in-out infinite",
  borderRadius: "4px",
}

const gridStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: "2rem",
  marginTop: "1.5rem",
}

export function LoadingSkeleton({ count = 8 }: { count?: number }) {
  return (
    <>
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -468px 0;
          }
          100% {
            background-position: 468px 0;
          }
        }
      `}</style>
      <div style={gridStyles}>
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} style={skeletonCardStyles}>
            <div style={skeletonImageStyles} />
            <div style={skeletonContentStyles}>
              <div style={skeletonTitleStyles} />
              <div style={skeletonRatingStyles} />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
