import React , {useState,useEffect} from 'react'
import Movie from './Movie'

export default function Search(props) {
    const[search,setSearch] = useState()
    const[searchMovies,setSearchMovies] = useState(null)
    async function  getSearch() {
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&api_key=de0ab00b6499e5edaf7a5f49fb56bd1f`)
        const data = await res.json()
        setSearchMovies(data.results)
    }
    function handleChange(e) {
        setSearch(e.target.value)
    }
    useEffect(() => {
        getSearch()
    },[search])
  return (
    <div>
        <input className='input' type="text" placeholder='Search' onChange={handleChange}  />
        <div className='movies-list'>
        {search && <p className='section-title' id='search-results'>Search Results</p>}
        <div className="section">
        { search && searchMovies.map((movie , index)=>{
                        return <div><Movie src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}  title={movie.title} key={index} rating={movie.vote_average} release_date={movie.release_date.slice(0,4)}/>
                        <p className='movie-container fav-btn' onClick={() => props.handleFavourites(movie)}>Add to favourites<p className="heart">&#9829;</p></p>
                        </div>
                })}
        </div>
        </div>
    </div>
  )
}
