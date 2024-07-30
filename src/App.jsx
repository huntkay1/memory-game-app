import { useState, useEffect } from 'react';
import './index.css';
import Card from './Card';
import Scoreboard from './Scoreboard';

function App() {
  const [data, setData] = useState(null);
  const [shuffledDeck, setShuffledDeck] = useState(null);
  const [score, setScore] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);
  const [flipCards, setFlipCards] = useState('card-inner flipped');

  window.addEventListener('load', () => setTimeout(() => setFlipCards('card-inner'), 300)); //flip cards over on first load

  function makeMove(cardName) {
    let loss = checkForLoss(cardName);
    if (loss) {
      console.log('you lose');
      setScore(0);
      setSelectedCards([]);
    } else {
      setSelectedCards([...selectedCards, cardName]);
      addPoint();
      shuffleDeck(data);
      setTimeout(() => setFlipCards('card-inner'), 50); //flip cards to front
    }
  }



  function checkForLoss(cardName) {
    if(selectedCards.includes(cardName)) {
        return true
    } else {
        return false
    }
  }

  function addPoint() {
    setScore(score + 1);
  }

  useEffect(() => {
      const fetchData = async() => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=0`);
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.log(error);
        }
    }
    fetchData();
  }, [])

  useEffect(() => {
    if(data != null) {
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

  const displayedDeck = shuffledDeck ? shuffledDeck.slice(0, 8) : []; //only use first 10 

  return (
    <>
      <Scoreboard 
      score={score}
      />
      <div id='cards-container'>
        {displayedDeck != null && 
          displayedDeck.map((pokemon, index) => (
            <Card 
            pokemonName={pokemon.name}
            makeMove={makeMove}
            flipCards={flipCards}
            setFlipCards={setFlipCards}
            key={index}
            />
          ))
        }
      </div>
    </>
  )
}

export default App
