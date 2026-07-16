import axios from "axios";
import { toast } from "react-hot-toast";
import type { Movie } from "../types/movie";

interface SearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const API_KEY = import.meta.env.VITE_API_KEY as string;

export async function fetchMoviesByQuery(query: string): Promise<Movie[]> {
  try {
    const response = await axios.get<SearchResponse>(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          query,
        },
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      },
    );

    return response.data.results;
  } catch (error) {
    toast.error("Failed to fetch movies. Please try again later.");
    throw error;
  }
}
