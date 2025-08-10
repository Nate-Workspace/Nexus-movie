import type React from "react"

const sectionContainerStyles = {
  marginBottom: "3rem",
}

const sectionTitleStyles = {
  fontSize: "1.8rem",
  fontWeight: "700",
  color: "#333",
  marginBottom: "0.5rem",
}

const sectionDescriptionStyles = {
  color: "#666",
  fontSize: "1rem",
  marginBottom: "1rem",
}

interface SectionProps {
  title: string
  description?: string
  children: React.ReactNode
}

export function Section({ title, description, children }: SectionProps) {
  return (
    <section style={sectionContainerStyles}>
      <h2 style={sectionTitleStyles}>{title}</h2>
      {description && <p style={sectionDescriptionStyles}>{description}</p>}
      {children}
    </section>
  )
}
