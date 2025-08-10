"use client"

import styled from "styled-components"
import { AlertCircle, RefreshCw, Key } from "lucide-react"

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 1.5rem;
`

const ErrorIcon = styled.div`
  color: #ef4444;
  margin-bottom: 1rem;
`

const ErrorTitle = styled.h3`
  color: #333;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`

const ErrorDescription = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
  max-width: 400px;
`

const RetryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #5a67d8;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const ApiKeyNote = styled.div`
  background: #fef3c7;
  border: 1px solid #f59e0b;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
  max-width: 500px;
  
  h4 {
    color: #92400e;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  p {
    color: #92400e;
    font-size: 0.8rem;
    margin: 0;
  }
`

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
    <ErrorContainer>
      <ErrorIcon>
        <AlertCircle size={48} />
      </ErrorIcon>
      <ErrorTitle>{title}</ErrorTitle>
      <ErrorDescription>{message}</ErrorDescription>
      {onRetry && (
        <RetryButton onClick={onRetry} disabled={isRetrying}>
          <RefreshCw size={16} />
          {isRetrying ? "Retrying..." : "Try Again"}
        </RetryButton>
      )}

      {isApiKeyError && (
        <ApiKeyNote>
          <h4>
            <Key size={16} />
            API Key Issue
          </h4>
          <p>Make sure your TMDB API key is correctly set in your .env.local file as NEXT_PUBLIC_TMDB_API_KEY</p>
        </ApiKeyNote>
      )}
    </ErrorContainer>
  )
}
