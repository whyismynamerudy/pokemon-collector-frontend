import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pokemon from './Pokemon';
import '../styles/Dashboard.css';

const Dashboard = (props) => {

  const [name, setName] = useState('');
  const [savedPokemon, setSavedPokemon] = useState([]);

  const navigate = useNavigate();  

  const notLoggedIn = () => {
    console.log("log in please")
    navigate("/");
  };

  const handleCollectPokemon = () => {
    console.log("woohoo");
    navigate('/collect-pokemon');
  };

  const handleLogOut = (event) => {
    event.preventDefault();

    //remove user state
    props.setUser(null);

    //remove token stuff from local storage
    window.localStorage.removeItem('pokeCollectorUser')

    //back to login
    navigate("/");
  };

  const getSavedPokemon = async () => {
      const savedURL = "/api/users/saved-pokemon";
      const { data } = await axios.post(savedURL, {
            username: props.user.username,
            token: props.user.token,
      })

      //console.log(data);
      setSavedPokemon(data);
  };

  useEffect(() => {
    if (props.user === null) {
        return notLoggedIn();
    }

    setName(props.user.name);
    getSavedPokemon();
  }, []);

  return (
    <div className="dashboard">
        <div className="dashboard-left">
          <div className="left-container">
            <div className="dashboard-title">
                <h1 className="dashboard-title-title">Welcome {name}</h1>
            </div>
            <h3>Welcome to the state of logged-in-ness.</h3>
            <div className="dashboard-buttons">
                <button className="dashboard-collect-pokemon" onClick={handleCollectPokemon}>Collect Pokemon</button>
                <button className="dashboard-logout-button" onClick={handleLogOut}>Log Out</button>
            </div>
          </div>
        </div>
        <div className="dashboard-right">
            <div className="dashboard-collected-title">
                <h1 className="collected-pokemon-title">Collected Pokemon:</h1>
            </div>
            <div className="dashboard-collected-pokemon">
                {savedPokemon.map((obj) => {
                    return (
                        <Pokemon key={obj._id} pokeImage={obj.pokeImage} pokeName={obj.pokeName} />
                    );
                })}
            </div>
        </div>
    </div>
  )
}

export default Dashboard