import { useState } from 'react';

export default function makeMove(cardName) {
    const [score, setScore] = useState(0);
    const [selectedCards, setSelectedCards] = useState([]);

    let loss = checkForLoss(cardName);
    
    if (loss) {
        console.log('you lose') 
    } else {
        setSelectedCards([...selectedCards, cardName])
        addPoint() 
    }

    function checkForLoss() {
        if(selectedCards.includes(cardName)) {
            return true
        } else {
            return false
        }
    }

    function addPoint() {
        setScore(score + 1);
    }
   
}