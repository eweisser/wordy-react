import '../App.css';
import { useState } from 'react';

const ScratchPadLetter = ({Letter, LetterKnowledge, cycleLetterButton}) => {

    // const [letterKnowledge, setLetterKnowledge] = useState("letter_neutral");

    // const cycleLetterButton = () => {
    //     if (letterKnowledge === "letter_neutral") {
    //         setLetterKnowledge("letter_eliminated");
    //     } else if (letterKnowledge === "letter_eliminated") {
    //         setLetterKnowledge("letter_proven");
    //     } else if (letterKnowledge === "letter_proven") {
    //         setLetterKnowledge("letter_neutral");
    //     }
    // }

    return (
        <div className={LetterKnowledge} onClick={() => cycleLetterButton(Letter, LetterKnowledge)}><div class="scratchpad-text">{Letter}</div></div>
    );
}

export default ScratchPadLetter;