export default function Scoreboard({ score, showLoseMessage, showWinMessage, createDeck, setPlayGame, resetGame }) {
    function startGame() {
        createDeck(); 
        resetGame();
    }

    function endGame() {
        setPlayGame(false); 
        resetGame();
    }
    return(
        <div id='scoreboard-container'>
            <p id='score'>Current Score: {score}</p>

            {showLoseMessage && 
            <p className='message'>You Lose! Play Again?</p>}
            {showWinMessage && 
            <p className='message'>You Win! Play Again?</p>}

            {(showLoseMessage || showWinMessage) &&
                <div id='button-container'>
                    <button className='play-again' onClick={startGame}>Yes</button>
                    <button className='play-again' onClick={endGame}>No</button>
                </div>

            }

        </div>
    )
}

