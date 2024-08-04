import normal from './assets/normal.png';
import water from './assets/water.png';
import grass from './assets/grass.png';
import bug from './assets/bug.png';
import fire from './assets/fire.png';
import dark from './assets/dark.png';
import dragon from './assets/dragon.png';
import electric from './assets/electric.png';
import fairy from './assets/fairy.png';
import flying from './assets/flying.png';
import ghost from './assets/ghost.png';
import ground from './assets/ground.png';
import poison from './assets/poison.png'
import psychic from './assets/pyschic.png';
import rock from './assets/rock.png';
import steel from './assets/steel.png';
import ice from './assets/ice.png';
import fighting from './assets/fighting.png';
import cardBack from './assets/card-back.png';
import { useState, useEffect } from 'react';

export default function Card({ pokemonName, makeMove, flipCards, setFlipCards }) {

    const [data, setData] = useState(null);
    const [hp, setHP] = useState(null);
    const [imgURL, setImgURL] = useState(null);
    const [moves, setMoves] = useState([]);
    const [type, setType] = useState(null)

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
                const data = await response.json();
                setData(data);
                populateCards(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [pokemonName])



    function populateCards(data) { 
        setHP(data.stats[0].base_stat);
        setImgURL(data.sprites.other['official-artwork'].front_default);
        setMoves(data.moves.slice(0,3)); //only want to use 3 moves
        setType(eval(data.types[0].type.name)); //turn string into variable so that it can be used as icon img src
    }

    function handleSelectedCard(pokemonName) {
        setFlipCards('card-inner flipped'); //flip cards to back
        setTimeout(()=>makeMove(pokemonName), 600); 
    }


    return (
        <>
        {data != null && 
            <div className='card'  onClick={()=>handleSelectedCard(pokemonName)}>
                <div className={flipCards}>
                    <div className='card-front'>
                        <div className='card-header'>
                            <h2>{pokemonName}</h2>
                            <h2><span>HP</span> {hp}</h2>
                        </div>

                        <img src={imgURL} alt={pokemonName} className='card-hero'></img>

                        <div className='card-attacks'>
                            {moves.map((item, index) => {
                                return (
                                    <div key={index} className='attack-container'>
                                        <img src={type} alt='attack-type'></img>
                                        <p>{item.move.name}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='card-back'>
                        <img src={cardBack} alt='pokemon card' height='300px' width='200px'></img>
                    </div>
                </div>
            </div>
        }
        </>
    )
}