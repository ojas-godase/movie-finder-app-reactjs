import React from 'react'
import Movie from './Movie'


export default function Movies(props) {
  return (
    <div className='movies-list'>
        <p className='section-title'>{props.sectiontitle}</p>
        <div className="section">
            {props.movies.map((movie , index)=>{
                        return <div className="movie">
                          <Movie  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} handleFavourites={props.handleFavourites}  title={movie.title} 
                          release_date={movie.release_date.slice(0,4)}  rating={movie.vote_average} language={movie.original_language}/>
                          <div className='movie-container fav-btn' onClick={() => props.handleFavourites(movie)}>Add to favourites<p className="heart">&#9829;</p></div>
                          </div>
                          
                })}
                
        </div>
    </div>
  )
}
