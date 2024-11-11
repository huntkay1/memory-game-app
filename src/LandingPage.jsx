import logo from './assets/logo.png';
import { motion } from 'framer-motion'

export default function LandingPage({ setPlayGame, setFlipCards }) {

    function initializeGame() {
        setFlipCards('card-inner flipped')
        setTimeout(() => setFlipCards('card-inner'), 1000); //flip cards at start of game
        setPlayGame(true);
    }

    return(
        <div id='landing-page'>
            <div id='landing-page-title'>
                <motion.img 
                    src={logo} 
                    width='400px' 
                    alt='pokemon logo'
                    initial={{ opacity: 0, y:-50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5}}
                >
                </motion.img>

                <motion.h2 
                    className='subtitle'
                    initial={{ opacity: 0, y:-50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5}}
                >
                    Memory Game
                </motion.h2>
            </div>

            <motion.div 
                id='instructions'
                initial={{ opacity: 0, y:-50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5}}
            >
                <p>Select each card and don't repeat!</p>
                <p>The cards will be reshuffled after each turn.</p>
                <p>Find all of the card to win!</p>
            </motion.div>

            <div>
                <motion.button 
                    id='start-button' 
                    onClick={initializeGame}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5, duration: 0.5}}
                >
                    START
                </motion.button>
            </div>
        </div>
    )

}