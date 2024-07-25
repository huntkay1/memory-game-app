import { useState, useEffect } from 'react';
import './index.css';
import Card from './Card';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`) 
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error))
    
  }, [])

  return (
    <>
      {data != null && 
        data.results.map((pokemon, index) => (
          <Card 
          pokemonName={pokemon.name}
          key={index}
          />
        ))
      }
    </>
  )
}

export default App
