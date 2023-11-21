// import { LEXICON } from './components/lexicon.js';
import StartMenu from './components/start-menu.js';
import AIMenu from './components/AI-menu.js';
import Game from './components/game.js';
import Fox from './components/fox.js';
import ScratchPad from './components/scratchpad.js';
import './App.css';
import './bkgd_gold.css';
import { useState } from 'react';
import AIMenuButton from './components/AI-menu-button.js';
import ScratchPadLetter from './components/scratch-pad-letter.js';
import HowToPlay from './components/how-to-play.js';
import OptionsPage from './components/options-page.js';

// fix nose
// implement fox reactions
// AI actually tries to solve
// save / load
// minilex
// clear scratchpad
// options menu
// mark numbers for rounds
// auto-refocus

function App() {

  const [startMenuAppear, setStartMenuAppear] = useState(true);
  const [aiMenuAppear, setAiMenuAppear] = useState(false);
  const [gameAppear, setGameAppear] = useState(false);
  const [howToPlayAppear, setHowToPlayAppear] = useState(false);
  const [optionsAppear, setOptionsAppear] = useState(false);
  const [color1, setColor1] = useState("#fc0");
  const [color2, setColor2] = useState("#830");
  const [color3, setColor3] = useState("#fffb");
  // const [foxAppear, setFoxAppear] = useState(true);
  const [alphabetAppear, setAlphabetAppear] = useState(false);

  const [activeAi, setActiveAi] = useState(null);

  return (
    <div className="App" style={{backgroundColor: color1, color: color2}}>
      <div className="LeftFrame">
        {startMenuAppear && <StartMenu showAiMenu={() => {setStartMenuAppear(false); setAiMenuAppear(true)}} showHowToPlay={() => {setStartMenuAppear(false); setHowToPlayAppear(true); setAlphabetAppear(true)} } showOptions={() => {setStartMenuAppear(false); setOptionsAppear(true); setAlphabetAppear(false)} } />}

        {aiMenuAppear && <AIMenu>
          <AIMenuButton AiName="Amy" pickAi={() => {setActiveAi("Amy"); setAiMenuAppear(false); setGameAppear(true); setAlphabetAppear(true)}}></AIMenuButton>
          <AIMenuButton AiName="Ben" pickAi={() => {setActiveAi("Ben"); setAiMenuAppear(false); setGameAppear(true); setAlphabetAppear(true)}}></AIMenuButton>
          <AIMenuButton AiName="Clair" pickAi={() => {setActiveAi("Clair"); setAiMenuAppear(false); setGameAppear(true); setAlphabetAppear(true)}}></AIMenuButton>
        </AIMenu>}

        {gameAppear && <Game sendActiveAi={activeAi} newGamePickAi={(clue) => {setGameAppear(false); setAiMenuAppear(clue); setStartMenuAppear(!clue); setAlphabetAppear(false)}} />}

        {howToPlayAppear && <HowToPlay returnToStartMenu={() => {setStartMenuAppear(true); setAlphabetAppear(false); setHowToPlayAppear(false)}} />}
        {optionsAppear && <OptionsPage returnToStartMenu={() => {setStartMenuAppear(true); setAlphabetAppear(false); setOptionsAppear(false)}} changeColorTheme={(colorPack) => {setColor1(colorPack[0]); setColor2(colorPack[1]); setColor3(colorPack[2])}} />}

      </div>

      <div className="RightFrame">

        {/* {foxAppear && <Fox />} */}
        {<Fox Stroke={color2} />}

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
  );
}

export default App;
