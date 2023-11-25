import '../App.css';
import { useState } from 'react';

const ScratchPadLetter = ({Letter, Resetter}) => {

    const [letterKnowledge, setLetterKnowledge] = useState("letter_neutral");

    const cycleLetterButton = () => {
        if (letterKnowledge == "letter_neutral") {
            setLetterKnowledge("letter_eliminated");
        } else if (letterKnowledge == "letter_eliminated") {
            setLetterKnowledge("letter_proven");
            // alert("Now proven!");
        } else if (letterKnowledge == "letter_proven") {
            setLetterKnowledge("letter_neutral");
            // alert("Now neutral!");
        }
    }

    if (Resetter == "click again to reset") {
        setLetterKnowledge("letter_neutral");
    }

    return (
        <div className={letterKnowledge} onClick={() => cycleLetterButton()}><div class="scratchpad-text">{Letter}</div></div>
    );
}

export default ScratchPadLetter;