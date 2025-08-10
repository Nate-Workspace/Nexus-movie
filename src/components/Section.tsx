"use client"

import type React from "react"

import styled from "styled-components"

const SectionContainer = styled.section`
  margin-bottom: 3rem;
`

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
`

const SectionDescription = styled.p`
  color: #666;
  font-size: 1rem;
  margin-bottom: 1rem;
`

interface SectionProps {
  title: string
  description?: string
  children: React.ReactNode
}

export function Section({ title, description, children }: SectionProps) {
  return (
    <SectionContainer>
      <SectionTitle>{title}</SectionTitle>
      {description && <SectionDescription>{description}</SectionDescription>}
      {children}
    </SectionContainer>
  )
}
