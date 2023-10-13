import '../App.css';
import { useState } from 'react';
import { useCallback } from 'react';
import { createElement } from 'react';

const Game = ({sendActiveAi}) => {

    // const dayOrNight = data.weather[0].icon[2] + "Time";
    // document.body.setAttribute('class', dayOrNight);

    const dialogueBoxArray = ["Hi, I'm "+sendActiveAi+". Enter 1 if you want to go first, or 2 for me to go first.","..."];

    const [currentUserInput, setCurrentUserInput] = useState("...");
    const [whoGoesFirst, setWhoGoesFirst] = useState(null);
    const [allDialogues, setAllDialogues] = useState(["Hi, I'm "+sendActiveAi+". Enter 1 if you want to go first, or 2 for me to go first.","..."]);

    const handleKeyDown = (event) => {
        if ("12".includes(event.key)) {
            setCurrentUserInput(event.key);
            // console.log(event.key);
        } else if (event.key === "Enter") {
            // dialogueBoxArray.push("new");
            // console.log(dialogueBoxArray);
            setAllDialogues(allDialogues.concat(["new"]) );
            // console.log(allDialogues);
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

    const makeDialogueBox = (item) => {
        const itemNumber = dialogueBoxArray.indexOf(item);
        if (itemNumber % 2 === 0) {
            // console.log(item);
            return <div key={itemNumber} className="compDialogueContainer">
                        <div className="compDialogueSpace"></div>
                        <div className="compDialogue">{item}</div>
                    </div>
        } else {
            // console.log(item);
            return <div key={itemNumber} className="playerInputContainer">
                        <div tabIndex="0" onKeyDown={handleKeyDown} className="playerInput" ref={whoGoesFirstInput}>{item}</div>
                        <div className="playerInputSpace"></div>
                    </div>
        }
    }

    var mappedDialogueBoxes = allDialogues.map(makeDialogueBox);

    return (
        <div id="game">
            
            {mappedDialogueBoxes}

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