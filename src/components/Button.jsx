import React from 'react'
import '../styles/Button.css'

const Button = (props) => {
    
    const my_name = JSON.stringify(props.name).replace(/"/g, '');
    const is_vowel = "aeiou".indexOf(my_name[0]) !== -1;
    
    if (!is_vowel) {
      return (
          <div className="button">
              <p>This is a <b>{my_name}</b>.</p>
              <button className="button-button" onClick={props.onClick}>Generate a random Pokemon!</button>
          </div>
        )
    }
    return (
      <div className="button">
          <p>This is an <b>{my_name}</b>.</p>
          <button className="button-button" onClick={props.onClick}>Generate a random Pokemon!</button>
      </div>
    )      
}

export default Button