import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import GenreFilter from './components/GenreFilter';
import MovieList from './components/MovieList';
import MovieModal from './components/MovieModal';

function App() {
  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

  useEffect(() => {
    const savedQuery = localStorage.getItem('lastQuery');
    const savedPage = parseInt(localStorage.getItem('lastPage')) || 1;
    const savedGenre = localStorage.getItem('lastGenre') || '';

    if (savedQuery) {
      setQuery(savedQuery);
      setSelectedGenre(savedGenre);
      handleSearch(savedPage, savedGenre, savedQuery);
    }
  }, []);

  const handleSearch = async (newPage = 1, genreFilter = selectedGenre, searchTerm = query) => {
    if (!searchTerm.trim()) {
      setError('Please enter a search term.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const trimmedQuery = searchTerm.trim();

      // Save to localStorage
      localStorage.setItem('lastQuery', trimmedQuery);
      localStorage.setItem('lastPage', newPage.toString());
      localStorage.setItem('lastGenre', genreFilter || '');

      const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(trimmedQuery)}&page=${newPage}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.Response === 'True') {
        
        const detailedMovies = await Promise.all(
          data.Search.map(async (movie) => {
            const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`);
            return await res.json();
          })
        );

       
        const filteredMovies = genreFilter
          ? detailedMovies.filter((m) =>
              m.Genre && m.Genre.toLowerCase().includes(genreFilter.toLowerCase())
            )
          : detailedMovies;

        setMovies(filteredMovies);
        setTotalResults(parseInt(data.totalResults, 10));
        setPage(newPage);
      } else {
        setError(data.Error || 'No movies found.');
        setMovies([]);
        setTotalResults(0);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenreSelect = (genre) => {
    const newGenre = genre === selectedGenre ? '' : genre;
    setSelectedGenre(newGenre);
    localStorage.setItem('lastGenre', newGenre);
    handleSearch(1, newGenre, query);
  };

  const handleMovieClick = async (imdbID) => {
    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`);
      const data = await res.json();
      if (data.Response === 'True') {
        setSelectedMovie(data);
        setSelectedMovieId(imdbID);
      }
    } catch (error) {
      console.error('Failed to fetch movie details', error);
    }
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
    setSelectedMovieId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex items-center justify-center py-6">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <header className="text-2xl sm:text-3xl font-bold mb-6 flex items-center justify-center gap-2 text-blue-600">
          <span role="img" aria-label="clapperboard">🎬</span> Movie Search App
        </header>

        <GenreFilter selectedGenre={selectedGenre} onSelectGenre={handleGenreSelect} />

        <SearchBar
          value={query}
          onChange={setQuery}
          onSubmit={() => handleSearch(1, selectedGenre, query)}
        />

        <div className="mt-6 space-y-4">
          {loading && <p className="text-blue-500">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <MovieList movies={movies} onMovieClick={handleMovieClick} />

          {totalResults > 10 && (
            <div className="flex justify-center items-center gap-4 mt-4">
              <button
                onClick={() => handleSearch(page - 1)}
                disabled={page <= 1 || loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ⬅ Previous
              </button>

              <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded shadow">
                Page {page} of {Math.ceil(totalResults / 10)}
              </span>

              <button
                onClick={() => handleSearch(page + 1)}
                disabled={page >= Math.ceil(totalResults / 10) || loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next ➡
              </button>
            </div>
          )}

          {selectedMovie && (
            <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
