import React from 'react'
import '../styles/Image.css'

const Image = (props) => {
  return (
      <div className="image">
          <img src={props.src} alt="pokemon" className="image-image" />
      </div>
  )
}

export default Image