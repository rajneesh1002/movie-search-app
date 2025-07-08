const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi'];

const GenreFilter = ({ selectedGenre, onSelectGenre }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-4 overflow-x-auto pb-2">
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => onSelectGenre(genre)}
          className={`px-4 py-1 rounded-full text-sm border transition font-medium
            ${selectedGenre === genre
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-100'}`}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;
