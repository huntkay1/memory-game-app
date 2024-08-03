export default function Scoreboard({ score, showLoseMessage, showWinMessage }) {

    return(
        <div id='scoreboard-container'>
            <p id='score'>Current Score: {score}</p>
            {showLoseMessage && 
            <p className='message'>You Lose!</p>}
            {showWinMessage && 
            <p className='message'>You Win!</p>}
        </div>
    )
}

