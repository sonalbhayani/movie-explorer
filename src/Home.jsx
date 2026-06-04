import {useState,useEffect,useRef} from 'react'
import axios from 'axios';
import MovieList from './MovieList';


function Home() {
    const searchInputRef = useRef(null);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
  
     async function fetchData(searchTerm) {
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
    useEffect(() => {
       
        fetchData("welcome");
      }, []);   
      const handleSubmit = (e) => {
        e.preventDefault();
        const searchTerm = searchInputRef.current.value;
        
        fetchData(searchTerm);
      }
      const handleClear = () => {
        searchInputRef.current.value = '';
        setMovies([]);
        fetchData("welcome");
      }

  return (
    <div>
      
    <div className="home">
		<form onSubmit={handleSubmit} className="search-form">
			<input className="searchInput" placeholder="Search for a movie..." ref={searchInputRef} />
			<button type="submit" className="search-button">Search 🔎</button>
      <button type="button" onClick={handleClear} className="clear-button">Clear</button>
		</form>
        </div>
        {loading ? <p className="loading">Loading...</p> : <MovieList movies={movies} />}
       
    </div>
  )
}

export default Home