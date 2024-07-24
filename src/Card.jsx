
export default function Card({ data }) {
    
    
    return (
        <div className='card'>
            <div className='card-contents'>
                <div className='card-header'>
                <h2>{data.name}</h2>
                    <h2>HP <span>{data.stats[0].base_stat}</span></h2>
                </div>
                <img src={data.sprites.front_default}></img>
                <div className='card-attacks'>
                {data.abilities.map(function (item, index, array) {
                        return <h3 key={index}>{item.ability.name}</h3>
                    })}
                </div>
            </div>
        </div>
    )
}