import { useEffect , useState} from 'react';

import SearchIcon from './search.svg'
import './App.css'
import MovieCard from './MovieCard'

const API_URL = 'http://www.omdbapi.com?apikey=aae7dd71';
const movie1 = {
    "Title": "The Legend of Hanuman",
    "Year": "2021–",
    "imdbID": "tt13854248",
    "Type": "series",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNjk2NjFkNjgtNjM3Ny00Y2MwLWFkNDktNDdkNTQ3OGUxMWZlXkEyXkFqcGdeQXVyMjI5NDMxNjg@._V1_SX300.jpg"
}
const App = () => {
    const[movies, setMovies] = useState([]); 
    const[searchTerm, setsearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json();

        setMovies(data.Search);
    }
    useEffect(() => {
        searchMovies('Hanuman')
    }, []);   
    return (
        <div className='app'>
            <h1>Movies...</h1>
            <div className='search'>
                <input
                placeholder='Search For Movies'
                value= {searchTerm}
                onChange={(e) => setsearchTerm(e.target.value)}
                />
                <img
                src={SearchIcon}
                alt="search"
                onClick={() => searchMovies(searchTerm)}
                />
            </div>
            {movies?.length > 0 
                ? (
                    <div className='container'>
                {movies.map((movie) => (
                    <MovieCard movie= {movie}/>
                ))}
            </div>
                ) : (
                    <div className='empty'>
                        <h2>No Movies Found</h2>
                    </div>
                )}
            
        </div>
    );
}

export default App;