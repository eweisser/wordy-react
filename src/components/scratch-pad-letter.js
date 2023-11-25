import '../App.css';
import { useState } from 'react';

const ScratchPadLetter = ({Letter}) => {

    const [letterKnowledge, setLetterKnowledge] = useState("letter_neutral");
    const [resetStatus, setResetStatus] = useState("[reset]");

    const cycleLetterButton = () => {
        if (letterKnowledge == "letter_neutral") {
            setLetterKnowledge("letter_eliminated");
        } else if (letterKnowledge == "letter_eliminated") {
            setLetterKnowledge("letter_proven");
        } else if (letterKnowledge == "letter_proven") {
            setLetterKnowledge("letter_neutral");
        }
    }

    const cycleResetButton = () => {
        if (resetStatus == "[reset]") {
            setResetStatus("click again to reset");
        } else if (resetStatus == "click again to reset") {
            var allLetters = document.querySelectorAll(".gbq");
            for (const letterElement of allLetters) {
                // console.log(letterElement.entries);
                letterElement.className = "gbq letter_neutral";
            }
            setResetStatus("[reset]");
        }
    }

    if (Letter == "[reset]") {
    return (
        <div className="scratch-pad-reset-button" onClick={() => cycleResetButton()}><div class="scratchpad-text">{resetStatus}</div></div>
    );
    } else {
    return (
        <div className={`gbq ${letterKnowledge}`} onClick={() => cycleLetterButton()}><div class="scratchpad-text">{Letter}</div></div>
    ); 
    }
}

export default ScratchPadLetter;