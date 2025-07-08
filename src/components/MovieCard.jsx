
const MovieCard = ({ movie }) => {
  return (
    <div className="flex gap-4 p-3 border rounded shadow-sm bg-gray-50">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/100x150?text=No+Image"}
        alt={movie.Title}
        className="w-24 h-36 object-cover rounded"
      />
      <div>
        <h2 className="font-bold text-lg">{movie.Title}</h2>
        <p className="text-sm text-gray-600">{movie.Year}</p>
        <p className="text-sm text-gray-500 capitalize">{movie.Type}</p>
      </div>
    </div>
  );
};

export default MovieCard;
