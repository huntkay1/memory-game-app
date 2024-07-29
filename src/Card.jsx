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

export default function Card({ pokemonName, makeMove }) {

    const [data, setData] = useState(null);
    let hp;
    let imgURL;
    let moves;
    let type;

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`) 
          .then(response => response.json())
          .then(data => setData(data))
          .catch(error => console.error(error))
        
    }, [pokemonName])

    if (data != null) {
        hp = data.stats[0].base_stat;
        imgURL = data.sprites.other['official-artwork'].front_default;
        moves = data.moves.slice(0,3); //only want to use 3 moves
        type = eval(data.types[0].type.name); //turn string into variable so that it can be used as icon img src
    }


    return (
        <>
        {data != null && 
            <div className='card' onClick={()=>makeMove(pokemonName)}>
                <div className='card-inner'>
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
                                        <img src={type}></img>
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