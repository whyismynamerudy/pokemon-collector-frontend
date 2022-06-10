import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Image from './Image'
import Button from './Button'
import '../styles/CollectPokemon.css'

const CollectPokemon = (props) => {

  const navigate = useNavigate();

  const [pokeData, setPokeData] = useState({});
  const [pokemon, setPokemon] = useState({});
  const [pokeImage, setPokeImage] = useState("");
  const [pokeName, setPokeName] = useState("");

  const fetchPokeData = async () => {
    const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=500");

    console.log("data received", data["results"]);
    const [...pokeArray] = data["results"];
    setPokeData(pokeArray); //needs to be this instead of .results because in response its "results"
  };
  
  const notLoggedIn = () => {
    console.log("log in please")
    navigate("/");
  };

  const chooseRandomPokemon = () => {
    const index = Math.floor(Math.random() * 499);
    console.log(pokeData[index]);
    setPokemon(pokeData[index]);
  }

  useEffect(() => {
    if (props.user === null) {
        return notLoggedIn();
    }
    console.log("this should run if you're logged in");
    fetchPokeData();    
    //once data is fetched, choose random pokemon
    //chooseRandomPokemon();
  }, []);

  useEffect(() => {
      chooseRandomPokemon();
  }, [pokeData]);

  const fetchPokemon = async (myPokemon) => {
      console.log(myPokemon["url"]);
      const details = await axios.get(myPokemon["url"]);

      setPokeImage(details["data"]["sprites"]["other"]["official-artwork"]["front_default"]);
      setPokeName(details["data"]["name"]);
  };

  useEffect(() => {
      //random pokemon is now chosen, update its image and name 
      fetchPokemon(pokemon);
      //now pokemon details are fetched
  }, [pokemon]);

  const handleCollectPokemon = async () => {
    //axios post request to collect pokemon
    console.log("you have collected a ", pokeName);

    const savePokeURL = "/api/users/collect-pokemon";
    
    await axios.post(savePokeURL, {
        username: props.user.username,
        token: props.user.token,
        pokeName,
        pokeImage
    })
  };

  return (
    <div className="collect-pokemon">
      <div className="poke-con">
        <div className="image-container">
            <Image src={pokeImage}/>
        </div>
        <div className="button-container">
            <Button name={pokeName} onClick={chooseRandomPokemon} className="special-poke-button"/>
            <button className="save-pokemon" onClick={handleCollectPokemon}>Collect</button>
            <button className="back-to-dashboard" onClick={() => {navigate('/dashboard')}}>Back</button>
        </div>
      </div>
    </div>
  )
}

export default CollectPokemon