// import { LEXICON } from './components/lexicon.js';
import StartMenu from './components/start-menu.js';
import AIMenu from './components/AI-menu.js';
import Game from './components/game.js';
import Fox from './components/fox.js';
import ScratchPad from './components/scratchpad.js';
import './App.css';
import { useState } from 'react';
import AIMenuButton from './components/AI-menu-button.js';
import ScratchPadLetter from './components/scratch-pad-letter.js';
import ScratchPadResetButton from './components/scratch-pad-reset-button.js';
import HowToPlay from './components/how-to-play.js';
import OptionsPage from './components/options-page.js';
import ColorThemeContainer from './components/color-theme-container.js';
import ColorChangeButton from './components/color-change-button.js';
import LexiconChoiceContainer from './components/lexicon-choice-container.js';
import LexiconChoiceButton from './components/lexicon-choice-button.js';

// save / load
// minilex edits: consult another corpus
// auto-refocus
// mobile optimization
// more detailed fox reactions--animations?

function App() {

  const [startMenuAppear, setStartMenuAppear] = useState(true);
  const [aiMenuAppear, setAiMenuAppear] = useState(false);
  const [gameAppear, setGameAppear] = useState(false);
  const [howToPlayAppear, setHowToPlayAppear] = useState(false);
  const [optionsAppear, setOptionsAppear] = useState(false);
  const [alphabetAppear, setAlphabetAppear] = useState(false);
  const [letterKnowledge, setLetterKnowledge] = useState("letter_neutral");

  const [activeAi, setActiveAi] = useState(null);
  const [resetStatus, setResetStatus] = useState("[reset]");
  const [lexiconToUse, setLexiconToUse] = useState("standard");
  const [alphabetStatus, setAlphabetStatus] = useState({A: "letter_neutral", B: "letter_neutral", C: "letter_neutral", D: "letter_neutral", E: "letter_neutral", F: "letter_neutral", G: "letter_neutral", H: "letter_neutral", I: "letter_neutral", J: "letter_neutral", K: "letter_neutral", L: "letter_neutral", M: "letter_neutral", N: "letter_neutral", O: "letter_neutral", P: "letter_neutral", Q: "letter_neutral", R: "letter_neutral", S: "letter_neutral", T: "letter_neutral", U: "letter_neutral", V: "letter_neutral", W: "letter_neutral", X: "letter_neutral", Y: "letter_neutral", Z: "letter_neutral"});

  const [foxMood, setFoxMood] = useState("neutral");

  const fullAlphabetObject = {};
  for (let i = 65; i < 91; i++) {
    fullAlphabetObject[String.fromCharCode(i)] = "letter_neutral";
  }

  const cycleLetterButtonParent = (letter, lk) => {
    const replacement = {};
    var newStatus;
    if (lk === "letter_neutral") {
      newStatus = "letter_eliminated";
    } else if (lk === "letter_eliminated") {
      newStatus = "letter_proven";
    } else if (lk === "letter_proven") {
      newStatus = "letter_neutral";
    }
    replacement[letter] = newStatus;
    setAlphabetStatus({...alphabetStatus, ...replacement});
  }

  const makeScratchpadObject = (alphabetStatusParameter) => {
    var scratchpadArrayFromObject = [];
    for (var key in alphabetStatusParameter) {
      scratchpadArrayFromObject.push(<ScratchPadLetter key={Math.random()} Letter={key} LetterKnowledge={alphabetStatusParameter[key]} cycleLetterButton={(l, lk) => {cycleLetterButtonParent(l, lk)}} ></ScratchPadLetter>);
    }
    return scratchpadArrayFromObject;
  }

  var mappedScratchpadLettersObject = makeScratchpadObject(alphabetStatus);

  const handleReset = () => {
    if (resetStatus === "[reset]") {
      setResetStatus("click again to reset");
    } else if (resetStatus === "click again to reset") {
      setAlphabetStatus(fullAlphabetObject);
      setResetStatus("[reset]");
    }
  }

  const handleFoxMoodCallback = (moodData) => {
    setFoxMood(moodData);
    setInterval(resetFace, 2000);
  }

  const resetFace = () => {
    setFoxMood("neutral");
}

















  return (
    <div id="ColorWrapper" className="GoldTheme">
    <div className="App">
      <div className="LeftFrame">
        {startMenuAppear && <StartMenu showAiMenu={() => {setStartMenuAppear(false); setAiMenuAppear(true)}} showHowToPlay={() => {setStartMenuAppear(false); setHowToPlayAppear(true); setAlphabetAppear(true)} } showOptions={() => {setStartMenuAppear(false); setOptionsAppear(true); setAlphabetAppear(false)} } />}

        {aiMenuAppear && <AIMenu>
          <AIMenuButton AiName="Amy" pickAi={() => {setActiveAi("Amy"); setAiMenuAppear(false); setGameAppear(true); setAlphabetAppear(true)}}></AIMenuButton>
          <AIMenuButton AiName="Ben" pickAi={() => {setActiveAi("Ben"); setAiMenuAppear(false); setGameAppear(true); setAlphabetAppear(true)}}></AIMenuButton>
          <AIMenuButton AiName="Clair" pickAi={() => {setActiveAi("Clair"); setAiMenuAppear(false); setGameAppear(true); setAlphabetAppear(true)}}></AIMenuButton>
          <AIMenuButton AiName="David" pickAi={() => {setActiveAi("David"); setAiMenuAppear(false); setGameAppear(true); setAlphabetAppear(true)}}></AIMenuButton>
        </AIMenu>}

        {gameAppear && <Game lexiconToUse={lexiconToUse} sendMoodFromGameToApp={handleFoxMoodCallback} sendActiveAi={activeAi} newGamePickAi={(clue) => {setGameAppear(false); setAiMenuAppear(clue); setStartMenuAppear(!clue); setAlphabetAppear(false)}} />}

        {howToPlayAppear && <HowToPlay returnToStartMenu={() => {setStartMenuAppear(true); setAlphabetAppear(false); setHowToPlayAppear(false)}} />}

        {optionsAppear && <OptionsPage returnToStartMenu={() => {setStartMenuAppear(true); setAlphabetAppear(false); setOptionsAppear(false)}} >
            <ColorThemeContainer>
              <ColorChangeButton Color="white-sample" pressColorButton={() => {document.getElementById("ColorWrapper").className = "WhiteTheme"; }}></ColorChangeButton>
              <ColorChangeButton Color="black-sample" pressColorButton={() => {document.getElementById("ColorWrapper").className = "BlackTheme"; }}></ColorChangeButton>
              <ColorChangeButton Color="red-sample" pressColorButton={() => {document.getElementById("ColorWrapper").className = "RedTheme"; }}></ColorChangeButton>
              <ColorChangeButton Color="gold-sample" pressColorButton={() => {document.getElementById("ColorWrapper").className = "GoldTheme"; }}></ColorChangeButton>
              <ColorChangeButton Color="yg-sample" pressColorButton={() => {document.getElementById("ColorWrapper").className = "YGTheme"; }}></ColorChangeButton>
              <ColorChangeButton Color="green-sample" pressColorButton={() => {document.getElementById("ColorWrapper").className = "GreenTheme"; }}></ColorChangeButton>
              <ColorChangeButton Color="sky-sample" pressColorButton={() => {document.getElementById("ColorWrapper").className = "SkyTheme"; }}></ColorChangeButton>
              <ColorChangeButton Color="blue-sample" pressColorButton={() => {document.getElementById("ColorWrapper").className = "BlueTheme"; }}></ColorChangeButton>
              <ColorChangeButton Color="purple-sample" pressColorButton={() => {document.getElementById("ColorWrapper").className = "PurpleTheme"; }}></ColorChangeButton>
              <ColorChangeButton Color="pink-sample" pressColorButton={() => {document.getElementById("ColorWrapper").className = "PinkTheme"; }}></ColorChangeButton>
            </ColorThemeContainer>

            <LexiconChoiceContainer>
              <LexiconChoiceButton Label="Maximal" pressLexiconChoiceButton={() => {setLexiconToUse("maximal")}}></LexiconChoiceButton>
              <LexiconChoiceButton Label="Standard" pressLexiconChoiceButton={() => {setLexiconToUse("standard")}}></LexiconChoiceButton>
              <LexiconChoiceButton Label="French" pressLexiconChoiceButton={() => {setLexiconToUse("french")}}></LexiconChoiceButton>
              <LexiconChoiceButton Label="German" pressLexiconChoiceButton={() => {setLexiconToUse("german")}}></LexiconChoiceButton>
              <LexiconChoiceButton Label="Spanish" pressLexiconChoiceButton={() => {setLexiconToUse("spanish")}}></LexiconChoiceButton>
            </LexiconChoiceContainer>

        </OptionsPage>}

      </div>


      <div className="RightFrame">

        {<Fox Mood={foxMood} />}

        {alphabetAppear && <ScratchPad>
          {mappedScratchpadLettersObject}
          <ScratchPadResetButton Label={resetStatus} cycleResetButton={() => {handleReset()}}> </ScratchPadResetButton>
        </ScratchPad>}
      </div>
    </div>
    </div>
  );
}

export default App;
