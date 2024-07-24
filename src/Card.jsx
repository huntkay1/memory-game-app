import normalIcon from './normal.png'
export default function Card({ data }) {
    
    function formatString(string) {

    }
    
    return (
        <div className='card'>
            <div className='card-contents'>
                <div className='card-header'>
                    <h2>{data.name}</h2>
                    <h2><span>HP</span> {data.stats[0].base_stat}</h2>
                </div>
                <img src={data.sprites.other['official-artwork'].front_default} alt={data.name}></img>
                <div className='card-attacks'>
                {data.abilities.map((item, index) => {
                        return (
                            <div className='attack-container'>
                                <img src={normalIcon}></img>
                                <p key={index}>{item.ability.name}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}