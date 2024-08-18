import { useState, useEffect } from "react";
import "./filmes.css"

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const movieURL = process.env.NEXT_PUBLIC_MOVIE_URL;
const imageBaseURL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

const Filmes: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchMovies = async () => {
      const url = `${movieURL}?api_key=${apiKey}&page=${page}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      <nav>Movies</nav>
      <div className="movie-page">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <div className="movies-container">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img
                  src={`${imageBaseURL}${movie.poster_path}`}
                  alt={movie.title}
                  style={{ width: "200px", height: "auto" }}
                />
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
              </div>
            ))
          ) : (
            <p>No movies found.</p>
          )}
        </div>
        <button
          onClick={handleLoadMore}
          disabled={loading || page >= totalPages}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
   </> 
  );
};

export default Filmes;
