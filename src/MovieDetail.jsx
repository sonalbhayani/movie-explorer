import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import axios from 'axios';

function MovieDetail() {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
 const handleBack = () => {
        navigate('/');
    }


  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://www.omdbapi.com/?i=${imdbID}&apikey=d8a2bb31`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (imdbID) {
      fetchMovie();
    }
  }, [imdbID]);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  if (!movie) {
    return <p>Movie not found.</p>;
  }
  
  return (
    <div>
        
      <h2>{movie.Title}</h2>
      <img src={movie.Poster} alt={movie.Title} />
      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Director:</strong> {movie.Director}</p>
      <p><strong>Actors:</strong> {movie.Actors}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
      <button onClick={handleBack} className="back-button">Back</button>
    </div>
  )
}

export default MovieDetail