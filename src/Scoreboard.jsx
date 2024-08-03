export default function Scoreboard({ score, showLoseMessage, showWinMessage, createDeck }) {

    return(
        <div id='scoreboard-container'>
            <p id='score'>Current Score: {score}</p>
            {showLoseMessage && 
            <p className='message'>You Lose! Play Again?</p>}
            {showWinMessage && 
            <p className='message'>You Win! Play Again?</p>}
            {(showLoseMessage || showWinMessage) &&
                <button id='play-again'onClick={createDeck}>Yes</button>
            }

        </div>
    )
}

