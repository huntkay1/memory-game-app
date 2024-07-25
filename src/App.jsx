import { useState, useEffect } from 'react';
import './index.css';
import Card from './Card';

function App() {
  const [data, setData] = useState(null);
  const [shuffledDeck, setShuffledDeck] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=0`) 
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error))
    
  }, [])

  useEffect(() => {
    if (data != null) {
      shuffleDeck(data);
    }
  }, [data]);

  function shuffleDeck(data) {
    const deck = data.results;

    for (let i = deck.length -1; i > 0; i--) {
      let j = Math.floor(Math.random() * i)
      let k = deck[i]
      deck[i] = deck[j]
      deck[j] = k
    }
    setShuffledDeck(deck);
  }

  const displayedDeck = shuffledDeck ? shuffledDeck.slice(0, 10) : []; //only use first 10 

  return (
    <div id='cards-container'>
      {displayedDeck != null && 
        displayedDeck.map((pokemon, index) => (
          <Card 
          pokemonName={pokemon.name}
          key={index}
          />
        ))
      }

    </div>
  )
}

export default App
