import {useState,useEffect} from 'react'
import {Link} from "react-router-dom";
import axios from 'axios';
import MovieList from './MovieList';


function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
  
     async function fetchData() {
          try {
            setLoading(true);
            const response = await axios.get(`https://www.omdbapi.com/?s=welcome&apikey=d8a2bb31`);
            setMovies(response.data.Search || []);
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            setLoading(false);
          }
        }
    useEffect(() => {
       
        fetchData();
      }, []);   
      const handleSubmit = (e) => {
        e.preventDefault();
        async function fetchData() {
          try {
            setLoading(true);
            const response = await axios.get(`https://www.omdbapi.com/?s=${searchTerm}&apikey=d8a2bb31`);
            setMovies(response.data.Search || []);
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            setLoading(false);
          }
        }
        fetchData();
      }
      const handleClear = () => {
        setSearchTerm('');
        setMovies([]);
        fetchData();
      }

  return (
    <div>
        <nav className="navbar">
		<a className="logo" href="/" data-discover="true">
			<h2>🎬 Movie Explorer</h2>
		</a>
		<Link to="/" className="home-link" data-discover="true">Home</Link>
	</nav>
    <div className="home">
		<form onSubmit={handleSubmit} className="search-form">
			<input className="searchInput" placeholder="Search for a movie..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
			<button type="submit" className="search-button">Search 🔎</button>
      <button type="button" onClick={handleClear} className="clear-button">Clear</button>
		</form>
        </div>
        {loading ? <p className="loading">Loading...</p> : <MovieList movies={movies} />}
       
    </div>
  )
}

export default Home