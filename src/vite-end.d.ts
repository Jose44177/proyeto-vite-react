/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TRAKT_CLIENT_ID: string
  readonly VITE_TRAKT_CLIENT_SECRET: string
  readonly VITE_TRAKT_REDIRECT_URI: string
  readonly VITE_TMDB_ACCESS_TOKEN: string
  readonly VITE_TMDB_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}