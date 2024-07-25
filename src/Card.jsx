import normalIcon from './normal.png';
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
        
    }, [data])

    if (data != null) {
        hp = data.stats[0].base_stat;
        imgURL = data.sprites.other['official-artwork'].front_default;
        moves = data.moves.slice(0,3); //only want to use 3 moves
        type = data.types[0].type.name;
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
                                    <img src={normalIcon}></img>
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