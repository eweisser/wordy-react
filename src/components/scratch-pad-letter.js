import '../App.css';
import { useState } from 'react';

const ScratchPadLetter = ({Letter}) => {

    const [letterKnowledge, setLetterKnowledge] = useState("letter_neutral");

    const cycleLetterButton = () => {
        if (letterKnowledge == "letter_neutral") {
            setLetterKnowledge("letter_eliminated");
            // alert("Now eliminated!");
        } else if (letterKnowledge == "letter_eliminated") {
            setLetterKnowledge("letter_proven");
            // alert("Now proven!");
        } else if (letterKnowledge == "letter_proven") {
            setLetterKnowledge("letter_neutral");
            // alert("Now neutral!");
        }
    }

    return (
        // <div className="ai-menu-button" onPress={() => pickAi({AiName})}>{AiName}</div>
        <div className={letterKnowledge} onClick={() => cycleLetterButton()}>{Letter}</div>
    );
}

export default ScratchPadLetter;