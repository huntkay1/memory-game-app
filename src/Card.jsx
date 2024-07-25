import normal from './normal.png';
import water from './water.png';
import grass from './grass.png';
import bug from './bug.png';
import fire from './fire.png';
import dark from './dark.png';
import dragon from './dragon.png';
import electric from './electric.png';
import fairy from './fairy.png';
import flying from './flying.png';
import ghost from './ghost.png';
import ground from './ground.png';
import poison from './poison.png'
import psychic from './pyschic.png';
import rock from './rock.png';
import steel from './steel.png';
import ice from './ice.png';
import fighting from './fighting.png';

import { useState, useEffect } from 'react';

export default function Card({ pokemonName }) {

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
            <div className='card'>
                <div className='card-contents'>
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
            </div>
        }
        </>
       
    )
}