import React from 'react'
import '../styles/Pokemon.css'

const Pokemon = (props) => {
  return (
    <div className="pokemon">
        <div className="pokemon-image-container">
            <img src={props.pokeImage} alt="pokemon" className="poke-image" />
        </div>
        <div className="pokemon-name-container">
            <h3 className='poke-name'>{props.pokeName}</h3>
        </div>
    </div>
  )
}

export default Pokemon