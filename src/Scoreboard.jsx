export default function Scoreboard({ score, showLoseMessage }) {

    return(
        <div id='scoreboard-container'>
            <p id='score'>Current Score: {score}</p>
            {showLoseMessage && 
            <p id='lose-message'>You Lose!</p>}
        </div>
    )
}

