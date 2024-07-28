import '../App.css';
import { useState } from 'react';
import { useCallback } from 'react';
import { ENG_STANDARD, ENG_MAX, FRENCH01, GERMAN01, KOREAN01, SPANISH01 } from './minilex.js';
import { AI_AMY } from './ai-amy.js';
import { AI_BEN } from './ai-ben.js';
import { AI_CLAIR } from './ai-clair.js';
import { AI_DAVID } from './ai-david.js';

const Game = ({sendActiveAi, newGamePickAi, sendMoodFromGameToApp, sendGuessLog, lexiconToUse}) => {

    // const [currentUserInput, setCurrentUserInput] = useState("...");
    // const [whoGoesFirst, setWhoGoesFirst] = useState(null);
    const [allDialogues, setAllDialogues] = useState([ ["C","","Hi, I'm "+sendActiveAi+". Do you want to go first, or should I?"],["B",1,"Player goes first","Computer goes first"]]);
    const [gameStage, setGameStage] = useState("decide who goes first");
    const [computerSecretWord, setComputerSecretWord] = useState(".....");
    const [computerRoundCount, setComputerRoundCount] = useState(1);
    const [userRoundCount, setUserRoundCount] = useState(1);
    const [computerGuessRecord, setComputerGuessRecord] = useState({});
    var activeLexicon = ENG_STANDARD;
    var latestComputerWordChoice = "";
    const [latestComputerGuessWord, setLatestComputerGuessWord] = useState(".....");
    const [computerGuessingOn, setComputerGuessingOn] = useState(true);

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
        case "korean":
            activeLexicon = KOREAN01;
            break;
        case "spanish":
            activeLexicon = SPANISH01;
            break;
        default:
            break;
    }

    if (computerSecretWord === ".....") {
        setComputerSecretWord(activeLexicon[(Math.floor(Math.random()*activeLexicon.length))]);
    }

    console.log("The variables:");
    console.log(allDialogues);
    console.log(gameStage);
    console.log(userRoundCount);
    console.log(computerGuessingOn);
    console.log("");





    
    const handleKeyDownTwo = (event) => {

        console.log("allDialogues:");
        console.log(allDialogues);
        console.log();


        const all_inputBoxes = document.getElementsByTagName("input");
        const previousBoxes = allDialogues.slice(0,allDialogues.length-1);

        if (all_inputBoxes.length) {
            if (all_inputBoxes[all_inputBoxes.length-1].value == "...") {
                document.getElementById("dbox"+allDialogues.length).value = "";
                // if most recent recent input box contains "...", and user types something, erase the "..."
            }
        }

        if (document.getElementById("dbox"+allDialogues.length)) {
            document.getElementById("dbox"+allDialogues.length).focus();
        }



        if (gameStage === "decide who goes first") {    // before the user has chosen who goes first
            setComputerRoundCount(1);
            setUserRoundCount(1);




        } else if (gameStage === "userGuess") {         // time for the user's 5 letter guess

            if (event.key === "Enter") {
                // console.log("secret word is...");
                // console.log(computerSecretWord);
                var userGuessWord = all_inputBoxes[all_inputBoxes.length-1].value;

                if (activeLexicon.includes(userGuessWord.toLowerCase()) || userGuessWord === "XXXXX") {     // if word is acceptable...

                    const dialogueBoxWithNewestUserGuess = [["U",userRoundCount,userGuessWord]];
                    var userLetterCorrectNumber = computerEvaluatesUserGuess(userGuessWord);

                    if (userGuessWord.toLowerCase() === computerSecretWord || userGuessWord === "XXXXX") {
                        setGameStage("gameOverUserWon");
                        setAllDialogues(previousBoxes.concat(dialogueBoxWithNewestUserGuess).concat([ ["C","","That's right! You guessed my word!"],["C","","What do you want to do now?"],["B",4,"Play this AI again","Play a different AI","Go to start menu"]]));

                    } else {
                        let roundCountAtCreation = computerRoundCount;
                        let whatToAdd = [];
                        if (userLetterCorrectNumber === 1 && computerGuessingOn) {
                            whatToAdd = [ ["C","","You got 1 letter."],["C",roundCountAtCreation,"My guess is "+computerPicksGuessWord().toUpperCase()+"."],["U","","..."]];
                        } else if (computerGuessingOn) {
                            whatToAdd = [ ["C","","You got " +userLetterCorrectNumber+ " letters."],["C",roundCountAtCreation,"My guess is "+computerPicksGuessWord().toUpperCase()+"."],["U","","..."]];
                        } else if (userLetterCorrectNumber === 1) {
                            whatToAdd = [ ["C","","You got 1 letter."],["C",roundCountAtCreation,"Guess again."],["U","","..."]];
                        } else {
                            whatToAdd = [ ["C","","You got " +userLetterCorrectNumber+ " letters."],["C",roundCountAtCreation,"Guess again."],["U","","..."]];
                        }
                        setAllDialogues(previousBoxes.concat(dialogueBoxWithNewestUserGuess).concat(whatToAdd));
                        setComputerRoundCount(computerRoundCount+1);
                    }
                    if (computerGuessingOn) {
                        setGameStage("computerGuess");
                    }
                    setUserRoundCount(userRoundCount+1);
                    
                } else {            // if word is unacceptable...
                    setAllDialogues(previousBoxes.concat([ ["U",userRoundCount,userGuessWord],["C","","Sorry, that word isn't in my dictionary. Try a different word."],["U",userRoundCount,"..."]]) );
                }
            }












        } else if (gameStage === "computerGuess") {         // user's numerical 1-5 response to computer's guess
            // if (event.key.charCodeAt(0) >= 48 && event.key.charCodeAt(0) <= 53) {
            //     let newDialogueBox = ["U"," ",event.key];
            //     setAllDialogues(allDialogues.slice(0,allDialogues.length-1).concat([newDialogueBox]) );
            // }
            if (event.key === "Enter") {
                const userFeedback = all_inputBoxes[all_inputBoxes.length-1].value;
                const dialogueBoxWithNewestUserAnswer = [ ["U"," ",userFeedback] ];

                if (userFeedback.charCodeAt(0) >= 48 && userFeedback.charCodeAt(0) <= 53) {
                    
                    const dummyObject = computerGuessRecord;
                    dummyObject[latestComputerGuessWord] = parseInt(userFeedback);
                    setComputerGuessRecord(dummyObject);


                    switch(userFeedback) {                      // change fox's eyes/expression based on response
                        case "5":
                            sendMoodFromGameToApp("shocked");
                            break;
                        case "4":
                            sendMoodFromGameToApp("neutral");
                            break;
                        case "3":
                            sendMoodFromGameToApp("suspicious");
                            break;
                        case "2":
                            sendMoodFromGameToApp("crying");
                            break;
                        case "1":
                            sendMoodFromGameToApp("dead");
                            break;
                        case "0":
                            sendMoodFromGameToApp("shocked");
                            break;
                        default:
                            sendMoodFromGameToApp("neutral");
                            break;
                    }
                    if (userFeedback === "5") {
                        setAllDialogues(previousBoxes.concat(dialogueBoxWithNewestUserAnswer,[["C","","Is my guess correct?"],["B",2,"Yes","No"] ] ));
                    } else {
                        setAllDialogues(previousBoxes.concat(dialogueBoxWithNewestUserAnswer,[["C","","Okay, what's your guess?"],["U",userRoundCount,"..."]] ));
                    }
                    setGameStage("userGuess");
                }
            }



            // end of game stage = computerGuess
        }
        // else if (gameStage === "game ended, before erasing") {
        //     if (event.key === "Enter") {
        //         setAllDialogues(["!* *Enter 1 if you want to go first, or 2 for me to go first.",["U","","..."]]);
        //         setGameStage("decide who goes first");
        //     }
        // }
      };    // end of handleKeyDown











    const computerEvaluatesUserGuess = (userGuessWord) => {
        var correctLetterRunningSum = 0;
        var computerSecretWordForProcess = "";
        if (lexiconToUse === "korean") {
            userGuessWord = parseHangul(userGuessWord);
            computerSecretWordForProcess = parseHangul(computerSecretWord);
        } else {
            computerSecretWordForProcess = computerSecretWord;
        }
        for (let letter of userGuessWord.toUpperCase()) {
            if (computerSecretWord.toUpperCase().includes(letter)) {
                correctLetterRunningSum = correctLetterRunningSum + 1;
            }
        }
        return correctLetterRunningSum;
    }

    const parseHangul = (actualHangulWord) => {
        var parsedHangulWord = "";
        const batchimList = "ㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎXㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼ";

        for (let syllableBlock of actualHangulWord) {
            if (syllableBlock.charCodeAt(0) >= 44032 && syllableBlock.charCodeAt(0) < 44620) {
                parsedHangulWord += "ㄱ";
            } else if (syllableBlock.charCodeAt(0) >= 44620 && syllableBlock.charCodeAt(0) < 45208) {
                parsedHangulWord += "ㄲ";
            } else if (syllableBlock.charCodeAt(0) >= 45208 && syllableBlock.charCodeAt(0) < 45796) {
                parsedHangulWord += "ㄴ";
            } else if (syllableBlock.charCodeAt(0) >= 45796 && syllableBlock.charCodeAt(0) < 46384) {
                parsedHangulWord += "ㄷ";
            } else if (syllableBlock.charCodeAt(0) >= 46384 && syllableBlock.charCodeAt(0) < 46972) {
                parsedHangulWord += "ㄸ";
            } else if (syllableBlock.charCodeAt(0) >= 46972 && syllableBlock.charCodeAt(0) < 47560) {
                parsedHangulWord += "ㄹ";
            } else if (syllableBlock.charCodeAt(0) >= 47560 && syllableBlock.charCodeAt(0) < 48148) {
                parsedHangulWord += "ㅁ";
            } else if (syllableBlock.charCodeAt(0) >= 48148 && syllableBlock.charCodeAt(0) < 48736) {
                parsedHangulWord += "ㅂ";
            } else if (syllableBlock.charCodeAt(0) >= 48736 && syllableBlock.charCodeAt(0) < 49324) {
                parsedHangulWord += "ㅃ";
            } else if (syllableBlock.charCodeAt(0) >= 49324 && syllableBlock.charCodeAt(0) < 49912) {
                parsedHangulWord += "ㅅ";
            } else if (syllableBlock.charCodeAt(0) >= 49912 && syllableBlock.charCodeAt(0) < 50500) {
                parsedHangulWord += "ㅆ";
            } else if (syllableBlock.charCodeAt(0) >= 50500 && syllableBlock.charCodeAt(0) < 51088) {
                parsedHangulWord += "ㅇ";
            } else if (syllableBlock.charCodeAt(0) >= 51088 && syllableBlock.charCodeAt(0) < 51676) {
                parsedHangulWord += "ㅈ";
            } else if (syllableBlock.charCodeAt(0) >= 51676 && syllableBlock.charCodeAt(0) < 52264) {
                parsedHangulWord += "ㅉ";
            } else if (syllableBlock.charCodeAt(0) >= 52264 && syllableBlock.charCodeAt(0) < 52852) {
                parsedHangulWord += "ㅊ";
            } else if (syllableBlock.charCodeAt(0) >= 52852 && syllableBlock.charCodeAt(0) < 53440) {
                parsedHangulWord += "ㅋ";
            } else if (syllableBlock.charCodeAt(0) >= 53440 && syllableBlock.charCodeAt(0) < 54028) {
                parsedHangulWord += "ㅌ";
            } else if (syllableBlock.charCodeAt(0) >= 54028 && syllableBlock.charCodeAt(0) < 54616) {
                parsedHangulWord += "ㅍ";
            } else if (syllableBlock.charCodeAt(0) >= 54616 && syllableBlock.charCodeAt(0) < 55204) {
                parsedHangulWord += "ㅎ";
            }

            if (syllableBlock.charCodeAt(0) % 588 >= 520 && syllableBlock.charCodeAt(0) % 588 < 548) {
                parsedHangulWord += "ㅏ";
            } else if (syllableBlock.charCodeAt(0) % 588 >= 548 && syllableBlock.charCodeAt(0) % 588 < 576) {
                parsedHangulWord += "ㅐ";
            } else if (syllableBlock.charCodeAt(0) % 588 >= 576 || syllableBlock.charCodeAt(0) % 588 < 16) {
                parsedHangulWord += "ㅑ";
            } else if (syllableBlock.charCodeAt(0) % 588 >= 16 && syllableBlock.charCodeAt(0) % 588 < 44) {
                parsedHangulWord += "ㅒ";
            } else if (syllableBlock.charCodeAt(0) % 588 >= 44 && syllableBlock.charCodeAt(0) % 588 < 72) {
                parsedHangulWord += "ㅓ";
            } else if (syllableBlock.charCodeAt(0) % 588 >= 72 && syllableBlock.charCodeAt(0) % 588 < 100) {
                parsedHangulWord += "ㅔ";
            } else if (syllableBlock.charCodeAt(0) % 588 >= 100 && syllableBlock.charCodeAt(0) % 588 < 128) {
                parsedHangulWord += "ㅕ";
            } else if (syllableBlock.charCodeAt(0) % 588 >= 128 && syllableBlock.charCodeAt(0) % 588 < 156) {
                parsedHangulWord += "ㅖ";
            } else if (syllableBlock.charCodeAt(0) % 588 >= 156 && syllableBlock.charCodeAt(0) % 588 < 184) {
                parsedHangulWord += "ㅗ";
            } else if (syllableBlock.charCodeAt(0) % 588 >= 184 && syllableBlock.charCodeAt(0) % 588 < 212) {
                parsedHangulWord += "ㅘ";
            } else if (syllableBlock.charCodeAt(0) % 588 >= 212 && syllableBlock.charCodeAt(0) % 588 < 240) {
                parsedHangulWord += "ㅙ";
            } else if (syllableBlock.charCodeAt(0) % 588 >= 240 && syllableBlock.charCodeAt(0) % 588 < 268) {
                parsedHangulWord += "ㅚ";
            } else if (syllableBlock.charCodeAt(0) % 588 >= 268 && syllableBlock.charCodeAt(0) % 588 < 296) {
                parsedHangulWord += "ㅛ";
            } else if (syllableBlock.charCodeAt(0) % 588 >= 296 && syllableBlock.charCodeAt(0) % 588 < 324) {
                parsedHangulWord += "ㅜ";
            } else if (syllableBlock.charCodeAt(0) % 588 >= 324 && syllableBlock.charCodeAt(0) % 588 < 352) {
                parsedHangulWord += "ㅝ";
            } else if (syllableBlock.charCodeAt(0) % 588 >= 352 && syllableBlock.charCodeAt(0) % 588 < 380) {
                parsedHangulWord += "ㅞ";
            } else if (syllableBlock.charCodeAt(0) % 588 >= 380 && syllableBlock.charCodeAt(0) % 588 < 408) {
                parsedHangulWord += "ㅟ";
            } else if (syllableBlock.charCodeAt(0) % 588 >= 408 && syllableBlock.charCodeAt(0) % 588 < 436) {
                parsedHangulWord += "ㅠ";
            } else if (syllableBlock.charCodeAt(0) % 588 >= 436 && syllableBlock.charCodeAt(0) % 588 < 464) {
                parsedHangulWord += "ㅡ";
            } else if (syllableBlock.charCodeAt(0) % 588 >= 464 && syllableBlock.charCodeAt(0) % 588 < 492) {
                parsedHangulWord += "ㅢ";
            } else if (syllableBlock.charCodeAt(0) % 588 >= 492 && syllableBlock.charCodeAt(0) % 588 < 520) {
                parsedHangulWord += "ㅣ";
            }

            if (syllableBlock.charCodeAt(0) % 28 === 16) {
            } else {
                parsedHangulWord += batchimList[syllableBlock.charCodeAt(0) % 28];
            }

        }
        return parsedHangulWord;
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

    const whoGoesFirstChoice = (whosFirst) => {
        if (whosFirst === "user") {
            setGameStage("userGuess");
            setAllDialogues(allDialogues.concat([ ["C","","Okay, you'll go first. Enter your guess whenever you're ready."],["U",userRoundCount,"..."] ]) );
        } else if (whosFirst === "computer") {
            latestComputerWordChoice = computerPicksGuessWord();
            setGameStage("computerGuess");
            setAllDialogues(allDialogues.concat([ ["C","","Okay, I'll go first. Let's see..."],["C",1,"My guess is "+latestComputerWordChoice.toUpperCase()+"."],["U","","..."] ]) );
            setComputerRoundCount(computerRoundCount+1);
        }
    }

    const restartGame = () => {
        setGameStage("game ended, before erasing");
        setAllDialogues(allDialogues.concat([ ["C","","Okay, press enter and I'll erase the previous game.","..."] ]) );
    }

    const whoGoesFirstInput = useCallback((inputElement) => {
        if (inputElement) {
            inputElement.focus();
         }
    }, []);

    const afterNonWinningComputerGuess = () => {
        setAllDialogues(allDialogues.concat([["C","","Okay, what's your guess?"],["U",userRoundCount,"..."]] ));
    }

    const afterWinningComputerGuess = () => {
        setAllDialogues(allDialogues.concat([ ["C","","Okay, what now?"],["B",3,"Keep guessing the computer's word","Play this AI again","Main menu"] ]));
    }

    const continueGuessingWhenComputerWins = () => {
        setComputerGuessingOn(false);
        setAllDialogues(allDialogues.concat([ ["C","","Okay, what's your guess?"],["U",userRoundCount,"..."]] ));
    }




    const makeDialogueBox = (item) => {
        sendGuessLog(allDialogues);
        const randomKey = Math.random();

        if (item[0] === "C") {
            return <div key={randomKey} className="compDialogueContainer">
                        <div className="compDialogueSpace"></div>
                        <div className="compDialogue">
                            <div className="compDialogueLeftCap"></div>
                            {item[2]}
                            <div className="compDialogueRightCap">{item[1]}</div>
                        </div>
                    </div>







        } else if (item[0] === "B") {
            switch (item[1]) {
                case 1:
                    return <div tabIndex="0" key={randomKey} ref={whoGoesFirstInput} className="playerOptionBoxesContainer">
                            <div className="playerOptionBox" onClick={() => whoGoesFirstChoice("user")}>{item[2]}</div>
                            <div className="playerOptionBox" onClick={() => whoGoesFirstChoice("computer")}>{item[3]}</div>
                            <div className="playerInputSpace"></div>
                            </div>
                    break;
                case 2:
                    return <div tabIndex="0" key={randomKey} ref={whoGoesFirstInput} className="playerOptionBoxesContainer">
                            <div className="playerOptionBox" onClick={() => afterWinningComputerGuess()}>{item[2]}</div>
                            <div className="playerOptionBox" onClick={() => afterNonWinningComputerGuess()}>{item[3]}</div>
                            <div className="playerInputSpace"></div>
                            </div>
                    break;
                case 3:
                    return <div tabIndex="0" key={randomKey} ref={whoGoesFirstInput} className="playerOptionBoxesContainer">
                            <div className="playerOptionBox" onClick={() => continueGuessingWhenComputerWins()}>{item[2]}</div>
                            <div className="playerOptionBox" onClick={() => newGamePickAi(false)}>{item[3]}</div>
                            <div className="playerOptionBox" onClick={() => newGamePickAi(false)}>{item[4]}</div>
                            <div className="playerInputSpace"></div>
                            </div>
                    break;
                case 4:
                    return <div tabIndex="0" key={randomKey} ref={whoGoesFirstInput} className="playerOptionBoxesContainer">
                            <div className="playerOptionBox" onClick={restartGame}>{item[2]}</div>
                            <div className="playerOptionBox" onClick={() => newGamePickAi(true)}>{item[3]}</div>
                            <div className="playerOptionBox" onClick={() => newGamePickAi(false)}>{item[4]}</div>
                            <div className="playerInputSpace"></div>
                            </div>
                    break;
                default:
                    break;
            }





        // } else if (item[0] === "@") {   // if it starts with "@", it's a set of player option boxes
            // if (item.split("/")[0] === "@Player goes first ") {
            //     return <div tabIndex="0" key={randomKey} ref={whoGoesFirstInput} className="playerOptionBoxesContainer">
            //                 <div className="playerOptionBox" onClick={() => whoGoesFirstChoice("user")}>{item.split("/")[0].slice(1)}</div>
            //                 <div className="playerOptionBox" onClick={() => whoGoesFirstChoice("computer")}>{item.split("/")[1]}</div>
            //                 <div className="playerInputSpace"></div>
            //             </div>
            // } else if (item.split("/")[0] === "@Yes ") {
            //     return <div tabIndex="0" key={randomKey} ref={whoGoesFirstInput} className="playerOptionBoxesContainer">
            //                 <div className="playerOptionBox" onClick={() => afterWinningComputerGuess()}>{item.split("/")[0].slice(1)}</div>
            //                 <div className="playerOptionBox" onClick={() => afterNonWinningComputerGuess()}>{item.split("/")[1]}</div>
            //                 <div className="playerInputSpace"></div>
            //             </div>
            // } else if (item.split("/")[0] === "@Keep guessing the computer's word ") {
            //     return <div tabIndex="0" key={randomKey} ref={whoGoesFirstInput} className="playerOptionBoxesContainer">
            //                 <div className="playerOptionBox" onClick={() => continueGuessingWhenComputerWins()}>{item.split("/")[0].slice(1)}</div>
            //                 <div className="playerOptionBox" onClick={() => newGamePickAi(false)}>{item.split("/")[1]}</div>
            //                 <div className="playerOptionBox" onClick={() => newGamePickAi(false)}>{item.split("/")[2]}</div>
            //                 <div className="playerInputSpace"></div>
            //             </div>
            // } else if (item.split("/")[0] === "@Play this AI again ") {
            //     return <div tabIndex="0" key={randomKey} ref={whoGoesFirstInput} className="playerOptionBoxesContainer">
            //                 <div className="playerOptionBox" onClick={restartGame}>{item.split("/")[0].slice(1)}</div>
            //                 <div className="playerOptionBox" onClick={() => newGamePickAi(true)}>{item.split("/")[1]}</div>
            //                 <div className="playerOptionBox" onClick={() => newGamePickAi(false)}>{item.split("/")[2]}</div>
            //                 <div className="playerInputSpace"></div>
            //             </div>
            // }


        } else {                        // if it doesn't start with "!" or "@", it's a player input box
            var indexMaker = "dbox" + (allDialogues.indexOf(item)+1);

            if (allDialogues.indexOf(item)+1 === allDialogues.length) {         // if this is the last entry in allDialogues, make an input
                return <div key={randomKey} className="playerInputContainer">
                        <div tabIndex="0" className="playerInput" ref={whoGoesFirstInput}>
                            <div className="playerInputLeftCap">{item[1]}</div>
                            <input id={indexMaker} defaultValue={item[2]}></input>
                            <div className="playerInputRightCap"></div>
                        </div>
                        <div className="playerInputSpace"></div>
                    </div>

            } else {                                                            // if this is NOT the last entry in allDialogues, make a normal div
                return <div key={randomKey} className="playerInputContainer">
                        <div tabIndex="0" className="playerInput" ref={whoGoesFirstInput}>
                            <div className="playerInputLeftCap">{item[1]}</div>
                            <div>{item[2]}</div>
                            <div className="playerInputRightCap"></div>
                        </div>
                        <div className="playerInputSpace"></div>
                    </div>
            }
        }       // end of handling case--player input box
    }           // end of makeDialogueBox

    var mappedDialogueBoxes = allDialogues.map(makeDialogueBox);

    return (
        <div tabIndex="0" id="game" onKeyDown={handleKeyDownTwo}>
            
            {mappedDialogueBoxes}

        </div>
    );
}

export default Game;