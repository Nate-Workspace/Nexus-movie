import { Suspense } from "react"
import { MovieDetailContent } from "./MovieDetailContent"
import { Header } from "@/components/Header"

interface MoviePageProps {
  params: Promise<{ id: string }>
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params

  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <MovieDetailContent id={id} />
      </Suspense>
    </>
  )
}
