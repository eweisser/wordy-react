import '../App.css';
import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { LEXICON } from './lexicon.js';

const Game = ({sendActiveAi}) => {

    // const dayOrNight = data.weather[0].icon[2] + "Time";
    // document.body.setAttribute('class', dayOrNight);

    // const [currentUserInput, setCurrentUserInput] = useState("...");
    // const [whoGoesFirst, setWhoGoesFirst] = useState(null);
    const [allDialogues, setAllDialogues] = useState([ "!Hi, I'm "+sendActiveAi+". Enter 1 if you want to go first, or 2 for me to go first.","..." ]);
    const [gameStage, setGameStage] = useState("decide who goes first");

    useEffect(() => {

    }
    );

    const handleKeyDown = (event) => {
        if (gameStage === "decide who goes first") {
            if ("12".includes(event.key)) {
                setAllDialogues(allDialogues.slice(0,1).concat(event.key) );     // if the user enters "1" or "2", make that the content of the most recent box
            } else if (event.key === "Enter") {
                if (allDialogues[allDialogues.length - 1] === "1") {
                    setAllDialogues(allDialogues.concat(["!Okay, you'll go first. Enter your guess whenever you're ready.","..."]) );
                    setGameStage("userGuess");
                } else if (allDialogues[allDialogues.length - 1] === "2") {
                    setAllDialogues(allDialogues.concat(["!Okay, I'll go first. Let's see...","!My guess is "+computerPicksAWord().toUpperCase()],"...") );
                    setGameStage("userGuess");
                }
            }
        } else if (gameStage === "userGuess") {
            setAllDialogues(allDialogues.concat(["..."]) );
            // if (!event.key === "Enter") {
                setAllDialogues(allDialogues.slice(0,allDialogues.length-1).concat(event.key) );
            // }
            if (event.key === "Enter") {
                computerMakesAGuess();
            }

        } else if (gameStage === "computerGuess") {         // do we need this? maybe delete
            computerMakesAGuess();
        }
      };    // end of handleKeyDown

    const computerPicksAWord = () => {
        return LEXICON[(Math.floor(Math.random()*LEXICON.length))];
    }
    const computerMakesAGuess = () => {
        setAllDialogues(allDialogues.concat(["!My guess is "+computerPicksAWord().toUpperCase(),"..."]) );
    }

    const whoGoesFirstInput = useCallback((inputElement) => {
        if (inputElement) {
            inputElement.focus();
         }
    }, []);

    const makeDialogueBox = (item) => {
        console.log(item);
        const itemNumber = allDialogues.indexOf(item);
        if (item[0] === "!") {
            // console.log(item);
            return <div key={itemNumber} className="compDialogueContainer">
                        <div className="compDialogueSpace"></div>
                        <div className="compDialogue">{item.slice(1)}</div>
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