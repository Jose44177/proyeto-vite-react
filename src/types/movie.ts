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

export interface MovieApiResponse {
  title: string;
  year: number;
  ids: {
    trakt: number;
    slug: string;
    imdb: string;
    tmdb: number;
    plex: {
      guid: string;
      slug: string;
    };
  };
  tagline: string;
  overview: string;
  runtime: number;
  country: string;
  trailer: string;
  homepage: string;
  status: string;
  rating: number;
  votes: number;
  comment_count: number;
  updated_at: string; // ISO timestamp
  language: string;
  languages: string[];
  available_translations: string[];
  genres: string[];
  subgenres: string[];
  original_title: string;
  images: {
    fanart: string[];
    poster: string[];
    logo: string[];
    banner: string[];
    thumb: string[];
    clearart: string[];
    [key: string]: string[] | string | undefined;
  };
  colors: {
    poster: string[];
    [key: string]: string[] | undefined;
  };
  released: string; // YYYY-MM-DD
  after_credits: boolean;
  during_credits: boolean;
  certification: string;
}

export interface MovieARWithPoster extends MovieApiResponse {
  poster_url: string;
}