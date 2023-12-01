import React, {useState} from "react";
import MovieCard from './movieCard';

function SearchMovie() {
  //states - input query, movies
  const [query, setQuery] = useState('');

  const [movies, setMovies] = useState ([]);

  const searchMovies  = async (e) => {

    e.preventDefault();

    const url = `https://api.themoviedb.org/3/search/movie?api_key=d63a0d28f4ab83a1fac073979717f1e6&language=en-US&query=${query}&page=1&include_adult=false`;
    
    try{
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results)
    }catch(err){
      console.log(err);
    }

  }

  return (
    <>
      <form className="form" onSubmit={searchMovies}>
          <label htmlFor="query" className="label">Movie Name: </label>
          <input className="input" type="text" name="query" 
          placeholder="Enter the movie's name" 
          value={query} onChange={(e) => setQuery(e.target.value)}/>
          <button className="button" type="submit">Search!</button>
      </form>

      <div className="card--list">
      <div className="grid-container">
          {Array.isArray(movies) && movies.filter(movie => movie.poster_path).map(movie => (
            <div className="grid-item" key={movie.id}>
            <MovieCard key={movie.id} movie={movie} />
            </div>
            ))}
        </div>
      </div>  
  </>
  );
}

export default SearchMovie;
