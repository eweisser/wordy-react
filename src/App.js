// import { LEXICON } from './components/lexicon.js';
import StartMenu from './components/start-menu.js';
import AIMenu from './components/AI-menu.js';
import Game from './components/game.js';
import Fox from './components/fox.js';
import ScratchPad from './components/scratchpad.js';
import './App.css';
// import './bkgd_gold.css';
import { useState } from 'react';
import AIMenuButton from './components/AI-menu-button.js';
import ScratchPadLetter from './components/scratch-pad-letter.js';
import HowToPlay from './components/how-to-play.js';
import OptionsPage from './components/options-page.js';
import ColorThemeContainer from './components/color-theme-container.js';
import ColorChangeButton from './components/color-change-button.js';
import LexiconChoiceContainer from './components/lexicon-choice-container.js';
import LexiconChoiceButton from './components/lexicon-choice-button.js';

// implement fox reactions
// AI actually tries to solve
// save / load
// minilex
// clear scratchpad
// mark numbers for rounds
// auto-refocus

function App() {

  const [startMenuAppear, setStartMenuAppear] = useState(true);
  const [aiMenuAppear, setAiMenuAppear] = useState(false);
  const [gameAppear, setGameAppear] = useState(false);
  const [howToPlayAppear, setHowToPlayAppear] = useState(false);
  const [optionsAppear, setOptionsAppear] = useState(false);
  const [alphabetAppear, setAlphabetAppear] = useState(false);

  const [activeAi, setActiveAi] = useState(null);
  const [lexiconToUse, setLexiconToUse] = useState("minilex");

  return (
    <div id="ColorWrapper" className="GoldTheme">
    <div className="App">
      <div className="LeftFrame">
        {startMenuAppear && <StartMenu showAiMenu={() => {setStartMenuAppear(false); setAiMenuAppear(true)}} showHowToPlay={() => {setStartMenuAppear(false); setHowToPlayAppear(true); setAlphabetAppear(true)} } showOptions={() => {setStartMenuAppear(false); setOptionsAppear(true); setAlphabetAppear(false)} } />}

        {aiMenuAppear && <AIMenu>
          <AIMenuButton AiName="Amy" pickAi={() => {setActiveAi("Amy"); setAiMenuAppear(false); setGameAppear(true); setAlphabetAppear(true)}}></AIMenuButton>
          <AIMenuButton AiName="Ben" pickAi={() => {setActiveAi("Ben"); setAiMenuAppear(false); setGameAppear(true); setAlphabetAppear(true)}}></AIMenuButton>
          <AIMenuButton AiName="Clair" pickAi={() => {setActiveAi("Clair"); setAiMenuAppear(false); setGameAppear(true); setAlphabetAppear(true)}}></AIMenuButton>
        </AIMenu>}

        {gameAppear && <Game sendActiveAi={activeAi} newGamePickAi={(clue) => {setGameAppear(false); setAiMenuAppear(clue); setStartMenuAppear(!clue); setAlphabetAppear(false)}} />}

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
              <LexiconChoiceButton Label="Standard" pressLexiconChoiceButton={() => {setLexiconToUse("minilex")}}></LexiconChoiceButton>
            </LexiconChoiceContainer>

        </OptionsPage>}

      </div>

      <div className="RightFrame">

        {<Fox />}

        {alphabetAppear && <ScratchPad>
          <ScratchPadLetter Letter="A"></ScratchPadLetter>
          <ScratchPadLetter Letter="B"></ScratchPadLetter>
          <ScratchPadLetter Letter="C"></ScratchPadLetter>
          <ScratchPadLetter Letter="D"></ScratchPadLetter>
          <ScratchPadLetter Letter="E"></ScratchPadLetter>

          <ScratchPadLetter Letter="F"></ScratchPadLetter>
          <ScratchPadLetter Letter="G"></ScratchPadLetter>
          <ScratchPadLetter Letter="H"></ScratchPadLetter>
          <ScratchPadLetter Letter="I"></ScratchPadLetter>
          <ScratchPadLetter Letter="J"></ScratchPadLetter>
          
          <ScratchPadLetter Letter="K"></ScratchPadLetter>
          <ScratchPadLetter Letter="L"></ScratchPadLetter>
          <ScratchPadLetter Letter="M"></ScratchPadLetter>
          <ScratchPadLetter Letter="N"></ScratchPadLetter>
          <ScratchPadLetter Letter="O"></ScratchPadLetter>
          
          <ScratchPadLetter Letter="P"></ScratchPadLetter>
          <ScratchPadLetter Letter="Q"></ScratchPadLetter>
          <ScratchPadLetter Letter="R"></ScratchPadLetter>
          <ScratchPadLetter Letter="S"></ScratchPadLetter>
          <ScratchPadLetter Letter="T"></ScratchPadLetter>

          <ScratchPadLetter Letter="U"></ScratchPadLetter>
          <ScratchPadLetter Letter="V"></ScratchPadLetter>
          <ScratchPadLetter Letter="W"></ScratchPadLetter>
          <ScratchPadLetter Letter="X"></ScratchPadLetter>
          <ScratchPadLetter Letter="Y"></ScratchPadLetter>

          <ScratchPadLetter Letter="Z"></ScratchPadLetter>
        </ScratchPad>}
      </div>
    </div>
    </div>
  );
}

export default App;
