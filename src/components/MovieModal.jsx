
import { X } from 'lucide-react';

const MovieModal = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-2 sm:px-4 py-6 bg-black/30 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md sm:max-w-3xl overflow-hidden relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 transition z-10"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col sm:flex-row">
          {/* Poster */}
          <div className="w-full sm:w-1/3 flex-shrink-0">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"} 
              alt={movie.Title}
              className="w-full h-40 sm:h-64 md:h-full object-cover"
            />
          </div>

          {/* Movie Details */}
          <div className="w-full sm:w-2/3 p-4 overflow-y-auto max-h-[80vh]">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{movie.Title}</h2>

            <div className="text-sm text-gray-600 flex flex-wrap gap-3 mb-4">
              <span>📅 {movie.Year}</span>
              <span>🎭 {movie.Genre}</span>
              <span>⏱️ {movie.Runtime}</span>
              <span>⭐ {movie.imdbRating}/10</span>
            </div>

            <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-line mb-4">
              <strong className="font-semibold">Plot:</strong> {movie.Plot}
            </p>

            <p className="text-sm"><strong>Director:</strong> {movie.Director}</p>
            <p className="text-sm"><strong>Actors:</strong> {movie.Actors}</p>
            <p className="text-sm"><strong>Language:</strong> {movie.Language}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
