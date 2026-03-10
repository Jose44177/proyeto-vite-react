export interface Movie {
  id: string
  title: string
  poster: string
  backdrop: string
  year: number
  rating: number
  duration: string
  genre: string
  overview: string
  progress?: number // 0-100, for "Continue Watching"
}
