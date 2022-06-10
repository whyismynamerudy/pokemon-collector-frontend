import './App.css';
import { Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Login from './components/Login';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';
import CollectPokemon from './components/CollectPokemon';
import NotFound from './components/NotFound';

function App() {

  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login setUser={setUser}/>}></Route>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser}/>}></Route>
        <Route path="/collect-pokemon" element={<CollectPokemon user={user} />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
