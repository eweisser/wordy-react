import '../App.css';
import { useState } from 'react';
import { useCallback } from 'react';

const Game = ({sendActiveAi}) => {

    // const dayOrNight = data.weather[0].icon[2] + "Time";
    // document.body.setAttribute('class', dayOrNight);

    const [whoGoesFirst, setWhoGoesFirst] = useState("...");

    const handleKeyDown = (event) => {
        setWhoGoesFirst(event.key);
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
            <div className="compDialogueContainer">
                <div className="compDialogueSpace"></div>
                <div className="compDialogue">
                    Hi, I'm {sendActiveAi}. Enter 1 if you want to go first, or 2 for me to go first.
                </div>
            </div>
            <div className="playerInputContainer">
                <div tabIndex="0" onKeyDown={handleKeyDown} className="playerInput" ref={whoGoesFirstInput}>
                    {whoGoesFirst}
                </div>
                <div className="playerInputSpace"></div>
            </div>
        </div>
    );
}

export default Game;