import '../App.css';
import { useState } from 'react';
import { useCallback } from 'react';
import { ENG_STANDARD, ENG_MAX, FRENCH01, GERMAN01, SPANISH01 } from './minilex.js';
import { AI_AMY } from './ai-amy.js';
import { AI_BEN } from './ai-ben.js';
import { AI_CLAIR } from './ai-clair.js';
import { AI_DAVID } from './ai-david.js';

const Game = ({sendActiveAi, newGamePickAi, sendMoodFromGameToApp, lexiconToUse}) => {

    // const [currentUserInput, setCurrentUserInput] = useState("...");
    // const [whoGoesFirst, setWhoGoesFirst] = useState(null);
    const [allDialogues, setAllDialogues] = useState([ "!**Hi, I'm "+sendActiveAi+". Enter 1 if you want to go first, or 2 for me to go first.",["U"," ","..."]]);
    const [gameStage, setGameStage] = useState("decide who goes first");
    const [computerSecretWord, setComputerSecretWord] = useState(".....");
    const [computerRoundCount, setComputerRoundCount] = useState(1);
    const [userRoundCount, setUserRoundCount] = useState(1);
    const [computerGuessRecord, setComputerGuessRecord] = useState({});
    var activeLexicon = ENG_STANDARD;
    var latestComputerWordChoice = "";
    const [latestComputerGuessWord, setLatestComputerGuessWord] = useState(".....");

    if (computerSecretWord === ".....") {
        setComputerSecretWord(activeLexicon[(Math.floor(Math.random()*activeLexicon.length))]);
    }
    switch(lexiconToUse) {
        case "standard":
            activeLexicon = ENG_STANDARD;
            break;
        case "maximal":
            activeLexicon = ENG_MAX;
            break;
        case "french":
            activeLexicon = FRENCH01;
            break;
        case "german":
            activeLexicon = GERMAN01;
            break;
        case "spanish":
            activeLexicon = SPANISH01;
            break;
        default:
            break;
    }

    // const resetFace = () => {
    //     sendMoodFromGameToApp("neutral");
    // }









    const handleKeyDown = (event) => {





        if (gameStage === "decide who goes first") {
            setComputerRoundCount(1);
            setUserRoundCount(1);
            if ("12".includes(event.key)) {
                const newDialogueBox = ["U"," ",event.key];
                setAllDialogues(allDialogues.slice(0,1).concat([newDialogueBox]) );     // if the user enters "1" or "2", make that the content of the most recent box
            } else if (event.key === "Enter") {
                if (allDialogues[allDialogues.length - 1][2] === "1") {
                    setAllDialogues(allDialogues.concat(["!* *Okay, you'll go first. Enter your guess whenever you're ready.",["U",userRoundCount,"..."]]) );
                    setGameStage("userGuess");
                } else if (allDialogues[allDialogues.length - 1][2] === "2") {
                    // console.log(computerGuessRecord);
                    latestComputerWordChoice = computerPicksGuessWord();
                    setAllDialogues(allDialogues.concat(["!* *Okay, I'll go first. Let's see...","!*1*My guess is "+latestComputerWordChoice.toUpperCase()+".",["U","","..."]]) );
                    setGameStage("computerGuess");
                    setComputerRoundCount(2);
                }
            }










        } else if (gameStage === "userGuess") {         // user's 5 letter guess
            if (event.key.length === 1) {               // if user presses A-Z key...
                const indexOfMostRecentBox = allDialogues.length-1;
                const mostRecentBox = allDialogues.slice(indexOfMostRecentBox)[0];
                if (mostRecentBox[2] === "...") {
                    setAllDialogues(allDialogues.slice(0,allDialogues.length-1).concat([["U",userRoundCount,event.key.toUpperCase()]]) );
                } else {
                    var buildingUserGuess = allDialogues.slice(allDialogues.length-1)[0][2]+event.key.toUpperCase();
                    setAllDialogues(allDialogues.slice(0,allDialogues.length-1).concat([["U",userRoundCount,buildingUserGuess]]) );
                }
            }

            if (event.key === "Backspace") {
                let mostRecentBoxText = allDialogues.slice(allDialogues.length-1)[0][2];
                let allPreviousBoxes = allDialogues.slice(0,allDialogues.length-1);
                if (mostRecentBoxText === "...") {
                } else if (mostRecentBoxText.length === 1) {         // if there's only one character left, replace it with "..."
                    setAllDialogues(allPreviousBoxes.concat([["U",userRoundCount,"..."]]));
                } else {                                            // if there's more than one character, delete the last one
                    var shorteningUserGuess = mostRecentBoxText.slice(0,mostRecentBoxText.length-1);
                    setAllDialogues(allPreviousBoxes.concat([["U",userRoundCount,shorteningUserGuess]]));
                }
            }

            if (event.key === "Enter") {
                var userGuessWord = allDialogues.slice(allDialogues.length-1)[0][2];
                if (activeLexicon.includes(userGuessWord.toLowerCase()) || userGuessWord === "XXXXX") {
                    var userLetterCorrectNumber = computerEvaluatesUserGuess(userGuessWord);
                    if (userGuessWord.toLowerCase() === computerSecretWord || userGuessWord === "XXXXX") {
                        setGameStage("gameOverUserWon");
                        setAllDialogues(allDialogues.concat(["!* *That's right! You guessed my word!","!* *What do you want to do now?","@Play this AI again / Play a different AI / Go to start menu"]));
                    } else {
                        let roundCountAtCreation = computerRoundCount;
                        // console.log(computerGuessRecord);
                        if (userLetterCorrectNumber === 1) {
                            setAllDialogues(allDialogues.concat(["!* *You got "+userLetterCorrectNumber+" letter.","!*"+roundCountAtCreation+"*My guess is "+computerPicksGuessWord().toUpperCase()+".",["U","","..."]]) );
                        } else {
                            setAllDialogues(allDialogues.concat(["!* *You got "+userLetterCorrectNumber+" letters.","!*"+roundCountAtCreation+"*My guess is "+computerPicksGuessWord().toUpperCase()+".",["U","","..."]]) );
                        }
                        setComputerRoundCount(computerRoundCount+1);
                    }
                    setGameStage("computerGuess");
                    setUserRoundCount(userRoundCount+1);
                } else {
                    setAllDialogues(allDialogues.concat(["!* *Sorry, that word isn't in my dictionary. Try a different word.",["U"," ","..."]]) );
                }
            }












        } else if (gameStage === "computerGuess") {         // user's numerical 1-5 response to computer's guess
            if (event.key.charCodeAt(0) >= 48 && event.key.charCodeAt(0) <= 53) {
                let newDialogueBox = ["U"," ",event.key];
                setAllDialogues(allDialogues.slice(0,allDialogues.length-1).concat([newDialogueBox]) );
            }
            if (event.key === "Enter") {
                const userFeedback = allDialogues[allDialogues.length - 1][2];
                if (allDialogues[allDialogues.length - 1][2].charCodeAt(0) >= 48 && allDialogues[allDialogues.length - 1][2].charCodeAt(0) <= 53) {
                    // setComputerGuessRecord(computerGuessRecord.concat([[latestComputerGuessWord,userFeedback]]));
                    const dummyObject = computerGuessRecord;
                    dummyObject[latestComputerGuessWord] = parseInt(userFeedback);
                    setComputerGuessRecord(dummyObject);
                    switch(userFeedback) {                      // change fox's eyes/expression based on response
                        case "5":
                            sendMoodFromGameToApp("shocked");
                            // setInterval(resetFace, 2000);
                            break;
                        case "4":
                            sendMoodFromGameToApp("neutral");
                            break;
                        case "3":
                            sendMoodFromGameToApp("suspicious");
                            // setInterval(resetFace, 2000);
                            break;
                        case "2":
                            sendMoodFromGameToApp("crying");
                            // setInterval(resetFace, 2000);
                            break;
                        case "1":
                            sendMoodFromGameToApp("dead");
                            // setInterval(resetFace, 2000);
                            break;
                        case "0":
                            sendMoodFromGameToApp("shocked");
                            // setInterval(resetFace, 2000);
                            break;
                        default:
                            sendMoodFromGameToApp("neutral");
                            break;
                    }
                    if (userFeedback == "5") {
                        setAllDialogues(allDialogues.slice(0,allDialogues.length).concat(["!* *Is my guess correct?",["U",userRoundCount,"..."]]) );
                    } else {
                        setAllDialogues(allDialogues.slice(0,allDialogues.length).concat(["!* *Okay, what's your guess?",["U",userRoundCount,"..."]]) );
                    }
                    setGameStage("userGuess");
                }
            }





        } else if (gameStage === "game ended, before erasing") {
            if (event.key === "Enter") {
                setAllDialogues(["!* *Enter 1 if you want to go first, or 2 for me to go first.",["U","","..."]]);
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
        return correctLetterRunningSum;
    }

    const computerPicksGuessWord = () => {
        var computerWordChoice = "";
        switch (sendActiveAi) {
            case "Amy":
                computerWordChoice = AI_AMY(activeLexicon);
                break;
            case "Ben":
                computerWordChoice = AI_BEN(activeLexicon,computerGuessRecord);
                break;
            case "Clair":
                computerWordChoice = AI_CLAIR(activeLexicon,computerGuessRecord);
                break;
            case "David":
                computerWordChoice = AI_DAVID(activeLexicon,computerGuessRecord);
                break;
            default:
                computerWordChoice = AI_AMY(activeLexicon);
        }
        setLatestComputerGuessWord(computerWordChoice);
        return computerWordChoice;
    }

    const restartGame = () => {
        setGameStage("game ended, before erasing");
        setAllDialogues(allDialogues.concat(["!**Okay, press enter and I'll erase the previous game.","..."]) );
    }

    const whoGoesFirstInput = useCallback((inputElement) => {
        if (inputElement) {
            inputElement.focus();
         }
    }, []);

    const makeDialogueBox = (item) => {
        const randomKey = Math.random();
        // console.log("Item number "+itemNumber+" is...");
        // console.log(item);
        if (item[0] === "!") {          // if it starts with "!", it's a computer dialogue box
            return <div key={randomKey} className="compDialogueContainer">
                        <div className="compDialogueSpace"></div>
                        <div className="compDialogue">
                            <div className="compDialogueLeftCap"></div>
                            {item.split("*")[2]}
                            <div className="compDialogueRightCap">{item.split("*")[1]}</div>
                        </div>
                    </div>
        } else if (item[0] === "@") {   // if it starts with "@", it's a set of player option boxes
            return <div tabIndex="0" key={randomKey} ref={whoGoesFirstInput} className="playerOptionBoxesContainer">
                        <div className="playerOptionBox" onClick={restartGame}>{item.split("/")[0].slice(1)}</div>
                        <div className="playerOptionBox" onClick={() => newGamePickAi(true)}>{item.split("/")[1]}</div>
                        <div className="playerOptionBox" onClick={() => newGamePickAi(false)}>{item.split("/")[2]}</div>
                        <div className="playerInputSpace"></div>
                    </div>
        } else {                        // if it doesn't start with "!" or "@", it's a player input box
            return <div key={randomKey} className="playerInputContainer">
                        <div tabIndex="0" onKeyDown={handleKeyDown} className="playerInput" ref={whoGoesFirstInput}>
                            <div className="playerInputLeftCap">{item[1]}</div>
                            {item[2]}
                            <div className="playerInputRightCap"></div>
                        </div>
                        <div className="playerInputSpace"></div>
                    </div>
        }       // end of handling case--player input box
    }           // end of makeDialogueBox

    var mappedDialogueBoxes = allDialogues.map(makeDialogueBox);

    return (
        <div id="game">
            
            {mappedDialogueBoxes}

        </div>
    );
}

export default Game;