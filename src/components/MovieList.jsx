
const MovieList = ({ movies, onMovieClick }) => {
  if (!movies.length) {
    return <p className="text-center text-gray-500">No movies to display.</p>;
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {movies.map((movie) => (
        <div
          key={movie.imdbID}
          className="border rounded-lg shadow hover:shadow-lg transition transform hover:scale-105 bg-white overflow-hidden cursor-pointer"
          onClick={() => onMovieClick && onMovieClick(movie.imdbID)}
        >
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
            alt={movie.Title}
            className="w-full h-64 object-cover"
          />
          <div className="p-3 space-y-1">
            <h3 className="font-semibold text-lg text-gray-900 truncate">{movie.Title}</h3>
            <p className="text-sm text-gray-600">📅 {movie.Year} • {movie.Type}</p>
            {movie.Genre && <p className="text-sm text-gray-700">🎭 {movie.Genre}</p>}
            {movie.imdbRating && movie.imdbRating !== "N/A" && (
              <p className="text-sm text-yellow-600 font-semibold">⭐ {movie.imdbRating}/10</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
