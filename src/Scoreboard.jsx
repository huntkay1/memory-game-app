export default function Scoreboard({ score, showLoseMessage, showWinMessage, createDeck, setPlayGame, resetGame }) {
    function startGame() {
        createDeck(); 
        resetGame('new');
    }

    function endGame() {
        setPlayGame(false); 
        resetGame('end');
    }
    return(
        <div id='scoreboard-container'>
            <div id='scoreboard-top'>
                <p id='score'>Current Score: {score}</p>
                <button id='quit-button' onClick={endGame}>QUIT</button>
            </div>

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

