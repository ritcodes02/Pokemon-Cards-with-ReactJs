import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151'); 
        const data = await response.json();
        const detailedData = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return await res.json();
          })
        );
        setPokemonData(detailedData);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemonData();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredPokemon = pokemonData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="app">
      <h1>Pokémon Gallery</h1>
      <input
        type="text"
        placeholder="Search Pokémon..."
        onChange={handleSearch}
        value={searchQuery}
      />
      <div className="pokemon-container">
        {filteredPokemon.map((pokemon) => (
          <div className="pokemon-card" key={pokemon.id}>
            <img
              src={pokemon.sprites?.front_default}
              alt={pokemon.name}
            />
            <h2>{pokemon.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
