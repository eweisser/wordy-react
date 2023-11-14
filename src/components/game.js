import '../App.css';
import { useState } from 'react';
import { useCallback } from 'react';
// import { useEffect } from 'react';
// import { LEXICON } from './lexicon.js';
import { MINILEX } from './minilex.js';

const Game = ({sendActiveAi, newGamePickAi}) => {

    // const [currentUserInput, setCurrentUserInput] = useState("...");
    // const [whoGoesFirst, setWhoGoesFirst] = useState(null);
    const [allDialogues, setAllDialogues] = useState([ "!Hi, I'm "+sendActiveAi+". Enter 1 if you want to go first, or 2 for me to go first.","..." ]);
    const [gameStage, setGameStage] = useState("decide who goes first");
    const [computerSecretWord, setComputerSecretWord] = useState(".....");

    if (computerSecretWord === ".....") {
        setComputerSecretWord(MINILEX[(Math.floor(Math.random()*MINILEX.length))]);
    }

    const handleKeyDown = (event) => {
        if (gameStage === "decide who goes first") {
            if ("12".includes(event.key)) {
                setAllDialogues(allDialogues.slice(0,1).concat(event.key) );     // if the user enters "1" or "2", make that the content of the most recent box
            } else if (event.key === "Enter") {
                if (allDialogues[allDialogues.length - 1] === "1") {
                    setAllDialogues(allDialogues.concat(["!Okay, you'll go first. Enter your guess whenever you're ready.","..."]) );
                    setGameStage("userGuess");
                } else if (allDialogues[allDialogues.length - 1] === "2") {
                    setAllDialogues(allDialogues.concat(["!Okay, I'll go first. Let's see...","!My guess is "+computerPicksGuessWord().toUpperCase()],"...") );
                    setGameStage("computerGuess");
                }
            }
        } else if (gameStage === "userGuess") {         // user's 5 letter guess

            if (event.key.length === 1) {
                let mostRecentBox = allDialogues.slice(allDialogues.length-1);
                if (mostRecentBox[0] === "...") {
                    setAllDialogues(allDialogues.slice(0,allDialogues.length-1).concat(event.key.toUpperCase()) );
                } else {
                    var buildingUserGuess = allDialogues.slice(allDialogues.length-1)+event.key.toUpperCase();
                    setAllDialogues(allDialogues.slice(0,allDialogues.length-1).concat(buildingUserGuess) );
                }
            }

            if (event.key === "Backspace") {
                let mostRecentBox = allDialogues.slice(allDialogues.length-1);
                // alert(mostRecentBox);
                // alert(mostRecentBox[0].length);
                if (mostRecentBox[0] === "...") {
                } else if (mostRecentBox[0].length === 1) {
                    setAllDialogues(allDialogues.slice(0,allDialogues.length-1).concat("...") );
                } else {
                    var shorteningUserGuess = mostRecentBox[0].slice(0,mostRecentBox[0].length-1);
                    setAllDialogues(allDialogues.slice(0,allDialogues.length-1).concat(shorteningUserGuess) );
                }
            }

            if (event.key === "Enter") {
                var userGuessWord = allDialogues.slice(allDialogues.length-1)[0];
                if (MINILEX.includes(userGuessWord.toLowerCase()) || userGuessWord === "XXXXX") {
                    var userLetterCorrectNumber = computerEvaluatesUserGuess(userGuessWord);
                    if (userGuessWord.toLowerCase() === computerSecretWord || userGuessWord === "XXXXX") {
                        setGameStage("gameOverUserWon");
                        setAllDialogues(allDialogues.concat(["!That's right! You guessed my word!","!What do you want to do now?","@Play this AI again / Play a different AI / Go to start menu"]));
                    } else {
                        if (userLetterCorrectNumber === 1) {
                            setAllDialogues(allDialogues.concat(["!You got "+userLetterCorrectNumber+" letter.","!My guess is "+computerPicksGuessWord().toUpperCase()],"...") );
                        } else {
                            setAllDialogues(allDialogues.concat(["!You got "+userLetterCorrectNumber+" letters.","!My guess is "+computerPicksGuessWord().toUpperCase()],"...") );
                        }
                    }
                        setGameStage("computerGuess");
                } else {
                    setAllDialogues(allDialogues.concat(["!Sorry, that word isn't in my dictionary. Try a different word.","..."]) );
                }
            }



        } else if (gameStage === "computerGuess") {         // user's numerical 1-5 response to computer's guess
            if (event.key.charCodeAt(0) >= 49 && event.key.charCodeAt(0) <= 53) {
                setAllDialogues(allDialogues.slice(0,allDialogues.length-1).concat(event.key) );
            }
            if (event.key === "Enter") {
                if (allDialogues[allDialogues.length - 1].charCodeAt(0) >= 49 && allDialogues[allDialogues.length - 1].charCodeAt(0) <= 53) {
                    setAllDialogues(allDialogues.slice(0,allDialogues.length).concat(["!Okay, what's your guess?","..."]) );
                    setGameStage("userGuess");
                }
            }
        } else if (gameStage === "game ended, before erasing") {
            if (event.key === "Enter") {
                setAllDialogues(["!Enter 1 if you want to go first, or 2 for me to go first.","..."]);
                setGameStage("decide who goes first");
            }
        }
      };    // end of handleKeyDown

    const computerEvaluatesUserGuess = (userGuessWord) => {
        var correctLetterRunningSum = 0;
        for (let letter of userGuessWord) {
            if (computerSecretWord.toUpperCase().includes(letter)) {
                correctLetterRunningSum = correctLetterRunningSum + 1;
            }
        }
        // alert(userGuessWord);
        // alert("Here, the computer will figure out how many letters the user has matched.");
        return correctLetterRunningSum;
    }

    const computerPicksGuessWord = () => {
        return MINILEX[(Math.floor(Math.random()*MINILEX.length))];
    }
    const computerMakesAGuess = () => {
        setAllDialogues(allDialogues.concat(["!My guess is "+computerPicksGuessWord().toUpperCase(),"..."]) );
    }

    const restartGame = () => {
        setGameStage("game ended, before erasing");
        setAllDialogues(allDialogues.concat(["!Okay, press enter and I'll erase the previous game.","..."]) );
    }

    const whoGoesFirstInput = useCallback((inputElement) => {
        if (inputElement) {
            inputElement.focus();
         }
    }, []);

    const makeDialogueBox = (item) => {
        console.log(item);
        const itemNumber = allDialogues.indexOf(item);
        if (item[0] === "!") {          // if it starts with "!", it's a computer dialogue box
            return <div key={itemNumber} className="compDialogueContainer">
                        <div className="compDialogueSpace"></div>
                        <div className="compDialogue">{item.slice(1)}</div>
                    </div>
        } else if (item[0] === "@") {   // if it starts with "@", it's a set of player option boxes
            return <div key={itemNumber} ref={whoGoesFirstInput} className="playerOptionBoxesContainer">
                        <div tabIndex="0" className="playerOptionBox" onKeyDown={handleKeyDown}>{item.split("/")[0].slice(1)}</div>
                        <div className="playerOptionBox" onClick={() => newGamePickAi(true)}>{item.split("/")[1]}</div>
                        <div className="playerOptionBox" onClick={() => newGamePickAi(false)}>{item.split("/")[2]}</div>
                        <div className="playerInputSpace"></div>
                    </div>
        } else {                        // if it doesn't start with "!" or "@", it's a player input box
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

        </div>
    );
}

export default Game;