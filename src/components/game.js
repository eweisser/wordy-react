import '../App.css';
import { useState } from 'react';
import { useCallback } from 'react';
import { createElement } from 'react';

const Game = ({sendActiveAi}) => {

    // const dayOrNight = data.weather[0].icon[2] + "Time";
    // document.body.setAttribute('class', dayOrNight);

    const dialogueBoxArray = ["first","second","third","fourth","fifth"];

    const [currentUserInput, setCurrentUserInput] = useState("...");
    const [whoGoesFirst, setWhoGoesFirst] = useState(null);

    const handleKeyDown = (event) => {
        if ("12".includes(event.key)) {
            setCurrentUserInput(event.key);
        } else if (event.key === "Enter") {
            dialogueBoxArray.push("new");
        }
        // if ("1234567890.+-*/()^".includes(event.key)) {
        //   sendExpressionToDisplay(event.key);
        // }
      };

    const whoGoesFirstInput = useCallback((inputElement) => {
        if (inputElement) {
            inputElement.focus();
         }
    }, []);

    return (
        <div id="game">
            
            {dialogueBoxArray.map(builder => (
                <div className="compDialogueContainer">Hello!</div>
            ))}

            {/* <div className="compDialogueContainer">
                <div className="compDialogueSpace"></div>
                <div className="compDialogue">
                    Hi, I'm {sendActiveAi}. Enter 1 if you want to go first, or 2 for me to go first.
                </div>
            </div>
            <div className="playerInputContainer">
                <div tabIndex="0" onKeyDown={handleKeyDown} className="playerInput" ref={whoGoesFirstInput}>
                    {currentUserInput}
                </div>
                <div className="playerInputSpace"></div>
            </div> */}
        </div>
    );
}

export default Game;