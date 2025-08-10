"use client"

import { AlertCircle, RefreshCw, Key } from "lucide-react"

const errorContainerStyles = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  justifyContent: "center",
  padding: "3rem 1rem",
  textAlign: "center" as const,
  background: "white",
  borderRadius: "12px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  marginTop: "1.5rem",
}

const errorIconStyles = {
  color: "#ef4444",
  marginBottom: "1rem",
}

const errorTitleStyles = {
  color: "#333",
  fontSize: "1.2rem",
  marginBottom: "0.5rem",
}

const errorDescriptionStyles = {
  color: "#666",
  marginBottom: "1.5rem",
  maxWidth: "400px",
}

const retryButtonStyles = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  background: "#667eea",
  color: "white",
  border: "none",
  padding: "0.75rem 1.5rem",
  borderRadius: "8px",
  fontWeight: "500",
  cursor: "pointer",
  transition: "background 0.2s ease",
}

const apiKeyNoteStyles = {
  background: "#fef3c7",
  border: "1px solid #f59e0b",
  borderRadius: "8px",
  padding: "1rem",
  marginTop: "1rem",
  maxWidth: "500px",
}

interface ErrorMessageProps {
  title?: string
  message?: string
  onRetry?: () => void
  isRetrying?: boolean
}

export function ErrorMessage({
  title = "Something went wrong",
  message = "We couldn't load the movies. Please try again.",
  onRetry,
  isRetrying = false,
}: ErrorMessageProps) {
  const isApiKeyError = message.includes("API key") || message.includes("401")

  return (
    <div style={errorContainerStyles}>
      <div style={errorIconStyles}>
        <AlertCircle size={48} />
      </div>
      <h3 style={errorTitleStyles}>{title}</h3>
      <p style={errorDescriptionStyles}>{message}</p>
      {onRetry && (
        <button
          style={{
            ...retryButtonStyles,
            opacity: isRetrying ? 0.6 : 1,
            cursor: isRetrying ? "not-allowed" : "pointer",
          }}
          onClick={onRetry}
          disabled={isRetrying}
          onMouseEnter={(e) => {
            if (!isRetrying) {
              e.currentTarget.style.background = "#5a67d8"
            }
          }}
          onMouseLeave={(e) => {
            if (!isRetrying) {
              e.currentTarget.style.background = "#667eea"
            }
          }}
        >
          <RefreshCw size={16} />
          {isRetrying ? "Retrying..." : "Try Again"}
        </button>
      )}

      {isApiKeyError && (
        <div style={apiKeyNoteStyles}>
          <h4
            style={{
              color: "#92400e",
              fontSize: "0.9rem",
              fontWeight: "600",
              marginBottom: "0.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Key size={16} />
            API Key Issue
          </h4>
          <p
            style={{
              color: "#92400e",
              fontSize: "0.8rem",
              margin: 0,
            }}
          >
            Make sure your TMDB API key is correctly set in your .env.local file as NEXT_PUBLIC_TMDB_API_KEY
          </p>
        </div>
      )}
    </div>
  )
}
