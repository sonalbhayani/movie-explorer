import MovieCard from './MovieCard'

function MovieList({ movies }) {
  return (
    <div>
        <div className="movie-list">
            {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
            ))}
        </div>
    </div>
  )
}

export default MovieList