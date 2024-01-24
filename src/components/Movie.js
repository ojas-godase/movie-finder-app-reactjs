import React from 'react'

export default function Movie(props) {
   
  return (
    <div>
      <div className='movie-container'>
          <img className='images' src={props.src} alt="" />
          <div className="rating">
              <span className='star'>&#9733;</span>
              <p className="rating">{Math.floor(props.rating)}</p>
              <p className='rating'>{props.language}</p>
              <p className="rating">{props.release_date}</p>
          </div>
          <p className='movie-title'>{props.title}</p>
      </div>
    </div>
  )
}
