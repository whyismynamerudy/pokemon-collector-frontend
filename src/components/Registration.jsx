import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../styles/Registration.css'

const Registration = () => {

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  let navigate = useNavigate();  

  const handleSignUp = (event) => {
      event.preventDefault();
      //console.log(name, username, password, confirmPassword);

      //passwords differ, do not allow to send to database
      if (password !== confirmPassword) {
          console.log("passwords don't match");
          alert("The passwords you have entered do not match. Please try again.");
          setName('');
          setUsername('');
          setPassword('');
          setConfirmPassword('');
          return 0;
      }

      //passwords match
      const userRegistrationURL = "/api/users/"; //need to change url when linking with backend
      axios.post(userRegistrationURL, {
        "username": username,
        "name": name,
        "password": password
      })
      .then((response) => {
          console.log(response.data);
      })
      .catch((error) => {
          console.log(error);
      });

      returnToLogin();
  };

  const returnToLogin = () => {
    navigate("/");
  };

  //creating users here, axios post request must go to "/api/users/"
    
  return (
    <div className="registration">
        <div className="registration-container">
            <form className="registration-form">
                <div className="registration-name">
                    <label htmlFor="name-input" className="registration-name-label">Name</label>
                    <input type="text" className="name-input" id="name-input" value={name} onChange={({ target }) => {setName(target.value)}} />
                </div>
                <div className="registration-username">
                    <label htmlFor="username-input" className="registration-username-label">Username</label>
                    <input type="text" className="username-input" id="username-input" value={username} onChange={({ target }) => {setUsername(target.value)}}/>
                </div>
                <div className="registration-password">
                    <label htmlFor="password-input" className="registration-password-label">Password</label>
                    <input type="password" className="password-input" id="password-input" value={password} onChange={({ target }) => {setPassword(target.value)}}/>
                    <label htmlFor="password-verification-input" className="registration-password-verification-label">Confirm Password</label>
                    <input type="password" className="password-verification-input" id="password-verification-input" value={confirmPassword} onChange={({ target }) => {setConfirmPassword(target.value)}}/>
                </div>
                <div className="registration-submit">
                    <button className="registration-sign-up" onClick={handleSignUp}>Sign Up</button>
                </div>
            </form>
        </div>
        <button className="button-to-login" onClick={returnToLogin}>Return to Login</button>
    </div>
  )
}

export default Registration