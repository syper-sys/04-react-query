import axios from "axios";
import type { Movie } from "../types/movie";

export interface SearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const API_KEY = import.meta.env.VITE_API_KEY as string;

export async function fetchMoviesByQuery(
  query: string,
  page: number = 1,
): Promise<SearchResponse> {
  const response = await axios.get<SearchResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query,
        page,
      },
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    },
  );

  return response.data;
}
