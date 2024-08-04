import logo from './assets/logo.png';

export default function LandingPage({ setPlayGame, setFlipCards }) {

    function initializeGame() {
        setPlayGame(true);
        setTimeout(() => setFlipCards('card-inner'), 500); //flip cards at start of game
    }
    return(
        <div id='landing-page'>
            <div id='landing-page-title'>
                <img src={logo} width='400px' alt='pokemon logo'></img>
                <h2 className='subtitle'>Memory Game</h2>
            </div>

            <div id='instructions'>
                <p>Select each card and don't repeat!</p>
                <p>The cards will be reshuffled after each turn.</p>
                <p>Find all of the card to win!</p>
            </div>

            <div>
                <button id='start-button' onClick={initializeGame}>START</button>
            </div>
        </div>
    )

}