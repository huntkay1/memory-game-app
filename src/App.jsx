import { useState, useEffect } from 'react';
import './index.css';
import Card from './Card';
import Scoreboard from './Scoreboard';

function App() {
  const [data, setData] = useState(null);
  const [score, setScore] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);
  const [flipCards, setFlipCards] = useState('card-inner flipped');
  const [showLoseMessage, setShowLoseMessage] = useState(false);
  const [showWinMessage, setShowWinMessage] = useState(false);
  const [deck, setDeck] = useState(null);

  window.addEventListener('load', getData())

  function makeMove(cardName) {
    let loss = checkForLoss(cardName);
    let win = checkForWin();
    if (loss || win) {
      loss ? setShowLoseMessage(true) : setShowWinMessage(true)
      setScore(0);
      setSelectedCards([]);
    } else {
      setTimeout(() => setFlipCards('card-inner'), 50); //flip cards to front
      setSelectedCards([...selectedCards, cardName]);
      addPoint();
      shuffleDeck(deck);
    }
  }

  function checkForLoss(cardName) {
    if(selectedCards.includes(cardName)) {
        return true
    } else {
        return false
    }
  }

  function checkForWin() {
    return score === 8;
  }

  function addPoint() {
    setScore(score + 1);
  }

  //create the deck, shuffle it, and flip over cards afterwards
  function createDeck() {
    //while starting a new game, removes messages
    setShowWinMessage(false);
    setShowLoseMessage(false);

    let newDeck = data.results;
    shuffleDeck(newDeck);
    setTimeout(() => setFlipCards('card-inner'), 400);
  }

  function getData() { 
    useEffect(() => {
      const fetchData = async() => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0`);
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.log(error);
        }
      } 
      fetchData();
    }, [])
  }

  //after the data is available, create the deck
  useEffect(() => {
    if(data != null) {
      createDeck();
    }
  }, [data]);

  function shuffleDeck(deck) {
    for (let i = deck.length -1; i > 0; i--) {
      let j = Math.floor(Math.random() * i)
      let k = deck[i]
      deck[i] = deck[j]
      deck[j] = k
    }
    setDeck(deck.slice(0,8)); //only pull 8 cards from the deck 
  }

  return (
    <>
      <Scoreboard 
      score={score}
      showLoseMessage={showLoseMessage}
      showWinMessage={showWinMessage}
      createDeck={createDeck}
      />
      <div id='cards-container'>
        {deck != null && 
          deck.map((pokemon, index) => (
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
