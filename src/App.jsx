import { useState, useEffect } from 'react';
import './index.css';
import Card from './Card';
import Scoreboard from './Scoreboard';
import LandingPage from './LandingPage';

function App() {
  const [data, setData] = useState(null);
  const [score, setScore] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);
  const [flipCards, setFlipCards] = useState('card-inner flipped');
  const [showLoseMessage, setShowLoseMessage] = useState(false);
  const [showWinMessage, setShowWinMessage] = useState(false);
  const [deck, setDeck] = useState(null);
  const [playGame, setPlayGame] = useState(false);
  const [loading, setLoading] = useState(true);


  window.addEventListener('load', getData())

  function makeMove(cardName) {
    let loss = checkForLoss(cardName);
    let win = checkForWin();
    if (loss) {
      setShowLoseMessage(true);
    } else if (win) {
      setShowWinMessage(true);
      addPoint();
    } else {
      setTimeout(() => setFlipCards('card-inner'), 50); //flip cards to front
      setSelectedCards([...selectedCards, cardName]);
      addPoint();
      shuffleDeck(deck);
    }
  }

  function checkForLoss(cardName) {
    return selectedCards.includes(cardName)
  }

  function checkForWin() {
    return score === 7;
  }

  function addPoint() {
    setScore(score + 1);
  }

  function resetGame(gameType) {
    setShowWinMessage(false);
    setShowLoseMessage(false);
    setScore(0);
    setSelectedCards([]);
    setLoading(true);
    if (gameType === 'new' && !loading) {
      setFlipCards('card-inner')
    }else if (gameType === 'end') {
      setFlipCards('card-inner flipped')
    }
  }

  //create the deck, shuffle it, and flip over cards
  function createDeck() {
    if (data) {
      let newDeck = data.results;
      shuffleDeck(newDeck);
      setFlipCards('card-inner'); 
    }
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
    if(data) {
      createDeck();
    }
  }, [data]);

  function shuffleDeck(deck) {
    setLoading(true);
    for (let i = deck.length -1; i > 0; i--) {
      let j = Math.floor(Math.random() * i)
      let k = deck[i]
      deck[i] = deck[j]
      deck[j] = k
    }
    setLoading(false);
    setDeck(deck.slice(0,8)); //only pull 8 cards from the deck 
  }

  return (
    <>
      {!playGame &&       
        <LandingPage 
          setPlayGame={setPlayGame}
          setFlipCards={setFlipCards}
        />
      }

      {playGame && 
        <>
          <Scoreboard 
            score={score}
            showLoseMessage={showLoseMessage}
            showWinMessage={showWinMessage}
            createDeck={createDeck}
            setPlayGame={setPlayGame}
            resetGame={resetGame}
          />
  
          <div id='cards-container'>
            {deck && 
              deck.map((pokemon, index) => (
                <Card 
                pokemonName={pokemon.name}
                makeMove={makeMove}
                flipCards={flipCards}
                setFlipCards={setFlipCards}
                setLoading={setLoading}
                key={index}
                />
              ))
            }
          </div>
        </>
      }



    </>
  )
}

export default App
