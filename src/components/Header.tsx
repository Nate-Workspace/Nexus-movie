import Link from "next/link"

export function Header() {
  return (
    <header
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        padding: "1rem 0",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontSize: "1.8rem",
            fontWeight: "bold",
            margin: 0,
          }}
        >
          🎬 MovieApp
        </h1>
        <nav style={{ display: "flex", gap: "2rem" }}>
          <Link
            href="/"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "500",
              transition: "opacity 0.2s ease",
            }}
          >
            Home
          </Link>
        </nav>
      </div>
    </header>
  )
}
