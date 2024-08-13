import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const movieURL = "https://api.themoviedb.org/3/movie/";
const apiKey = "084e7a369c6ce98fe39bd6f21dac4cf0";
const imageBaseURL = "https://image.tmdb.org/t/p/w500/";

interface Movie {
  title: string;
  overview: string;
  poster_path: string;
  budget: number;
  revenue: number;
  runtime: number;
  tagline?: string;
}

const Filmes: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const movieUrl = `${movieURL}${id}?api_key=${apiKey}`;
      console.log("Fetching movie from URL:", movieUrl); // Verifique a URL gerada
      getMovie(movieUrl);
    }
  }, [id]);

  const getMovie = async (url: string) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`API Error: ${res.status} ${res.statusText}`);
      }
      const data: Movie = await res.json();
      setMovie(data);
    } catch (error) {
      console.error("Error fetching movie:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (number: number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <div className="movie-page">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {movie && (
        <>
          <h1>{movie.title}</h1>
          {movie.poster_path && (
            <img
              src={`${imageBaseURL}${movie.poster_path}`}
              alt={movie.title}
              style={{ width: "300px", height: "auto" }}
            />
          )}
          <p>{movie.overview}</p>
          <p>Tagline: {movie.tagline}</p>
          <p>Budget: {formatCurrency(movie.budget)}</p>
          <p>Revenue: {formatCurrency(movie.revenue)}</p>
          <p>Runtime: {movie.runtime} minutes</p>
        </>
      )}
    </div>
  );
};

export default Filmes;
