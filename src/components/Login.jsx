import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/Login.css';

const Login = (props) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const setUser = props.setUser;

  let navigate = useNavigate();

  //if the token is already stored in the local storage, redirect to dashboard
  useEffect(() => {
      const loggedInUser = window.localStorage.getItem('pokeCollectorUser');

      if (loggedInUser) {
          const user = JSON.parse(loggedInUser);
          setUser(user)
          navigate('/dashboard')
      }
  }, []);

  //this handles the login part, so backend must check if credentials are valid
  //if they are not, alert user, otherwise navigate to dashboard with info about user saved in local storage
  const handleLogin = async (event) => {
      event.preventDefault();
      console.log("logging in");

      const userLoginURL = "/api/login/";

      try {
        const response = await axios.post(userLoginURL, {
            username, 
            password
        })

        window.localStorage.setItem(
            'pokeCollectorUser', JSON.stringify(response.data)
        );

        setUser(response.data);
        setUsername('');
        setPassword('');
        //redirect to logged in page
        navigate("/dashboard")
      } catch (error) {
          console.log("Wrong credentials.")
          console.log(error.response.data)
          alert("Wrong Username/Password. Please try again!");
      }
  };  

  const handleRegistration = (event) => {
      event.preventDefault();
      console.log("navigrating to registration");
      navigate("/registration");   
  };

  return (
    <div className="login">
        <div className="login-container">
            <form className="login-form">
                <div className="login-form-username">
                    <label htmlFor="username-input">Username</label>
                    <input type="text" className="username-input" id="username-input" value={username} onChange={({ target }) => {setUsername(target.value)}}/>
                </div>
                <div className="login-form-password">
                    <label htmlFor="password-input">Password</label>
                    <input type="password" className="password-input" id="password-input" value={password} onChange={({ target }) => {setPassword(target.value)}}/>
                </div>
                <div className="login-form-submit">
                    <button className="button-submit" type="submit" onClick={handleLogin}>Log In</button>
                    <button className="button-registration" type="submit" onClick={handleRegistration}>Sign Up</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login