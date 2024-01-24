import React,{useEffect, useState} from 'react'
import Movies from './Movies'
import NavBar from './NavBar'
import Search from './Search'
import Movie from './Movie'

export default function Content() {
    const[popularMovies , setPopularMovies] = useState()
    const[topRated , setTopRated] = useState()
    const[nowPlaying , setNowPlaying] = useState()
    const[upcoming , setUpcoming] = useState()

    useEffect(() => {
        const fav = (JSON.parse(localStorage.getItem("favourite-movies")))
        setFavMovies(fav)
    },[])
    async function  getPopularMovies() {
        const res = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=de0ab00b6499e5edaf7a5f49fb56bd1f")
        const data = await res.json()
        setPopularMovies(data.results)
    }
    async function  getTopRatedMovies() {
        const res = await fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=de0ab00b6499e5edaf7a5f49fb56bd1f")
        const data = await res.json()
        setTopRated(data.results)
    }
    async function  nowPlayingMovies() {
        const res = await fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=de0ab00b6499e5edaf7a5f49fb56bd1f")
        const data = await res.json()
        setNowPlaying(data.results)
    }
    async function  getUpcoming() {
        const res = await fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=de0ab00b6499e5edaf7a5f49fb56bd1f")
        const data = await res.json()
        setUpcoming(data.results)
    }
    useEffect(() =>{
        getPopularMovies()
        getTopRatedMovies()
        nowPlayingMovies()
        getUpcoming()
    },[])
    const[favMovies , setFavMovies] = useState([0])
    function handleFavourites(movie) {
        if(!favMovies.includes(movie)) {
            let newFavs = [movie , ...favMovies]
            localStorage.setItem("favourite-movies",JSON.stringify(newFavs))
            setFavMovies(newFavs)
            
        } else {
            alert("Already in Favourites")
        }
    }

    function removeFavourites(movie) {
        let newFavs = favMovies.filter((mov) => mov.id!=movie.id)
        setFavMovies(newFavs)
        localStorage.setItem("favourite-movies",JSON.stringify(newFavs))
    }
    
  return (
    <div className='content'>
        <div className="NavBar">
            <NavBar/>
            <Search handleFavourites={handleFavourites}/>
        </div>
        <div className="favourites">
            {favMovies && favMovies.length!==1 && <div className='movies-list'>
                <p className='section-title'>Favourites</p>
                <div className="section">
                    {favMovies.slice(0,favMovies.length-1).map((movie , index)=>{
                            return <div>
                            <Movie src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} removeFavourites={removeFavourites} release_date={movie.release_date.slice(0,4)}  title={movie.title} rating={movie.vote_average} language={movie.original_language}/>
                            <p className='movie-container fav-btn' onClick={() => removeFavourites(movie)}>Remove from Favourites &#10060;</p>
                            </div>
                    })}
                </div>
            </div>}
        </div>
        {popularMovies && < Movies movies={popularMovies} sectiontitle="Popular" handleFavourites={handleFavourites}/>}
        {topRated && < Movies movies={topRated} sectiontitle="Top Rated" handleFavourites={handleFavourites}/>}
        {nowPlaying && < Movies movies={nowPlaying} sectiontitle="Now Playing" handleFavourites={handleFavourites}/>}
        {upcoming && < Movies movies={upcoming} sectiontitle="Up Coming" handleFavourites={handleFavourites}/>}
    </div>
  )
}
